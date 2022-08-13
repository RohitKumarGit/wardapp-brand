import {
  Alert,
  Button,
  Form,
  Input,
  message,
  Result,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { Product } from "../utils";
import { constants } from "../constants";
import { InboxOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { MenuItems } from "../pages";
import { RcFile } from "antd/lib/upload";
import Dragger from "antd/lib/upload/Dragger";
const ListProduct = (props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchingProduct, setFetchingProduct] = useState(true);
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
      console.log(resp);
      resp = (resp as any).filter((product: Product) => {
        return (
          product.brand_id === localStorage.getItem("brandId") &&
          !product.isSold
        );
      });
      console.log(resp);
      setProducts(resp as any);
      setFetchingProduct(false);
    } catch (error) {
      console.log(error);
      setFetchingProduct(false);
      throw new Error(
        "There is some internal error while fetching product Details. Please try again later!"
      );
    }
  };
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
  const handleSucessMint = async function () {
    await getAllProducts();
    setSuceess(false);
  };
  const verifyBlockchainAddress = function () {};
  const handleMintNFTSucess = function () {
    props.handleMenuChange(MenuItems.MINT_NFT);
  };
  const onFinish = async function (val: Product) {
    setLoading(true);
    val.brand_id = localStorage.getItem("brandId");
    const formData = new FormData();
    Object.keys(val).forEach((key) => {
      console.log(val[key]);
      formData.append(key, val[key]);
    });
    if (val.image && val.image.file) {
      formData.append("image", val.image.file);
    }

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
      message.error("Internal error!");
    }
    setLoading(false);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className=" mx-auto flex justify-between h-vw ">
      <div className="left"></div>
      <div className="right">
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
        ) : (
          <div>
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
                labelCol={{ span: 16 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                className="form"
              >
                <h1 className="text-3xl font-bold mt-5  ">List your product</h1>
                <h6 className="italic light font-medium text-gray-800">
                  This later would be used to create an NFT for selling to
                  customer!
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
                    {
                      required: true,
                      message: "Serial number is a required field!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const serialnos = products.map(
                          (product) => product.serial_no
                        );
                        if (serialnos.includes(getFieldValue("serial_no"))) {
                          return Promise.reject(
                            new Error("Serial number need to be unique.")
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Product Description"
                  name="description"
                  rules={[
                    { required: true, message: "Please input Description!" },
                  ]}
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
        )}
      </div>
    </div>
  );
};

export default ListProduct;

// 218 - user75
// 982 - suser44
