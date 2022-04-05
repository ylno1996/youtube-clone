import Video from "../models/Video";
import User from "../models/User";
import fs from "fs";
/*
Video.find({}, (error,videos) => {
    console.log(error, videos)
})
*/
const pageNotFound = "영상을 찾을 수 없습니다.";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  console.log(videos);
  res.render("home", { pageTitle: "집!", videos });
};

export const watch = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id).populate("owner");
  console.log(video);
  if (video) {
    return res.render("video/watch", {
      pageTitle: `${video.title} 시청중`,
      video,
    });
  }
  return res.status(404).render("404", { pageTitle: pageNotFound });
};

export const getEdit = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: pageNotFound });
  }
  if (String(video.owner) !== String(req.session.user._id)) {
    return res.status(403).redirect("/");
  }
  return res.render("video/edit", { pageTitle: `${video.title} 편집`, video });
};

export const postEdit = async (req, res) => {
  const id = req.params.id;
  const { title, description, hashtags } = req.body;
  const exist = await Video.exists({ _id: id });
  if (exist) {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
  }
  return res.render("404", { pageTitle: pageNotFound });
};

export const getUpload = (req, res) => {
  res.render("video/upload", { pageTitle: "비디오 업로드" });
};

export const postUpload = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { title, description, hashtags },
    file,
  } = req;
  try {
    console.log(_id);
    const newVideo = await Video.create({
      title,
      fileUrl: file.path,
      description,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
      meta: {
        views: 0,
        rating: 0,
      },
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.status(400).render("video/upload", {
      pageTitle: "비디오 업로드",
      errM: err._message,
    });
  }
};

export const deleteV = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id);

  if (!video) {
    return res.status(404).render("404", { pageTitle: pageNotFound });
  }
  if (String(video.owner) !== String(req.session.user._id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  await User.updateOne(
    { _id: video.owner },
    {
      $pull: {
        videos: id,
      },
    }
  );
  fs.unlink(video.fileUrl, (err) => {
    if (err) {
      return console.error(err);
    }
  });
  return res.redirect("/");
};

export const search = async (req, res) => {
  const keyword = req.query.keyword;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}`, "i"),
      },
    });
  }
  return res.render("video/search", { pageTitle: "검색", videos });
};

export const registerView = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(405);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.status(200);
};
