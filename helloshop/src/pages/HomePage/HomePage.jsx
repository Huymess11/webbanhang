import React from 'react'
import TypeProducts from '../../components/TypeProducts/TypeProducts'
import {TypeProductsStyle} from './style'
const HomePage = () => {
    const typeProducts = ['Điện thoại ','Laptop','Tai nghe','Bàn phím','Chuột']
  return (
   
    <div style={{padding:'0 120px'}}>
    <TypeProductsStyle>
        {typeProducts.map((item)=>{
            return(
                <TypeProducts key={item} name ={item}/>
            )
        })}
    </TypeProductsStyle>
    </div>
    
  )
}

export default HomePage
