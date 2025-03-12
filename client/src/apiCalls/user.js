import axios from "axios";
import { axiosInstance } from "./index"; 
export const getloggedUser=async ()=>{
    try{
        const response=await axiosInstance.get('api/user/get-logged-user')
        return response.data
    }
    catch(error){
        return error;
    }
}
export const getAllUser=async ()=>{
    try{
        const response=await axiosInstance.get('api/user/get-all-users')
        return response.data
    }
    catch(error){
        return error;
    }
}