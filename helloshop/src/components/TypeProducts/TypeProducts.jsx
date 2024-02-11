import React from 'react'
import { useNavigate } from 'react-router-dom'

const TypeProducts = ({name}) => {
  const navigate = useNavigate()
  const handleTypeProduct = (type)=>{
    navigate(`/product/${type}`,{state: type})
  }
  return (
    <div style={{cursor:'pointer'}} onClick={()=>handleTypeProduct(name)}>
      {name}
    </div>
  )
}

export default TypeProducts
