const fakeUser = {
    username: "현우",
    loggedIn: false,
};

let videos = [
    {
        title: "1st Video",
        rating: 7,
        comments: 15,
        createdAt: "2011-03-12",
        views: 12321,
        id: 1 
    },
    {
        title: "2nd Video",
        rating: 2,
        comments: 315,
        createdAt: "2021-05-23",
        views: 131,
        id: 2 
    },
    {
        title: "3rd Video",
        rating: 6,
        comments: 1143165,
        createdAt: "2001-01-18",
        views: 12321,
        id: 3 
    },
    {
        title: "4th Video",
        rating: 10,
        comments: 15231,
        createdAt: "2051-03-12",
        views: 12312321,
        id: 4 
    },
];


export const homeVideos = (req, res) => res.render("home", {pageTitle: "집!", fakeUser, videos});
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
    const newVideo = {
        title, 
        rating: 3,
        comments: 5,
        createdAt: "2005-12-01",
        views: 55981,
        id: videos.length +1,
    };
    videos.push(newVideo);
res.redirect("/");
};