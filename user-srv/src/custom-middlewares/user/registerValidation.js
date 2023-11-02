import {body,validationResult} from 'express-validator'
const registerValidation=[
    // "is" checking is it valid or not ,"notEmpty" is checking is there have value or not

    //checking inputs have values or not

    body('username').notEmpty().withMessage('user name is required'),
    body('region').notEmpty().withMessage('region is required'),
    body('destination').notEmpty().withMessage('destination not required'),
    body('password').notEmpty().withMessage('password not required'),
    body('confirm_password').notEmpty().withMessage('confirm password not required'),
    body('email').notEmpty().withMessage('email is required'),

    //checking input values length whether it is valid or not
    
    body('email').isLength({max:30}).withMessage('invalid email '),
    body('region').isLength({min:2}).withMessage('region must be at least 2 letter'),
    body('destination').isLength({min:2}).withMessage('destination must be at least 2 letter'),
    body('password').isLength({min:5}).withMessage('password must be at least 5 charactors'),
    body('confirm_password').isLength({min:5}).withMessage('region must be at least 5 charactors and should be match with password'),
  
   
    //checking values is valid or not
    body('email').isEmail().withMessage('invalid email address'),
   
    //custom validations
    body('phone').custom((value)=>{
         
        let str=value+''
        let leng=str.split('').length
       
       return (typeof value==='number'&&leng===10) 
       
    }),
    body('confirm_password').custom((val,{req})=>{
      
        return (val===req.body.password)

    }),

    //end of the validation

   //Hanle the request   
   (req,res,next)=>{

      const errors=validationResult(req)

      if(!errors.isEmpty()){

       return res.json({errors:errors.array()}).status(400)
      }
      next()
   }



]

export default registerValidation