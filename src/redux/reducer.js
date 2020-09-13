import { FETCH_REQUEST, FETCH_FAILURE, FETCH_SUCCESS, EMPTY_REDUCER } from "./actionTypes";

const initialState = {
  isLoading: false,
  launchPad: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SUCCESS:
      let { wind, main } = action.data;
      let launchObj = {};
      launchObj.temp = main.temp;
      launchObj.speed = wind.speed;
      return {
        ...state,
        launchPad: [...state.launchPad, launchObj],
      };
    case FETCH_FAILURE:
      return {
        ...state,
        error: action.err,
      };
    case EMPTY_REDUCER:
      return {
        ...state,
        isLoading: false,
        launchPad: [],
        error: "",
      };
    default:
      return state;
  }
};

export default reducer;
