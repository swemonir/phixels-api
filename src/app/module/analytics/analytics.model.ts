import { Schema, model } from 'mongoose';
import { TAnalyticsEvent } from './analytics.interface';

const analyticsEventSchema = new Schema<TAnalyticsEvent>(
  {
    eventType: { type: String, required: true, index: true },
    sessionId: { type: String, required: true, index: true },
    pagePath: { type: String },
    referrer: { type: String },
    utmSource: { type: String },
    utmMedium: { type: String },
    utmCampaign: { type: String },
    deviceType: { type: String, default: 'unknown' },
    country: { type: String },
    city: { type: String },
    channel: { type: String },
    metadata: { type: Schema.Types.Mixed },
    eventAt: { type: Date, default: Date.now, index: true },
  },
  {
    timestamps: true,
  },
);

analyticsEventSchema.index({ eventAt: -1, eventType: 1 });

export const AnalyticsEvent = model<TAnalyticsEvent>(
  'AnalyticsEvent',
  analyticsEventSchema,
);
