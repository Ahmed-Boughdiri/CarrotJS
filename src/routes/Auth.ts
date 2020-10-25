import express,{ Request,Response } from "express";
import validateData from "../util/ValidateData";

const route = express.Router();

route.get("/register", validateData,(req:Request,res:Response) =>{
    const {
        username,
        email,
        password
    } = req.body.user;
        
})

export default route;
