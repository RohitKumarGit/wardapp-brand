import { AutoComplete, Card, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import axios from "axios";
import { constants } from "../constants";
import { useEffect, useState } from "react";
import HorizontalCard from "./HorizontalCard";
import horizontalCard from "./HorizontalCard";
import { Product, User } from "../utils";
import UserCardHorizontal from "./UserCardHorizontal";
const Usercard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUser, setFilteredUser] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const setFilteredUsers = (users) => {
    setFilteredUser(
      users.map((user) => {
        return {
          ...user,
          value: user.name,
        };
      })
    );
  };
  const getAllUsers = async function () {
    setLoading(true);
    let { data } = await axios.get(
      constants.BASE_URL + constants.API_ENDPOINTS.GET_ALL_USERS.URL
    );
    // filter products with brand id
    (data as User[]).forEach((user) => {
      user.products = (user.products as Product[]).filter((product) => {
        return product.brand_id === window.localStorage.getItem("brandId");
      });
    });
    setUsers(data);
    setFilteredUsers(data);
    setLoading(false);
  };

  const handleSearch = (value: string) => {
    const searchValue = value.toLowerCase();
    if (searchValue === "") {
      setFilteredUsers(users);
    }
    const filteredUser = users
      .filter((user) => {
        return user.name.toLowerCase().includes(searchValue);
      })
      .slice(0, 10);
    setFilteredUsers(filteredUser);
  };

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      {loading ? (
        <Card loading={loading}></Card>
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          <span className=" text-gray-500">Seach for a user</span>
          <AutoComplete
            options={filteredUser}
            onSelect={onSelect}
            style={{ width: "100%" }}
            onSearch={handleSearch}
            placeholder="Start typing name of user"
          />
          {filteredUser.map((user) => (
            <UserCardHorizontal user={user} key={user.phone} />
          ))}
        </Space>
      )}
    </div>
  );
};
export default Usercard;
