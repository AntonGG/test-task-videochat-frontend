import history from "../../history";

const initialState = {
  isAuth: false,
  isLoading: false,
  isLoadingSignIn: false,
  isError: false,
  errorMsg: "",
  name: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "is-auth":
      if (payload.isAuth) {
        console.log("is-auth", type, payload);
        localStorage.setItem("name", payload.name);
        return {
          ...state,
          name: payload.name,
          isAuth: true,
        };
      } else {
        return { ...state, isAuth: false };
      }
    case "START_LOADING_SIGN_IN":
      return { ...state, isLoadingSignIn: true };
    case "FINISH_LOADING_SIGN_IN":
      return { ...state, isLoadingSignIn: false };
    case "SET_INPUT":
      return { ...state, ...payload };
    case "SIGN_IN_SUCCESS":
      return { ...state, isAuth: true };
    case "SIGN_IN_INVALID":
      return { ...state, isAuth: false };
    case "LOGOUT":
      return { ...state, isAuth: false, name: "" };
    case "ERROR":
      return { ...state, isError: true, errorMsg: payload };
    default:
      return state;
  }
};
