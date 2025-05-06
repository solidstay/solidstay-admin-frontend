import axiosInstance from "./axiosInstance";

const BASE_URL = "/api/user";

const userService = {
  loginUser: async (payload) => {
    const response = await axiosInstance.post(`${BASE_URL}/login`, payload, {
      withCredentials: true,
      skipAuthRefresh: true,
    });
    return response.data;
  },
  registerUser: async (payload, userType) => {
    const response = await axiosInstance.post(
      `${BASE_URL}/${userType}-register`,
      payload,
      { withCredentials: true, skipAuthRefresh: true }
    );
    return response.data;
  },
  forgotPassword: async (payload) => {
    const response = await axiosInstance.post(
      `${BASE_URL}/forgot-password`,
      payload,
      { withCredentials: true, skipAuthRefresh: true }
    );
    return response.data;
  },
  resetPassword: async (payload) => {
    const response = await axiosInstance.post(
      `${BASE_URL}/reset-password`,
      payload,
      { withCredentials: true, skipAuthRefresh: true }
    );
    return response.data;
  },
  refreshToken: async (payload) => {
    const response = await axiosInstance.post(
      `${BASE_URL}/refresh-token`,
      payload,
      { withCredentials: true, skipAuthRefresh: true }
    );
    return response.data;
  },
  logoutUser: async (payload) => {
    const response = await axiosInstance.post(`${BASE_URL}/logout`, payload, {
      withCredentials: true,
    });
    return response.data;
  },
  getUserInfo: async () => {
    const response = await axiosInstance.get(`${BASE_URL}/fetch-user-info`);
    return response.data;
  },
  updateUserInfo: async (payload) => {
    const response = await axiosInstance.patch(
      `${BASE_URL}/update-user-info`,
      payload
    );
    return response.data;
  },
  changeUserPassword: async (payload) => {
    const response = await axiosInstance.patch(
      `${BASE_URL}/change-user-password`,
      payload
    );
    return response.data;
  },
  searchEmployees: async (query) => {
    const response = await axiosInstance.get(`${BASE_URL}/search-employees`, {
      params: query,
    });
    return response.data;
  },
  searchUsers: async (query) => {
    const response = await axiosInstance.get(`${BASE_URL}/search-users`, {
      params: query,
    });
    return response.data;
  },
  createEmployee: async (payload) => {
    const response = await axiosInstance.post(
      `${BASE_URL}/create-employee`,
      payload
    );
    return response.data;
  },
  createUser: async (payload) => {
    const response = await axiosInstance.post(
      `${BASE_URL}/create-user`,
      payload
    );
    return response.data;
  },
  updateEmployee: async (userId, payload) => {
    const response = await axiosInstance.patch(
      `${BASE_URL}/update-employee/${userId}`,
      payload
    );
    return response.data;
  },
  updateUser: async (userId, payload) => {
    const response = await axiosInstance.patch(
      `${BASE_URL}/update-user/${userId}`,
      payload
    );
    return response.data;
  },
  deleteEmployee: async (userId) => {
    const response = await axiosInstance.delete(
      `${BASE_URL}/delete-employee/${userId}`
    );
    return response.data;
  },
  deleteUser: async (userId) => {
    const response = await axiosInstance.delete(
      `${BASE_URL}/delete-user/${userId}`
    );
    return response.data;
  },
};

export default userService;
