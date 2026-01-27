import { model, Schema } from "mongoose";
import { TPortfolio } from "./portfolio.interface";

const portfolioSchema = new Schema<TPortfolio>(
  {
    title: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    technology: {
      type: [String],
      required: true,
    },
    activeUsers: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    liveLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PortfolioModel = model<TPortfolio>("Portfolio", portfolioSchema);
