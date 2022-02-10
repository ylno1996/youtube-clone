import express from "express";
import { edit, deleteU , logOut, see} from "../controllers/userContoller";

const userRouter = express.Router();

userRouter.get("/logout", logOut);
userRouter.get("/edit", edit);
userRouter.get("/remove", deleteU);
userRouter.get("/:id", see);

export default userRouter;