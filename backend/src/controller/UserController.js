const UserService = require('../services/UserService')
const JWTService = require('../services/JwtService')

const createUser = async(req,res)=>{
    try{
        const {email,password, confirmPassword} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!email || !password || !confirmPassword  ){
            return res.status(200).json({
                status:'ERR',
                message:'The input is required'
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status:'ERR',
                message:'The input is email'
            })
        }else if(password !== confirmPassword){
            return res.status(200).json({
                status:'ERR',
                message:'The password is equal confirmPassword'
            })
        }
        const response = await UserService.createUser( req.body)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if(!email || !password ){
            return res.status(200).json({
                status:'ERR',
                message:'The input is required'
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status:'ERR',
                message:'The input is email'
            })
        }
        const response = await UserService.loginUser( req.body)
        const {refresh_token,...newRespone}=response
        res.cookie('refresh_token',refresh_token,{
            httpOnly: true,
            secure: false,
            samesite:'strict'
            
        })
        return res.status(200).json(newRespone)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const updateUser = async(req,res)=>{
    try{
        const userID = req.params.id
        const data = req.body
        if(!userID){
            return res.status(200).json({
                status:"ERR",
                message:"The userID is required"
            })
        }
        const response = await UserService.updateUser( userID,data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const deleteUser = async(req,res)=>{
    try{
        const userID = req.params.id
        if(!userID){
            return res.status(200).json({
                status:"ERR",
                message:"The userID is required"
            })
        }
        const response = await UserService.deleteUser( userID)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const getAllUser = async(req,res)=>{
    try{
       
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const getDetailsUser = async(req,res)=>{
    try{
        const userID = req.params.id
        if(!userID){
            return res.status(200).json({
                status:"ERR",
                message:"The userID is required"
            })
        }
        const response = await UserService.getDetailsUser( userID)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const refreshToken = async(req,res)=>{
    try{
        const token = req.cookies.refresh_token
        if(!token){
            return res.status(200).json({
                status:"ERR",
                message:"The token is required"
            })
        }
        const response = await JWTService.refreshTokenJwtService(token)
        return res.status(200).json(response)
        return
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}