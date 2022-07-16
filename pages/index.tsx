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
  REGISTER_USER = "Register User",
  VIEW_PRODUCTS = "Minted products",
  MINT_NFT = "Mint NFT",
  VIEW_USERS = "View Users",
}

import Link from "next/link";
import MintedNFTs from "../components/MintedNFTs";
import RegisterUser from "../components/RegisterUser";
import ViewUsers from "../components/ViewUsers";
import Login, { LogOut } from "./Login";
import { constants } from "../constants";

const Home: NextPage = () => {
  console.log(constants.BRAND_ID);
  const [current, setCurrent] = useState(MenuItems.VIEW_USERS);
  const handleMenuChange: MenuProps["onClick"] = (e) => {
    console.log("menu changed ", e);
    setCurrent(e.key as MenuItems.LIST_PRODUCT);
  };
  useEffect(() => {
    if (
      !window.localStorage.getItem("brandId") ||
      window.localStorage.getItem("brandId").length === 0
    ) {
      LogOut();
    }
  }, []);
  return true ? (
    <div>
      <Menu
        mode="horizontal"
        onClick={handleMenuChange}
        selectedKeys={[current]}
        defaultSelectedKeys={[MenuItems.VIEW_PRODUCTS]}
      >
        <Image width={200} src="/assets/logo.png" className="ml-1" />
        <Menu.Item key={MenuItems.LIST_PRODUCT}>
          {MenuItems.LIST_PRODUCT}
        </Menu.Item>
        <Menu.Item key={MenuItems.REGISTER_USER}>
          {MenuItems.REGISTER_USER}
        </Menu.Item>
        <Menu.Item key={MenuItems.MINT_NFT}>{MenuItems.MINT_NFT}</Menu.Item>
        <Menu.Item key={MenuItems.VIEW_PRODUCTS}>
          {MenuItems.VIEW_PRODUCTS}
        </Menu.Item>
        <Menu.Item key={MenuItems.VIEW_USERS}>{MenuItems.VIEW_USERS}</Menu.Item>
        <Menu.Item>
          <Button type="primary" onClick={LogOut}>
            Log Out
          </Button>
        </Menu.Item>
      </Menu>

      {current == MenuItems.LIST_PRODUCT && (
        <ListProduct handleMenuChange={setCurrent} />
      )}
      {current == MenuItems.MINT_NFT && (
        <MintNFT handleMenuChange={setCurrent} />
      )}
      {current == MenuItems.REGISTER_USER && (
        <RegisterUser handleMenuChange={setCurrent} />
      )}
      {current == MenuItems.VIEW_PRODUCTS && <MintedNFTs />}
      {current == MenuItems.VIEW_USERS && <ViewUsers />}
    </div>
  ) : (
    <h1>Pleae Login to view this page</h1>
  );
};

export default Home;
