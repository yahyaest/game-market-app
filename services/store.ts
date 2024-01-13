import axios from "axios";
import { headers } from "next/headers";

export const getCollections = async () => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const collectionsUrl = `${storeBaseUrl}/api/collections/`;

    const response = await axios.get(collectionsUrl);
    const collections = response.data.results;
    return collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};

export const getProducts = async (queryParams: any = {}) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const queryString = Object.keys(queryParams)
    .map(
      (key) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
      )
      .join("&");
    const productsUrl = `${storeBaseUrl}/api/products/${queryString ? `?${queryString}` : ''}`;

    const response = await axios.get(productsUrl);
    const products = response.data.results;
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const postProduct = async (token: string, payload: any) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const productsUrl = `${storeBaseUrl}/api/products/`;

    const options: any = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const product = await axios.post(productsUrl, payload, options);
    return product.data;
  } catch (error) {
    console.error("Error post product:", error);
  }
};
