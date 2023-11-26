//import entities
import ventureEntity from "../../../Entities/venture/ventureEntities.js"
import publisher from "../../../message-broker/publisher/publisher.js"
const ventureRegister = async (dbrepo, service, data) => {


    //check the venture name is registred or not 

    const nameObj={
        key:"ventureName",
        value:data.ventureName
    }
   
    const nameExist=await dbrepo.ventureNameExist(nameObj)
    if(nameExist) return {error:'This Venture Name already used'}

    //check the official email is registred or not
    const emailObj={
        key:"official_email",
        value:data.official_email
    }
    const emailExist=await dbrepo.emailExist(emailObj)
    if(emailExist)return {error:'This official email already used'}


    //check the register number whether it is register or not
    const registerObj={
        key:"register_number",
        value:data.register_number
    }
    const register=await dbrepo.registerNumberExist(registerObj)
    if(register) return {error:'This registration number already used'}


    //check the license number whether it is register or not
   
    const licenseObj={
        key:"license_number",
        value:data.license_number
    }
    const licenseExist=await dbrepo.licenseNumberExist(licenseObj)
    if(licenseExist) return {error:'This license number already used'}



  

    const hashedPasswords = await service.passwordHash(data.password_one, data?.password_two)

    const ventureData = ventureEntity(data,hashedPasswords)

    const response=await dbrepo.register(ventureData)
    if(response) {
        
        
        const result=await publisher("ADMIN-SRV",response)
        return {success:"venture Registration succesfull"}
    }
    console.log('venture regsiter failed')






}

export default ventureRegister