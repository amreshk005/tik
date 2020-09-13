import axios from "axios";
import { FETCH_REQUEST, FETCH_FAILURE, FETCH_SUCCESS, EMPTY_REDUCER } from "./actionTypes";

export const fetchRequest = (payload) => ({
  type: FETCH_REQUEST,
  payload,
});

export const fetchSuccess = (payload) => ({
  type: FETCH_SUCCESS,
  data: payload,
});

export const fetchFailure = (err) => ({
  type: FETCH_FAILURE,
  err: err,
});

export const emptyReducer = () => ({
  type: EMPTY_REDUCER,
});

export const fetchData = (query = "") => {
  let url = `http://api.openweathermap.org/data/2.5/weather?id=${query}&appid=cd5d91637dd768c7d3de2032fbb264b7`;
  return async (dispatch) => {
    dispatch(fetchRequest());
    return await axios
      .get(url)
      .then((res) => {
        // console.log(res);
        return dispatch(fetchSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchFailure(err));
      });
  };
};
