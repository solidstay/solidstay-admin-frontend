import axiosInstance from "./axiosInstance";

// add report
export const uploadImg = async (payload) => {
  const response = await axiosInstance.post("/api/image/upload", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
