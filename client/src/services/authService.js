import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Create a custom Axios instance
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.statusText === "OK") {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    return Promise.reject(error);
  }
);

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `${BACKEND_URL}/api/users/register`,
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    // The interceptor will handle the error toast
    throw error;
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `${BACKEND_URL}/api/users/login`,
      userData
    );
    return response.data;
  } catch (error) {
    // The interceptor will handle the error toast
    throw error;
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await axiosInstance.get(`${BACKEND_URL}/api/users/logout`);
  } catch (error) {
    // The interceptor will handle the error toast
    throw error;
  }
};

// Forgot Password
export const forgotPassword = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `${BACKEND_URL}/api/users/forgotpassword`,
      userData
    );
    return response.data;
  } catch (error) {
    // The interceptor will handle the error toast
    throw error;
  }
};

// Reset Password
export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axiosInstance.put(
      `${BACKEND_URL}/api/users/resetpassword/${resetToken}`,
      userData
    );
    return response.data;
  } catch (error) {
    // The interceptor will handle the error toast
    throw error;
  }
};

// Get Login Status
export const getLoginStatus = async () => {
  try {
    const response = await axiosInstance.get(`${BACKEND_URL}/api/users/loggedin`);
    return response.data;
  } catch (error) {
    // The interceptor will handle the error toast
    throw error;
  }
};

// Get User Profile
export const getUser = async () => {
  try {
    const response = await axiosInstance.get(`${BACKEND_URL}/api/users/getuser`);
    return response.data;
  } catch (error) {
    // The interceptor will handle the error toast
    throw error;
  }
};

// Update Profile
export const updateUser = async (formData) => {
  try {
    const response = await axiosInstance.patch(
      `${BACKEND_URL}/api/users/updateuser`,
      formData
    );
    return response.data;
  } catch (error) {
    // The interceptor will handle the error toast
    throw error;
  }
};

// Update Password
export const changePassword = async (formData) => {
  try {
    const response = await axiosInstance.patch(
      `${BACKEND_URL}/api/users/changepassword`,
      formData
    );
    return response.data;
  } catch (error) {
    // The interceptor will handle the error toast
    throw error;
  }
};
