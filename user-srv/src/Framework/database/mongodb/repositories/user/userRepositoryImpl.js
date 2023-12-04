//import schemas here
import { userModel } from "../../models/user-models/userSchema.js"
const userRepositoryImplements = () => {


    const findUser = async (obj) => {
        console.log(obj)
        const { key, val } = obj
        const query = { [key]: val }
        try {
            const response = await userModel.findOne(query)
            console.log(response, 'in imp')
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
            date_of_birth:userdata?.getDate_of_birth()

        }
        const { username, email, region, phone, destination } = obj

        const response = await userModel.findOneAndUpdate({ _id: uid },
            { $set: { username: username, email: email, region: region, phone: phone, destination: destination} },
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
    const getAllUsers=async()=>{

        const response=await userModel.find()
        return response
    }
    //get All connected users Based on a Particular venture
    const getAllConnectedUsers=async(vid)=>{


        const response=await userModel.find({ventures:{$elemMatch:{ventureId:vid}}})
        return response
    }
    return {
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