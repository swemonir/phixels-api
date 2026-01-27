import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CaseStudyServices } from "./caseStudy.service";

const createCaseStudy = catchAsync(async (req: Request, res: Response) => {
  const result = await CaseStudyServices.createCaseStudyIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Case Study created successfully",
    data: result,
  });
});

const getAllCaseStudies = catchAsync(async (req: Request, res: Response) => {
  const result = await CaseStudyServices.getAllCaseStudiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Case Studies retrieved successfully",
    data: result,
  });
});

const getSingleCaseStudy = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await CaseStudyServices.getSingleCaseStudyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Case Study retrieved successfully",
    data: result,
  });
});

const updateCaseStudy = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await CaseStudyServices.updateCaseStudyInDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Case Study updated successfully",
    data: result,
  });
});

const deleteCaseStudy = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await CaseStudyServices.deleteCaseStudyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Case Study deleted successfully",
    data: result,
  });
});

export const CaseStudyController = {
  createCaseStudy,
  getAllCaseStudies,
  getSingleCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
};
