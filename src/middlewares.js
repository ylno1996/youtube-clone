
export const localsMiddlewares = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Cloning";
    res.locals.loggedInUser = req.session.user;
    next();
};

export const protector = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    }   else {
        return res.redirect("/login");
    }
};

export const publicOnly = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    }   else {
        return res.redirect("/");
    }
};