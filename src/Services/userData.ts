import userAxios from "../Axios/userAxios";
import { UserType } from "../Models/userModel";

export const profile =async ():Promise<UserType> => {
    
      
    const res = await userAxios.get('profile')
    
    const data = res.data

    return data
}

export const updateProfile = async(userData:any):Promise<any>=>{

    const res = await userAxios.put(`updateProfile`,userData )
console.log(res,"updated user data");

    
    const data = res.data
    return data
}