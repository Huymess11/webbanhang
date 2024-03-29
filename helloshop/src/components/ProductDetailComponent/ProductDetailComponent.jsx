import { Col, Image, InputNumber, Rate, Row } from 'antd'
import React, { useState } from 'react'
import { NameProductStyle, ProductDes, ProductPrice } from './style'
import {StarFilled,PlusOutlined,MinusOutlined} from '@ant-design/icons'
import BtnComponent from '../BtnComponent/BtnComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderProduct } from '../../redux/slide/orderSlide'
const ProductDetailComponent = ({idProduct}) => {
  const navigate = useNavigate()
  const user = useSelector((state)=>state.user)
  const location = useLocation()
  const dispatch = useDispatch()
  const [numProduct,setNumProduct]=useState(1)
  const onChange = (value)=> {
    setNumProduct(value)
  }
  const fetchGetDetailProduct = async(context)=>{
    const id = context?.queryKey && context?.queryKey[1]
    if(id){
      const res = await ProductService.getDetailProduct(id)
      return res?.data
    }
   
  }
  const {data:productDetail} = useQuery({ queryKey: ['productdetail',idProduct], queryFn: fetchGetDetailProduct,enabled:!!idProduct})
  const handleAddOrder = ()=>{
      if(!user?.id){
        navigate('/signin',{state:location?.pathname})
      }else{
        dispatch(addOrderProduct({
          orderItem:{
            name:productDetail?.name,
            amount: numProduct,
            image:productDetail?.image,
            price:productDetail?.price,
            product:productDetail?._id
          }
        }))
      }
  }
   

    
  return (
    <div>
      <Row style={{padding:'20px', background:'white', borderRadius:'10px'}}>
        <Col span={10}>
            <Image src={productDetail?.image} alt="imgproduct" preview='false'/>
        </Col>
        <Col span={14} style={{paddingLeft:'30px'}}>

            <NameProductStyle>{productDetail?.name}</NameProductStyle>
            <div>
                
                <Rate allowHalf defaultValue={productDetail?.rating} value = {productDetail?.rating}/>
                
            </div>
            <ProductPrice><h2>{productDetail?.price.toLocaleString()}</h2></ProductPrice>
            <ProductDes>{productDetail?.description}</ProductDes>
                <div style={{marginTop:'20px'}}>
                    <b>Số lượng: </b>
                    <InputNumber min={0} defaultValue={1} value = {Number(numProduct)} onChange={onChange}  size='small'/>
                </div>
                <div style={{marginTop:'20px'}}>
                    <BtnComponent size={40} textBtn="Mua" styleBtn={{backgroundColor:'red',fontWeight:'bold',color:'white',height:'40px'}}
                    onClick={handleAddOrder}
                    ></BtnComponent>
                </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetailComponent
