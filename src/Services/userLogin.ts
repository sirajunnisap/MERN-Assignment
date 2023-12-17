import userAxios from "../Axios/userAxios"


export const userSignup =async (name:string,email:string,phone:number,password:string) => {
    
    const res = await userAxios.post('signup',{name,email,phone,password})

    const data = res.data
    return data
    
}
export const userLogin  = async(email:string,password:string)=>{

    const res = await userAxios.post('login',{email,password})

    console.log(res,"login");

    const data = await res.data
    return data
    
}