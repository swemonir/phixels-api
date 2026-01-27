import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CaseStudyController } from "./caseStudy.controller";
import { CaseStudyValidation } from "./caseStudy.validation";

const router = Router();

router.post(
  "/",
  validateRequest(CaseStudyValidation.createCaseStudyValidationSchema),
  CaseStudyController.createCaseStudy
);

router.get("/", CaseStudyController.getAllCaseStudies);

router.get("/:id", CaseStudyController.getSingleCaseStudy);

router.patch(
  "/:id",
  validateRequest(CaseStudyValidation.updateCaseStudyValidationSchema),
  CaseStudyController.updateCaseStudy
);

router.delete("/:id", CaseStudyController.deleteCaseStudy);

export const CaseStudyRouter = router;
