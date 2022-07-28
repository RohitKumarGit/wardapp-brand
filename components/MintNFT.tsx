import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Result,
  Spin,
  Alert,
  Space,
  message,
} from "antd";
import { Option } from "antd/lib/mentions";
const { RangePicker } = DatePicker;
import { useEffect, useState } from "react";
import { constants } from "../constants";
import { MenuItems } from "../pages";
import { Product, User } from "../utils";
export const ViewOnPolygonScan = function (url) {};
export const isAddress = function (address) {
  // check if it has the basic requirements of an address
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
    // If it's ALL lowercase or ALL upppercase
  } else if (
    /^(0x|0X)?[0-9a-f]{40}$/.test(address) ||
    /^(0x|0X)?[0-9A-F]{40}$/.test(address)
  ) {
    return true;
    // Otherwise check each case
  }
};
import { validate } from "bitcoin-address-validation";
import { SendOutlined } from "@ant-design/icons";
import axios from "axios";
const MintNFT = (props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuceess] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [hash, setHash] = useState<string>("");
  const handleSucessMint = function () {
    setSuceess(false);
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((e) => message.error("Internal error"));
  };
  const handleMintNFTSucess = function () {
    props.handleMenuChange(MenuItems.VIEW_PRODUCTS);
  };
  const getAllUsers = async function () {
    const { data } = await axios.get(
      constants.BASE_URL + constants.API_ENDPOINTS.GET_ALL_USERS.URL
    );
    setUsers(data);
  };
  const getAllProducts = async function () {
    setFetchingProduct(true);
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
        return (
          product.brand_id === localStorage.getItem("brandId") &&
          !product.isSold
        );
      });
      setFetchingProduct(false);
      return resp as any;
    } catch (error) {
      console.log(error);
      setFetchingProduct(false);
      throw new Error(
        "There is some internal error while fetching product Details. Please try again later!"
      );
    }
  };
  const onFinish = async function (val: any) {
    setLoading(true);
    console.log(val.warranty_range);
    val.purchase_date = val.warranty_range[0]._d;
    val.warranty_valid_uptill = val.warranty_range[1]._d;
    val.brand_id = localStorage.getItem("brandId");
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

      const data = await resp.json();
      console.log(data);
      setLoading(false);
      setHash(data.hash);
      setSuceess(true);
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
      .catch((e) => message.error("Internal error"));
    setProducts([{ serial_no: 1 }]);
    getAllUsers();
    setLoading(false);
  }, []);

  return (
    <div className=" mx-auto flex justify-between h-vw ">
      <div className="left-1"></div>
      <div className="right">
        <h1>
          {" "}
          {fetchingProduct ? (
            <div className="form">
              <Spin size="large">
                <Alert
                  message="Please wait while we fetch  data from the  server."
                  description="This should not take too long. Please reload page after a minute if loading persists."
                  type="info"
                />
              </Spin>
            </div>
          ) : success ? (
            <Result
              status="success"
              className="form"
              title="Successfully Minted/Created the NFT and the same would be transferred to customer's wallet in 2 minutes!!"
              subTitle="This NFT is publicly visible and verifyable :)  "
              extra={[
                <div key={1}>
                  <div>
                    <Space>
                      <Button
                        type="primary"
                        key="console"
                        onClick={handleMintNFTSucess}
                      >
                        Mint NFT
                      </Button>

                      <Button key="buy" onClick={handleSucessMint}>
                        Mint/Create new NFT.
                      </Button>
                    </Space>
                  </div>
                  <p className="mt-3">
                    Transaction Hash:
                    <a
                      href={constants.POLYGON_URL_TX + hash}
                      className=" underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {hash}
                    </a>
                  </p>
                </div>,
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
                      <Option value={product.serial_no} key={product.serial_no}>
                        {product.serial_no}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="Select customer"
                name="blockChainAddress"
                rules={[{ required: true, message: "Please select user!" }]}
              >
                <Select placeholder="Click to see already registered users">
                  {users.map((user) => {
                    return (
                      <Option value={user.blockChainAddress} key={user.phone}>
                        {user.name} - {user.phone} - {user.blockChainAddress}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Give warranty perio"
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
                  loading={loading}
                  block
                >
                  Mint and transfer NFT
                </Button>
              </Form.Item>
            </Form>
          )}
        </h1>
      </div>
    </div>
  );
};

export default MintNFT;
