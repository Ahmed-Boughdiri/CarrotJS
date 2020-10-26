import jwt from "jsonwebtoken";

// TODO: Working More On The Typescript Types
export default async function(username:String,email:String,id:String):Promise<any> {
    // TODO: Making More Secure Secret Key For JWT
    const token = await jwt.sign({
        username,
        email,
        id
    },process.env.SECRET || "")
    return token;
}
