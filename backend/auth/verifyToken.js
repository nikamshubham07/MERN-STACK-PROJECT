import jwt from "jsonwebtoken";
// import DoctorSchema from '../models/DoctorSchema.js';
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";


export const authenticate = async (req, res, next) => {
  // get token from header
  // console.log("karn: ",req);
  console.log("karn11",);
  // const authToken = req.header.authorization;
  const authToken=req.header("Authorization")
  console.log("authtoken", authToken);
  // check token is exits
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "No Token, authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];

    //veryfly token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;

    next(); // must be call the next function
  } catch (err) {
    if (err.name === "TokenExpriedError") {
      return res.status(401).json({ message: "Token is expired" });
    }

    return res.status(401).json({ success: false, message: "Invaild Token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  console.log("userid: ",userId);
  let user;
try{

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);
  
  console.log("object,",patient);
  
  if(patient) {
    user = patient;
  }
  if(doctor) {
    user = doctor;
  }
  if(!roles.includes(user.role)) {
    return res
    .status(401)
    .json({ success: false, message: "You are not authorized" });
  }
  next();
}
catch(err){
  console.log(err);
  return res.status(401).json({ success: false, message: "restrict for this user" });

}
};
