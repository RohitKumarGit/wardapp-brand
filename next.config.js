/** @type {import('next').NextConfig} */
const withAntdLess = require("next-plugin-antd-less");
const nextConfig = {
  reactStrictMode: true,
  modifyVars: { "@primary-color": "#6E4AD0" },
  swcMinify: true,
  env: {
    MORALIS_APP_ID: "VimA9h8zjlBhvVBjCACaSzc4eCLGAAV0Bq72lyFS",
    MORALIS_APP_URL: "https://izgtxhkjzxcp.usemoralis.com:2053/server",
    DEEWARR_ACCOUNT: "0x7a2B903BD643c2f36C740c054BD7344B45Ccf9A8",
    CONTRACT_ADDRESS: "0x4F7AdfCBf661a485816d8bca6b987478998F09eF",
  },
};

module.exports = withAntdLess(nextConfig);
