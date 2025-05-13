import React from "react";
import { Form } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined
} from "@ant-design/icons";
import InputAtom from "../atoms/input";
import "../../styles/form.css";


const FormInput: React.FC = () => {
  return (
    <>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter your name!" }]}
      >
        <InputAtom prefix={<UserOutlined />} placeholder="Enter your name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email!" },
          { type: "email", message: "Please enter a valid email address!" }
        ]}
      >
        <InputAtom prefix={<MailOutlined />} placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[{ required: true, message: "Please enter your phone number!" }]}
      >
        <InputAtom prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <InputAtom
          prefix={<LockOutlined />}
          type="password"
          placeholder="Enter your password"
        />
      </Form.Item>
    </>
  );
};

export default FormInput;
