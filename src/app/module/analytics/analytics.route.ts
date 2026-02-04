import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';

const router = Router();

router.post('/events', AnalyticsController.createEvents);
router.get('/overview', AnalyticsController.getOverview);
router.get('/realtime', AnalyticsController.getRealtime);
router.get('/funnel', AnalyticsController.getFunnel);
router.get('/traffic', AnalyticsController.getTrafficSeries);
router.get('/top-pages', AnalyticsController.getTopPages);
router.get('/devices', AnalyticsController.getDevices);
router.get('/top-cities', AnalyticsController.getTopCities);
router.get('/top-countries', AnalyticsController.getTopCountries);
router.get('/traffic-sources', AnalyticsController.getTrafficSources);

export const AnalyticsRouter = router;
