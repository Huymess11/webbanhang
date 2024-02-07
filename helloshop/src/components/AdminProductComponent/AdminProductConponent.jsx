import React, { useEffect, useState } from 'react'
import { ProductHeader } from './style'
import { Button, Form, Input, Modal } from 'antd'
import {PlusOutlined,ClearOutlined,EditFilled} from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputCompnent from '../InputComponent/InputCompnent'
import { UploadFile } from '../../pages/UserInfor/style'
import { getBase64 } from '../../utils'
import * as message from '../../components/MessageComponent/MessageComponent'
import * as ProductService from '../../services/ProductService'
import { useMutationHK } from '../../hook/useMutaionHK'
import { useQuery } from '@tanstack/react-query'

const AdminProductConponent = () => {
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [state,setState] = useState({
    name:'',
    type:'',
    price:'',
    description:'',
    rating:'',
    image:'',
    countInStock:''
  })
  const showAction = ()=>{
    return(
        <div style={{fontSize:'25px'}}>
            <ClearOutlined style={{color:'red',cursor:'pointer',marginRight:'10px'}}/>

            <EditFilled style={{color:'blue',cursor:'pointer'}}/>
        </div>
    )
}
  const mutation = useMutationHK(
    (data) => {
      const {name,type,price,description,rating,image,countInStock} = data
      const res = ProductService.createNewProduct({name,type,price,description,rating,image,countInStock})
      return res
    }

  )
  const getAllProduct = async()=>{
    const res = await ProductService.getAllProduct()
    return res
  }
  const {data,isSuccess,isError} = mutation
  const {data:products} = useQuery({queryKey:['products'],queryFn:getAllProduct})
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
        title: 'Count In Stock',
        dataIndex: 'countInStock',
      },
      {
        title: 'Chức năng',
        dataIndex: 'system',
        render: showAction,
      },
  ];
  const dataTable = products?.data?.length && products?.data?.map((product)=>{
    return {
        ...product,
        key: product._id
    }

  })
  const [form] = Form.useForm()
  
  
  const handleCancel = () => {
    setIsModalOpen(false);
    setState({
    name:'',
    type:'',
    price:'',
    description:'',
    rating:'',
    image:'',
    countInStock:''
    })
    form.resetFields()
  };
  const isShow=()=>{
    setIsModalOpen(true);
  }
  useEffect(()=>{
    if(isSuccess && data?.status === "OK"){
      message.success()
      handleCancel()
      
    }else if(isError){
      message.error()
    }
  },[isSuccess,isError])
  const onFinish = ()=>{
    mutation.mutate(state)
  }
  const handleOnchange = (e)=>{
    setState({
      ...state,
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
  return (
    <div>
      <div>
      <ProductHeader>SẢN PHẨM</ProductHeader>
        <div style={{float:'right'}}>
            <Button style={{width:'60px',height:'60px',borderRadius:'50%',border:' 1px dashed red'}} onClick={isShow}><PlusOutlined style={{fontSize:'25px',color:'red'}}/></Button>
        </div>
        <div style={{marginTop:'90px'}}>
            <TableComponent columns = {columns} data = {dataTable}/>
        </div>
        <Modal title="Nhập thông tin sản phẩm" open={isModalOpen} footer={null}  onCancel={handleCancel}>
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    onFinish={onFinish}
    autoComplete="off"
    form = {form}
  >
    <Form.Item
      label="Tên"
      name="name"
      rules={[{ required: true, message: 'Hãy nhập tên!' }]}
      >
      <InputCompnent value={state.name} onChange = {handleOnchange} name = 'name'/>
    </Form.Item>

    <Form.Item
      label="Loại"
      name="type"
      rules={[{ required: true, message: 'Hãy nhập loại!' }]}
    >
      <InputCompnent value={state.type} onChange = {handleOnchange} name = 'type'/>
    </Form.Item>
    <Form.Item
      label="Số lượng"
      name="countInStock"
      rules={[{ required: true, message: 'Hãy nhập số lượng!' }]}
    >
      <InputCompnent value={state.countInStock} onChange = {handleOnchange} name = 'countInStock'/>
    </Form.Item>
    <Form.Item
      label="Giá"
      name="price"
      rules={[{ required: true, message: 'Hãy nhập giá!' }]}
    >
      <InputCompnent value={state.price} onChange = {handleOnchange} name = 'price'/>
    </Form.Item>
    <Form.Item
      label="Xếp hạng"
      name="rating"
      rules={[{ required: true, message: 'Hãy nhập xếp hạng!' }]}
    >
      <InputCompnent value={state.rating} onChange = {handleOnchange} name = 'rating'/>
    </Form.Item>
    <Form.Item
      label="Miêu tả"
      name="description"
      rules={[{ required: true, message: 'Hãy nhập miêu tả!' }]}
    >
      <InputCompnent value={state.description} onChange = {handleOnchange} name = 'description'/>
    </Form.Item >
    <Form.Item
      label="Ảnh"
      name="image"
      rules={[{ required: true, message: 'Hãy chọn ảnh!' }]}
    >
        <UploadFile onChange = {handleOnchangeAvatar} maxCount={1}>
            <Button >Select File</Button>
            {state?.image && (
            <img src ={state?.image} style={{width:'50px',height:'50px',borderRadius:'50%',objectFit:'cover' }} alt="avatar"/>
          )}
        </UploadFile>
    </Form.Item >

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" style={{float:'right'}}>
        Thêm
      </Button>
    </Form.Item>
  </Form>

      </Modal>
    </div>
    </div>
  )
}

export default AdminProductConponent
