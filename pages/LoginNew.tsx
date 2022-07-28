import { Button, Form, Image, Input } from "antd";

const LoginNew = function () {
  return (
    // create a full scree login page with image on left
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center">
          <Image width={200} src="/assets/logo.png" className="ml-1" />
          <div className=" text-xl font-medium uppercase text-blue-600">
            Please login to the brand interface
          </div>
        </div>
        <Form
          name="basic"
          className=" rounded-md"
          labelCol={{ span: 8 }}
          layout="vertical"
          initialValues={{ remember: true }}
          // onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              //loading={loading}
              block
              ghost
              type="primary"
              htmlType="submit"
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default LoginNew;
