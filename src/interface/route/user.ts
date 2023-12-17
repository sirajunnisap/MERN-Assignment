import express from "express";
import { userLogin, userSignup } from "../controller/user/userLogin";
import { updatatedProfile, userProfile } from "../controller/user/userProfile";
import { userAuthentication } from "../middleware/authMiddleware";

const userRoute = express.Router();

userRoute.get('/profile',userAuthentication,userProfile);
userRoute.post('/signup',userSignup);
userRoute.post('/login',userLogin);
userRoute.put('/updateProfile',userAuthentication,updatatedProfile);


export default userRoute