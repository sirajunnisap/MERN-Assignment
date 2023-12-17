import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env')})

export const passwordHashing:Function = async(password:string):Promise<string>=>{

    const  hashedpassword = await bcrypt.hash(password,10)

    return hashedpassword
}

export const passwordCompare:Function = async(plainTextPass:string, hashedpassword:string):Promise<boolean>=>{
    
    const comparepassword = bcrypt.compare(plainTextPass,hashedpassword)

    return comparepassword
}

export const createToken = (user:any):string=>{

    const secretKey : string|undefined = process.env.JWT_SECRET_KEY

    if(!secretKey){
        throw new Error("JWT secret key is not defiend")
    }
    const token = jwt.sign({user}, secretKey as string, {expiresIn:'1day'})
    return token
}