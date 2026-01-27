import { TCaseStudy } from "./caseStudy.interface";
import { CaseStudyModel } from "./caseStudy.model";

const createCaseStudyIntoDB = async (payload: TCaseStudy) => {
  const result = await CaseStudyModel.create(payload);
  return result;
};

const getAllCaseStudiesFromDB = async () => {
  const result = await CaseStudyModel.find();
  return result;
};

const getSingleCaseStudyFromDB = async (id: string) => {
  const result = await CaseStudyModel.findById(id);
  return result;
};

const updateCaseStudyInDB = async (id: string, payload: Partial<TCaseStudy>) => {
  const result = await CaseStudyModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteCaseStudyFromDB = async (id: string) => {
  const result = await CaseStudyModel.findByIdAndDelete(id);
  return result;
};

export const CaseStudyServices = {
  createCaseStudyIntoDB,
  getAllCaseStudiesFromDB,
  getSingleCaseStudyFromDB,
  updateCaseStudyInDB,
  deleteCaseStudyFromDB,
};
