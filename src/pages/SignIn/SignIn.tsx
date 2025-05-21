import React from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Image,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import styled from "styled-components";
import LoginImg from "../../assets/login-page.png";
import { useNotify } from "../../context/notificationContext";
import useLocalStorage from "../../hooks/useLocalStorage";

const { Text, Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

// Styled Components
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 3rem 2rem;
`;

const ImageCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled(Image)`
  width: 100%;
  max-width: 320px;
  height: auto;
  object-fit: contain;
`;

const FormSection = styled.div`
  padding: 1rem;
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const SignIn: React.FC = () => {
  const notify = useNotify();
  const navigate = useNavigate();
  const [, setIsLoggedIn] = useLocalStorage<boolean>('user-logged-in', false);

  const onFinish = (values: LoginFormValues): void => {
    const { email, password } = values;

    if (email === 'admin@gmail.com' && password === 'Admin@123') {
      notify('success', {
        message: 'Logged In Successfully',
      });
      setIsLoggedIn(true);
      navigate("/");
    } else {
      notify('error', {
        message: 'Invalid Credential',
      });
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Row gutter={[32, 32]} align="middle" justify="center">
          <ImageCol xs={24} md={12}>
            <StyledImage src={LoginImg} preview={false} alt="Login" />
          </ImageCol>

          <Col xs={24} md={12}>
            <FormSection>
              <FormHeader>
                <Title level={2}>Sign in</Title>
                <Text type="secondary">
                  Welcome back! Please enter your details below to sign in.
                </Text>
              </FormHeader>

              <Form<LoginFormValues>
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                requiredMark="optional"
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please input a valid Email!",
                    },
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

                <Form.Item style={{ marginTop: "1rem", marginBottom: 0 }}>
                  <Button block type="primary" htmlType="submit" size="large">
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </FormSection>
          </Col>
        </Row>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;
