import { Router } from "express";
import { PortfolioController } from "./portfolio.controller";
import validateRequest from "../../middleware/validateRequest";
import { PortfolioValidation } from "./portfolio.validation";

const router = Router();

router.post(
  "/",
  validateRequest(PortfolioValidation.createPortfolioValidationSchema),
  PortfolioController.createPortfolio
);

router.get("/", PortfolioController.getAllPortfolios);

router.get("/:id", PortfolioController.getSinglePortfolio);

router.patch(
  "/:id",
  validateRequest(PortfolioValidation.updatePortfolioValidationSchema),
  PortfolioController.updatePortfolio
);

router.delete("/:id", PortfolioController.deletePortfolio);

export const PortfolioRouter = router;
