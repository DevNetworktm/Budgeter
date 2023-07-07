import { Router } from "express";
import { AuthSignInController, AuthSignUpController } from "../controllers/auth";

const authRoute = Router();

authRoute.post("/signup", AuthSignUpController);
authRoute.post("/signin", AuthSignInController);

export default authRoute;