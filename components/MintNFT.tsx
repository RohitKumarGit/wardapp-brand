import { Button, Form, Input, Select, DatePicker, Result } from "antd";
import { Option } from "antd/lib/mentions";
const { RangePicker } = DatePicker;
import { useEffect, useState } from "react";
import { constants } from "../constants";
import { MenuItems } from "../pages";
import { Product } from "../utils";

const MintNFT = (props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuceess] = useState(false);
  const handleSucessMint = function () {
    setSuceess(false);
  };
  const handleMintNFTSucess = function () {
    props.handleMenuChange(MenuItems.VIEW_PRODUCTS);
  };
  const getAllProducts = async function () {
    const options = {
      method: constants.API_ENDPOINTS.GET_ALL_PRODUCTS.METHOD,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let resp = await fetch(
        constants.BASE_URL + constants.API_ENDPOINTS.GET_ALL_PRODUCTS.URL,
        options
      );
      resp = await resp.json();
      resp = (resp as any).filter((product: Product) => {
        return product.brand_id === constants.BRAND_ID && !product.isSold;
      });
      console.log(resp);
      return resp as any;
    } catch (error) {
      console.log(error);
      throw new Error("Internal error");
    }
  };
  const onFinish = async function (val: any) {
    setLoading(true);
    console.log(val.warranty_range);
    val.purchase_date = val.warranty_range[0]._d;
    val.warranty_valid_uptill = val.warranty_range[1]._d;
    val.brand_id = constants.BRAND_ID;
    const options = {
      method: constants.API_ENDPOINTS.MINT_NFT.METHOD,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    };
    try {
      let resp = await fetch(
        constants.BASE_URL + constants.API_ENDPOINTS.MINT_NFT.URL,
        options
      );
      setLoading(false);
      alert(
        "NFT has been issued and will be transferred to customer's account in 2 minutes."
      );
    } catch (error) {
      throw new Error("Internal error");
    }
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoading(true);
    // fetch all products
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((e) => alert("Internal error"));
    setProducts([{ serial_no: 1 }]);
    setLoading(false);
  }, []);

  return (
    <div className=" mx-auto flex justify-between h-vw ">
      <div className="left-1"></div>
      <div className="right">
        {success ? (
          <Result
            status="success"
            className="form"
            title="Successfully Minted/Created an NFT and the same would be transferred to customer's wallet in 2 minuted !!"
            subTitle="This NFT is publicly visible and verifyable :)  "
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
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className="form"
          >
            <h1 className="text-3xl font-bold mt-5  ">
              Mint NFT for a product
            </h1>
            <Form.Item
              label="Select Serial number"
              name="serial_no"
              rules={[
                { required: true, message: "Please input  product Name!" },
              ]}
            >
              <Select placeholder="Click to see available serial numbers">
                {products.map((product) => {
                  return (
                    <Option value={product.serial_no}>
                      {product.serial_no}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Give user blockchain address"
              name="blockChainAddress"
              rules={[
                {
                  required: true,
                  message: "Please input proper blockchain  address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Give customer's name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input proper customer name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Give  customer's phone number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input proper customer's phone  numberr!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Give warranty date"
              name="warranty_range"
              rules={[
                {
                  required: true,
                  message: "Please input properly!",
                },
              ]}
            >
              <RangePicker />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Mint
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default MintNFT;
