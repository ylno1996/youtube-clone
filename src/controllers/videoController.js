import res from "express/lib/response";
import Video from "../models/Video";
/*
Video.find({}, (error,videos) => {
    console.log(error, videos)
})
*/
const pageNotFound = "영상을 찾을 수 없습니다."

export const homeVideos = async(req, res) => {

    const videos = await Video.find({}).sort({createdAt:"desc"});
    console.log(videos)
    res.render("home", {pageTitle: "집!", videos})
};


export const watch = async (req, res) => {
    const id = req.params.id;
    const video = await Video.findById(id);
    console.log(video);
    if (video) {
    return res.render("watch", {pageTitle: `${video.title} 보는 중`, video});
    }   
    return res.render("404", {pageTitle: pageNotFound})
};


export const getEdit = async (req, res) => {
    const id = req.params.id;
    const video = await Video.findById(id);
    if (video) {
    return res.render("edit", {pageTitle: `${video.title} 편집`, video})
    }
    return  res.render("404", {pageTitle: pageNotFound})
};


export const postEdit = async (req, res) => {
    const id = req.params.id;
    const {title, description, hashtags} = req.body;
    const exist = await Video.exists({_id: id});
    if (exist) {
        await Video.findByIdAndUpdate(id, {title, description, hashtags: Video.formatHashtags(hashtags),});
      return  res.redirect(`/videos/${id}`);
    }
   return res.render("404", {pageTitle: pageNotFound})
};




export const getUpload = (req, res) => {
res.render("upload", {pageTitle: "비디오 업로드"})
};


export const postUpload = async (req, res) => {
    const {title, description, hashtags} = req.body;
    try{
    await Video.create({
        title,
        description,

        hashtags: Video.formatHashtags(hashtags),
        meta : {
            views: 0 ,
            rating: 0,
        },
    })
    return res.redirect("/");
    }   catch (err) {
        console.log(err)
        return res.render("upload", {pageTitle: "비디오 업로드", errM: err._message,})
    }
};



export const deleteV = async (req, res) => {
    const id = req.params.id;
    await Video.findByIdAndDelete(id);
    return res.redirect("/")
};


    

export const search = (req, res) => {
    const keyword = req.query.keyword;
    console.log(keyword);
    return res.render("search", {pageTitle:"검색"})
};
