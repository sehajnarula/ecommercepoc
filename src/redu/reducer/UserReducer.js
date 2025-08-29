import { SIGNIN_REQUEST,SIGNIN_SUCCESS,SIGNIN_FAILURE,SIGNUP_REQUEST,SIGNUP_SUCCESS,SIGNUP_FAILURE,UPDATE_REQUEST,UPDATE_SUCCESS,UPDATE_FAILURE,SIGNOUT,GOOGLE_SIGNIN_REQUEST,GOOGLE_SIGNIN_SUCCESS,GOOGLE_SIGNIN_FAILURE } from "../actions/UserActions";

const initialUserState = {
    user:{},
    error:null
};

export default function UserReducer(state = initialUserState, action) {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return { ...state, error: null };
    case SIGNIN_SUCCESS:
      return { ...state, user: action.payload, error: null };
    case SIGNIN_FAILURE:
      return { ...state, error: action.payload };
    case SIGNUP_REQUEST:
    return { ...state, error: null };
    case SIGNUP_SUCCESS:
    return { ...state, user: action.payload, error: null };
    case SIGNUP_FAILURE:
    return { ...state, error: action.payload };
    case UPDATE_REQUEST:
    return { ...state, error: null };
    case UPDATE_SUCCESS:
    return { ...state, user: action.payload, error: null };
    case UPDATE_FAILURE:
    return { ...state, error: action.payload };
    case GOOGLE_SIGNIN_REQUEST:
    return {...state, error: null};
    case GOOGLE_SIGNIN_SUCCESS:
    return { ...state, user: action.payload, error: null };               
    case GOOGLE_SIGNIN_FAILURE:
    return { ...state, error: action.payload };
    case SIGNOUT:
      return { ...state, user: {} };
    default:
      return state;
  }
}