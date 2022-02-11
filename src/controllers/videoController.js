const fakeUser = {
    username: "현우",
    loggedIn: false,
};

const videos = [
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
export const watch = (req, res) => res.render("watch");
export const edit = (req, res) => res.send(`EDIT The Video #${req.params.id}`);
export const search = (req, res) => res.send("Search Video");
export const deleteV = (req, res) => res.send(`Delete Video #${req.params.id}`);
export const upload = (req, res) => res.send("Upload Video");

