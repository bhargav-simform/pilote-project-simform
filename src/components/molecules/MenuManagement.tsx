import React, { useState, useMemo } from "react";
import {
  Card,
  Button,
  Table,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Switch,
  Row,
  Col,
  UploadProps,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import useLocalStorage from "../../hooks/useLocalStorage";
import { MenuItem, MenuCategory } from "../../interface/types";
import noImage from "../../assets/no-img.png";
import { defaultCategories } from "../../utils/constant";
import Modal from "../atoms/Modal";

const { Option } = Select;


// Styled Components
const FiltersRow = styled(Row)`
  margin-bottom: 16px;

  @media (max-width: 576px) {
    flex-direction: column;
    row-gap: 12px;
  }

  @media (max-width: 786px) {
    gap: 12px !important;
  }
`;

const FilterCol = styled(Col)`
  @media (max-width: 576px) {
    width: 100% !important;
  }
`;


const ImagePreview = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const CancelButton = styled(Button)`
  background-color: #f5f5f5 !important;
  color: #ff4d4f !important;
  border-color: #ff4d4f !important;
`;

const FullWidthInputNumber = styled(InputNumber)`
  width: 100%;
`;

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useLocalStorage<MenuItem[]>(
    "menu-items",
    []
  );
  const [categories] = useLocalStorage<MenuCategory[]>(
    "menu-categories",
    defaultCategories
  );

  const { confirm } = Modal;


  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | undefined>();
  const [filterAvailable, setFilterAvailable] = useState<boolean | undefined>();

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = filterCategory
        ? item.categoryId === filterCategory
        : true;
      const matchesAvailable =
        filterAvailable !== undefined
          ? item.available === filterAvailable
          : true;
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
    form.setFieldsValue({
      ...item,
      image: item.image
        ? [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: item.image,
            thumbUrl: item.image,
          },
        ]
        : [],
    });
    setModalVisible(true);
  };


  const handleDelete = (id: string) => {
    confirm({
      title: 'Are you sure?',
      content: (
        <p className="fz-16">
          This will move the menu item to the recycle bin.
        </p>
      ),
      centered: true,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setMenuItems(menuItems.filter((item) => item.id !== id));
      }
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const image = values.image;

      if (Array.isArray(image) && image.length > 0) {
        const file = image[0];
        if (file.originFileObj) {
          const reader = new FileReader();
          reader.onload = (e) => {
            saveItem({ ...values, image: e.target?.result as string });
          };
          reader.readAsDataURL(file.originFileObj);
        } else {
          saveItem({
            ...values,
            image: file.url ?? file.thumbUrl,
          });
        }
      } else {
        saveItem({ ...values, image: undefined });
      }
    });
  };

  const saveItem = (values: MenuItem) => {
    const newItem: MenuItem = {
      id: editingItem ? editingItem.id : uuidv4(),
      name: values.name,
      description: values.description,
      categoryId: values.categoryId,
      price: values.price,
      available: values.available,
      image: values.image,
    };

    if (editingItem) {
      setMenuItems(
        menuItems.map((item) => (item.id === editingItem.id ? newItem : item))
      );
    } else {
      setMenuItems([...menuItems, newItem]);
    }

    setModalVisible(false);
  };

  const uploadProps: UploadProps = {
    beforeUpload: () => false,
    maxCount: 1,
    accept: "image/*",
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (img: string) => <ImagePreview src={img ?? noImage} alt="" />,
    },
    { title: "Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Category",
      dataIndex: "categoryId",
      render: (id: string) => categories.find((c) => c.id === id)?.name,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (p: number) => `₹${p}`,
    },
    {
      title: "Available",
      dataIndex: "available",
      render: (a: boolean) => (a ? "Yes" : "No"),
    },
    {
      title: "Action",
      render: (_: any, record: MenuItem) => (
        <ActionButtons>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </ActionButtons>
      ),
    },
  ];

  return (
    <Card
      title="Menu Management"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Item
        </Button>
      }
    >
      <FiltersRow gutter={16}>
        <FilterCol>
          <Input.Search
            placeholder="Search menu by name..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </FilterCol>
        <FilterCol>
          <Select
            allowClear
            placeholder="Category"
            style={{ width: "100%" }}
            onChange={(value: string | undefined) => setFilterCategory(value)}
          >
            {categories.map((cat) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </FilterCol>
        <FilterCol>
          <Select
            allowClear
            placeholder="Availability"
            style={{ width: "100%" }}
            onChange={(value: boolean | undefined) => setFilterAvailable(value)}
          >
            <Option value={true}>Available</Option>
            <Option value={false}>Unavailable</Option>
          </Select>
        </FilterCol>
      </FiltersRow>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredItems}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 800, y: 800 }}
      />

      <Modal
        title={editingItem ? "Edit Menu Item" : "Add Menu Item"}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
        footer={[
          <CancelButton key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </CancelButton>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            {editingItem ? "Update" : "Add"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ available: true }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select>
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please enter price" },
              { type: "number", min: 0, message: "Price must be non-negative" },
            ]}
          >
            <FullWidthInputNumber prefix="₹" />
          </Form.Item>
          <Form.Item
            name="available"
            label="Available"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload {...uploadProps} listType="picture">
              <Button type="primary" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default MenuManagement;