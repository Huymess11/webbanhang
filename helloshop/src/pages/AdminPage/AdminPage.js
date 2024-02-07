import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import {CodeSandboxOutlined,UserOutlined,AppstoreOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUserComponent from '../../components/AdminUserComponent/AdminUserComponent';
import AdminProductConponent from '../../components/AdminProductComponent/AdminProductConponent';
const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'users', <UserOutlined />),
        getItem('Sản phẩm', 'products', <CodeSandboxOutlined /> ),
        
      ];

    const rootSubmenuKeys = ['users','products']
    
    
    const [keyselect,setKey] = useState('')
    const renderPage = (key)=>{
      switch(key){
        case 'users':
          return (
            <AdminUserComponent/>
          )
        case 'products':
          return (
            <AdminProductConponent/>
          )
          default:
          return <></>
      }
    }
    const handleOnClick = ({key})=>{
        setKey(key)
    }
    console.log('keyselect',keyselect)
  return (
    <>
    <HeaderComponent isHiddenSearch isHiddenCart/>
    <div style={{display:'flex'}}>
      <Menu
      mode = "inline"
      style={{
        width:"256px",
        boxShadow:'1px 1px black'
      }}
      items = {items}
      onClick={handleOnClick}
    />
        <div style={{flex:1,padding:'15px'}}>
            {renderPage(keyselect)}
        </div>
    </div>
    </>
  )
}

export default AdminPage
