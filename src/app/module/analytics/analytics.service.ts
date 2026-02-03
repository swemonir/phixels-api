import { FilterQuery } from 'mongoose';
import { AnalyticsEvent } from './analytics.model';
import { TAnalyticsEvent, TFunnelStep, TNotificationItem } from './analytics.interface';

type TRangeParams = {
  range?: string;
  start?: string;
  end?: string;
};

const RANGE_TO_MS: Record<string, number> = {
  '1h': 60 * 60 * 1000,
  '1d': 24 * 60 * 60 * 1000,
  '3d': 3 * 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
  '1m': 30 * 24 * 60 * 60 * 1000,
  '3m': 90 * 24 * 60 * 60 * 1000,
  '6m': 180 * 24 * 60 * 60 * 1000,
  '1y': 365 * 24 * 60 * 60 * 1000,
};

const resolveDateRange = (params: TRangeParams) => {
  const now = new Date();
  if (params.start && params.end) {
    const start = new Date(params.start);
    const end = new Date(params.end);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new Error('Invalid custom date range');
    }
    return { start, end, range: 'custom' };
  }
  const key = (params.range || '7d').toLowerCase();
  const duration = RANGE_TO_MS[key] ?? RANGE_TO_MS['7d'];
  return { start: new Date(now.getTime() - duration), end: now, range: key };
};

const buildRangeMatch = (params: TRangeParams): FilterQuery<TAnalyticsEvent> => {
  const { start, end } = resolveDateRange(params);
  return { eventAt: { $gte: start, $lte: end } };
};

const countDistinctSessions = async (match: FilterQuery<TAnalyticsEvent>) => {
  const sessions = await AnalyticsEvent.distinct('sessionId', match);
  return sessions.length;
};

const getFunnelSteps = async (params: TRangeParams): Promise<TFunnelStep[]> => {
  const match = buildRangeMatch(params);
  const steps = ['popup_open', 'lead_submitted', 'meeting_started', 'meeting_booked'];

  const counts = await AnalyticsEvent.aggregate([
    { $match: { ...match, eventType: { $in: steps } } },
    { $group: { _id: '$eventType', count: { $sum: 1 } } },
  ]);

  const countMap = counts.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {} as Record<string, number>);

  const results: TFunnelStep[] = [];
  let previousCount = 0;
  steps.forEach((step, index) => {
    const users = countMap[step] ?? 0;
    const rate = index === 0 ? 100 : previousCount > 0 ? (users / previousCount) * 100 : 0;
    const dropoff = index === 0 ? undefined : previousCount > 0 ? 100 - rate : undefined;
    results.push({
      stage: step,
      users,
      rate: Number(rate.toFixed(2)),
      dropoff: dropoff === undefined ? undefined : Number(dropoff.toFixed(2)),
    });
    previousCount = users;
  });

  return results;
};

