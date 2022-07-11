export class Product {
  serial_no?: string; // key
  name: string;
  description: string;
  isSold: boolean;
  token_id: number;
  brand_id = "123";
}
export class User {
  products: string[]; // list of serial nos
  name: string;
  phone: string; // key
  blockChainAddress: string;
}
export class Token {
  token_id: number;
  serial_no: string;
}
