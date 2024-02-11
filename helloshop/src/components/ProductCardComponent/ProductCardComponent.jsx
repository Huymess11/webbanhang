import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { CardStyle, NameProduct, ProductPrice, RateProduct, SaleProductPrice } from './style'
import{StarFilled}from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const ProductCardComponent = (props) => {
  const {countInStock,description,image,name,price,rating,type,discount,id} = props
  const navigate = useNavigate()
  const handleDetailProduct = (id)=>{
    navigate(`/productdetail/${id}`)
  }
  return (
    <CardStyle
    hoverable
    headStyle={{width:'200px', height:'200px'}}
    bodyStyle={{padding:'10px'}}
    style={{ width: 200 }}
    cover={<img alt="example" src={image} />}
    onClick={()=>handleDetailProduct(id)}
  >
  <NameProduct>{name}</NameProduct>
  <RateProduct>
    <span>
     <span>{rating}</span><StarFilled style={{fontSize:'15px',color:'yellow'}} />
    </span>
    </RateProduct>
  <ProductPrice>{price}<SaleProductPrice>{discount}</SaleProductPrice></ProductPrice>
  </CardStyle>
  )
}

export default ProductCardComponent
