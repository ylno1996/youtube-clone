import express from "express";
import { edit, deleteU , logOut, see} from "../controllers/userContoller";

const userRouter = express.Router();

userRouter.get("/logout", logOut);
userRouter.get("/edit", edit);
userRouter.get("/delete", deleteU);
userRouter.get("/:id(\\d+)", see);

export default userRouter;