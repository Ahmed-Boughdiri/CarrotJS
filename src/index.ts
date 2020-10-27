import { setSecret } from "./global";
import { Auth } from "./routes/Auth";
import { initUser } from "./models/User";

// TODO: Working More On The Typescript Types
export function handleAuth(express:any,mongoose:any,app:any,route:String,db_connection:any,secret:String):void {
    console.log("Starting Auth Layer")
    db_connection();
    const User = initUser(mongoose)
    console.log("DB Auth Layer Connected")
    const auth = Auth(express,User);
    app.use(route,auth);
    setSecret(secret);
}

