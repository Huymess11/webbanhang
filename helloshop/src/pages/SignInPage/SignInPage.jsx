import React from 'react'
import InputForm from '../../components/InputForm/InputForm'
import BtnComponent from '../../components/BtnComponent/BtnComponent'
import { Divider } from 'antd'

const SignInPage = () => {
  return (
    <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#DDDDDD'}}>
    <div style={{width:'500px', height:'300px',background:'white',borderRadius:'15px',padding:'40px 45px 24px'}}>
      <h1 style={{textAlign:'center',fontSize:'30px',fontWeight:'bold'}}>Đăng nhập tài khoản</h1>
        <div style={{marginBottom:'10px'}}>
        <InputForm placeholder='abc@gmail.com'/>
        </div>
        <InputForm placeholder='password'/>

     
     <div style={{marginTop:'20px'}}>
                    <BtnComponent size={40} textBtn="Đăng nhập" styleBtn={{width:'100%',backgroundColor:'red',fontWeight:'bold',color:'white',height:'40px'}}></BtnComponent>
                    <p style={{color:'blue',fontSize:'10px'}}>Quên mật khẩu</p>
                    <p style={{fontSize:'13px'}}>Chưa có tài khoản?<span style={{color:'blue'}}>Tạo tài khoản</span></p>
                </div>
    </div>
    </div>
  )
}

export default SignInPage
