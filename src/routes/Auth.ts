import express,{ Request,Response } from "express";
import validateData from "../util/ValidateData";
import User from "../models/User";
import emailExists from "../util/EmailExists";
import passwordHashing from "../util/PasswordHashing";
import genToken from "../util/GenToken";

const route = express.Router();

// TODO: Working More On The Typescript Types
route.post("/register", validateData, async(req:Request,res:Response) =>{
    const {
        username,
        email,
    } = req.body.user;
    let { password } = req.body.user;
    const checkEmailExists = await emailExists(email);
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

export default route;
