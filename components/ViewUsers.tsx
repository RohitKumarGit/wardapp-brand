// will show all the minted nfts at the address of that brand
import { Button, Skeleton, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import { constants } from "../constants";
import moment from "moment";
import { convertToPaddedToken, NFTMetaData, User } from "../utils";
import Usercard from "./userCard";
export class MintedNFT {
  phone: string;
  serialNo: string;
  customerName: string;
  tokenId: number;
  purchase_date: string;
  warraty_valid_uptill: string;
  customerAddress: string;
  hash: string;
}
export const fetchMetaData = async function (
  tokenId: number
): Promise<NFTMetaData> {
  const { data } = await axios.get(
    constants.META_DATA_SERVER + convertToPaddedToken(tokenId) + ".json"
  );

  return data as NFTMetaData;
};
export const fetchUserData = async function (address: string): Promise<User> {
  console.log("fetching user", address);
  const { data } = await axios.get(
    constants.BASE_URL + constants.API_ENDPOINTS.GET_USER.URL,
    {
      params: {
        address,
      },
    }
  );
  console.log(data);
  return data as User;
};
class Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: any;
}
const columns: Column[] = [
  {
    title: "Serial Number",
    dataIndex: "serialNo",
    key: "serialNo",
  },

  {
    title: "NFT token ID",
    dataIndex: "tokenId",
    key: "tokenId",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Purchase Date",
    dataIndex: "purchase_date",
    key: "purchase_date",
  },
  {
    title: "Warranty valid till",
    dataIndex: "warraty_valid_uptill",
    key: "warraty_valid_uptill",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "",
    render: (_, record: MintedNFT) => (
      <Space size="middle">
        <a href={constants.POLYGON_URL_TX + record.hash} target="_blank˝">
          <Button type="primary">Pologon Scan</Button>
        </a>

        <a href={constants.POLYGON_URL_TX + record.hash} target="_blank˝">
          <Button>Ownership Chain</Button>
        </a>
      </Space>
    ),
  },
];
export class P {
  tokenId: number;
  serial_no: string;
}
export default function ViewUsers() {
  return (
    <div className=" center-form ">
      <div className="center-form-box mt-5">
        <h1 className="text-3xl font-bold">List of all users</h1>
        <p className="text-sm  font-semibold text-violet-600 inline-block">
          Please Note : User details are specific to a brand and not stored in
          block-chain
        </p>
        <Usercard />
      </div>
    </div>
  );
}
