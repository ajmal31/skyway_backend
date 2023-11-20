const ventureLogin=async(dbRepo,service,data)=>{

    const emailObj={

        key:'official_email',
        value:data?.email
    }
   

    const emailExist=await dbRepo.emailExist(emailObj)

    if(!emailExist) return emailExist

        //Response object
        const obj={
            loggedIn:false,
            password_one:false,
            password_two:false,
            token:false,
            pending:null,
            ventureName:emailExist?.ventureName,
            status:emailExist?.admin_allowed
    
        }
 
            //if this accoun registration is pending ..shoulbe validate admin then only venture can enter ||continue here
        // ||complete properly venture login ❗ ❗ ❗ ❗ 
  
        if(emailExist?.admin_allowed==='pending'){
            obj.pending=true
            
        }

    const dbPasword_one=emailExist.password_one
    const dbPasword_two=emailExist.password_two

    const verifyPassword=await service.verifyPassword(dbPasword_one,data.password_one,dbPasword_two,data.password_two)

    const {password_one,password_two}=verifyPassword

    
    if(password_one&&password_two) {

        obj.loggedIn=true
        obj.password_one=true
        obj.password_two=true
        const ventureData={
            _id:emailExist._id,
            ventureName:emailExist.ventureName

        }

        const token=await service.generateToken(ventureData)
        obj.token=token
        return obj

    }
    if(password_one&&!password_two){
        obj.password_one=true
        return obj
    }
    if(!password_one&&password_two) {
        obj.password_two=true
        return obj
    }else return obj
}

export default ventureLogin