import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { CardStyle, NameProduct, ProductPrice, RateProduct, SaleProductPrice } from './style'
import{StarFilled}from '@ant-design/icons'
const ProductCardComponent = () => {
  return (
    <CardStyle
    hoverable
    headStyle={{width:'200px', height:'200px'}}
    bodyStyle={{padding:'10px'}}
    style={{ width: 200 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
  <NameProduct>Iphone</NameProduct>
  <RateProduct>
    <span>
     <span>4.5</span><StarFilled style={{fontSize:'15px',color:'yellow'}} />
    </span>
    <span>| HOT</span>
    </RateProduct>
  <ProductPrice>4.590.000đ<SaleProductPrice>4.890.000đ</SaleProductPrice></ProductPrice>
  </CardStyle>
  )
}

export default ProductCardComponent
