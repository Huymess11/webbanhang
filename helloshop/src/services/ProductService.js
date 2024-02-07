import axios from "axios"

export const getAllProduct = async()=>{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
    return res.data
}
export const createNewProduct = async(data)=>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`,data)
    return res.data
}