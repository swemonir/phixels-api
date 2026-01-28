import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../../Interface/types';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductController.createProduct,
);

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getSingleProduct);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductController.updateProduct,
);

router.delete('/:id', auth(USER_ROLE.admin), ProductController.deleteProduct);

export const ProductRouter = router;
