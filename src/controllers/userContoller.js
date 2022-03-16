import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { editProfileText , existingName, existingEmail, signUpText} from "../misc";

export const getJoin = (req, res) => res.render("user/join", {pageTitle: signUpText}) ;
export const postJoin = async (req, res) => {
    const foundedUsername = await User.findOne({username});
    const foundedEmail = await User.findOne({email});
    const {name, username, email, password, password2, location} = req.body;
    if (password !== password2) {
        return res.status(400).render("user/join", {
            pageTitle: signUpText,
            errorMsg: "비밀번호가 일치하지 않습니다. 다시 확인해주세요."
        })
    }
    if (foundedUsername){
        return res.status(400).render("user/join", {
            pageTitle: signUpText,
            errorMsg: existingName
        })
    }
    if (foundedEmail){
        return res.status(400).render("user/join", {
            pageTitle: signUpText,
            errorMsg: existingEmail
        })
    }
    try {
        await User.create({
            name, username, email, password, location,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("user/join", {
            pageTitle: "잘못된 요청입니다.",
            errorMsg: error._message,
        });
    }
};

export const getLogIn = (req, res) => res.render("user/login", {pageTitle: "로그인"});

export const postLogIn = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) {
        return res.status(400).render("user/login", {pageTitle: "로그인", errorMsg:"해당 아이디가 존재하지 않습니다." })
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("user/login", {
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
    const params = new URLSearchParams(config).toString();
    const url = `${base}?${params}`;
    return res.redirect(url);
};

export const githubDone = async (req,res) => {
    const base ="https://github.com/login/oauth/access_token";
    const api = "https://api.github.com";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();

    const url = `${base}?${params}`;

    const data = await ( await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
      })
    ).json();

      if ("access_token" in data) {
        const {access_token} = data;
        const userRequest = await ( await fetch(`${api}/user`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })
        ).json();

        console.log(userRequest)

        const emailRequest = await ( await fetch(`${api}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })
        ).json();

        console.log(emailRequest)
        const emailObj = emailRequest.find(
            (email) => email.primary === true && email.verified === true
        );
        if (!emailObj) {
            return res.redirect("/")
        }
        let user = await User.findOne({email: emailObj.email});
        if (user) {
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        } else {
            user = await User.create({
                email: emailObj.email,
                username: userRequest.login,
                password: "",
                name: `g-${userRequest.login}`,
                location: userRequest.location,
                socialOnly : true,
                avatarUrl: userRequest.avatar_url,
            });
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        }
    } else {
        return res.redirect("/login");
      };

};

export const logOut = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};


export const getEdit = (req, res) => {
    res.render("user/edit-profile", {pageTitle: editProfileText});
};
export const postEdit = async (req, res) => {
    const {
        session: {
            user: {_id, avatarUrl},
        },
        body: {name,username, email, location},
        file,
    } = req;
    console.log(file);
    if (req.session.user.username !== username || req.session.user.email !== email) {
        const foundedUsername = await User.findOne({username});
        const foundedEmail = await User.findOne({email});
        if (req.session.user.username !== username && req.session.user.email !== email) {
            if (foundedUsername && foundedEmail) {
                return res.render("user/edit-profile", {pageTitle: editProfileText, errorMsg: "닉네임과 이메일 모두 이미 존재합니다."})
            }
            if (foundedUsername && !foundedEmail) {
                return res.render("user/edit-profile", {pageTitle: editProfileText, errorMsg: existingName})
            }
            if (!foundedUsername && foundedEmail) {
                return res.render("user/edit-profile", {pageTitle: editProfileText, errorMsg: existingEmail})
            }
        } else {
            if (req.session.user.username !== username && req.session.user.email == email) {
                if (foundedUsername) {
                    return res.render("user/edit-profile", {pageTitle:editProfileText, errorMsg: existingName})
                }
            }
            if (req.session.user.username == username && req.session.user.email !== email) {
                if (foundedEmail) {
                    return res.render("user/edit-profile", {pageTitle: editProfileText, errorMsg: existingEmail})
                }
            }
        }

    }
    const updateUser = await User.findByIdAndUpdate( _id, {avatarUrl: file ? '/'+file.path: avatarUrl,name, username, email, location}, {new: true});
    req.session.user = updateUser;
    res.redirect("/users/edit")
};

export const getPassword = (req, res) => {
    if (req.session.user.socialOnly === true){
        return res.redirect("/");
    }
    return res.render("user/change-password", {pageTitle: "비밀번호 변경"});
};

export const postPassword = async (req, res) => {
    const {
        session : {
            user: { _id},
        },
        body: {oldPassword, newPassword, newPasswordConfirm},
    } = req; 
    const user = await User.findById(_id);
    const verify = await bcrypt.compare(oldPassword, user.password);
    if (!verify) {
        return res.status(400).render("user/change-password", {pageTitle: "비밀번호 변경", errorMsg: "비밀번호가 틀렸습니다."}
        )};
    if (newPassword !== newPasswordConfirm) {
        return res.status(400).render("user/change-password", {pageTitle: "비밀번호 변경", errorMsg: "새 비밀번호가 서로 일치하지 않습니다."}
        )};
    user.password = newPassword;
    await user.save();
    return res.redirect("/users/logout")
};



export const see = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id).populate("videos");
    if (!user) {
        return res.status(404).render("404", {pageTitle: "유저를 찾지 못했습니다."})
    }
    return res.render("user/profile", {pageTitle: `${user.name}님의 프로필`, user})
};