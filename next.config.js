/** @type {import('next').NextConfig} */
const withAntdLess = require("next-plugin-antd-less");
const nextConfig = {
  reactStrictMode: true,
  modifyVars: { "@primary-color": "#6E4AD0" },
  swcMinify: true,
  env: {
    MORALIS_APP_ID: "IPd50uk3FeDtcWWZGpVyN320vV7M7SuduP8jypRi",
    MORALIS_APP_URL: "https://djrurjo1oykn.usemoralis.com:2053/server",
  },
};

module.exports = withAntdLess(nextConfig);
