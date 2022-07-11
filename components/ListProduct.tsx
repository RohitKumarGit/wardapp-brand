import { Button, Form, Input } from "antd";
import { Product } from "../utils";
import { constants } from "../constants";
const ListProduct = () => {
  const onFinish = async function (val: Product) {
    // make HTTP call
    console.log(val);
    val.brand_id = constants.BRAND_ID;
    const options = {
      method: constants.API_ENDPOINTS.LIST_PRODUCT.METHOD,
      body: JSON.stringify(val),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let resp = await fetch(
        constants.BASE_URL + constants.API_ENDPOINTS.LIST_PRODUCT.URL,
        options
      );
      resp = await resp.json();
      alert(`product with serial no. ${val.serial_no} has been listed!`);
    } catch (error) {
      alert("Internal error!");
    }
  };

  return (
    <div className="container mx-auto ">
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h1 className="text-3xl font-bold mt-5  ">List your product</h1>
        <Form.Item
          label="Product name"
          name="name"
          rules={[{ required: true, message: "Please input  product Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Serial number"
          name="serial_no"
          rules={[{ required: true, message: "Please input  serial number!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Description"
          name="description"
          rules={[{ required: true, message: "Please input Description!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            List
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ListProduct;
