import React, { useEffect, useState } from 'react'
import {Badge, Button, Col, Popover} from 'antd'
import { AccountHeader, Popup, TextHeader, WrapperHeader } from './style'
import Search from 'antd/es/transfer/search'
import { resetUser } from '../../redux/slide/userSlide'
import * as UserService from '../../services/UserService'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
  } from '@ant-design/icons';
import BtnSearch from '../BtnSearch/BtnSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const HeaderComponent = () => {
  const dispatch = useDispatch()
  const [name,setName] = useState('')
  const [avatar,setAvatar] = useState('')
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const handleLogout = async()=>{
    await UserService.logoutUser()
    dispatch(resetUser())
  }
  useEffect(()=>{
    setName(user?.name)
    setAvatar(user?.avatar)
  },[user?.name,user?.avatar])
  const handleNavigateLogin = ()=>{
    navigate('/signin')
  }
  const content = (
    <div>
      <Popup onClick={()=>navigate('/userinfor')}>Thông tin người dùng</Popup>
      <Popup onClick={handleLogout}>Đăng xuất</Popup>
    </div>
  );

  return (
    <div>
      <WrapperHeader gutter={20}style={{alignItems:'center'}}>
      <Col span={6}>
      <TextHeader>HELLO.SHOP</TextHeader>  
      </Col>
      <Col span={12}>
      <BtnSearch
      size = "large"
      text = "Tìm kiếm"
      placeholder="Tìm kiếm điện thoại"
      />
      </Col>
      <Col span={6} style={{display: 'flex',gap:'10px'}} >
        <AccountHeader>
          {avatar?(
            <img src={avatar} alt='avatar' style={{width:'30px',height:'30px',borderRadius:'50%',objectFit:'cover' }}/>
          ):(
            <UserOutlined style={{fontSize:'30px'}} />
          )}
         
          {user?.access_token ?(
            <>
           
            <Popover content={content} trigger="click">
              <div style={{cursor:'pointer',marginTop:'5px'}}>{name?.length ? name : user?.email}</div>
            </Popover>
            </>
          ):(
            <div onClick={handleNavigateLogin} style={{cursor:'pointer'}}>
            <span>Đăng nhập</span>
            <div>
             <span>Tài khoản</span>
             <CaretDownOutlined />
            </div>
         </div>
          )}
         
         </AccountHeader>
         <TextHeader>
         <div>
         <Badge count={4} size='small'>
         <ShoppingCartOutlined style={{fontSize:'30px'}}/>
         </Badge>
         <span style={{fontSize:'16px'}}>Giỏ hàng</span>
         </div>
         </TextHeader>
      </Col>
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
