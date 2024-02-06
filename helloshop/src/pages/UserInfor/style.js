import { Upload } from "antd";
import styled from "styled-components";

export const HeaderUser = styled.h1`
    color:black;
    font-size: 20px;
    margin-top: 5px;
`
export const UserDetail = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    gap: 20px;
`
export const LabelStyle = styled.label`
    color:black;
    font-size: 16px;
    line-height: 30px;
    font-weight: bold;
    width: 100px;
    text-align: left;

`
export const InputStyle = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`
export const UploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info{
        display:none;
    }
`