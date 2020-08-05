import socket from "../../services/socket";

export const setInput = (payload) => async (dispatch) => {
  dispatch({ type: "SET_INPUT", payload });
};

export const setAuthRedirectTo = (payload) => async (dispatch) => {
  dispatch({ type: "SET_AUTH_REDIRECT_TO", payload });
};

export const signIn = (name) => async (dispatch) => {
  dispatch({ type: "START_LOADING_SIGN_IN" });
  socket.emit("sign-in", { name });
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("name");
  socket.close();
  dispatch({ type: "LOGOUT" });
  window.location.reload();
};
