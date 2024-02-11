import React, { Fragment, useEffect, useState } from 'react'
import ProductCardComponent from '../../components/ProductCardComponent/ProductCardComponent'
import { TypeProductStyle } from './style'
import { Pagination } from 'antd'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hook/useDebounce'

const TypeProductPage = () => {
  const searchProduct = useSelector((state)=>state?.product?.search)
  const searchD = useDebounce(searchProduct,500)
  const [panigate,setPanigate]=useState({
    page:0,
    limit:10,
    total:1,
  })
  const {state} = useLocation()
  const [products,setProduct] = useState([])
  const fetchAllProductType = async(type,page,limit)=>{
    const res = await ProductService.getProductType(type,page,limit)
    if(res?.status === 'OK'){
      setProduct(res?.data)
      setPanigate({...panigate,total:res?.totalPage})
    }else{

    }
  }

  useEffect(()=>{
    if(state){
      
      fetchAllProductType(state,panigate.page,panigate.limit)
    }
  },[state,panigate.page,panigate.limit])
  const onChange = (current,pageSize)=>{
    setPanigate({...panigate,page:current-1,limit:pageSize})
  }
   return(
    <div style={{ width:'100%',backgroundColor:'#DDDDDD',height:'calc(100vh - 64px)'}}>
    <div style={{height:'100%'}}>
        <TypeProductStyle>
            {products?.filter((prod)=>{
              if(searchD ===''){
                return prod
              }else if(prod?.name?.toLowerCase()?.includes(searchD?.toLocaleLowerCase())){
                return prod
              }
            })?.map((product)=>{
              return(
                <ProductCardComponent key={product._id} countInStock={product.countInStock} description = {product.description}
                image = {product.image} name = {product.name}
                price = {product.price} rating = {product.rating}
                type = {product.type} discount = {product.discount}
                id={product._id}
                />
            )
            })}
            
          
            
        </TypeProductStyle>
        <Pagination  defaultCurrent={panigate?.page+1} total={panigate?.total} onChange={onChange} style ={{textAlign:'center',marginTop:'30px'}}/>
    </div>
    

    </div>
  )
}

export default TypeProductPage
