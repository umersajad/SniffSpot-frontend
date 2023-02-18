import { axiosConnect } from "../../configs/axiosConfig";
import { reviewsEndpoints } from "./constant/constant";

export const createReviewHandler = async (payload, spot_id) => {
  try {
    const response = await axiosConnect(localStorage.getItem("authToken")).post(
      reviewsEndpoints.createReview + `${spot_id}/reviews`,
      payload
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};

export const updateReviewHandler = async (payload, id) => {
  try {
    const response = await axiosConnect(localStorage.getItem("authToken")).put(
      reviewsEndpoints.updateReview + `/${id}`,
      payload
    );
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};
