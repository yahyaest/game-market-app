import axios from "axios";
import { Card } from '@nextui-org/react';

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
    const productsUrl = `${storeBaseUrl}/api/products/${
      queryString ? `?${queryString}` : ""
    }`;

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
    return { products, productsCount };
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

export const getProductImages = async (productId: number) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const productsUrl = `${storeBaseUrl}/api/products/${productId}/images/`;

    const product = await axios.get(productsUrl);
    return product.data.results;
  } catch (error) {
    console.error("Error fetching product images:", error);
  }
};

export const getProductReviews = async (productId: number) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const productsUrl = `${storeBaseUrl}/api/products/${productId}/reviews/`;

    const product = await axios.get(productsUrl);
    return product.data.results;
  } catch (error) {
    console.error("Error fetching product reviews:", error);
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

export const updateProduct = async (
  token: string,
  productId: number,
  payload: any
) => {
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
    const productId = payload.product_id;
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

export const getCart = async (cartId: string) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const cartsUrl = `${storeBaseUrl}/api/carts/${cartId}`;

    const cart = await axios.get(cartsUrl);
    return cart.data;
  } catch (error) {
    console.error("Error get cart:", error);
  }
};

export const postCart = async (payload = {}) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const cartsUrl = `${storeBaseUrl}/api/carts/`;

    const cart = await axios.post(cartsUrl, payload);
    return cart.data;
  } catch (error) {
    console.error("Error post cart:", error);
  }
};

export const deleteCart = async (cartId: string) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const cartsUrl = `${storeBaseUrl}/api/carts/${cartId}/`;

    const cart = await axios.delete(cartsUrl);
    return cart.data;
  } catch (error) {
    console.error("Error update cart:", error);
  }
};

export const postCartItem = async (payload: any) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const cartId = payload.cart_id;
    const cartItemsUrl = `${storeBaseUrl}/api/carts/${cartId}/items/`;

    const cartItem = await axios.post(cartItemsUrl, payload);
    return cartItem.data;
  } catch (error) {
    console.error("Error post cart item:", error);
  }
};

export const updateCartItem = async (cartId: string, cartItemId: string, payload: any) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const cartItemsUrl = `${storeBaseUrl}/api/carts/${cartId}/items/${cartItemId}/`;

    const cartItem = await axios.patch(cartItemsUrl, payload);
    return cartItem.data;
  } catch (error) {
    console.error("Error update cart item:", error);
  }
};

export const deleteCartItem = async (cartId: string, cartItemId: string) => {
  try {
    const storeBaseUrl = process.env.STORE_BASE_URL;
    const cartItemsUrl = `${storeBaseUrl}/api/carts/${cartId}/items/${cartItemId}/`;

    const cart = await axios.delete(cartItemsUrl);
    return cart.data;
  } catch (error) {
    console.error("Error delete cart item:", error);
  }
};
