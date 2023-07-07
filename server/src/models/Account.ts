import { model, Schema } from "mongoose";

interface IAccount {
    cashIn: [ string ];
    cashOut: [ string ];
}

const account = new Schema<IAccount>({
    cashIn: [],
    cashOut: []
})

export default model<IAccount>("Account", account)