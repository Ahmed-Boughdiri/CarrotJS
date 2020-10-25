"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validUserName(username) {
    if (!username) {
        return {
            error: "You Must Provide a Username"
        };
    }
    else if (username.length < 5) {
        return {
            error: "You Username Value Need To Be More Than 5 Characters"
        };
    }
    else {
        return {};
    }
}
function validEmail(email) {
    var emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!email) {
        return {
            error: "You Need Provide An Email"
        };
    }
    else if (!email.match(emailPattern)) {
        return {
            error: "Your Email is Invalid"
        };
    }
    else {
        return {};
    }
}
function validPassword(password) {
    if (!password) {
        return {
            error: "You Need To Provide A Password"
        };
    }
    else if (password.length < 8) {
        return {
            error: "Your Password Value Need To Be At Least 8 Characters"
        };
    }
    else {
        return {};
    }
}
function default_1(req, res, next) {
    var user = req.body.user;
    if (!user)
        return res.status(400).send({ error: "An Error Has Occured" });
    if (validUserName(user.username).error) {
        return res.status(400).send({ error: validUserName(user.username).error });
    }
    else if (validEmail(user.email).error) {
        return res.status(400).send({ error: validEmail(user.email).error });
    }
    else if (validPassword(user.password).error) {
        return res.status(400).send({ error: validPassword(user.password).error });
    }
    return next();
}
exports.default = default_1;
