import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products/`;

// Create a custom Axios instance
const axiosInstance = axios.create();

// Create New Product
const createProduct = async (formData) => {
  const response = await axiosInstance.post(API_URL, formData);
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(API_URL + id);
  return response.data;
};

// Get a Product
const getProduct = async (id) => {
  const response = await axiosInstance.get(API_URL + id);
  return response.data;
};

// Update Product
const updateProduct = async (id, formData) => {
  const response = await axiosInstance.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
