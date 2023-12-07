import mongoose from 'mongoose'
const { Schema } = mongoose

const chatersModel = new Schema({}, { strict: false })

export const chatersSchema = mongoose.model('chaters', chatersModel)