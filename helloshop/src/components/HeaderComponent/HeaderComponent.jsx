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
import { searchProduct } from '../../redux/slide/counterSlice'
const HeaderComponent = ({isHiddenSearch = false, isHiddenCart = false}) => {
  const dispatch = useDispatch()
  const [search,setSearch] = useState('')
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
      {user?.isAdmin && (
        <Popup onClick={()=>navigate('/system/admin')}>Quản lý</Popup>
      )}
      
      <Popup onClick={handleLogout}>Đăng xuất</Popup>
    </div>
  );
  const onSearch=(e)=>{
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }
  return (
    <div>
      <WrapperHeader gutter={20}style={{alignItems:'center',justifyContent:isHiddenCart && isHiddenSearch?'space-between':'unset'}}>
      <Col span={5}>
      <TextHeader>HELLO.SHOP</TextHeader>  
      </Col>
      {!isHiddenSearch && (
          <Col span={11.2}>
          <BtnSearch
          size = "large"
          text = "Tìm kiếm"
          placeholder="Tìm kiếm sản phẩm"
          onChange={onSearch}
          />
          </Col>
      )}
     
      <Col span={7.7} style={{display: 'flex',gap:'10px'}} >
        <AccountHeader>
          {avatar?(
            <img src={avatar} alt='avatar' style={{width:'30px',height:'30px',borderRadius:'50%',objectFit:'cover' }}/>
          ):(
            <UserOutlined style={{fontSize:'30px'}} />
          )}
         
          {user?.access_token ?(
            <>
           
            <Popover content={content} trigger="click"  >
              <div style={{cursor:'pointer',marginTop:'5px', width:'130px'}}>{name?.length ? name : user?.email}</div>
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
          {!isHiddenCart && (
            <div onClick={()=>navigate('/order')} style={{cursor:'pointer'}}>
            <Badge count={4} size='small'>
            <ShoppingCartOutlined style={{fontSize:'30px'}}/>
           </Badge>
           <span style={{fontSize:'16px'}}>Giỏ hàng</span>
            </div>
          )}
         
         </TextHeader>
      </Col>
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
