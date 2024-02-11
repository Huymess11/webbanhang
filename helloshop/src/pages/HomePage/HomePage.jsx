import React, { useEffect, useRef, useState } from 'react'
import TypeProducts from '../../components/TypeProducts/TypeProducts'
import {ButtonMore, ProductStyle, TypeProductsStyle} from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import anh1 from '../../img/anh1.webp'
import anh2 from '../../img/anh2.webp'
import anh3 from '../../img/anh3.webp'
import ProductCardComponent from '../../components/ProductCardComponent/ProductCardComponent'
import BtnComponent from '../../components/BtnComponent/BtnComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hook/useDebounce'

const HomePage = () => {
    const productSearch = useSelector((state)=>state?.product?.search)
    const searchD = useDebounce(productSearch,500)
    const [limit,setLimit] = useState(5)
    const [type,setType]= useState([])
    
    const fetchProductAll = async(context)=>{
        const limit = context?.queryKey && context?.queryKey[1]
        const value = context?.queryKey && context?.queryKey[2]
       const res =  await ProductService.getAllProduct(value,limit)
        return res
    
    }

    const fetchAllType = async()=>{
        const res = await ProductService.GetAllType()
        
        if(res?.status === 'OK'){
            setType(res?.data)
        }
        return res
    }
    const {data:products,isPreviousData} = useQuery({ queryKey: ['product',limit,searchD], queryFn: fetchProductAll,retry:3,retryDelay:1000,keepPreviousData: true })
    useEffect(()=>{
        fetchAllType()

 },[])
  return (
   <>
    <div style={{width:'1270px',margin:'0 auto'}}>
    <TypeProductsStyle>
        {type.map((item)=>{
            return(
                <div style={{paddingLeft:'20px'}}>
                    <TypeProducts key={item} name ={item}/>
                </div>
            )
        })}
    </TypeProductsStyle>
    </div>
    <div style={{backgroundColor:'#DDDDDD',margin:'0 auto',height:'10000px'}}>
        <div style={{alignItems:'center'}}>
            <SliderComponent arrImg={[anh1,anh2,anh3]}/>
        </div>
   
    <ProductStyle style={{marginLeft:'70px'}}>
        {products?.data?.map((product)=>{
            return(
                <ProductCardComponent key={product._id} countInStock={product.countInStock} description = {product.description}
                image = {product.image} name = {product.name}
                price = {product.price} rating = {product.rating}
                type = {product.type} discount = {product.discount}
                id={product._id}
                />
            )
        })}
        
        
    </ProductStyle>
    <div style={{justifyContent:'center', marginTop:'10px',display:'flex'}}>
        <ButtonMore textBtn="Xem thêm" type="outline"styleBtn={{
            border:'1px solid red', color: 'white', width:'200px', height:'40px',
        }}
        disabled = {products?.total === products?.data?.length || products?.totalpage===1}
        onClick={() => setLimit((prev) => prev + 5)}
        
        />
    </div>
    
    </div>

    </>
  )
}

export default HomePage
