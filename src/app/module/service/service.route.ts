import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = Router();

router.post(
  '/',
  validateRequest(ServiceValidation.createServiceValidationSchema),
  ServiceController.createService,
);

router.get('/', ServiceController.getAllServices);

router.get('/:id', ServiceController.getSingleService);

router.patch(
  '/:id',
  validateRequest(ServiceValidation.updateServiceValidationSchema),
  ServiceController.updateService,
);

router.delete('/:id', ServiceController.deleteService);

export const ServiceRouter = router;
