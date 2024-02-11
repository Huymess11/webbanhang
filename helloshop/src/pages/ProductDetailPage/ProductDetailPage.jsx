import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const ProductDetailPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div style={{padding:'0 120px',backgroundColor:'#DDDDDD'}}>
      <h2><span style={{cursor:'pointer'}} onClick={()=>{navigate('/')}}>Trang chủ -</span>Chi tiết</h2>
        <div style={{paddingBottom:'30px'}}>
        <ProductDetailComponent idProduct = {id}/>
        </div>
    </div>
  )
}

export default ProductDetailPage
