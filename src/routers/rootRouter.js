import express from "express";
import { getLogIn,postLogIn,getJoin ,  postJoin} from "../controllers/userContoller";
import { home , search} from "../controllers/videoController";
import { publicOnly } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnly).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnly).get(getLogIn).post(postLogIn);
rootRouter.get("/search", search);

export default rootRouter;