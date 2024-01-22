import React from 'react'
import {Col} from 'antd'
import { AccountHeader, TextHeader, WrapperHeader } from './style'
import Search from 'antd/es/transfer/search'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
  } from '@ant-design/icons';
import BtnSearch from '../BtnSearch/BtnSearch';
const HeaderComponent = () => {
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

         <div>
            <span>Đăng nhập</span>
            <div>
             <span>Tài khoản</span>
             <CaretDownOutlined />
            </div>
         </div>
         </AccountHeader>
         <TextHeader>
         <div>
         <ShoppingCartOutlined style={{fontSize:'30px'}}/>
         <span style={{fontSize:'16px'}}>Giỏ hàng</span>
         </div>
         </TextHeader>
      </Col>
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
