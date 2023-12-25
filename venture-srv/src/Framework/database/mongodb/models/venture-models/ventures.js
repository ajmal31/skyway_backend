import mongoose from "mongoose"
const { Schema } = mongoose

const passwordValidation={type: String, required: true, unique: true, validate: (value) => value?.length > 6}
//define mongoose schema for "Ventures" collection
const ventureSchema = new Schema({

    //Basic information
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    //Venture Details
    ventureName: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => value.length > 1
    },
    phone_one: {
        type: String,
        required: true,
        validate: (value) => value.length === 10
    },
    phone_two: {
        type:String ,required:true,validate:(value)=>value.length===10
    },
    official_email:{
        type: String,
        required: true,
        unique: true,
        validate: (value) => value.length < 30
    },
    venture_category: { type: String, required: true },
    description: { type: String, required: true, validate: (value) => value.length >= 50 },
    expertise_contries: { type: String, required: true },
    min_max_service_amount: { type: String },
    official_portfolio: { type: String, required: true},
    website_link: { type: String, required: true},
    register_number: { type: Number, required: true, unique: true },
    license_number: { type: Number, required: true, unique: true },
    social_media: { type: String, required: true },
    insurance_file_link: { type: String, required: true },
    license_file_link: { type: String, required: true },

    //password Section
    password_one: { type: String, required: true,  validate: (value) => value?.length > 6 },
    confirm_password_one: { type: String, required: true, validate: (value) => value?.length > 6},
    password_two: {  type: String, required: true,  validate: (value) => value?.length > 6 },
    confirm_password_two: { type: String, required: true, validate: (value) => value?.length > 6 },
    genuine:{type:String,requied:true},
    admin_allowed:{type:String,reqired:true}



})

const ventureModel = mongoose.model('ventures', ventureSchema)
export default ventureModel