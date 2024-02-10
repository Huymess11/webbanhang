import { Divider, Radio, Table } from 'antd';
import React, { useState } from 'react'
const TableComponent = (props) => {
    const {selectionType = 'checkbox',columns = [],data = []} = props
   
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };
      
    return (

    <Table
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}
      columns={columns}
      dataSource={data}
      {...props}
    />
  )
}

export default TableComponent
