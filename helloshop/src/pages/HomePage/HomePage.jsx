import React from 'react'
import TypeProducts from '../../components/TypeProducts/TypeProducts'
import {ButtonMore, ProductStyle, TypeProductsStyle} from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import anh1 from '../../img/anh1.webp'
import anh2 from '../../img/anh2.webp'
import anh3 from '../../img/anh3.webp'
import ProductCardComponent from '../../components/ProductCardComponent/ProductCardComponent'
import BtnComponent from '../../components/BtnComponent/BtnComponent'
const HomePage = () => {
    const typeProducts = ['Điện thoại ','Laptop','Tai nghe','Bàn phím','Chuột']
  return (
   <>
    <div style={{padding:'0 120px'}}>
    <TypeProductsStyle>
        {typeProducts.map((item)=>{
            return(
                <TypeProducts key={item} name ={item}/>
            )
        })}
    </TypeProductsStyle>
    </div>
    <div style={{backgroundColor:'#DDDDDD',padding:'10px 120px',height:'10000px'}}>
    <SliderComponent arrImg={[anh1,anh2,anh3]}/>
    <ProductStyle>
        <ProductCardComponent/>
        <ProductCardComponent/>
        <ProductCardComponent/>
        <ProductCardComponent/>
        <ProductCardComponent/>
        <ProductCardComponent/>
        <ProductCardComponent/>
        <ProductCardComponent/>
        <ProductCardComponent/>
    </ProductStyle>
    <div style={{justifyContent:'center', marginTop:'10px',display:'flex'}}>
        <ButtonMore textBtn="Xem thêm" type="outline"styleBtn={{
            border:'1px solid red', color: 'white', width:'200px', height:'40px',
        }}/>
    </div>
    
    </div>

    </>
  )
}

export default HomePage
