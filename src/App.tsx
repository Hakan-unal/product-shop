
import { useMemo, useState } from "react";
import { Row, Popover, Table, Button, Space, Drawer, Form, Input, Tooltip } from "antd"
import { showNotification } from "./components/general/notification";
import { PlusOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { BiTrashAlt, BiPencil } from "react-icons/bi";
import { getProducts, getProduct, postProduct, deleteProduct, putProduct } from "./service/service"

const deletePopoverContent = (
  <div>
    <p>Click for delete</p>
  </div>
);

const editPopoverContent = (
  <div>
    <p>Click for edit</p>
  </div>
);




type FormValues = {
  name: string,
  description: string,
  price: number,
  key?: number,
  id: number
}


const App = () => {
  const [data, setData] = useState<object[]>([])
  const [open, setOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues | null>(null);

  const [form] = Form.useForm();


  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: {
        showTitle: false,
      },
      render: (description: string) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (obj: any) => (
        <Space size="middle">
          <Popover content={deletePopoverContent} >
            <Button onClick={() => handleDeleteProduct(obj.id)} icon={<BiTrashAlt size={15} color="red" />} />
          </Popover>
          <Popover content={editPopoverContent} >
            <Button onClick={() => handleGetProduct(obj.id)} icon={<BiPencil size={15} color="blue" />} />
          </Popover>
        </Space>
      ),
    },
  ];



  const handleDrawer = () => {
    open && setFormValues(null)
    setOpen(!open);
  };



  const submit = () => {
    form.submit()
  }

  const onFinish = (values: FormValues) => {
    if (!formValues) handleCreateProduct(values)
    else handleUpdateProduct(values, formValues.id)


    handleDrawer()
    form.resetFields()

  };

  const onFinishFailed = () => {
    showNotification("error", "Uyarı", "Hop hemşerim nereye formda eksik alanlar var", null)
  };

  const handleGetProducts = async () => {
    let response = await getProducts()
    response.map((obj: FormValues, index: number) => obj.key = index)
    setData(response)
  }

  const handleGetProduct = async (ID: number) => {
    const response = await getProduct(ID)
    form.setFieldsValue(response)
    setFormValues(response)
    handleDrawer()
  }

  const handleDeleteProduct = async (ID: number) => {
    const response = await deleteProduct(ID)
    showNotification("success", "Information", response.message + " " + response.data_id, null)
    handleGetProducts()
  }

  const handleUpdateProduct = async (payload: FormValues, ID: number) => {
    const response = await putProduct(payload, ID)
    showNotification("success", "Information", response.message + " " + response.data_id, null)
    handleGetProducts()

  }

  const handleCreateProduct = async (values: FormValues) => {
    const response = await postProduct(values)
    showNotification("success", "Information", response.message, null)
    handleGetProducts()

  }

  useMemo(() => {
    handleGetProducts()
  }, [])



  return (<Row justify={"center"}>
    <Space direction="vertical">
      <Button onClick={handleDrawer} icon={<PlusOutlined />} block>Add New</Button>
      <Table
        size="small"
        getPopupContainer={() => document.body}
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </Space>




    <Drawer
      title="Form Content"
      width={400}
      onClose={handleDrawer}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={submit} type="primary">
            Save
          </Button>
        </Space>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input allowClear showCount placeholder="Please enter a name" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input type="number" allowClear showCount placeholder="Please enter a price" />

        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Required' }]}
        >
          <TextArea
            allowClear
            showCount
            rows={4}
            placeholder="Please enter a description"
          />
        </Form.Item>


      </Form>
    </Drawer>

  </Row>
  )
}


export default App;