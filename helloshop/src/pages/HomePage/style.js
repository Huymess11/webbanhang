import styled from "styled-components";
import BtnComponent from "../../components/BtnComponent/BtnComponent";

export const TypeProductsStyle = styled.div`
    display: flex;
    font-size: 15px;
    align-items: center;
    gap: 20px;
    justify-content: flex-start;
    border-bottom: 2px solid red;
    height: 40px;
    font-weight: bold;
`
export const ButtonMore = styled(BtnComponent)`
   background: red;
   &:hover {

    background-color: #FFFFFF;
    span{
        color: red;
    }
   }
`
export const ProductStyle = styled.div`
display: flex;
justify-content:center;
gap:15px;
margin-top: 30px;
flex-wrap: wrap;
`