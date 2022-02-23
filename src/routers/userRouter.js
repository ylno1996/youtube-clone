import express from "express";
import { getEdit,postEdit, logOut, see, githubStart, githubDone, getPassword, postPassword} from "../controllers/userContoller";
import { protector, publicOnly } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protector,logOut);
userRouter.route("/edit").all(protector).get(getEdit).post(postEdit);
userRouter.route("/change-password").all(protector).get(getPassword).post(postPassword)
userRouter.get("/github/start",publicOnly, githubStart)
userRouter.get("/github/done",publicOnly, githubDone)


userRouter.get("/:id(\\d+)", see);

export default userRouter;