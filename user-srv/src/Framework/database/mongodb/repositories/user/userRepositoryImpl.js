//import schemas here
import { userModel } from "../../models/user-models/userSchema.js"
import { connectedVenturesSchema } from "../../models/user-models/connectedVenturesSchema.js"
const userRepositoryImplements = () => {

    //Find a Partiulcar user
    const findUser = async ({key,val,neVal=null}) => {
        console.log('cred',key,val,neVal)
        
        const query_one = { 
            [key]: val 
           
        }
        const query_two = { 
            [key]: val ,
            ["_id"]:{$ne:neVal}
        }
        try {
            const response = await userModel.findOne(!neVal?query_one:query_two)
            console.log('response in hlper',response)
            return response

        } catch (err) {
            console.log('error founded while taking user details in', err)
        }



    }
    const register = async (userdata) => {

        const user = new userModel({
            username: userdata?.getUsername(),
            email: userdata?.getEmail(),
            region: userdata?.getRegion(),
            phone: userdata?.getPhone(),
            destination: userdata?.getDestination(),
            date_of_birth: userdata?.getDate_of_birth(),
            password: userdata?.getPassword(),
            confirm_password: userdata?.getConfirm_password(),


        })

        try {
            let response = await user.save()
            return response

        } catch (err) {

            console.log('error occured while inserting userdata')
            console.log(err)

        }

    }
    const remove = async (userId) => {

        const response = await userModel.updateOne({ _id: userId }, { $set: { soft_delete: true } })
        return response

    }

    const update = async (userdata, uid) => {

        const obj = {
            username: userdata?.getUsername(),
            email: userdata?.getEmail(),
            region: userdata?.getRegion(),
            phone: userdata?.getPhone(),
            destination: userdata?.getDestination(),
            date_of_birth: userdata?.getDate_of_birth()

        }
        const { username, email, region, phone, destination } = obj

        const response = await userModel.findOneAndUpdate({ _id: uid },
            { $set: { username: username, email: email, region: region, phone: phone, destination: destination } },
            { returnOriginal: false })
        return response




    }
    //findVentureId contain user doc
    const ventureExist = async (uid, vid) => {

        const response = await userModel.findOne({ _id: uid, ventures: { $elemMatch: { ventureId: vid } } })
        return response
    }
    //ventureId add To use doc
    const addVentureToUser = async (uid, vid) => {

        const response = await userModel.updateOne({ _id: uid }, { $push: { ventures: { ventureId: vid, status: 'pending' } } })
        return response
    }
    //getAllUsers
    const getAllUsers = async () => {

        const response = await userModel.find()
        return response
    }
    //get All connected users Based on a Particular venture
    const getAllConnectedUsers = async (vid) => {


        const response = await userModel.find({ ventures: { $elemMatch: { ventureId: vid } } })
        return response
    }
    //change user Status
    const changeUserStatus = async (status, uid, vid) => {

        const response = await userModel.findOneAndUpdate({ _id: uid, 'ventures.ventureId': vid }, { $set: { 'ventures.$.status': status } }, { new: true })
        return response


    }
    //check the venture Already exist or not
    const findConnectedVenture = async (vid) => {

        const response = await connectedVenturesSchema.findOne({ "data._id": vid })
        return response
    }
    //insert venture to connected ventures collection
    const createConnectedVentures = async (data) => {

        const response = await new connectedVenturesSchema({
            data

        }).save()
        return response
    }
    //taking one connected venture
    const getConnectedVenture = async (receiverId, senderId) => {

        const response = connectedVenturesSchema.findOne({ $or: [{ 'data._id': receiverId }, { 'data._id': senderId }] })
        return response
    }
    //taking set of ids matched Ventures
    const getAllConnectedVentures = async (ids) => {

        const response = await connectedVenturesSchema.find({ "data._id": { $in: ids } })
        console.log('db response while taking getAll connected ventures', response)
        return response
    }
    //get all allowed users based on the ventureId
    const getAllGenuineUsers = async (vid) => {

        const response = await userModel.find({ ventures: { $elemMatch: { ventureId: vid, status: 'allowed' } } })
        return response
    }
    //update user document on field
    const updateUserField = async (obj) => {

        const { findKey, findVal, key, val } = obj
        console.log(obj)
        const find = { [findKey]: findVal }
        const update = { [key]: val }
        const response = await userModel.findOneAndUpdate(find, { $set: update }, { upsert: true, new: true, returnOriginal: false });
        return response
    }
    const otpFailed=async(uid)=>{
      
        const response=await userModel.findOneAndUpdate({_id:uid},{$set:{last_otp:new Date()}},{new:true})
        return response
    }
    const documentUploading=async(documents,uid)=>{

   
        let response=await userModel.findOneAndUpdate({_id:uid},{$addToSet:{documents:documents}},{new:true})
        console.log('response in implements',response)
        return response
    }
    
    return {
        documentUploading,
        otpFailed,
        updateUserField,
        getAllGenuineUsers,
        getAllConnectedVentures,
        getConnectedVenture,
        getAllConnectedUsers,
        createConnectedVentures,
        findConnectedVenture,
        changeUserStatus,
        getAllConnectedUsers,
        getAllUsers,
        addVentureToUser,
        ventureExist,
        update,
        remove,
        register,
        findUser
    }

}

export default userRepositoryImplements