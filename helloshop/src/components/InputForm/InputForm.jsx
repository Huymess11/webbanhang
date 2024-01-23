import { Input } from 'antd'
import React, { useState } from 'react'
import BtnComponent from '../BtnComponent/BtnComponent'

const InputForm = (value) => {
    const {valueInput,setValueInput} = useState('')
    const {placeholder = "Nhập tên", ...rests} = value
  return (
    <div>
        <Input placeholder={placeholder} valueInput={valueInput} {...rests}/>
    </div>

  )
}

export default InputForm
