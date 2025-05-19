import React from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Checkbox,
  Image,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import LoginImg from "../../assets/login-page.png";
import { useNotify } from "../../context/notificationContext";
import useLocalStorage from "../../hooks/useLocalStorage";


const { Text, Title, Link } = Typography;

const SignIn: React.FC = () => {
  const notify = useNotify();
  const navigate = useNavigate();
  const [, setIsLoggedIn] = useLocalStorage<boolean>('user-logged-in', false);

  const onFinish = (values: any) => {
    if (values.email === 'admin@gmail.com' && values.password === 'Admin@123') {
      notify('success', {
        message: 'Logged In Successfully',
      });
      setIsLoggedIn(true);
      navigate("/")
    } else {
      notify('error', {
        message: 'Invalid Credential',
      });
    }
  };

  const styles = {
    containerStyle: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "2rem",
      textAlign: "center",
      height: "100%",
      display: "flex",
      alignItems: "center"
    }
  }

  return (
    <div style={styles.containerStyle}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 h-[90vh] ">
        <Row
          gutter={[32, 32]}
          className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6 md:p-10"
          align="middle"
          justify="center"
        >
          <Col
            xs={24}
            md={12}
            className="flex justify-center items-center"
          >
            <Image
              src={LoginImg}
              preview={false}
              className="w-full max-w-md h-auto object-contain"
              alt="Login"
            />
          </Col>

          <Col xs={24} md={12}>
            <div className="p-8 md:p-6">
              <div className="mb-8 text-center">
                <Title level={2} className="!mb-2">Sign in</Title>
                <Text type="secondary">
                  Welcome back! Please enter your details below to sign in.
                </Text>
              </div>

              <Form
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                requiredMark="optional"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { type: "email", required: true, message: "Please input your Email!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Please input your Password!" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item className="mb-0">
                  <div className="flex items-center justify-between">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a className="text-blue-600 hover:underline" href="">
                      Forgot password?
                    </a>
                  </div>
                </Form.Item>

                <Form.Item className="mb-0 mt-4">
                  <Button block type="primary" htmlType="submit" size="large">
                    Log in
                  </Button>
                  <div className="mt-6 text-center">
                    <Text type="secondary">Don't have an account?</Text>{" "}
                    <Link href="">Sign up now</Link>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignIn;
