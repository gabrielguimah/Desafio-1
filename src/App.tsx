import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Layout,
  PageHeader,
  Table,
  Input,
  Button,
  Space,
  Form,
  Modal,
  Switch,
  Select,
  Divider,
} from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const { Content } = Layout;
const { Search } = Input;
const { Item } = Form;
const baseUrl = "http://localhost:3001/vaults";

function VaultsInfo() {
  const [data, setData] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [vault_modal, setVaultModal] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [vault_param, setVaultParam] = useState({
    name: "",
    id: "",
    folders: "",
    action: "",
    vault_param: "",
  });

  const handleSearch = (event: any) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = data.filter((data) => {
      return data.title.search(value) != -1;
    });
    setFilteredData(result);
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const ModalFunction = (type: any) => {
    setVaultModal(type);
  };

  const VaultSelection = (id: any, caso: any) => {
    console.log(id, caso);
    const VaulFilter = data.filter((a) => a.id === id)[0];
    form.setFieldsValue({
      id: VaulFilter.id,
      name: VaulFilter.name,
      folders: VaulFilter.folders,
    });
    caso === "Editar" ? ModalFunction("edit") : ModalFunction("delete");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      id: "id",
    },
    {
      title: "Cofre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Pastas",
      dataIndex: "folders",
      key: "folders",
    },
    {
      title: "Ação",
      key: "action",
      dataIndex: "id",
      render: (id: any) => (
        <>
          <Button
            type="primary"
            shape="round"
            danger
            onClick={() => VaultSelection(id, "Deletar")}
          >
            Deletar
          </Button>
        </>
      ),
    },
  ];

  //Consome API
  const Get = async () => {
    try {
      const { data } = await axios.get(baseUrl);
      setData(data);
      setFilteredData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Get();
  }, []);

  //Deleta API
  const DeleteVault = async () => {
    const VaultID = form.getFieldValue("id");
    try {
      await axios.delete(baseUrl + "/" + VaultID);
      setData(data.filter((a) => a.id !== VaultID));
      ModalFunction("");
    } catch (error) {
      console.log(error);
    }
  };

  //Modal (não funcional)
  const ModalForm = () => {
    return (
      <>
        <Modal
          visible={vault_modal === "insert" || vault_modal === "edit"}
          title={vault_modal === "insert" ? "Novo Cofre" : "Editar"}
          onCancel={() => ModalFunction("")}
          centered
          okText={vault_modal === "insert" ? "Salvar" : "Editar"}
          cancelText="Cancelar"
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          <Form form={form} onFinish={onFinish}>
            <Item label="Name" name="name">
              <Input name="name" />
            </Item>
            <Item label="Pastas" name="folders">
              <Input name="folders" />
            </Item>
            <Item>
              <Select defaultValue="Usuários" style={{ width: 120 }} />
              <Divider type="vertical" />
              <Switch /> Somente Leitura
              <Divider type="vertical" />
              <Switch /> Editar
            </Item>
            <Item label="id" name="id" hidden>
              <Input name="id" />
            </Item>
          </Form>
        </Modal>
        <Modal
          visible={vault_modal === "delete"}
          onCancel={() => ModalFunction("")}
          centered
          onOk={() => DeleteVault()}
        >
          Tem certeza? Essa ação não poderá ser desfeita.
          <b>{vault_param && vault_param.vault_param}</b>
        </Modal>
      </>
    );
  };

  return (
    <div>
      <Layout>
        <Space>
          <PageHeader
            title="Cofre de Senhas"
            extra={[
              <>
                <Search placeholder="Buscar"></Search>
                <Button type="primary" onClick={() => ModalFunction("insert")}>
                  Novo Cofre
                </Button>
              </>,
            ]}
          ></PageHeader>
        </Space>
        <Content>
          <Table dataSource={data} columns={columns} rowKey={"id"} />
          <ModalForm />
        </Content>
      </Layout>
    </div>
  );
}

export default VaultsInfo;
