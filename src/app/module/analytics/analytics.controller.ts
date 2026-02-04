import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AnalyticsServices } from './analytics.service';

const createEvents = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body?.events ?? req.body;
  const events = Array.isArray(payload) ? payload : [payload];
  if (!events.length) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'No analytics events provided',
      data: null,
    });
    return;
  }
  const normalized = events.map((event) => ({
    ...event,
    eventAt: event.eventAt ? new Date(event.eventAt) : new Date(),
  }));

  await AnalyticsServices.createEventsIntoDB(normalized);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Analytics events recorded',
    data: { inserted: normalized.length },
  });
});

const getOverview = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getOverviewFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Analytics overview retrieved',
    data,
  });
});

const getRealtime = catchAsync(async (_req: Request, res: Response) => {
  const data = await AnalyticsServices.getRealtimeFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Realtime analytics retrieved',
    data,
  });
});

const getFunnel = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getFunnelSteps({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Funnel analytics retrieved',
    data,
  });
});

const getTrafficSeries = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getTrafficSeriesFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Traffic series retrieved',
    data,
  });
});

const getTopPages = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getTopPagesFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top pages retrieved',
    data,
  });
});

const getDevices = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getDeviceBreakdownFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Device breakdown retrieved',
    data,
  });
});

const getTopCities = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getTopCitiesFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top cities retrieved',
    data,
  });
});

const getTopCountries = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getTopCountriesFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top countries retrieved',
    data,
  });
});

const getTrafficSources = catchAsync(async (req: Request, res: Response) => {
  const data = await AnalyticsServices.getTrafficSourcesFromDB({
    range: req.query.range as string | undefined,
    start: req.query.start as string | undefined,
    end: req.query.end as string | undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Traffic sources retrieved',
    data,
  });
});

export const AnalyticsController = {
  createEvents,
  getOverview,
  getRealtime,
  getFunnel,
  getTrafficSeries,
  getTopPages,
  getDevices,
  getTopCities,
  getTopCountries,
  getTrafficSources,
};
