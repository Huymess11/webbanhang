import { Button } from 'antd'
import React from 'react'

const BtnComponent = ({size,styleBtn,textBtn, ...rests}) => {
  return (
    <div>
      <Button  size={size}  style={styleBtn} {...rests}>{textBtn} </Button>
    </div>
  )
}

export default BtnComponent
