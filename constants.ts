export const constants = {
  BRAND_ID: "123",
  BASE_URL: "http://127.0.0.1:3001",
  META_DATA_SERVER:
    "https://woxpdvfthtmznhwvymeo.supabase.co/storage/v1/object/public/nfts/",
  POLYGON_URL_ADDRESS: "https://mumbai.polygonscan.com/address/",
  POLYGON_URL_TX: "https://mumbai.polygonscan.com/tx/",
  TRANSFER_TABLE_NAME: "NFTtransfers",
  API_ENDPOINTS: {
    GET_ALL_USERS: {
      URL: "/allusers",
    },
    REGISTER_USER: {
      URL: "/user",
      METHOD: "POST",
    },
    LIST_PRODUCT: {
      URL: "/product",
      METHOD: "POST",
    },
    GET_ALL_PRODUCTS: {
      URL: "/products",
      METHOD: "GET",
    },
    GET_ALL_TOKENS: {
      URL: "/allnfts",
      METHOD: "GET",
    },
    MINT_NFT: {
      URL: "/nft",
      METHOD: "POST",
    },
    GET_USER: {
      URL: "/user",
      METHOD: "GET",
    },
  },
};
