import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const updateProductInDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
