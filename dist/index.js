"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAuth = void 0;
var global_1 = require("./global");
var Auth_1 = require("./routes/Auth");
var User_1 = require("./models/User");
// TODO: Working More On The Typescript Types
function handleAuth(express, mongoose, app, route, db_connection, secret) {
    console.log("Starting Auth Layer");
    db_connection();
    var User = User_1.initUser(mongoose);
    console.log("DB Auth Layer Connected");
    var auth = Auth_1.Auth(express, User);
    app.use(route, auth);
    global_1.setSecret(secret);
}
exports.handleAuth = handleAuth;
