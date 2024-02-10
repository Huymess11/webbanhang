import React, { useEffect, useRef, useState } from 'react'
import { ProductHeader } from './style'
import { Button, Form, Input, Modal, Space } from 'antd'
import {PlusOutlined,ClearOutlined,EditFilled,SearchOutlined} from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputCompnent from '../InputComponent/InputCompnent'
import { UploadFile } from '../../pages/UserInfor/style'
import { getBase64 } from '../../utils'
import * as message from '../../components/MessageComponent/MessageComponent'
import * as ProductService from '../../services/ProductService'
import { useMutationHK } from '../../hook/useMutaionHK'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ConfirmComponent from '../ConfirmComponent/ConfirmComponent'

const AdminProductConponent = () => {
  const [isModalOpen,setIsModalOpen] = useState(false)
  const user = useSelector((state) => state?.user)
  const [openDrawer,setOpenDrawer]= useState(false)
  const [isModalDeleteOpen,setIsModalDeleteOpen]=useState(false)
  const [form] = Form.useForm()
  const [rowSelect,setRow] = useState(false)
  const [searchText,setSearchText]  = useState('')
  const [searchedColumn,setSearchedColumn]  = useState('')
  const searchInput  = useRef(null)
  const [state,setState] = useState({
    name:'',
    type:'',
    price:'',
    description:'',
    rating:'',
    image:'',
    countInStock:''
  })
  
  const [stateDetail,setStateDetail] = useState({
    name:'',
    type:'',
    price:'',
    description:'',
    rating:'',
    image:'',
    countInStock:''
  })
  const fetchGetDetailProduct = async(rowSelect)=>{
    const res = await ProductService.getDetailProduct(rowSelect)
    if(res?.data){
      setStateDetail({
        name:res?.data?.name,
        type:res?.data?.type,
        price:res?.data?.price,
        description:res?.data?.description,
        rating:res?.data?.rating,
        image:res?.data?.image,
        countInStock:res?.data?.countInStock
      })
    }
  }
  useEffect(()=>{
    form.setFieldsValue(stateDetail)
  },[form,stateDetail])

  useEffect(()=>{
    if(rowSelect){
      fetchGetDetailProduct(rowSelect)
    }
  },[rowSelect])

 
  const handleDetailsProduct = ()=>{
      if(rowSelect){
        fetchGetDetailProduct(rowSelect)
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
  const mutation = useMutationHK(
    (data) => {
      const {name,type,price,description,rating,image,countInStock} = data
      const res = ProductService.createNewProduct({name,type,price,description,rating,image,countInStock})
      return res
    }

  )
  const mutationDelete = useMutationHK(
    (data) => {
      const {id,token} = data
      const res = ProductService.deleteProduct(id,token)
      return res
    }
  )
  const mutationUpdate = useMutationHK(
    (data) => {
      const {id,token,...rests} = data
      const res = ProductService.updateProduct(id,token,{...rests})
      return res
    }
  )
  const getAllProduct = async()=>{
    const res = await ProductService.getAllProduct()
    return res
  }
  const {data,isSuccess,isError} = mutation
  const {data:dataUpdate,isSuccess:isSuccessUpdate,isError:isErrorUpdate} = mutationUpdate
  const {data:dataDelete,isSuccess:isSuccessDelete,isError:isErrorDelete} = mutationDelete

  const queryProduct = useQuery({queryKey:['products'],queryFn:getAllProduct})
  const {data:products} = queryProduct
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
      title: 'Type',
      dataIndex: 'type',
      sorter:(a,b)=>a.type - b.type

    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter:(a,b)=>a.price - b.price,
      filters:[
        {
          text:'<=500.000',
          value:'<=500.000',
        },
        {
          text:'>500.000',
          value:'>500.000',
        },
        {
          text:'<=1.000.000',
          value:'<=1.000.000',
        },
        {
          text:'>1.000.000',
          value:'>1.000.000',
        },
      ],
      onFilter: (value,record)=>{
        if(value ==='<=500.000'){
          return record.price <= 500000

        }else if(value ==='>500.000'){
          return record.price > 500000
        }else if(value ==='<=1.000.000'){
          return record.price <= 1000000
        }else if(value ==='>1.000.000'){
          return record.price > 1000000
        }
        
      }
    },
    {
        title: 'Count In Stock',
        dataIndex: 'countInStock',
        sorter:(a,b)=>a.countInStock - b.countInStock
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
  const handleCancelDelete = ()=>{
    setIsModalDeleteOpen(false)
  }
  
  useEffect(()=>{
    if(isSuccess && data?.status === "OK"){
      message.success()
      handleCancel()
      
    }else if(isError){
      message.error()
    }
  },[isSuccess])

  useEffect(()=>{
    if(isSuccessDelete && dataDelete?.status === "OK"){
      message.success()
      handleCancelDelete()
      
    }else if(isErrorDelete){
      message.error()
    }
  },[isSuccessDelete])
  const handleDeleteProduct=()=>{
    mutationDelete.mutate({ id: rowSelect, token: user?.access_token }, {
      onSettled: () => {
        queryProduct.refetch()
      }
    })
  }
  const handleCancelUpdate = () => {
    setOpenDrawer(false);
    setStateDetail({
      name: '',
      price: '',
      description: '',
      rating: '',
      image: '',
      type: '',
      countInStock: ''
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
  const onFinish = ()=>{
    mutation.mutate(state,{onSettled:()=>{
      queryProduct.refetch()
    }})
  }
  const handleOnchange = (e)=>{
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
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
      queryProduct.refetch()
    }}
    )
}
console.log('dataUpdate',data)
  return (
    <div>
      <div>
      <ProductHeader>SẢN PHẨM</ProductHeader>
        <div style={{float:'right'}}>
            <Button style={{width:'60px',height:'60px',borderRadius:'50%',border:' 1px dashed red'}} onClick={isShow}><PlusOutlined style={{fontSize:'25px',color:'red'}}/></Button>
        </div>
        <div style={{marginTop:'90px'}}>
            <TableComponent columns = {columns} data = {dataTable} onRow={(record, rowIndex) => {
    return {
      onClick: (event) => {
        setRow(record._id)
      }, 
        
    };
  }}/>
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
      <DrawerComponent title='Chi tiết' isOpen={openDrawer} onClose={()=>setOpenDrawer(false)}>
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
      label="Loại"
      name="type"
      rules={[{ required: true, message: 'Hãy nhập loại!' }]}
    >
      <InputCompnent value={stateDetail.type} onChange = {handleOnchangeDetail} name = 'type'/>
    </Form.Item>
    <Form.Item
      label="Số lượng"
      name="countInStock"
      rules={[{ required: true, message: 'Hãy nhập số lượng!' }]}
    >
      <InputCompnent value={stateDetail.countInStock} onChange = {handleOnchangeDetail} name = 'countInStock'/>
    </Form.Item>
    <Form.Item
      label="Giá"
      name="price"
      rules={[{ required: true, message: 'Hãy nhập giá!' }]}
    >
      <InputCompnent value={stateDetail.price} onChange = {handleOnchangeDetail} name = 'price'/>
    </Form.Item>
    <Form.Item
      label="Xếp hạng"
      name="rating"
      rules={[{ required: true, message: 'Hãy nhập xếp hạng!' }]}
    >
      <InputCompnent value={stateDetail.rating} onChange = {handleOnchangeDetail} name = 'rating'/>
    </Form.Item>
    <Form.Item
      label="Miêu tả"
      name="description"
      rules={[{ required: true, message: 'Hãy nhập miêu tả!' }]}
    >
      <InputCompnent value={stateDetail.description} onChange = {handleOnchangeDetail} name = 'description'/>
    </Form.Item >
    <Form.Item
      label="Ảnh"
      name="image"
      rules={[{ required: true, message: 'Hãy chọn ảnh!' }]}
    >
        <UploadFile onChange = {handleOnchangeAvatarDetail} maxCount={1}>
            <Button >Select File</Button>
            {stateDetail?.image && (
            <img src ={stateDetail?.image} style={{width:'50px',height:'50px',borderRadius:'50%',objectFit:'cover' }} alt="avatar"/>
          )}
        </UploadFile>
    </Form.Item >

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" style={{float:'right'}}>
        Cập nhật
      </Button>
    </Form.Item>
  </Form>
      </DrawerComponent>
      <ConfirmComponent title=" Bạn có chắc muốn xóa sản phẩm ?" open={isModalDeleteOpen} onOk={handleDeleteProduct}  onCancel={handleCancelDelete}>
      </ConfirmComponent>
    </div>
    </div>
  )
}

export default AdminProductConponent
