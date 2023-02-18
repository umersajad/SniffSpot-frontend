import { axiosConnect } from "../../configs/axiosConfig";
import { authEndpoints } from "./constant/constant";

export const loginHandler = async (payload) => {
  try {
    const response = await axiosConnect().post(authEndpoints.login, payload);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};
