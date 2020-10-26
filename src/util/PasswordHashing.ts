import bcrypt from "bcryptjs";

// TODO: Working More On The Typescript Types
export default async function(password: String):Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password as string,salt);
    return hashedPassword;
}
