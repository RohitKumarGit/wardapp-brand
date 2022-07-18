import { Col, Image, Row } from "antd";
import { constants } from "../constants";

const HorizontalCard = ({ user }) => {
  // create a horizontal card with image on left and text on right
  console.log(user);
  return (
    <Row>
      <Col span={7}>
        <Image
          className=" rounded-md"
          src="https://picsum.photos/500"
          height={200}
          width={200}
        ></Image>
      </Col>
      <Col span={1}></Col>
      <Col span={7}>
        <div className=" text-md">
          <div>
            <span className=" text-gray-700 font-bold"> Name</span> :{" "}
            {user.name}
          </div>
          <div className="mt-3">
            <span className=" text-gray-700 font-bold"> Email</span> :
            {user.email ? user.email : "Not Available"}
          </div>
          <div className="mt-3">
            <span className=" text-gray-700 font-bold"> phone</span> :
            {user.phone}
          </div>
          <div className="mt-3">
            <span className=" text-gray-700 font-bold"> address</span> :{" "}
            {user.address ? user.address : "Not Available"}
          </div>
        </div>
      </Col>
      <Col span={7}>
        <div>
          <span className=" text-gray-700 font-bold"> Joined on </span> :
          Yesterday
        </div>
        <div className="mt-3">
          <span className=" text-gray-700 font-bold"> No. of products</span> :
          {user.products.length}
        </div>
        <div className="mt-3">
          <span className=" text-gray-700 font-bold"> BTC address </span> :
          <a
            href={constants.POLYGON_URL_ADDRESS + user.blockChainAddress}
            target="_blank"
          >
            {user.blockChainAddress}
          </a>
        </div>
      </Col>
    </Row>
  );
};
export default HorizontalCard;
