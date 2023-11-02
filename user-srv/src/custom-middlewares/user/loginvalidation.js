import { body,validationResult } from "express-validator"
const loginValidation=[

    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('password is required'),

    body('email').isEmail().withMessage('invalid email address'),

    body('email').isLength({max:30}),
    body('password').isLength({min:5}).withMessage('password must be 5 charactors'),


    // (req,res,next)=>{

    //     const errors=validationResult(req)
    //     if(!errors.isEmpty) return res.status(400).json({errors:errors.array()})
    //     next()
    // }
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

]
export default loginValidation