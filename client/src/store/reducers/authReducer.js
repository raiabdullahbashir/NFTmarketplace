import ACTIONS from "../actions/";

const initialState = {
  user: [],
  isLogged: false,
  isAdmin: false,
  loading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isLogged: true,
        loading: false,
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        isAdmin: action.payload.isAdmin,
      };
    default:
      return state;
  }
};

export default authReducer;
