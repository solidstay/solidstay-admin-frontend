import axiosInstance from "./axiosInstance";

const BASE_URL = "/api/property";

const propertyService = {
  // Create a new property
  createProperty: async (payload) => {
    const response = await axiosInstance.post(`${BASE_URL}`, payload);
    return response.data;
  },

  // Get all properties
  getAllProperties: async () => {
    const response = await axiosInstance.get(`${BASE_URL}`);
    return response.data;
  },

  // Get a single property by ID
  getPropertyById: async (id) => {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Update a property by ID
  updateProperty: async (id, payload) => {
    const response = await axiosInstance.put(`${BASE_URL}/${id}`, payload);
    return response.data;
  },

  // Delete a property by ID
  deleteProperty: async (id) => {
    const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
};

export default propertyService;
