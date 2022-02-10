export const homeVideos = (req, res) => res.render("base");
export const watch = (req, res) => res.send(`Watch #${req.params.id}`)
export const edit = (req, res) => res.send(`EDIT The Video #${req.params.id}`);
export const search = (req, res) => res.send("Search Video");
export const deleteV = (req, res) => res.send(`Delete Video #${req.params.id}`);
export const upload = (req, res) => res.send("Upload Video");

