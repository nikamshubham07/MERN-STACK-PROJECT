

// import { $options, $regex } from 'sift'
import Doctor from '../models/DoctorSchema.js'
import BookingSchema from '../models/BookingSchema.js'

export const updateDoctor = async(req, res)=>{
    const id = req.params.id

    try{
        const updateDoctor = await Doctor.findByIdAndUpdate(id ,{$set:req.body}, {new:true})

        res.status(200).json({sucess:true, message:"Sucessfully Updated", data:updateDoctor})
    }
    catch(err){
        res.status(500).json({sucess:false, message:"Failed to Update", data:updateDoctor})
    }
}

export const deleteDoctor = async(req, res)=>{
    const id = req.params.id

    try{
        await Doctor.findByIdAndDelete(id);

        res.status(200).json({sucess:true, message:"Sucessfully delete"})
    }
    catch(err){
        res.status(500).json({sucess:false, message:"Failed to delete"})
    }
}

export const getSingleDoctor = async(req, res)=>{
    const id = req.params.id

    try{
        const doctor = await Doctor.findById(id).populate('reviews').select("-password");

        res.status(200).json({sucess:true, message:"User found", data:doctor})
    }
    catch(err){
        res.status(404).json({sucess:false, message:"No user Found"})
    }
}

export const getAllDoctor = async(req, res)=>{

    try{

        const {query} = req.query
        let doctors;

        if(query){
            doctors = await Doctor.find({isApproved:'approved', 
                $or:[{name:{$regex:query, $options:'i'}}, {specialization:{$regex:query, $options:'i'}}],
            }).select('-password')
        }else{
             doctors = await Doctor.find({isApproved:'approved'}).select("-password");
        }


        res.status(200).json({sucess:true, message:"Users found", data:doctors})
    }
    catch(err){
        res.status(404).json({sucess:false, message:"Not Found"})
    }
}

export const getDoctorProfile = async(req, res) =>{
    const doctorId = req.userId
    try{
        const doctor = await Doctor.findById(doctorId)
        
        if(!doctor){
            return res.status(404).json({sucess:false, message:"Doctor not found"})
        }
        const {password, ...rest} = doctor._doc
        const appointments = await Booking.find({doctor:docorId})


        res.status(200).json({sucess:true, message:"Profile info is getting", data:{ ...rest, appointments}})
    }
    catch(err){
        res.status(500).json({sucess:false, message:"Something went worng, cannot get"})
    }
}