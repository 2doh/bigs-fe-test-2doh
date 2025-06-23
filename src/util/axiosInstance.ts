import axios from "axios";
import { userAuthStore } from "../store/userStore";
import Cookies from "js-cookie";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
  const accessToken = userAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refresh");
        if (!refreshToken) {
          window.location.href = "/auth/login";
          alert("로그아웃 되었습니다.");
          return Promise.reject(error);
        }

        const res = await axios.post(
          "https://front-mission.bigs.or.kr/auth/refresh",
          {
            refreshToken,
          },
        );
        const newAccessToken = res.data.accessToken;
        userAuthStore.getState().setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        window.location.href = "/auth/login";
        alert("알 수 없는 오류가 발생했습니다.");
        return Promise.reject(refreshError);
      }
    }
  },
);

export default axiosInstance;
