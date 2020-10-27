"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUser = void 0;
function initUser(mongoose) {
    // TODO: Working More On The Schema 
    console.log("initUser Started");
    var userSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String
    });
    return mongoose.model("User", userSchema);
}
exports.initUser = initUser;
