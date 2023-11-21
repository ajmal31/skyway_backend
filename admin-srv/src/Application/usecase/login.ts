const loginUsecase = async (dbRepo: any, service: any, data: Record<string, any>) => {

    let  response={
        message:'',
        token:''
    }

    const adminExist = await dbRepo.adminExist(data?.email)

    if (!adminExist){
        response.message='Invalid credentials'
        return response
    } 

    if (adminExist?.password === data?.password) {

        //invoking jwt GenerateToken
        const token = await service.tokenGenerate(data)
        response.message='Admin login succesful'
        response.token=token
        return response
    }
    response.message='Invalid Password'
    return response

}

export default loginUsecase