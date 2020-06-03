import initialState from "store/initialState";
import * as actionTypes from "actions/actionTypes";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_TRIP_FORM:
      return {
        ...state,
        ...action.payload,
        showTripForm: true,
        completeTripMessage: null
      };
    case actionTypes.CLOSE_NEW_TRIP_FORM:
      return {
        ...state,
        showTripForm: false,
        newTripCreatedMessage: ''
      };
    case actionTypes.SHOW_LOGIN_FORM:
      return {
        ...state,
        showLoginForm: true,
      };
    case actionTypes.AUTHENTICATE:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.CLOSE_LOGIN_FORM:
      return {
        ...state,
        showLoginForm: false,
      };
    case actionTypes.GET_TRIP_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.SELECTED_TRIP_ID:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.NEW_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.GET_TRIP_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.GET_REQUEST_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.PONG_STATUS:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...initialState,
        ...action.payload,
      };
    case actionTypes.PROFILE_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.SIGN_UP:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.LOADING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