const formatTimeAgo = (date: Date) => {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

const notificationMap: Record<string, { title: string; message: string; type: string }> = {
  lead_submitted: {
    title: 'New Project Request',
    message: 'A new project request was submitted.',
    type: 'lead',
  },
  meeting_booked: {
    title: 'Meeting Confirmed',
    message: 'A consultation meeting was booked.',
    type: 'meeting',
  },
  contact_submitted: {
    title: 'New Contact Message',
    message: 'A new contact form message was submitted.',
    type: 'contact',
  },
  newsletter_subscribed: {
    title: 'New Newsletter Subscriber',
    message: 'Someone subscribed to the newsletter.',
    type: 'newsletter',
  },
  job_applied: {
    title: 'Job Application',
    message: 'A new job application was submitted.',
    type: 'job',
  },
};

const buildNotifications = async () => {
  const types = Object.keys(notificationMap);
  const events = await AnalyticsEvent.find({ eventType: { $in: types } })
    .sort({ eventAt: -1 })
    .limit(10);

  return events.map((event) => {
    const mapping = notificationMap[event.eventType] ?? {
      title: 'Activity',
      message: 'New activity received.',
      type: 'activity',
    };
    return {
      id: event._id.toString(),
      type: mapping.type,
      title: mapping.title,
      message: mapping.message,
      time: formatTimeAgo(event.eventAt),
      createdAt: event.eventAt,
    } as TNotificationItem;
  });
};

const createEventsIntoDB = async (events: TAnalyticsEvent[]) => {
  return AnalyticsEvent.insertMany(events, { ordered: false });
};

const getOverviewFromDB = async (params: TRangeParams) => {
  const match = buildRangeMatch(params);

  const totalLeads = await countDistinctSessions({
    ...match,
    eventType: 'lead_submitted',
  });

  const bookedLeads = await countDistinctSessions({
    ...match,
    eventType: 'meeting_booked',
  });

  const pendingLeads = Math.max(totalLeads - bookedLeads, 0);
  const conversionRate = totalLeads > 0 ? Number(((bookedLeads / totalLeads) * 100).toFixed(2)) : 0;

  const clickCountsAgg = await AnalyticsEvent.aggregate([
    {
      $match: {
        ...match,
        eventType: 'click',
        channel: { $in: ['gmail', 'whatsapp', 'fiverr'] },
      },
    },
    {
      $group: { _id: '$channel', count: { $sum: 1 } },
    },
  ]);

  const clickCounts = clickCountsAgg.reduce(
    (acc, item) => {
      acc[item._id] = item.count;
      return acc;
    },
    { gmail: 0, whatsapp: 0, fiverr: 0 } as Record<string, number>,
  );

  const realtimeSince = new Date(Date.now() - 5 * 60 * 1000);
  const realtimeUsers = await countDistinctSessions({
    eventAt: { $gte: realtimeSince },
  });

  const funnel = await getFunnelSteps(params);
  const popupViews = funnel.find((step) => step.stage === 'popup_open')?.users ?? 0;
  const dropoffRate =
    popupViews > 0 && totalLeads > 0
      ? Number(((1 - totalLeads / popupViews) * 100).toFixed(2))
      : 0;

  const criticalInsights = [];
  if (pendingLeads > 0) {
    criticalInsights.push({
      id: 'pending-leads',
      title: `${pendingLeads} Leads Stuck at Step 1`,
      description:
        'These users completed step 1 but did not book a meeting. Consider follow-up.',
      severity: 'high',
    });
  }
  if (dropoffRate > 50) {
    criticalInsights.push({
      id: 'popup-dropoff',
      title: `High Popup Drop-off (${dropoffRate}%)`,
      description:
        'A large share of users opened the popup but did not complete step 1.',
      severity: 'medium',
    });
  }
  if (criticalInsights.length === 0) {
    criticalInsights.push({
      id: 'healthy',
      title: 'No Critical Issues Detected',
      description: 'Funnel metrics are within healthy ranges.',
      severity: 'low',
    });
  }

  const notifications = await buildNotifications();

  return {
    totalLeads,
    pendingLeads,
    bookedLeads,
    conversionRate,
    realtimeUsers,
    clickCounts,
    funnel,
    criticalInsights,
    notifications,
  };
};

const getRealtimeFromDB = async () => {
  const since = new Date(Date.now() - 5 * 60 * 1000);
  const events = await AnalyticsEvent.find({ eventAt: { $gte: since } })
    .sort({ eventAt: -1 })
    .limit(100);

  const sessionIds = new Set(events.map((event) => event.sessionId));
  const activeUsers = sessionIds.size;

  const deviceCounts = events.reduce(
    (acc, event) => {
      const device = event.deviceType ?? 'unknown';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const pageCounts = events.reduce(
    (acc, event) => {
      if (!event.pagePath) return acc;
      acc[event.pagePath] = (acc[event.pagePath] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const liveEvents = events.map((event) => ({
    event: event.pagePath ? `Page View: ${event.pagePath}` : event.eventType,
    location: event.city && event.country ? `${event.city}, ${event.country}` : event.country || 'Unknown',
    device: event.deviceType ?? 'unknown',
    time: formatTimeAgo(event.eventAt),
    activity: event.eventType.replace(/_/g, ' '),
  }));

  return {
    activeUsers,
    deviceCounts,
    pageCounts,
    liveEvents,
  };
};

export const AnalyticsServices = {
  createEventsIntoDB,
  getOverviewFromDB,
  getRealtimeFromDB,
  getFunnelSteps,
  resolveDateRange,
};
