import { del, get, path, post } from "../utils/request";

export const getProductList = async () => {
  const result = await get("products");
  return result;
}

