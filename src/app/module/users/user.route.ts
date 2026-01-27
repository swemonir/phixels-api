import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get('/', UserController.getUsers);

export const UserRouter = router;
