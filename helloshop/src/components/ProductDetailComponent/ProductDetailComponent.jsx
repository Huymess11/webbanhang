import { Col, Image, InputNumber, Row } from 'antd'
import React from 'react'
import xiaomi from '../../img/xiaomi.webp'
import { NameProductStyle, ProductDes, ProductPrice } from './style'
import {StarFilled,PlusOutlined,MinusOutlined} from '@ant-design/icons'
import BtnComponent from '../BtnComponent/BtnComponent'
const ProductDetailComponent = () => {
    const onChange = ()=> {}
  return (
    <div>
      <Row style={{padding:'20px', background:'white', borderRadius:'10px'}}>
        <Col span={10}>
            <Image src={xiaomi} alt="imgproduct" preview='false'/>
        </Col>
        <Col span={14}>
            <NameProductStyle>Xiaomi Redmi Note 13 6GB 128GB</NameProductStyle>
            <div>
                <StarFilled style={{fontSize:'15px',color:'yellow'}} />
            </div>
            <ProductPrice><h2>3.450.000đ</h2></ProductPrice>
            <ProductDes>Bảo hành 18 tháng tại trung tâm bảo hành Chính hãng. 
                1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất. </ProductDes>
                <div style={{marginTop:'20px'}}>
                    <b>Số lượng: </b>
                    <InputNumber min={0} defaultValue={3} onChange={onChange} size='small'/>
                </div>
                <div style={{marginTop:'20px'}}>
                    <BtnComponent size={40} textBtn="Mua" styleBtn={{backgroundColor:'red',fontWeight:'bold',color:'white',height:'40px'}}></BtnComponent>
                </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetailComponent
