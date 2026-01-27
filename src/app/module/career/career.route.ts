import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CareerController } from './career.controller';
import { CareerValidation } from './career.validation';

const router = Router();

router.post(
  '/',
  validateRequest(CareerValidation.createCareerValidationSchema),
  CareerController.createCareer,
);

router.get('/', CareerController.getAllCareers);

router.get('/:id', CareerController.getSingleCareer);

router.patch(
  '/:id',
  validateRequest(CareerValidation.updateCareerValidationSchema),
  CareerController.updateCareer,
);

router.delete('/:id', CareerController.deleteCareer);

export const CareerRouter = router;
