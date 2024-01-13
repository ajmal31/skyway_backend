import { body, validationResult } from "express-validator"

const register_validation = [

    

    // "is" checking is it valid or not ,"notEmpty" is checking is there have value or not

    //checking inputs have values or not



    body('firstName').notEmpty().withMessage('firstname is required'),
    body('lastName').notEmpty().withMessage('lastname is required'),
    body('ventureName').notEmpty().withMessage('venture name is  required'),
    body('phone_one').notEmpty().withMessage('phone number is required required'),
    body('phone_two').notEmpty().withMessage('phone number is required'),
    body('official_email').notEmpty().withMessage('email is required'),
    body('venture_category').notEmpty().withMessage('category is required'),
    body('description').notEmpty().withMessage('description is required'),
    body('expertise_contries').notEmpty().withMessage('expertise_contries is required'),
    body('industry_experience').notEmpty().withMessage('industry_experience  is required'),
    // body('min_max_service_amount').notEmpty().withMessage('average Amount is required'),
    body('official_portfolio').notEmpty().withMessage('official_portfolio Amount is required'),
    body('website_link').notEmpty().withMessage('website reference is required'),
    body('register_number').notEmpty().withMessage('register number  is required'),
    body('license_number').notEmpty().withMessage('license number  is required'),
    body('social_media').notEmpty().withMessage('social media  is required'),
    body('insurance_file_link').notEmpty().withMessage('insurance link  is required'),
    body('license_file_link').notEmpty().withMessage('license link  is required'),
    body('password_one').notEmpty().withMessage('password_one  is required'),
    body('password_two').notEmpty().withMessage('password_two  is required'),
    body('confirm_password_two').notEmpty().withMessage('confirm_password_one is required'),
    body('confirm_password_one').notEmpty().withMessage('confirm_password_two  is required'),
    
    
    

    //checking input values length whether it is valid or not
    body('ventureName').isLength({ min:2, }).withMessage('enter valid venture name'),
    body('phone_one').isLength({ min:10,max:10 }).withMessage('enter valid phone number'),
    body('phone_two').isLength({ min:10,max:10 }).withMessage('enter valid phone number'),
    
   
    body('official_email').isLength({ max: 30, }).withMessage('invalid email '),
    body('venture_category').isLength({ min: 5 }).withMessage('category must be at least 5 letter'),
    body('description').isLength({ min: 1350 ,max:1430}).withMessage('description must be at least 1400 charactors'),
    body('password_one').isLength({min:6}).withMessage('enter a valid password'),    
    body('confirm_password_one').isLength({min:6}).withMessage('enter a valid password'),   
    body('password_two').isLength({min:6}).withMessage('enter a valid password'),   
    body('confirm_password_two').isLength({min:6}).withMessage('enter a valid password'),    
     
    // body('confirm_password').isLength({min:5}).withMessage('password must be at least 5 charactors and should be match with password'),


    //checking values is valid or not
    body('official_email').isEmail().withMessage('invalid email address'),
    body('password_one').custom((val,{req})=>{

        return val===req.body.confirm_password_one
    }),

    
    body('password_two').custom((val,{req})=>{

       return val===req.body.confirm_password_two
    }),
    //end of the validation

    //Hanle the request   
    (req, res, next) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            return res.json({ errors: errors.array() }).status(400)
        }
        next()
    }


]

export default register_validation