import axios from "axios";

//TODO : add authorisation
export const getProducts = async () => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const productsUrl = `${storeBaseUrl}/api/products`;

    const response = await axios.get(productsUrl);
    const products = response.data;
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const postProduct = async (payload: any) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const productsUrl = `${storeBaseUrl}/api/products`;
    const product = await axios.post(productsUrl, payload);
    return product;
  } catch (error) {
    console.error("Error post product:", error);
  }
};
