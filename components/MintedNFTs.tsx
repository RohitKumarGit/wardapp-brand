// will show all the minted nfts at the address of that brand
import { Button, Skeleton, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import { constants } from "../constants";
import moment from "moment";
import { convertToPaddedToken, NFTMetaData, User } from "../utils";
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
export class Column {
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
export default function MintedNFTs() {
  const [loading, setLoading] = useState(false);
  const [mintedProducts, setMintedProducts] = useState<MintedNFT[]>([]);
  const [minedNFTsServer, setMinedNFTsServer] = useState<P[]>([]);
  const allMintedTokenQuery = useMoralisQuery(
    constants.TRANSFER_TABLE_NAME,
    (query) => query.equalTo("from", process.env.DEEWARR_ACCOUNT.toLowerCase()),
    [],
    { autoFetch: false }
  );
  const fetchAllMintedNFTSofABrand = async function () {
    const results = await allMintedTokenQuery.fetch();
    if (!results) {
      return [];
    }
    console.log(results.length);
    // TODO serial number unique
    const ans = [];
    for (let i = 0; i < results.length; i++) {
      console.log(i);
      let result = results[i];
      const { attributes } = result;
      console.log(attributes);
      const metaData = await fetchMetaData(attributes.token);
      console.log(metaData, "data ");
      const user = await fetchUserData(metaData.sold_to);
      console.log(user);
      if (metaData.brand_id == localStorage.getItem("brandId")) {
        ans.push({
          key: i,
          tokenId: attributes.token,
          serialNo: metaData.serial_No,
          purchase_date:
            moment(metaData.purchase_date as string)
              .toDate()
              .toString()
              .slice(0, 24) + " (IST)",
          warraty_valid_uptill:
            moment(metaData.warranty_valid_uptill as string)
              .toDate()
              .toString()
              .slice(0, 24) + " (IST)",
          customerAddress: metaData.sold_to,
          phone: user.phone,
          customerName: user.name,
          hash: attributes["transaction_hash"],
        });
      }
    }
    console.log(ans);
    setMintedProducts(ans.reverse());
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchAllMintedNFTSofABrand();
    axios
      .get(constants.BASE_URL + constants.API_ENDPOINTS.GET_ALL_TOKENS)
      .then(({ data }) => {
        console.log(data);
        setMinedNFTsServer(data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className=" center-form ">
      <div className="center-form-box mt-5">
        <h1 className="text-3xl font-bold">
          View all the minted NFT Details
          <span className="text-sm font-light inline-block ml-4">
            Contarct Address :{" "}
            <a
              href={
                constants.POLYGON_URL_ADDRESS + process.env.CONTRACT_ADDRESS
              }
              target="_blank"
              className=" underline"
              rel="noopener noreferrer"
            >
              {process.env.CONTRACT_ADDRESS}
            </a>
          </span>
        </h1>
        <p className="text-sm  font-semibold text-violet-600 inline-block">
          Please Note : NFTs may take up to 5 minute to get verified on
          blokchain and be visible here.
        </p>
        {!loading ? (
          <Table dataSource={mintedProducts} columns={columns} />
        ) : (
          <Skeleton active />
        )}
      </div>
    </div>
  );
}
