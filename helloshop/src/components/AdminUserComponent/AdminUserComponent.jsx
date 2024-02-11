import React, { useEffect, useRef, useState } from 'react'
import { UserHeader } from './style'
import { Button, Form, Modal, Space } from 'antd'
import TableComponent from '../TableComponent/TableComponent'
import InputCompnent from '../InputComponent/InputCompnent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import ConfirmComponent from '../ConfirmComponent/ConfirmComponent'
import { getBase64 } from '../../utils'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useSelector } from 'react-redux'
import { useMutationHK } from '../../hook/useMutaionHK'
import * as UserService from '../../services/UserService'
import { useQuery } from '@tanstack/react-query'
import {PlusOutlined,ClearOutlined,EditFilled,SearchOutlined} from '@ant-design/icons'


const AdminUserComponent = () => {
  const user = useSelector((state) => state?.user)
  const [openDrawer,setOpenDrawer]= useState(false)
  const [isModalDeleteOpen,setIsModalDeleteOpen]=useState(false)
  const [form] = Form.useForm()
  const [rowSelect,setRow] = useState(false)
  const searchInput  = useRef(null)
  const [state,setState] = useState({
    name:'',
    email:'',
    phone:'',
    isAdmin:false,
  })
  
  const [stateDetail,setStateDetail] = useState({
    name:'',
    email:'',
    phone:'',
    isAdmin:false,
  })
  const fetchGetDetailUser = async(rowSelect)=>{
    const res = await UserService.getDetailUser(rowSelect)
    if(res?.data){
      setStateDetail({
        name:res?.data?.name,
        email:res?.data?.email,
        phone:res?.data?.phone,
        isAdmin:res?.data?.isAdmin,
      })
    }
  }
  useEffect(()=>{
    form.setFieldsValue(stateDetail)
  },[form,stateDetail])

  useEffect(()=>{
    if(rowSelect){
      fetchGetDetailUser(rowSelect)
    }
  },[rowSelect])

 
  const handleDetailsProduct = ()=>{
      if(rowSelect){
        fetchGetDetailUser(rowSelect)
      }
      setOpenDrawer(true)

    
  }
 
  
  const showAction = ()=>{
    return(
        <div style={{fontSize:'25px'}}>
            <ClearOutlined style={{color:'red',cursor:'pointer',marginRight:'10px'}} onClick={()=>setIsModalDeleteOpen(true)}/>

            <EditFilled style={{color:'blue',cursor:'pointer'}} onClick={handleDetailsProduct}/>
        </div>
    )
}
 
  const mutationDelete = useMutationHK(
    (data) => {
      const {id,token} = data
      const res = UserService.deleteUser(id,token)
      return res
    }
  )
  const mutationUpdate = useMutationHK(
    (data) => {
      const {id,token,...rests} = data
      const res = UserService.updateUser(id,{...rests},token)
      return res
    }
  )
  const getAllUser = async()=>{
    const res = await UserService.getAllUser()
    return res
  }
  const {data:dataUpdate,isSuccess:isSuccessUpdate,isError:isErrorUpdate} = mutationUpdate
  const {data:dataDelete,isSuccess:isSuccessDelete,isError:isErrorDelete} = mutationDelete

  const queryUser = useQuery({queryKey:['user'],queryFn:getAllUser})
  const {data:users} = queryUser
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputCompnent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter:(a,b)=>a.name.length - b.name.length,
      ...getColumnSearchProps('name')

    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter:(a,b)=>a.email.length - b.email.length,
      ...getColumnSearchProps('email')

    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',

    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter:(a,b)=>a.phone - b.phone,
      ...getColumnSearchProps('phone')
    },
      {
        title: 'Chức năng',
        dataIndex: 'system',
        render: showAction,
      },
  ];
  const dataTable = users?.data?.length && users?.data?.map((user)=>{
    return {
        ...user,
        key: user._id,
        isAdmin: user.isAdmin?'TRUE':'FALSE'
    }

  })

  
  
  
  const handleCancelDelete = ()=>{
    setIsModalDeleteOpen(false)
  }
  

  useEffect(()=>{
    if(isSuccessDelete && dataDelete?.status === "OK"){
      message.success()
      handleCancelDelete()
      
    }else if(isErrorDelete){
      message.error()
    }
  },[isSuccessDelete])
  const handleDeleteUser=()=>{
    mutationDelete.mutate({ id: rowSelect, token: user?.access_token }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }
  const handleCancelUpdate = () => {
    setOpenDrawer(false);
    setStateDetail({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    })
  };
  useEffect(()=>{
    
    if(isSuccessUpdate && dataUpdate?.status === "OK"){
      message.success()
      handleCancelUpdate()
      
    }else if(isErrorUpdate){
      message.error()
    }
  },[isSuccessUpdate])

  const handleOnchangeDetail = (e)=>{
    setStateDetail({
      ...stateDetail,
      [e.target.name]: e.target.value
    })
  }
  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj );
    }
    setState({
      ...state,
      image:file.preview
    })
}
const handleOnchangeAvatarDetail = async ({fileList}) => {
  const file = fileList[0]
  if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj );
  }
  setStateDetail({
    ...stateDetail,
    image:file.preview
  })
}
const onFinishUpdate =()=>{
  mutationUpdate.mutate({id:rowSelect,token:user?.access_token,...stateDetail},
    {onSettled:()=>{
      queryUser.refetch()
    }}
    )
}
  return (
    <div>
      <UserHeader>NGƯỜI DÙNG</UserHeader>
        
        <div style={{marginTop:'90px'}}>
            <TableComponent columns = {columns} data = {dataTable} onRow={(record, rowIndex) => {
    return {
      onClick: (event) => {
        setRow(record._id)
      }, 
        
    };
  }}/>
        </div>
      <DrawerComponent  title='Chi tiết' isOpen={openDrawer} onClose={()=>setOpenDrawer(false)}>
      <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    onFinish={onFinishUpdate}
    autoComplete="off"
    form = {form}
  >
    <Form.Item
      label="Tên"
      name="name"
      rules={[{ required: true, message: 'Hãy nhập tên!' }]}
      >
      <InputCompnent value={stateDetail.name} onChange = {handleOnchangeDetail} name = 'name'/>
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Hãy nhập email!' }]}
    >
      <InputCompnent value={stateDetail.email} onChange = {handleOnchangeDetail} name = 'email'/>
    </Form.Item>
    <Form.Item
      label="Số điện thoại"
      name="phone"
      rules={[{ required: true, message: 'Hãy nhập số điện thoại!' }]}
    >
      <InputCompnent value={stateDetail.phone} onChange = {handleOnchangeDetail} name = 'phone'/>
    </Form.Item>
    <Form.Item
      label="isAdmin"
      name="isAdmin"
      rules={[{ required: true, message: 'Hãy nhập có phải admin!' }]}
    >
      <InputCompnent value={stateDetail.isAdmin} onChange = {handleOnchangeDetail} name = 'isAdmin'/>
    </Form.Item>
  

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" style={{float:'right'}}>
        Cập nhật
      </Button>
    </Form.Item>
  </Form>
      </DrawerComponent>
      <ConfirmComponent  title=" Bạn có chắc muốn xóa người dùng ?" open={isModalDeleteOpen} onOk={handleDeleteUser}  onCancel={handleCancelDelete}>
      </ConfirmComponent>
    </div>

  )
}

export default AdminUserComponent
