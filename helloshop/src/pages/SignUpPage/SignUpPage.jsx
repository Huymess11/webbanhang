import React, { useEffect, useState } from 'react'
import InputForm from '../../components/InputForm/InputForm'
import BtnComponent from '../../components/BtnComponent/BtnComponent'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHK } from '../../hook/useMutaionHK'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import * as message from '../../components/MessageComponent/MessageComponent'

const SignUpPage = () => {
  const navigate = useNavigate()
  const handleNavigateSignIn = ()=>{
    navigate('/signin')
  }
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const handleOnchangeEmail = (value)=>{
    setEmail(value)
  }
  const mutation = useMutationHK(
    data => UserService.signupUser(data)

  )
  const {data,isSuccess,isError}= mutation

  useEffect(()=>{
    if(isSuccess){
      message.success()
      handleNavigateSignIn()
    }
    else if(isError){
      message.error()
    }
  },[isSuccess,isError])
  const handleOnchangePassword = (value)=>{
    setPassword(value)
  }
  const handleOnchangeConfirmPassword = (value)=>{
    setConfirmPassword(value)
  }
  const handleSignUp=()=>{
    mutation.mutate({email,password,confirmPassword})
    console.log(email,password,confirmPassword)
  }
  return (
    <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#DDDDDD'}}>
    <div style={{width:'500px', height:'300px',background:'white',borderRadius:'15px',padding:'40px 45px 24px'}}>
      <h1 style={{textAlign:'center',fontSize:'30px',fontWeight:'bold'}}>Đăng ký tài khoản</h1>
        <div style={{marginBottom:'10px'}}>
        <InputForm placeholder='abc@gmail.com' value={email} onChange={handleOnchangeEmail}/>
        </div>
        <div style={{marginBottom:'10px'}}>
        <InputForm placeholder='password' value={password} onChange={handleOnchangePassword}/>
        </div>
        <InputForm placeholder=' confirm password' value={confirmPassword} onChange={handleOnchangeConfirmPassword}/>
        {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
     
     <div style={{marginTop:'20px'}}>
    
                    <BtnComponent
                    disabled={!email.length|| !password.length|| !confirmPassword.length}
                    onClick={handleSignUp}
                     size={40} textBtn="Đăng ký" styleBtn={{width:'100%',backgroundColor:'red',fontWeight:'bold',color:'white',height:'40px'}}></BtnComponent>

                    <p style={{fontSize:'13px'}}>Đã có tài khoản? <span style={{color:'blue',cursor:'pointer'}} onClick={handleNavigateSignIn}>Đăng nhập </span></p>
                </div>
    </div>
    </div>
  )
}

export default SignUpPage
