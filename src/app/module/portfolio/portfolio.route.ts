import { Router } from "express";
import { PortfolioController } from "./portfolio.controller";
import validateRequest from "../../middleware/validateRequest";
import { PortfolioValidation } from "./portfolio.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../Interface/types";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(PortfolioValidation.createPortfolioValidationSchema),
  PortfolioController.createPortfolio
);

router.get("/", PortfolioController.getAllPortfolios);

router.get("/:id", PortfolioController.getSinglePortfolio);

router.patch(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(PortfolioValidation.updatePortfolioValidationSchema),
  PortfolioController.updatePortfolio
);

router.delete("/:id", auth(USER_ROLE.admin), PortfolioController.deletePortfolio);

export const PortfolioRouter = router;
