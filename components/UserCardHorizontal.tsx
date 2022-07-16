import { Button, Card, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import { constants } from "../constants";
import { Product } from "../utils";
import HorizontalCard from "./HorizontalCard";
import { Column } from "./MintedNFTs";
import moment from "moment";
const UserCardHorizontal = ({ user }) => {
  const allMintedTokenQuery = useMoralisQuery(
    constants.TRANSFER_TABLE_NAME,
    (query) => query.equalTo("from", process.env.DEEWARR_ACCOUNT.toLowerCase()),
    [],
    { autoFetch: false }
  );
  const tabList = [
    {
      key: "tab1",
      tab: "User info",
    },
    {
      key: "tab2",
      tab: "NFT tokens info",
    },
  ];
  useEffect(() => {
    console.log(user);
  }, []);
  const columns: Column[] = [
    {
      title: "Serial Number",
      dataIndex: "serial_no",
      key: "serial_no",
    },
    {
      title: "NFT token ID",
      dataIndex: "token_id",
      key: "token_id",
    },
    {
      title: "Days left in warranty",
      dataIndex: "",
      key: "",
      render: (_, record: Product) => (
        <span>
          {" "}
          {moment(record.metaData.warranty_valid_uptill).diff(
            moment(),
            "days"
          )}{" "}
          Days
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "",
      render: (_, record: Product) => (
        <Button ghost type="primary">
          View Details
        </Button>
      ),
    },
  ];
  const [activeTabKey1, setActiveTabKey1] = useState<string>("tab1");
  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };
  return (
    <Card
      hoverable
      className="mt-5 block"
      style={{ width: "100%" }}
      title={user.name}
      tabList={tabList}
      activeTabKey={activeTabKey1}
      onTabChange={(key) => {
        onTab1Change(key);
      }}
    >
      {activeTabKey1 == "tab1" ? (
        <HorizontalCard user={user} />
      ) : (
        <Table dataSource={user.products} columns={columns} />
      )}
    </Card>
  );
};
export default UserCardHorizontal;
