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
// blockchain address -> details
const RegisterUser = (props) => {
  const [confirmationVisible, sertConfirmationVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSucessMint = function () {
    sertConfirmationVisible(false);
  };
  const handleMintNFTSucess = function () {
    props.handleMenuChange(MenuItems.MINT_NFT);
  };
  const onFinish = async function (val: any) {
    console.log(val);
    setLoading(true);
    const options = {
      method: constants.API_ENDPOINTS.REGISTER_USER.METHOD,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    };
    try {
      let resp = await fetch(
        constants.BASE_URL + constants.API_ENDPOINTS.REGISTER_USER.URL,
        options
      );
      sertConfirmationVisible(true);
    } catch (error) {
      throw new Error("Internal error");
    }
    setLoading(false);
  };
  useEffect(() => {}, []);
  return (
    <div className=" mx-auto flex justify-between h-vw ">
      <div className="left-3"></div>
      <div className="right">
        <h1>
          {confirmationVisible ? (
            <Result
              status="success"
              className="form"
              title="User has been created"
              subTitle="Now you can mint tokens or sell products to this user "
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
                        Register User
                      </Button>
                    </Space>
                  </div>
                </div>,
              ]}
            />
          ) : (
            <Form
              name="basic"
              layout="vertical"
              labelCol={{ span: 16 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className="form"
            >
              <h1 className="text-3xl font-bold mt-5  ">Register User</h1>
              <Form.Item
                label="Give customer's blockchain address"
                name="blockChainAddress"
                rules={[
                  {
                    required: true,
                    message: "blockchain address is a required field!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        getFieldValue("blockChainAddress").trim().length === 42
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Please enter proper format blockchain address."
                        )
                      );
                    },
                  }),
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
                    message: "Please enter proper customer's name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Give customer's email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter proper customer's email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Give customer's physical address"
                name="address"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Give  customer's phone number"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "This field is required!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        getFieldValue("phone").trim().length == 10
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Please enter 10 digit phone number without any prefix or spaces."
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input />
              </Form.Item>
              <span
                className="  italic font-light block"
                style={{ width: "500px" }}
              >
                You can update user details by just entering the wallet address
                along with new details of user
              </span>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                  block
                >
                  Register/update user
                </Button>
              </Form.Item>
            </Form>
          )}
        </h1>
      </div>
    </div>
  );
};

export default RegisterUser;
