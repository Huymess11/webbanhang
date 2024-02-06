import React, { useEffect, useState } from 'react'
import {HeaderUser, InputStyle, LabelStyle, UploadFile, UserDetail} from './style'
import InputForm from '../../components/InputForm/InputForm'
import BtnComponent from '../../components/BtnComponent/BtnComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutationHK } from '../../hook/useMutaionHK'
import * as message from '../../components/MessageComponent/MessageComponent'
import { updateUser } from '../../redux/slide/userSlide'
import { Button, Upload } from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import { getBase64 } from '../../utils'

 
const UserInforPage = () => {
  const user = useSelector((state) => state.user)
  const [email,setEmail]  = useState('')
  const [name,setName]  = useState('')
  const [phone,setPhone]  = useState('')
  const [address,setAddress]  = useState('')
  const [avatar,setAvatar]  = useState('')
  const mutation = useMutationHK(
    (data) => {
      const {id,access_token,...rests} = data
      UserService.updateUser(id,rests,access_token)
    }

  )
  const dispatch = useDispatch()
  const {data,isSuccess,isError} = mutation
  useEffect(()=>{
    setEmail(user?.email)
    setName(user?.name)
    setPhone(user?.phone)
    setAddress(user?.address)
    setAvatar(user?.avatar)
  },[user])
  useEffect(()=>{
    if(isSuccess){
      message.success()
      handleDetailUser(user?.id,user?.access_token)
    }
    else if(isError){
      message.error()
    }
  },[isSuccess,isError])
  const handleDetailUser = async(id,token) => {
    const res = await UserService.getDetailUser(id,token)
    dispatch(updateUser({...res?.data,access_token: token}))
  }
  const handleOnchangeEmail = (value)=>{
    setEmail(value)
  }
  const handleOnchangeName = (value)=>{
    setName(value)
  }
  const handleOnchangePhone = (value)=>{
    setPhone(value)
  }

  const handleOnchangeAddress = (value)=>{
    setAddress(value)
  }
  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj );
    }
    setAvatar(file.preview)
}
  const handleUpdate = ()=>{
    mutation.mutate({id: user?.id,email,name, phone, address,avatar,access_token: user?.access_token})
    
  }
  
    return (
    <div style={{width:'1000px',margin:'0 auto',height:'500px'}}>
      <HeaderUser>Thông tin người dùng</HeaderUser>
      <UserDetail>
        <InputStyle>
          <LabelStyle htmlFor='email'>Email</LabelStyle>
          <InputForm id="email"style={{width:'300px'}} value={email} onChange={handleOnchangeEmail}/>
          <BtnComponent
                    onClick={handleUpdate}
                    size={40} textBtn="Cập nhật" styleBtn={{width:'fit-content',backgroundColor:'red',fontWeight:'bold',color:'white',height:'40px',paddng:'4px 6px'}}>

                    </BtnComponent>
        </InputStyle>
        <InputStyle>
          <LabelStyle htmlFor='name'>Tên</LabelStyle>
          <InputForm id="name"style={{width:'300px'}} value={name} onChange={handleOnchangeName}/>
          <BtnComponent
                    onClick={handleUpdate}
                    size={40} textBtn="Cập nhật" styleBtn={{width:'fit-content',backgroundColor:'red',fontWeight:'bold',color:'white',height:'40px',paddng:'4px 6px'}}>

                    </BtnComponent>
        </InputStyle>
        <InputStyle>
          <LabelStyle htmlFor='phone'>Số ĐT</LabelStyle>
          <InputForm id="phone"style={{width:'300px'}} value={phone} onChange={handleOnchangePhone}/>
          <BtnComponent
                    onClick={handleUpdate}
                    size={40} textBtn="Cập nhật" styleBtn={{width:'fit-content',backgroundColor:'red',fontWeight:'bold',color:'white',height:'40px',paddng:'4px 6px'}}>

                    </BtnComponent>
        </InputStyle>
        <InputStyle>
          <LabelStyle htmlFor='address'>Địa chỉ</LabelStyle>
          <InputForm id="address"style={{width:'300px'}} value={address} onChange={handleOnchangeAddress}/>
          <BtnComponent
                    onClick={handleUpdate}
                    size={40} textBtn="Cập nhật" styleBtn={{width:'fit-content',backgroundColor:'red',fontWeight:'bold',color:'white',height:'40px',paddng:'4px 6px'}}>

                    </BtnComponent>
        </InputStyle>
        <InputStyle>
          <LabelStyle htmlFor='avatar'>Ảnh đại diện</LabelStyle>
          <UploadFile onChange = {handleOnchangeAvatar} maxCount={1}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </UploadFile>
          {avatar && (
            <img src ={avatar} style={{width:'50px',height:'50px',borderRadius:'50%',objectFit:'cover' }} alt="avatar"/>
          )}
          {/* <InputForm id="avatar"style={{width:'300px'}} value={avatar} onChange={handleOnchangeAvatar}/> */}
          <BtnComponent
                    onClick={handleUpdate}
                    size={40} textBtn="Cập nhật" styleBtn={{width:'fit-content',backgroundColor:'red',fontWeight:'bold',color:'white',height:'40px',paddng:'4px 6px'}}>

                    </BtnComponent>
        </InputStyle>
      </UserDetail>
      
    </div>
  )
}

export default UserInforPage
