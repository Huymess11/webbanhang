import axios from "axios"

export const axiosJWT = axios.create()
export const loginUser = async(data)=>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signin`,data)
    return res.data
}
export const signupUser = async(data)=>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`,data)
    return res.data
}
export const getDetailUser = async(id,access_token)=>{
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`,{
        headers:{
            token: `$Bearer ${access_token}`,
        }
    })
    return res.data
}
export const refreashToken = async()=>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`,{
        withCredentials: true
    })
    return res.data
}

export const logoutUser = async()=>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`)
    return res.data
}
export const updateUser = async(id,data,access_token)=>{
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`,data,{
        headers:{
            token: `$Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getAllUser = async(access_token)=>{
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-all`,{
        headers:{
            token: `$Bearer ${access_token}`,
        }
    })
    return res.data
}
export const deleteUser = async(id,data,access_token)=>{
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`,data,{
        headers:{
            token: `$Bearer ${access_token}`,
        }
    })
    return res.data
}