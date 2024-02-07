import React from 'react'
import { UserHeader } from './style'
import { Button } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'

const AdminUserComponent = () => {
  return (
    <div>
      <UserHeader>NGƯỜI DÙNG</UserHeader>
        <div style={{float:'right'}}>
            <Button style={{width:'60px',height:'60px',borderRadius:'50%',border:' 1px dashed red'}}><PlusOutlined style={{fontSize:'25px',color:'red'}}/></Button>
        </div>
        <div style={{marginTop:'90px'}}>
            <TableComponent/>
        </div>
    </div>

  )
}

export default AdminUserComponent
