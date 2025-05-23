import React from "react";
import { TableColumnsType, TableProps } from "antd";
import TableAtom from "../atoms/table";
import { FormDataTableProps, FormData } from "../../interface/types";
import { DeleteOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons";
import ButtonAtom from "../atoms/button";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";

const FormDataTable: React.FC<FormDataTableProps> = ({
  dataSource,
  handleDelete,
}) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const columns: TableColumnsType<FormData> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a, b) => (a.id && b.id ? a.id.localeCompare(b.id) : 0),
        multiple: 1,
      },
      render: (text) => (
        <div>
          <span>{text}</span>
          <ButtonAtom
            type="link"
            size="small"
            icon={text === isCopied ? <CheckOutlined /> : <CopyOutlined />}
            onClick={() => copyToClipboard(text)}
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: {
        compare: (a, b) =>
          a.name && b.name ? a.name.localeCompare(b.name) : 0,
        multiple: 1,
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => (
        <div>
          <span>{text}</span>
          <ButtonAtom
            type="link"
            size="small"
            icon={text === isCopied ? <CheckOutlined /> : <CopyOutlined />}
            onClick={() => copyToClipboard(text)}
          />
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      render: (_text, record) => (
        <span>
          <ButtonAtom
            type="link"
            size="small"
            onClick={() => record?.id && handleDelete(record.id)}
            icon={<DeleteOutlined />}
          />
        </span>
      ),
    },
  ];

  const onChange: TableProps<FormData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <TableAtom
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
      />
    </div>
  );
};

export default FormDataTable;
