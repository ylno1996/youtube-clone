import Video from "../models/Video";

export const homeVideos = (req, res) => {
Video.find({}, (error,videos) => {
    console.log(error, videos)
})
    res.render("home", {pageTitle: "집!"})
};


export const watch = (req, res) => {
    const id = req.params.id;
    const video = videos[id-1];
    res.render("watch", {pageTitle: `${video.title} 보는 중`, fakeUser, video})};
export const getEdit = (req, res) => {
    const video = videos[(req.params.id)-1];
    res.render("edit", {pageTitle: `${video.title}  수정 중`,fakeUser, video})};
export const search = (req, res) => res.send("Search Video");
export const deleteV = (req, res) => res.send(`Delete Video #${req.params.id}`);
export const upload = (req, res) => res.send("Upload Video");

export const postEdit = (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    videos[id-1].title = title;
    res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
res.render("upload", {pageTitle: "비디오 업로드",fakeUser})
};

export const postUpload = (req, res) => {
    const title = req.body.title;
res.redirect("/");
};