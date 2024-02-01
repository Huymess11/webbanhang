import React, { Fragment } from 'react'
import ProductCardComponent from '../../components/ProductCardComponent/ProductCardComponent'
import { TypeProductStyle } from './style'
import { Pagination } from 'antd'

const TypeProductPage = () => {
  const onChange = ()=>{}
   return(
    <div style={{backgroundColor:'#DDDDDD'}}>
    <div >
        <TypeProductStyle>

            <ProductCardComponent/>
            <ProductCardComponent/>
            <ProductCardComponent/>
            <ProductCardComponent/>
            <ProductCardComponent/>
            <ProductCardComponent/>
            <ProductCardComponent/>
            <ProductCardComponent/>
            <ProductCardComponent/>
            <ProductCardComponent/>
            
        </TypeProductStyle>
        <Pagination  defaultCurrent={2} total={100} onChange={onChange} style ={{textAlign:'center',marginTop:'30px'}}/>
    </div>
    

    </div>
  )
}

export default TypeProductPage
