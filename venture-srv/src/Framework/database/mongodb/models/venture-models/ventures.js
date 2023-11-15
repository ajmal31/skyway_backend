import mongoose from "mongoose"
const { Schema } = mongoose

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
        validate: (value) => value?.length > 1
    },
    phone_one: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => value?.length === 10
    },
    phone_two: {
        validate: ventureSchema.path('phone_one').validations[0]
    },
    official_email: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => value.length < 30
    },
    venture_category: { type: String, required: true },
    description: { type: String, required: true, validate: (value) => value.length >= 50 },
    expertise_countries: { type: String, required: true },
    min_max_service_amount: { type: String, required: true },
    official_portfolio: { type: String, required: true, unique: true },
    website_link: { validate: ventureSchema.path('official_portfolio').validators[0] },
    register_number: { type: Number, required: true, unique: true },
    license_number: { type: Number, required: true, unique: true },
    social_media: { type: String, required: true, unique: true },
    insurance_img: { type: String, required: true, unique: true },
    license_img: { type: String, required: true, unique: true },

    //password Section
    password_one: { type: String, required: true, unique: true, validate: (value) => value?.length > 6 },
    confirm_password_one: { validate: ventureSchema.path('password_one').validations[0] },
    password_two: { validate: ventureSchema.path('password_one').validations[0] },
    confirm_password_two: { validate: ventureSchema.path('password').validations[0] }


})

const ventureModel = mongoose.model('venutures', ventureSchema)
export default ventureModel