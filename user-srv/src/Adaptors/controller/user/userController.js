//import all usecases  here
import registerUser from "../../../Application/usecase/user/Register.js"
import userLogin from "../../../Application/usecase/user/Login.js"
import softDelete from "../../../Application/usecase/user/softDelete.js"
import findOneUser from "../../../Application/usecase/user/getUser.js"
import googleWithLogin from "../../../Application/usecase/user/googleLogin.js"
import connectUser from "../../../Application/usecase/user/connectUser.js"

const userController = (repositoryInterface, repositoryImplements, serviceInterface, userServiceImplements) => {

    //user repo and implements assign to dbRepository
    const dbRepository = repositoryInterface(repositoryImplements())
    //user service and implements assign service 
    const service = serviceInterface(userServiceImplements())

    //POST METHODS



    //register
    const register = async (req, res) => {

        try {
            const response = await registerUser(dbRepository, service, req.body)

            if (!response.message) res.json({ response }).status(200)
            else {
                console.log('reponse got hear', response)
                res.json({ message: response.message }).status(403)
            }

        } catch (err) {
            console.log('error ocuured while getin reponse realted user register', err)
        }


    }
    //login
    const login = async (req, res) => {


        let { email, password } = req.body

        const response = await userLogin(dbRepository, service, email, password)
        if (response.password && response.userExist) return res.json({ message: 'user Logged in succesful', authToken: response.token ,username:response.username})
        else if (response.userExist && !response.password) return res.json({ message: 'please enter your valid password' })
        else return res.json({ message: 'user does not exist' })

    }

    const googleLogin = async (req, res) => {


     try{

        const { encodedData } = req.body
        const response = await googleWithLogin(dbRepository, service, encodedData)
        console.log('response is controller',response)
        if(response.token) return res.json({message:"user Logged in succesful",authToken:response.token,username:response.username})
        else return res.json({message:"user does not exist"}) 

     }catch(err){
        console.log('error occured in controler related while receiving goog login response ',err)
     }



    }

    const callRequested=async(req,res)=>{

        console.log('user details',req.userdata)
    
        const uid=req.userdata.userId
        const vid=req.body.ventureId
    
           const response=await connectUser(dbRepository,uid,vid)
           if(!response) return res.json({message:'User Already requested this company'})
           return res.json({message:'You request send to the company ..they will contact you as soon as possible'})
     
           
      } 



    //GET METHODS



    //delete user (soft delete)
    const remove = async (req, res) => {

        const userId = req.params.id
        const response = await softDelete(userId, dbRepository)
        if (response) res.json({ message: 'user deleted succeful' })


    }
    //get particular user
    const getUser = async (req, res) => {
        const userId = req.params.id
        const response = await findOneUser(userId, dbRepository)
        return response ? res.json({ response }) : res.json({ message: "did'nt get user details" })
    }



    //PUT METHODS

    //update user
    const update = async (req, res) => {

        const reponse = await update(req.body, dbRepository, service)

    }














    return {
        callRequested,
        googleLogin,
        update,
        getUser,
        remove,
        register,
        login
    }





}

export default userController