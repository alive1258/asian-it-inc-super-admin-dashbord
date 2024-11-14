import { AUTH_KEY } from "@/constants/keys";
import { instance as axiosInstance } from "@/helpers/axiosInstance";
import { decodedToken } from "@/hooks/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/hooks/local-storage";

export const storeUserInfo = (accessToken) => {
  if (!accessToken) {
    return; // or handle the absence of accessToken accordingly
  }
  return setToLocalStorage(AUTH_KEY, accessToken);
};

export const getUserinfo = () => {
  const authToken = getFromLocalStorage(AUTH_KEY);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return {
      ...decodedData,
      //   role: decodedData?.role.toLowerCase(),
    };
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(AUTH_KEY);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removeFromLocalStorage(AUTH_KEY);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-tokens`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
