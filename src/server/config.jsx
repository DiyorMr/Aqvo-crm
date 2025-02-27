import axios from "axios";

export const httpRequest = (config) => {
  const token = localStorage.getItem("accToken");
  const url = "https://aqvo.limsa.uz/api/";

  const axiosInstance = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    validateStatus: function (status) {
      if (status === 401) {
        window.location.href = "/login";
      } else {
        return status !== 401;
      }
    },
  });

  return axiosInstance(config);
};
