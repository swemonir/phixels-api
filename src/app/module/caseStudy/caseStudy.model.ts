import { Schema, model } from "mongoose";
import { TCaseStudy } from "./caseStudy.interface";

const caseStudySchema = new Schema<TCaseStudy>(
  {
    title: { type: String, required: true },
    client: { type: String, required: true },
    category: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    result: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const CaseStudyModel = model<TCaseStudy>("CaseStudy", caseStudySchema);
