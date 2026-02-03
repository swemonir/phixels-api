import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';

const router = Router();

router.post('/events', AnalyticsController.createEvents);
router.get('/overview', AnalyticsController.getOverview);
router.get('/realtime', AnalyticsController.getRealtime);
router.get('/funnel', AnalyticsController.getFunnel);

export const AnalyticsRouter = router;
