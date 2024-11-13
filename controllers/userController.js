//users
const users = require("../model/userModel")
//jwt
var jwt = require('jsonwebtoken');

//register
exports.register=async(req, res)=>{
    //logic
    const {username,email,password} = req.body
    console.log(username,email,password);
    console.log('inside register');
    try{
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        
        if(existingUser)
        {
            res.status(406).json('user already exist')
        }
        else{
            const newUser = new users({
                username ,
                email,
                password,
                profile:"",
                github:"",
                linkedin:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(error){
        res.status(401).json(error)
    }
    
   
}

//login
exports.login = async(req, res)=>{
    const {email , password} = req.body
    console.log(email , password);
    
    try{
        const existingUser = await users.findOne({email, password})
        if(existingUser){
            //sign method  argument 1st payload 2nd argument secrete key 
            const token = jwt.sign({userId:existingUser._id},'secretekey')
            res.status(200).json({existingUser, token})
            
        }
        else{
            res.status(406).json('incorrect password or email')
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//to update profile
exports.editProfileController = async(req , res)=>{
    console.log('inside edit profile');
    
    const userId = req.payload
    const {username,email,password,profile,github,linkedin} = req.body
    console.log(username,email,password,profile,github,linkedin);
    
    uploadedImg = req.file ? req.file.filename : profile
    try {
        
        const existingUser = await users.findByIdAndUpdate({_id:userId},{
            username,
            email,
            password,
            profile:uploadedImg,
            github,
            linkedin
        },{new:true})
        await existingUser.save()
        res.status(200).json(existingUser)
    } catch (error) {
        res.status(401).json(error)
    }

}