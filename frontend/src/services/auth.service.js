import axiosInstance from "./axiosInstance";

const register = async (userData)=>{
    const response = await axiosInstance.post("/auth/register", userData); // GONDOLOM VALAMI ILYESMI LESZ AZ URL
    return response.data;
}

const login = async (credentials)=>{
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
}

export default {
    register,
    login,
};