import TypedInputNumber from "antd/es/input-number";
import styled from "styled-components";

export const NameProductStyle = styled.h1`
    color: black;
    font-size: 24px;
    font-weight: bold;
    line-weight: 32px;
    word-break: break-word;

`
export const ProductPrice = styled.h2`
    color: red;
    font-size: 20px;
`
export const ProductDes = styled.div`
    font-size: 14px;
    margin-top: 2px;
    max-width: calc(100% - 40px);
`
export const InputNumber = styled(TypedInputNumber)`
    .ant-input-number.ant-input-number-sm{
        width: 40px;
    }
`