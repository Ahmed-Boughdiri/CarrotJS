
interface EmailResult {
    exists: Boolean;
    error?: String
}

// TODO: Working More On Typescript Types
export default async function(email:String,User:any):Promise<EmailResult> {
    console.log("Email Exists Started")
    let emailExists:any;
    // try {
        emailExists = await User.findOne({ email });
        console.log("Email Exists Almost Finished")
    // } catch(err) {
    //     return {
    //         exists: true,
    //         error: "An Error Has Occured Please Try Again"
    //     }
    // }
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
