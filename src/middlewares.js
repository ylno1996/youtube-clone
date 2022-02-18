
export const localsMiddlewares = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Cloning";
    res.locals.loggedInUser = req.session.user;
    next();
};