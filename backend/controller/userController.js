import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";

const validateUser = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
];

const signup = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, password, email, location } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            password: hashedPassword,
            email,
            location
        });
        
        await newUser.save();

        res.json({ success: true, name, email, location }); 
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { validateUser, signup };


export const login = async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isPasswordValid = await bcrypt.compare(password, user.password )
        
        if(!email || !isPasswordValid){
            return res.status(400).json({error:"Inavlid username and password"});
        }
        
       const token = generateToken(user._id,res)
       console.log(token)
        
        res.status(201).json({
            success:true,
            token,
           user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            loaction: user.location
           }
        })
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "Internal Server error" })
    }
}
