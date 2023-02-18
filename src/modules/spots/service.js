import { axiosConnect } from "../../configs/axiosConfig";
import { spotsEndpoints } from "./constant/constant";
import { persistStore } from "redux-persist";
import { store } from "../../redux/store/store";

const persistor = persistStore(store);
const token = persistor.getState();

const authToken = localStorage.getItem("authToken");

export const spotListingHandler = async (pageNo) => {
  try {
    console.log(token, "0000");
    const response = await axiosConnect().get(
      spotsEndpoints.listingSpots + `?page=${pageNo}`
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};

export const spotDetailsHandler = async (payload) => {
  try {
    const response = await axiosConnect().get(
      spotsEndpoints.spotDetails + `/${payload}`
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};

export const createSpotHandler = async (payload) => {
  try {
    const response = await axiosConnect(authToken).post(
      spotsEndpoints.createSpot,
      payload
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};

export const updateSpotHandler = async (payload, id) => {
  try {
    const response = await axiosConnect(authToken).put(
      spotsEndpoints.updateSpot + `/${id}`,
      payload
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};
