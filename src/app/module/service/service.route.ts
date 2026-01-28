import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../../Interface/types';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.createServiceValidationSchema),
  ServiceController.createService,
);

router.get('/', ServiceController.getAllServices);

router.get('/:id', ServiceController.getSingleService);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidation.updateServiceValidationSchema),
  ServiceController.updateService,
);

router.delete('/:id', auth(USER_ROLE.admin), ServiceController.deleteService);

export const ServiceRouter = router;
