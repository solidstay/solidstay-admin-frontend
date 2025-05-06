import axiosInstance from './axiosInstance';

const BASE_URL = '/api/property';

const propertyService = {
    // Create a new property
    createProperty: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all properties
    getAllProperties: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get a single property by ID
    getPropertyById: async (id) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update a property by ID
    updateProperty: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`${BASE_URL}/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete a property by ID
    deleteProperty: async (id) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default propertyService;
