import { Button} from 'antd'
import {
    SearchOutlined,
} from '@ant-design/icons'
import React from 'react'
import InputCompnent from '../InputComponent/InputCompnent'
import BtnComponent from '../BtnComponent/BtnComponent'

const BtnSearch = (value) => {
    const {size, placeholder,text} = value
  return (
    <div style={{display:'flex'}}>
      <InputCompnent size={size} placeholder={placeholder} style={{borderRadius:'0%',width:'350px'}} {...value}/>
      <BtnComponent size={size} icon = {<SearchOutlined/>} styleBtn={{borderRadius:'0%',height:'fit-content'}} textBtn={text}>textBtn</BtnComponent>
    </div>
  )
}

export default BtnSearch
