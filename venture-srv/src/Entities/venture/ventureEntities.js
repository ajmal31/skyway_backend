const ventureEntity=(data,hashedPasswords)=>{
    
    const {
        firstName,
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

    }=data
    const {password_one,password_two}=hashedPasswords
    console.log(hashedPasswords)
    console.log('from entity')
    console.log( firstName,
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
        password_two,
         )
        
   return{
  
    firstName:()=>firstName,
    lastName:()=>lastName,
    ventureName:()=>ventureName,
    phone_one:()=>phone_one,
    phone_two:()=>phone_two,
    official_email:()=>official_email,
    venture_category:()=>venture_category,
    description:()=>description,
    expertise_contries:()=>expertise_contries,
    min_max_service_amount:()=>min_max_service_amount,
    official_portfolio:()=>official_portfolio,
    website_link:()=>website_link,
    register_number:()=>register_number,
    license_number:()=>license_number,
    social_media:()=>social_media,
    insurance_img:()=>insurance_img,
    license_img:()=>license_img,
    password_one:()=>password_one,
    confirm_password_one:()=>password_one,
    password_two:()=>password_two,
    confirm_password_two:()=>password_two

   }

   
   
}

export default ventureEntity
