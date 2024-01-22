import React from 'react'
import ProductCardComponent from '../../components/ProductCardComponent/ProductCardComponent'
import { TypeProductStyle } from './style'

const TypeProductPage = () => {
  return (
   
    <div style={{backgroundColor:'#DDDDDD',height:'10000px'}}>
        <TypeProductStyle>

            <ProductCardComponent/>
            <ProductCardComponent/>
            <ProductCardComponent/>
            <ProductCardComponent/>
            <ProductCardComponent/>
            <ProductCardComponent/>

        </TypeProductStyle>
    </div>


  )
}

export default TypeProductPage
