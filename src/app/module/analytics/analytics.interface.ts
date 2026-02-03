export type TAnalyticsEvent = {
  eventType: string;
  sessionId: string;
  pagePath?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  deviceType?: 'desktop' | 'mobile' | 'tablet' | 'bot' | 'unknown';
  country?: string;
  city?: string;
  channel?: string;
  metadata?: Record<string, unknown>;
  eventAt: Date;
};

export type TFunnelStep = {
  stage: string;
  users: number;
  rate: number;
  dropoff?: number;
};

export type TNotificationItem = {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  createdAt: Date;
};
