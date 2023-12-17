import React from 'react'
import { UseAppSelector } from '../Redux/hooks'
import { useNavigate } from 'react-router-dom';


interface userProtectedProps{
    children: React.ReactElement;
}
const UserProtected:React.FC<userProtectedProps> = ({children})=>{

 const userToken = UseAppSelector(state=>state.User.accessToken)
console.log(userToken,"usrrrrr token");

const navigate = useNavigate();

 if(userToken){
    return children
 }else{
   navigate("/login");
    return null
 }
}

export default UserProtected;