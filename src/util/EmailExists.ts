import User from "../models/User";

interface EmailResult {
    exists: Boolean;
    error?: String
}

// TODO: Working More On Typescript Types
export default async function(email:String):Promise<EmailResult> {
    let emailExists:any;
    try {
        emailExists = await User.findOne({ email });
    } catch(err) {
        return {
            exists: true,
            error: "An Error Has Occured Please Try Again"
        }
    }
    if(emailExists) {
        return {
            exists: true,
            error: "Email Already Exists"
        }
    }
    return {
        exists: false
    }
}
