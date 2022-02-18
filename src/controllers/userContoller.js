import User from "../models/User";

import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", {pageTitle: "회원가입"}) ;
export const postJoin = async (req, res) => {
    const {name, username, email, password, password2, loaction} = req.body;
    const exits = await User.exists({$or: [{username}, {email}]});
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle: "회원가입",
            errorMsg: "비밀번호가 일치하지 않습니다. 다시 확인해주세요."
        })
    }
    if (exits){
        return res.status(400).render("join", {
            pageTitle: "회원가입",
            errorMsg: "입력하신 닉네임 또는 이메일이 이미 사용중입니다."
        })
    }
    try {
        await User.create({
            name, username, email, password, loaction,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.redirect("join", {
            pageTitle: "잘못된 요청입니다.",
            errorMsg: error._message,
        });
    }
};

export const getLogIn = (req, res) => res.render("login", {pageTitle: "로그인"});

export const postLogIn = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) {
        return res.status(400).render("login", {pageTitle: "로그인", errorMsg:"해당 아이디가 존재하지 않습니다." })
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", {
            pageTitle: "로그인", errorMsg: "잘못된 비밀번호",        })
    }
   req.session.loggedIn = true;
   req.session.user = user;
   return res.redirect("/");
};

export const githubStart = (req,res) => {
    const base ="https://github.com/login/oauth/authorize"
    const config ={ 
        client_id : process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString()
    const url = `${base}?${params}`;
    return res.redirect(url);
};

export const githubDone = (req,res) => {
    return res.redirect("/");
};

export const edit = (req, res) => res.send("EDIT");
export const deleteU = (req, res) => res.send("DELETE USER");
export const logOut = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");