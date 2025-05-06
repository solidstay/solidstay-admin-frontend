import axiosInstance from './axiosInstance';

const BASE_URL = '/api/booking';

const bookingService = {
    // Create a new booking
    createBooking: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get all bookings
    getAllBookings: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get a single booking by ID
    getBookingById: async (id) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update a booking by ID
    updateBooking: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`${BASE_URL}/${id}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete a booking by ID
    deleteBooking: async (id) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default bookingService;
