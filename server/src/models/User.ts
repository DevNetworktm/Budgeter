import { model, Schema } from "mongoose";

interface IUser {
    username: string;
    password: string;
    account: string;
}

const user = new Schema<IUser>({
    username: String,
    password: String,
    account: String
})

export default model<IUser>("User", user)