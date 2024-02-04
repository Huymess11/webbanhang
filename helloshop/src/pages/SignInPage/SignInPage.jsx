import React, { useEffect, useState } from 'react'
import InputForm from '../../components/InputForm/InputForm'
import BtnComponent from '../../components/BtnComponent/BtnComponent'
import { Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import {useMutation} from '@tanstack/react-query'
import * as UserService from '../../services/UserService'
import { useMutationHK } from '../../hook/useMutaionHK'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import * as message from '../../components/MessageComponent/MessageComponent'
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux'
import { updateUser } from '../../redux/slide/userSlide'

const SignInPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const mutation = useMutationHK(
    data => UserService.loginUser(data)

  )
  const {data,isSuccess,isError} = mutation
  useEffect(()=>{
    if(isSuccess){
      message.success()
      navigate('/')
      console.log('data',data)
      localStorage.setItem('access_token',JSON.stringify(data?.access_token))
      if(data?.access_token){
        const decoded = jwtDecode(data?.access_token);
        console.log('decoded',decoded)
        if(decoded?.id){
          handleDetailUser(decoded?.id,data?.access_token)
        }
      }
    }
    else if(isError){
      message.error()
    }
  },[isSuccess,isError])

  const handleDetailUser = async(id,token) => {
    const res = await UserService.getDetailUser(id,token)
    dispatch(updateUser({...res?.data,access_token: token}))
  }
  console.log('mutation',mutation)
  const handleNavigateSignUp = ()=>{
    navigate('/signup')
  }
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const handleOnchangeEmail = (value)=>{
    setEmail(value)
  }
  const handleOnchangePassword = (value)=>{
    setPassword(value)
  }
  const handleSignIn =()=>{
    mutation.mutate({
      email,
      password
    })
    console.log(email,password)
  }
  return (
    <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#DDDDDD'}}>
    <div style={{width:'500px', height:'300px',background:'white',borderRadius:'15px',padding:'40px 45px 24px'}}>
      <h1 style={{textAlign:'center',fontSize:'30px',fontWeight:'bold'}}>Đăng nhập tài khoản</h1>
        <div style={{marginBottom:'10px'}}>
        <InputForm placeholder='abc@gmail.com' value={email} onChange={handleOnchangeEmail}/>
        </div>
        <InputForm placeholder='password' value={password} onChange={handleOnchangePassword}/>

        
        
     <div style={{marginTop:'20px'}}>
     {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
     
                    <BtnComponent
                    disabled={!email.length|| !password.length} 
                    onClick={handleSignIn}
                    size={40} textBtn="Đăng nhập" styleBtn={{width:'100%',backgroundColor:'red',fontWeight:'bold',color:'white',height:'40px'}}></BtnComponent>  

                    <p style={{color:'blue',fontSize:'10px'}}>Quên mật khẩu</p>
                    <p style={{fontSize:'13px'}}>Chưa có tài khoản?<span style={{color:'blue',cursor:'pointer'}}onClick={handleNavigateSignUp}>Tạo tài khoản</span></p>
                </div>

              
    </div>
    </div>
  )
}

export default SignInPage
