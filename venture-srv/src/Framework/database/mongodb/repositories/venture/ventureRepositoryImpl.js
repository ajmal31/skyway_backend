//import schemas here
import connectedUserModel from "../../models/venture-models/connected_users.js"
import ventureModel from "../../models/venture-models/ventures.js"
import mongoose from 'mongoose'
const ventureRepositoryImplements = () => {

   //checking while registering new Venture  already is exist or not
  const ventureIdExist = async (vid) => {

    const response = await connectedUserModel.exists({ ventureId: vid })

    return response

  }
  const userExists = async (uid, vid) => {
   
    
    const response = await connectedUserModel.findOne({ventureId:vid,users:{$elemMatch:{userId:uid}}})
   
    return response
  }
  //add new User to particular venture document
  const addUser = async (uid, vid) => {
     
    const response = await connectedUserModel.updateOne({ ventureId: vid }, {$push:{users:{userId:uid,status:'pending'}}})
    return response

  }
  //creating new document with ventureId and user-cred
  const addVentureWithUser = async (uid, vid) => {

    const venture = new connectedUserModel({
      ventureId: vid,
      users:[
        {
          userId:uid,
          status:'pending'
        }
      ]
    })
    const response = await venture.save()
    return response

  }
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
      min_max_service_amount,
      official_portfolio,
      website_link,
      register_number,
      license_number,
      social_media,
      insurance_img,
      license_img,
      password_one,
      confirm_password_one,
      password_two,
      confirm_password_two
    } = data

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
      min_max_service_amount: min_max_service_amount(),
      official_portfolio: official_portfolio(),
      website_link: website_link(),
      register_number: register_number(),
      license_number: license_number(),
      social_media: social_media(),
      insurance_img: insurance_img(),
      license_img: license_img(),
      password_one: password_one(),
      confirm_password_one: confirm_password_one(),
      password_two: password_two(),
      confirm_password_two: confirm_password_two()
    })

    const response = await venture.save()
    return response


  }
  const ventureExist = async (obj) => {


    const { key, value } = obj
    const query = { [key]: value }
    const response = await ventureModel.findOne(query)
    return response


  }
  const getAllVentures = async () => {

    const response = await ventureModel.find()
    return response



  }




  return {
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