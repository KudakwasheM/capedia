import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem("userInfo");
    }

    throw error;
  }
);

export default axiosClient;
