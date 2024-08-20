

import User from '../models/UserSchema.js'

export const updateUser = async(req, res)=>{
    const id = req.params.id

    try{
        const updateUser = await User.findByIdAndUpdate(id ,{$set:req.body}, {new:true})

        res.status(200).json({sucess:true, message:"Sucessfully Updated", data:updateUser})
    }
    catch(err){
        res.status(500).json({sucess:false, message:"Failed to Update", data:updateUser})
    }
}

export const deleteUser = async(req, res)=>{
    const id = req.params.id

    try{
        await User.findByIdAndDelete(id ,);

        res.status(200).json({sucess:true, message:"Sucessfully delete"})
    }
    catch(err){
        res.status(500).json({sucess:false, message:"Failed to delete"})
    }
}

export const getSingleUser = async(req, res)=>{
    const id = req.params.id

    try{
        const user = await User.findById(id ,);

        res.status(200).json({sucess:true, message:"User found", data:user})
    }
    catch(err){
        res.status(404).json({sucess:false, message:"No user Found"})
    }
}

export const getAllUser = async(req, res)=>{

    try{
        const users = await User.find({});

        res.status(200).json({sucess:true, message:"Users found", data:users})
    }
    catch(err){
        res.status(404).json({sucess:false, message:"Not Found"})
    }
}