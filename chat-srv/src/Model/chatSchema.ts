import mongoose from 'mongoose'
const { Schema } = mongoose

const chatModel = new Schema({

    participants: [
        {
            userId:{type:String,required:true },
            userUnReadMessages:{type:Number , required:true, default:0},
            ventureId:{type:String,required:true },
            ventureUnReadMessages:{type:Number , required:true, default:0}

        }
       

    ],
    message: [
        {
            type: Schema.Types.ObjectId,
            ref: "messages"
        }
    ],
    lastMessage: { type: Schema.Types.ObjectId, ref: "messages" }

}, {
    timestamps: true
})

export const chatSchema = mongoose.model('chats', chatModel)
