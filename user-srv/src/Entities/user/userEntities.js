const userData=(username,email,region,phone,destination,Date_of_birth,password,confirm_password)=>{

    console.log('user enityty',username,email,phone,region,destination,Date_of_birth,password,confirm_password)

    return{

       getUsername:()=>username,
       getEmail:()=>email,
       getRegion:()=>region,
       getPhone:()=>phone,
       getDestination:()=> destination,
       getDate_of_birth:()=>Date_of_birth,
       getPassword:()=>password,
       getConfirm_password:()=>confirm_password
    }
}
export default userData