import React from 'react'
import {Badge, Col} from 'antd'
import { AccountHeader, TextHeader, WrapperHeader } from './style'
import Search from 'antd/es/transfer/search'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
  } from '@ant-design/icons';
import BtnSearch from '../BtnSearch/BtnSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const HeaderComponent = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const handleNavigateLogin = ()=>{
    navigate('/signin')
  }
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
            <div style={{cursor:'pointer',marginTop:'5px'}}>{user.name}</div>
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
