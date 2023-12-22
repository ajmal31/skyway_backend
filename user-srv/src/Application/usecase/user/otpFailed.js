const otpFailed =async (dbRepo,uid) => {

      console.log('reach otp failed useCase')
      const response=await dbRepo.otpFailed(uid)
      return response

}
export default otpFailed