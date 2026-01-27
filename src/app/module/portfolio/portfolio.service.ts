import { TPortfolio } from "./portfolio.interface";
import { PortfolioModel } from "./portfolio.model";

const createPortfolioIntoDB = async (payload: TPortfolio) => {
  const result = await PortfolioModel.create(payload);
  return result;
};

const getAllPortfoliosFromDB = async () => {
  const result = await PortfolioModel.find();
  return result;
};

const getSinglePortfolioFromDB = async (id: string) => {
  const result = await PortfolioModel.findById(id);
  return result;
};

const updatePortfolioInDB = async (id: string, payload: Partial<TPortfolio>) => {
  const result = await PortfolioModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deletePortfolioFromDB = async (id: string) => {
  const result = await PortfolioModel.findByIdAndDelete(id);
  return result;
};

export const PortfolioServices = {
  createPortfolioIntoDB,
  getAllPortfoliosFromDB,
  getSinglePortfolioFromDB,
  updatePortfolioInDB,
  deletePortfolioFromDB,
};
