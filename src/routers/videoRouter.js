import express from "express";
import { watch, getEdit,postEdit, getUpload,postUpload, deleteV } from "../controllers/videoController";
import { protector } from "../middlewares";

const videoRouter = express.Router();

videoRouter.route("/upload").all(protector).get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protector).get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete",protector, deleteV);

export default videoRouter;