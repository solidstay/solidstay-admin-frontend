import axiosInstance from "./axiosInstance";

const BASE_URL = "/api/booking";

const bookingService = {
  // Create a new booking
  createBooking: async (payload) => {
    const response = await axiosInstance.post(`${BASE_URL}`, payload);
    return response.data;
  },

  // Get all bookings
  getAllBookings: async () => {
    const response = await axiosInstance.get(`${BASE_URL}`);
    return response.data;
  },

  // Get a single booking by ID
  getBookingById: async (id) => {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Update a booking by ID
  updateBooking: async (id, payload) => {
    const response = await axiosInstance.put(`${BASE_URL}/${id}`, payload);
    return response.data;
  },

  // Delete a booking by ID
  deleteBooking: async (id) => {
    const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
};

export default bookingService;
