import { Card } from "antd";
import styled from "styled-components";

export const CardStyle = styled(Card)`
width: 200px;
& img{
    height: 200px;
    width: 200px;
}
display: flex;
flex-direction: column;
`
export const NameProduct = styled.div`
display: block;
font-size: 1.17em;
margin-block-start: 1em;
margin-block-end: 1em;
margin-inline-start: 0px;
margin-inline-end: 0px;
font-weight: bold;
color: black;
`
export const RateProduct = styled.div`
-moz-osx-font-smoothing: grayscale;
-webkit-font-smoothing: antialiased;
-webkit-text-size-adjust: 100%;
-moz-text-size-adjust: 100%;
text-size-adjust: 100%;
background-color: #fff;
font-size: 16px;
overflow-x: hidden;
text-rendering: optimizeLegibility;
`
export const ProductPrice = styled.div`
color: #d70018;
display: inline-block;
font-size: 18px;
font-weight: 700;
line-height: 1.1;
margin: 5px 2px;
`
export const SaleProductPrice = styled.div`
color: #707070;
display: inline-block;
font-size: 14px;
font-weight: 600;
position: relative;
-webkit-text-decoration: line-through;
text-decoration: line-through;
top: 2px;
gap:10px
`