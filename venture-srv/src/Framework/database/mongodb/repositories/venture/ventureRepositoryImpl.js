//import schemas here
import connectedUserModel from "../../models/venture-models/connected_users.js"
import ventureModel from "../../models/venture-models/ventures.js"
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
    if (type === 'allowed')query = { admin_allowed: type }
    else if(type==='all') query={}
    
    const response = await ventureModel.find(query)
    return response



  }
  const updateVentureStatus = async (id) => {

    const response = await ventureModel.findOneAndUpdate({ _id: id }, { $set: { admin_allowed: 'allowed' } }, { new: true });
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



  return {
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