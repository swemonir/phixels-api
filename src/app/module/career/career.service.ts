import { TCareer } from './career.interface';
import { CareerModel } from './career.model';

const createCareerIntoDB = async (payload: TCareer) => {
  const result = await CareerModel.create(payload);
  return result;
};

const getAllCareersFromDB = async () => {
  const result = await CareerModel.find();
  return result;
};

const getSingleCareerFromDB = async (id: string) => {
  const result = await CareerModel.findById(id);
  return result;
};

const updateCareerInDB = async (id: string, payload: Partial<TCareer>) => {
  const result = await CareerModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteCareerFromDB = async (id: string) => {
  const result = await CareerModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CareerServices = {
  createCareerIntoDB,
  getAllCareersFromDB,
  getSingleCareerFromDB,
  updateCareerInDB,
  deleteCareerFromDB,
};
