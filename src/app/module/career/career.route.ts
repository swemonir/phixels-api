import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CareerController } from './career.controller';
import { CareerValidation } from './career.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../../Interface/types';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CareerValidation.createCareerValidationSchema),
  CareerController.createCareer,
);

router.get('/', CareerController.getAllCareers);

router.get('/:id', CareerController.getSingleCareer);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(CareerValidation.updateCareerValidationSchema),
  CareerController.updateCareer,
);

router.delete('/:id', auth(USER_ROLE.admin), CareerController.deleteCareer);

export const CareerRouter = router;
