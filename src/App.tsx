import React, { useEffect, useState } from "react";
import "./App.css";
import { Layout, PageHeader, Table, Input, Button, Space } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const { Content } = Layout;
const { Search } = Input;

function App() {
  const baseUrl = "http://localhost:3001/vaults";
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
            Deletar
          </Button>
        </>
      ),
    },
  ];

  const Get = async () => {
    try {
      const { data } = await axios.get(baseUrl);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Get();
  }, []);

  useEffect(() => {
    axios.delete("http://localhost:3001/vaults/").then();
  }, []);

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
          <Table dataSource={data} columns={columns} rowKey={"id"} />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
