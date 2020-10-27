import { Request,Response } from "express";
import validateData from "../util/ValidateData";
// import User from "../models/User";
import emailExists from "../util/EmailExists";
import passwordHashing from "../util/PasswordHashing";
import genToken from "../util/GenToken";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { SECRET } from "../global";
import { initUser } from "../models/User";

export function Auth(express:any,User:any) {
    console.log("Auth Function Started")
    const route = express.Router();
    // TODO: Working More On The Typescript Types
    route.post("/register", validateData, async(req:Request,res:Response) =>{
        console.log("Register Started")
        const {
            username,
            email,
        } = req.body.user;
        let { password } = req.body.user;
        const checkEmailExists = await emailExists(email,User);
        if(checkEmailExists.exists) {
            return res.status(400).send({ error: checkEmailExists.error })
        }
        password = await passwordHashing(password);
        const newUser:any = new User({
            username,
            email,
            password
        })
        try {
            await newUser.save();
            const token = await genToken(username,email,newUser._id)
            console.log("Almost Finished")
            return res.status(201).send({
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                id: newUser._id,
                token
            });
        } catch(err) {
            return res.status(400).send({ error: err });
        }
    })


    // TODO: Working More On The Typescript Types
    route.get("/token/login", (req:Request,res:Response) =>{
        const { token } = req.body;
        if(!token) return res.status(400).send({ error: "No Token Provided" });
        const validToken:any = jwt.verify(token,SECRET as string);
        if(!validToken) return res.status(400).send({ error: "Invalid Token" })
        return res.status(200).send({
            username: validToken.username,
            email: validToken.email,
            id: validToken.id,
            token
        })
    })

    // TODO: Giving More Try Catch Blocks
    route.get("/login", validateData, async(req:Request,res:Response) =>{
        const {
            username,
            email,
            password
        } = req.body.user;
        const user:any = await User.findOne({ email, username });
        if(!user) return res.status(400).send({ error: "User Do Not Exists" });
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword) return res.status(400).send({ error: "Wrong Password" });
        const token = await genToken(username,email,user._id);
        return res.status(200).send({
            username,
            email,
            id: user._id,
            token
        })
    })
    return route;
}

