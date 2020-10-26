import mongoose from "mongoose";

// TODO: Working More On The Schema 
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

export default mongoose.model("User", userSchema);
