const recoverySession = (setName, onIsAuth, signIn, history) => {
  if (!this.props.isAuth) {
    if (localStorage.getItem("name")) {
      setName(localStorage.getItem("name"));
      signIn(localStorage.getItem("name"), this.props.history);
      onIsAuth();
    }
  }
};