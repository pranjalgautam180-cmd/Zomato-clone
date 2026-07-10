const User = require('../Models/UserModel');

const CreateUser = async (req,res)=>{
    try{
        const {username,email,password} = req.body;
        const newUser = await User.create(
            {username,email,password});
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(500).json({ error : error.message});
    }
    
}
const GetAllUsers = async (req,res)=>{
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({error : error.message});
    }
}
module.exports ={CreateUser,GetAllUsers};