import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CareerServices } from './career.service';

const createCareer = catchAsync(async (req: Request, res: Response) => {
  const result = await CareerServices.createCareerIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Career created successfully',
    data: result,
  });
});

const getAllCareers = catchAsync(async (req: Request, res: Response) => {
  const result = await CareerServices.getAllCareersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Careers retrieved successfully',
    data: result,
  });
});

const getSingleCareer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CareerServices.getSingleCareerFromDB(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Career retrieved successfully',
    data: result,
  });
});

const updateCareer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CareerServices.updateCareerInDB(id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Career updated successfully',
    data: result,
  });
});

const deleteCareer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CareerServices.deleteCareerFromDB(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Career deleted successfully',
    data: result,
  });
});

export const CareerController = {
  createCareer,
  getAllCareers,
  getSingleCareer,
  updateCareer,
  deleteCareer,
};
