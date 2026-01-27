import { TService } from './service.interface';
import { ServiceModel } from './service.model';

const createServiceIntoDB = async (payload: TService) => {
  const result = await ServiceModel.create(payload);
  return result;
};

const getAllServicesFromDB = async () => {
  const result = await ServiceModel.find();
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  const result = await ServiceModel.findById(id);
  return result;
};

const updateServiceInDB = async (id: string, payload: Partial<TService>) => {
  const result = await ServiceModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = await ServiceModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceInDB,
  deleteServiceFromDB,
};
