import initialState from "../store/initialState";
import * as actionTypes from "../actions/actionTypes";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_TRIP_FORM:
      return {
        ...state,
        ...action.payload,
        showTripForm: true,
      };
    default:
      return state;
  }
};
export default rootReducer;
