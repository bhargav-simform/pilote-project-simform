import React, { useState, useMemo } from "react";
import { Card, Button, Table, Modal, Form, Input, InputNumber, Select, Upload, Switch, Row, Col } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../../hooks/useLocalStorage";
import { MenuItem, MenuCategory } from "../../interface/types";

const { Option } = Select;

const defaultCategories: MenuCategory[] = [
  { id: "1", name: "Appetizers" },
  { id: "2", name: "Main Courses" },
  { id: "3", name: "Desserts" },
];

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useLocalStorage<MenuItem[]>("menu-items", []);
  const [categories, setCategories] = useLocalStorage<MenuCategory[]>("menu-categories", defaultCategories);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | undefined>();
  const [filterAvailable, setFilterAvailable] = useState<boolean | undefined>();

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = filterCategory ? item.categoryId === filterCategory : true;
      const matchesAvailable = filterAvailable !== undefined ? item.available === filterAvailable : true;
      return matchesSearch && matchesCategory && matchesAvailable;
    });
  }, [menuItems, search, filterCategory, filterAvailable]);

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      let image = values.image;
      if (Array.isArray(image) && image.length > 0 && image[0].originFileObj) {
        const reader = new FileReader();
        reader.onload = e => {
          saveItem({ ...values, image: e.target?.result });
        };
        reader.readAsDataURL(image[0].originFileObj);
      } else {
        saveItem(values);
      }
    });
  };

  const saveItem = (values: any) => {
    if (editingItem) {
      setMenuItems(menuItems.map(item => item.id === editingItem.id ? { ...editingItem, ...values } : item));
    } else {
      setMenuItems([...menuItems, { ...values, id: uuidv4() }]);
    }
    setModalVisible(false);
  };

  const uploadProps = {
    beforeUpload: () => false,
    maxCount: 1,
    accept: "image/*",
  };

  const columns = [
    { title: "Image", dataIndex: "image", render: (img: string) => img ? <img src={img} alt="" style={{ width: 50, height: 50, objectFit: "cover" }} /> : null },
    { title: "Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    { title: "Category", dataIndex: "categoryId", render: (id: string) => categories.find(c => c.id === id)?.name },
    { title: "Price", dataIndex: "price", render: (p: number) => `₹${p}` },
    { title: "Available", dataIndex: "available", render: (a: boolean) => a ? "Yes" : "No" },
    {
      title: "Action", render: (_: any, record: MenuItem) => (
        <>
          <div className="flex gap-[10px]">
            <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
            <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />

          </div>
        </>
      )
    }
  ];

  return (
    <Card title="Menu Management" extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add Item</Button>}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Input.Search placeholder="Search menu..." onChange={e => setSearch(e.target.value)} />
        </Col>
        <Col>
          <Select allowClear placeholder="Category" style={{ width: 150 }} onChange={setFilterCategory}>
            {categories.map(cat => <Option key={cat.id} value={cat.id}>{cat.name}</Option>)}
          </Select>
        </Col>
        <Col>
          <Select allowClear placeholder="Availability" style={{ width: 120 }} onChange={v => setFilterAvailable(v)}>
            <Option value={true}>Available</Option>
            <Option value={false}>Unavailable</Option>
          </Select>
        </Col>
      </Row>
      <Table rowKey="id" columns={columns} dataSource={filteredItems} pagination={{ pageSize: 5 }} />
      <Modal
        title={editingItem ? "Edit Menu Item" : "Add Menu Item"}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" initialValues={{ available: true }}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
            <Select>
              {categories.map(cat => <Option key={cat.id} value={cat.id}>{cat.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, type: "number", min: 0 }]}>
            <InputNumber style={{ width: "100%" }} prefix="₹" />
          </Form.Item>
          <Form.Item name="available" label="Available" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="image" label="Image" valuePropName="fileList" getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}>
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default MenuManagement;