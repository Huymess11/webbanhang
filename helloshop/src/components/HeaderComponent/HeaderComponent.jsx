import React from 'react'
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
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const handleLogout = async()=>{
    await UserService.logoutUser()
    dispatch(resetUser())
  }
  const handleNavigateLogin = ()=>{
    navigate('/signin')
  }
  const content = (
    <div>
      <Popup>Thông tin người dùng</Popup>
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

         <UserOutlined style={{fontSize:'30px'}} />
          {user?.name ?(
            <>
           
            <Popover content={content} trigger="click">
              <div style={{cursor:'pointer',marginTop:'5px'}}>{user.name}</div>
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
