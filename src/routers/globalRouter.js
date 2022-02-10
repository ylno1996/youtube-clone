import express from "express";
import { join , logIn} from "../controllers/userContoller";
import { homeVideos , search} from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", homeVideos);
globalRouter.get("/join", join);
globalRouter.get("/login", logIn);
globalRouter.get("/search", search);

export default globalRouter;