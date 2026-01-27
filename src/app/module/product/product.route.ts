import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';

const router = Router();

router.post(
  '/',
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductController.createProduct,
);

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getSingleProduct);

router.patch(
  '/:id',
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductController.updateProduct,
);

router.delete('/:id', ProductController.deleteProduct);

export const ProductRouter = router;
