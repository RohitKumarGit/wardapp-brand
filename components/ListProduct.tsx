import { Button, Form, Input, Result } from "antd";
import { Product } from "../utils";
import { constants } from "../constants";
import { useState } from "react";
import { MenuItems } from "../pages";
const ListProduct = (props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuceess] = useState(false);
  const handleSucessMint = function () {
    setSuceess(false);
  };
  const verifyBlockchainAddress = function () {};
  const handleMintNFTSucess = function () {
    props.handleMenuChange(MenuItems.MINT_NFT);
  };
  const onFinish = async function (val: Product) {
    setLoading(true);
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
      setSuceess(true);
    } catch (error) {
      alert("Internal error!");
    }
    setLoading(false);
  };

  return (
    <div className=" mx-auto flex justify-between h-vw ">
      <div className="left"></div>
      <div className="right">
        {success ? (
          <Result
            status="success"
            className="form"
            title="Successfully listed the product !!"
            subTitle="Now you can create an NFT for this product for the customer."
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={handleMintNFTSucess}
              >
                Mint NFT
              </Button>,
              <Button key="buy" onClick={handleSucessMint}>
                List Another product
              </Button>,
            ]}
          />
        ) : (
          <Form
            name="basic"
            layout="vertical"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className="form"
          >
            <h1 className="text-3xl font-bold mt-5  ">List your product</h1>
            <h6 className="italic light font-medium text-gray-800">
              This later would be used to create an NFT for selling to customer!
            </h6>
            <Form.Item
              label="Product name"
              name="name"
              rules={[
                { required: true, message: "Please input  product Name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Serial number"
              name="serial_no"
              rules={[
                { required: true, message: "Please input  serial number!" },
              ]}
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
                block
                type="primary"
                loading={loading}
                htmlType="submit"
                className="login-form-button p-4 uppercase"
              >
                List the product!
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
