import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import {CodeSandboxOutlined,UserOutlined,AppstoreOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'users', <UserOutlined />),
        getItem('Sản phẩm', 'products', <CodeSandboxOutlined /> ),
        
      ];

    const rootSubmenuKeys = ['user','product']
    const [openKeys,setOpenKeys] = useState(['user'])
    const onOpenChange = (keys)=>{
        const latestOpenKey = keys.find((key)=>openKeys.indexOf(key)===-1)
        if(rootSubmenuKeys.indexOf(latestOpenKey)=== -1){
            setOpenKeys(keys)
        }else{
            setOpenKeys(latestOpenKey ? [latestOpenKey]:[])
        }
    };
    const [key,setKey] = useState('')
    const handleOnClick = (key)=>{
        setKey(key)
    }
  return (
    <>
    <HeaderComponent isHiddenSearch isHiddenCart/>
    <div style={{display:'flex'}}>
      <Menu
      mode = "inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width:256,
      }}
      items = {items}
      onClick={handleOnClick}
    />
        <div style={{flex:1}}>
            hello
        </div>
    </div>
    </>
  )
}

export default AdminPage
