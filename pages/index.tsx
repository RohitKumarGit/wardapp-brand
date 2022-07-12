import type { NextPage } from "next";
import Head from "next/head";
import { Button, MenuProps, Image } from "antd";
import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import ListProduct from "../components/ListProduct";
import MintNFT from "../components/MintNFT";
export enum MenuItems {
  LIST_PRODUCT = "List products",
  VIEW_PRODUCTS = "Minted products",
  MINT_NFT = "Mint NFT",
  VIEW_USERS = "View Users",
}

const Home: NextPage = () => {
  const [current, setCurrent] = useState(MenuItems.LIST_PRODUCT);
  const handleMenuChange: MenuProps["onClick"] = (e) => {
    console.log("menu changed ", e);
    setCurrent(e.key as MenuItems.LIST_PRODUCT);
  };
  return (
    <div>
      <Menu
        mode="horizontal"
        onClick={handleMenuChange}
        selectedKeys={[current]}
        defaultSelectedKeys={[MenuItems.LIST_PRODUCT]}
      >
        <Image width={200} src="/assets/logo.png" className="ml-1" />
        <Menu.Item key={MenuItems.LIST_PRODUCT}>
          {MenuItems.LIST_PRODUCT}
        </Menu.Item>
        <Menu.Item key={MenuItems.MINT_NFT}>{MenuItems.MINT_NFT}</Menu.Item>
        <Menu.Item key={MenuItems.VIEW_PRODUCTS}>
          {MenuItems.VIEW_PRODUCTS}
        </Menu.Item>
        <Menu.Item key={MenuItems.VIEW_USERS}>{MenuItems.VIEW_USERS}</Menu.Item>
      </Menu>

      {current == MenuItems.LIST_PRODUCT && (
        <ListProduct handleMenuChange={setCurrent} />
      )}
      {current == MenuItems.MINT_NFT && (
        <MintNFT handleMenuChange={setCurrent} />
      )}
    </div>
  );
};

export default Home;
