import mongoose, { Schema, Document } from 'mongoose'

interface admin extends Document {
    email: string,
    password: string

}

const adminModel: Schema<admin> = new Schema({

    email: String,
    password: String

})

const admin = mongoose.model<admin>('admin-cred', adminModel)

export default admin
