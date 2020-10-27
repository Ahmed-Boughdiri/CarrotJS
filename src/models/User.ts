
export function initUser(mongoose:any) {
    // TODO: Working More On The Schema 
    console.log("initUser Started")
    const userSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String
    });
    return mongoose.model("User", userSchema);
}
