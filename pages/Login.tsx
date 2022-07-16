import { Button, Col, Form, Image, Input, message, Row } from "antd";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setRequestMeta } from "next/dist/server/request-meta";
import { useState } from "react";
const auth = getAuth();
export const LogOut = async function () {
  try {
    await signOut(auth);
    window.localStorage.setItem("brandId", "");
    (window as any).location = "/Login";
  } catch (e) {
    message.error(e.message);
  }
};
const Login = function () {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (val: { email: string; password: string }) => {
    setLoading(true);
    console.log(val);
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        val.email,
        val.password
      );
      console.log(user);
      window.localStorage.setItem("brandId", user.uid);
      (window as any).location = "/";
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="login">
      <Row>
        <Col span={24} className="login_right">
          <Form
            name="basic"
            className=" rounded-md"
            labelCol={{ span: 8 }}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <div className="text-center">
              <Image width={200} src="/assets/logo.png" className="ml-1" />

              <div className=" text-xl font-medium uppercase text-blue-600">
                Please login to the brand interface
              </div>
            </div>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loading}
                block
                ghost
                type="primary"
                htmlType="submit"
              >
                LOGIN
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default Login;
