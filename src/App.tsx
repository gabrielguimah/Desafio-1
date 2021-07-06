import React, { useEffect, useState } from "react";
import "./App.css";
import { Layout, PageHeader, Table, Input, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const { Content } = Layout;
const { Search } = Input;

function App() {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      id: "id",
    },
    {
      title: "Cofre",
      dataIndex: "name",
      id: "name",
    },
    {
      title: "Pastas",
      dataIndex: "folders",
      id: "folders",
    },
    {
      title: "Ação",
      id: "action",
      dataIndex: "id",
      render: (id: any) => (
        <>
          <Button type="primary" shape="round" danger onClick={() => id}>
            {" "}
            Deletar{" "}
          </Button>
        </>
      ),
    },
  ];

  const deleteMethod = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  fetch("http://localhost:3001/vaults", deleteMethod)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  useEffect(() => {}, [
    fetch("http://localhost:3001/vaults")
      .then((resp) => resp.json())
      .then((resp) => setData(resp)),
    console.log(data),
  ]);
  return (
    <div>
      <Layout>
        <Space>
          <PageHeader
            title="Cofre de Senhas"
            extra={[
              <Search placeholder="Buscar" />,
              <Button type="primary">Novo Cofre</Button>,
            ]}
          ></PageHeader>
        </Space>
        <Content>
          <Table dataSource={data} columns={columns} />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
