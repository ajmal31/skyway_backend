import mongoose,{Schema,Document} from "mongoose"

interface wallet extends Document{
    amount:number
}

const walletModel: Schema<wallet>=new Schema({

    amount:Number
})

export const wallet =mongoose.model("wallet",walletModel)

