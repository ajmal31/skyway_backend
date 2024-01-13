//import schemas here
import connectedUserModel from "../../models/venture-models/connected_users.js"
import ventureModel from "../../models/venture-models/ventures.js"
import { contriesSchema } from "../../models/venture-models/contries.js"
const ventureRepositoryImplements = () => {


  const ventureIdExist = async (vid) => {

    const response = await connectedUserModel.exists({ ventureId: vid })

    return response

  }
  const userExists = async (uid, vid) => {


    const response = await connectedUserModel.findOne({ ventureId: vid, users: { $elemMatch: { _id: uid } } })

    return response
  }
  //add new User to particular venture document
  const addUser = async (userdata, vid) => {

    const response = await connectedUserModel.updateOne({ ventureId: vid }, { $push: { users: { userdata } } })
    return response

  }
  //creating new document with ventureId and user-credentials
  const addVentureWithUser = async (userdata, vid) => {

    const venture = new connectedUserModel({
      ventureId: vid,
      users: [
        userdata,

      ]
    })
    const response = await venture.save()
    return response

  }
  //venture Register
  const register = async (data) => {

    const { firstName,
      lastName,
      ventureName,
      phone_one,
      phone_two,
      official_email,
      venture_category,
      description,
      expertise_contries,
      industry_experience,
      min_max_service_amount,
      official_portfolio,
      website_link,
      register_number,
      license_number,
      social_media,
      insurance_file_link,
      license_file_link,
      password_one,
      confirm_password_one,
      password_two,
      confirm_password_two
    } = data

    console.log(firstName(),
      lastName(),
      ventureName(),
      phone_one(),
      phone_two(),
      official_email(),
      official_email(),
      venture_category(),
      expertise_contries(),
      min_max_service_amount(),
      industry_experience(),
      official_portfolio(),
      website_link(),
      register_number(),
      license_number(),
      social_media(),
      insurance_file_link(),
      license_file_link(),
      password_one(),
      confirm_password_one(),
      password_two(),
      confirm_password_two(),
    )

    const venture = new ventureModel({

      firstName: firstName(),
      lastName: lastName(),
      ventureName: ventureName(),
      phone_one: phone_one(),
      phone_two: phone_two(),
      official_email: official_email(),
      venture_category: venture_category(),
      description: description(),
      expertise_contries: expertise_contries(),
      industry_experience:industry_experience(),
      min_max_service_amount: min_max_service_amount(),
      official_portfolio: official_portfolio(),
      website_link: website_link(),
      register_number: register_number(),
      license_number: license_number(),
      social_media: social_media(),
      insurance_file_link: insurance_file_link(),
      license_file_link: license_file_link(),
      password_one: password_one(),
      confirm_password_one: confirm_password_one(),
      password_two: password_two(),
      confirm_password_two: confirm_password_two(),
      genuine: 'pending',
      admin_allowed: 'pending'
    })

    const response = await venture.save()
    return response


  }
  //find or checking 
  const ventureExist = async (obj) => {

    const { key, value } = obj
    const query = { [key]: value }
    const response = await ventureModel.findOne(query)

    return response


  }
  //get All Ventures
  const getAllVentures = async (type) => {
    let query
    if (type === 'allowed') query = { admin_allowed: type }
    else if (type === 'all') query = {}

    const response = await ventureModel.find(query)
    return response



  }
  const updateVentureStatus = async (id, status) => {

    const response = await ventureModel.findOneAndUpdate({ _id: id }, { $set: { admin_allowed: status } }, { new: true });
    return response
  }
  //Taking Some Users From Who Connected a Particular Venture
  const getAllUsers = async (vid) => {

    const response = await connectedUserModel.findOne({ ventureId: vid })
    return response
  }
  const updateConnectUser = async (data) => {

    const response = await connectedUserModel
      .updateMany({ users: { $elemMatch: { userId: data._id } } },
        { $set: { "users.$": data } })

    console.log('response after update connected users', response)
    return response

  }
  const totalVentures = async (data) => {

    const response = await ventureModel.countDocuments()
    return response
  }
  const ventureCountByStatus = async (status) => {

    const response = await ventureModel.find({ admin_allowed: status }).count()
    console.log(status, "ventures", response)
    return response
  }
  const getVenturesByCountry=async(type,country)=>{

    const response=await ventureModel.find({admin_allowed:type, expertise_contries:{$in:[country]}}) 
    return response

  }
  const updateContries=async(countries)=>{

    const response=await contriesSchema.updateOne({},{$addToSet:{countries:{$each:countries}}})
    return response
  }
  const findCountries=async()=>{

    const response=await contriesSchema.findOne({})
    return response
  }
  const insertContries=async(countries)=>{

    const response=await contriesSchema.create({countries:countries})
    return response
  }

  


  return {
    insertContries,
    findCountries,
    updateContries,
    getVenturesByCountry,
    ventureCountByStatus,
    totalVentures,
    updateConnectUser,
    getAllUsers,
    updateVentureStatus,
    getAllVentures,
    ventureExist,
    register,
    addVentureWithUser,
    addUser,
    userExists,
    ventureIdExist

  }
}

export default ventureRepositoryImplements