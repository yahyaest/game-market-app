import axios from "axios";

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

export const getPagedProducts = async (page: number = 1) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;

    const productsUrl = `${storeBaseUrl}/api/products/?page=${page}`;

    const response = await axios.get(productsUrl);
    const products = response.data.results;
    const productsCount = response.data.count;
    return {products, productsCount};
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const getProduct = async (productId: number) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const productsUrl = `${storeBaseUrl}/api/products/${productId}/`;

    const product = await axios.get(productsUrl);
    return product.data;
  } catch (error) {
    console.error("Error fetching product:", error);
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

export const updateProduct = async (token: string, productId: number, payload: any) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const productsUrl = `${storeBaseUrl}/api/products/${productId}/`;

    const options: any = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const product = await axios.patch(productsUrl, payload, options);
    return product.data;
  } catch (error) {
    console.error("Error update product:", error);
  }
};

export const postReview = async (token: string, payload: any) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const productId = payload.product_id
    const reviewsUrl = `${storeBaseUrl}/api/products/${productId}/reviews/`;

    const options: any = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const review = await axios.post(reviewsUrl, payload, options);
    return review.data;
  } catch (error) {
    console.error("Error post review:", error);
  }
};
