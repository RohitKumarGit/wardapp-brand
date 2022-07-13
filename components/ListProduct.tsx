import {
  Button,
  Form,
  Input,
  message,
  Result,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { Product } from "../utils";
import { constants } from "../constants";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import { MenuItems } from "../pages";
import { RcFile } from "antd/lib/upload";
import Dragger from "antd/lib/upload/Dragger";
const ListProduct = (props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const uploadProps: UploadProps = {
    onRemove: (file) => {
      console.log("removing");
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList([]);
    },
    beforeUpload: (file) => {
      console.log(file);
      const isJPEG = file.type === "image/jpeg" || file.type === "image/jpg";
      if (!isJPEG) {
        message.error(`${file.name} is not a JPEG or JPG file`);
        return Upload.LIST_IGNORE;
      } else {
        setFileList([...fileList, file]);
        return false;
      }
    },
    fileList,
  };
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
    val.brand_id = constants.BRAND_ID;
    const formData = new FormData();
    Object.keys(val).forEach((key) => {
      console.log(val[key]);
      formData.append(key, val[key]);
    });
    formData.append("image", val.image.file);
    const options = {
      method: constants.API_ENDPOINTS.LIST_PRODUCT.METHOD,
      body: formData,
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
            <Form.Item
              label="Product image (JPEG and JPG extensions are allowed only)"
              name="image"
            >
              <Dragger multiple={false} {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag image to this area to upload
                </p>
              </Dragger>
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
