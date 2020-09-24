import axios from "axios";
import * as actions from "../api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, onSuccess } = action.payload;

  // next(action);

  try {
    const response = await axios.request({
      baseURL: "http://localhost:5000/api",
      url,
      method,
    });

    dispatch(actions.apiCallSuccess(response.data));
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    dispatch(actions.apiCallFailed(error.message));
  }
};

export default api;
