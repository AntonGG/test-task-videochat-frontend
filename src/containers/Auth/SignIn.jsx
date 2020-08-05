import React from "react";
import "../../sass/auth.sass";
import { connect } from "react-redux";
import { setInput, signIn } from "../../actions/Auth";
import { Redirect, withRouter } from "react-router";
import { joinRoom } from "../../actions/User";

class SignIn extends React.Component {
  componentDidMount() {
    // const { isAuth, location, onSignIn } = this.props;
    // if (!isAuth && localStorage.getItem("name")) {
    //   if (location.pathname.indexOf("videochat") > -1) {
    //     onSignIn(localStorage.getItem("name"), this.props.history);
    //   } else {
    //     onSignIn(localStorage.getItem("name"), this.props.history);
    //   }
    // }
    // if (!this.props.isAuth && localStorage.getItem("name")) {
    //   const { location } = this.props;
    //   if (location.pathname.indexOf("videochat") > -1) {
    //     this.props.onSignIn(
    //       localStorage.getItem("name"),
    //       this.props.history,
    //       location
    //     );
    //   } else {
    //     this.props.onSignIn(localStorage.getItem("name"), this.props.history);
    //   }
    // }
  }
  render() {
    const { isAuth, onSignIn, onSetInput, name, onJoinRoom } = this.props;
    if (isAuth) {
      const beginRoomId = localStorage.getItem("beginRoomId");
      if (beginRoomId) {
        localStorage.removeItem("beginRoomId");
       // onJoinRoom(beginRoomId);
        return <Redirect to={`/vc/videochat/${beginRoomId}`} />;
      }
      return <Redirect to="/vc/videochat" />;
    }
    if (!isAuth || name === "") {
      const localName = localStorage.getItem("name");
      if (localName) {
        onSignIn(localName);
      }
    }
    return (
      <div className="auth">
        <div className="auth__text-area">
          <p>Вход</p>
          <input
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSignIn(name);
              }
            }}
            onChange={(event) => onSetInput({ name: event.target.value })}
            className="auth__input"
            value={name}
            placeholder="Ваше имя"
          />

          <div
            onClick={() => {
              onSignIn(name);
            }}
            className="auth__button"
          >
            Войти &#10230;
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.App.name,
  isAuth: state.App.isAuth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSetInput: (payload) => {
      dispatch(setInput(payload));
    },
    onSignIn: (name) => {
      dispatch(signIn(name));
    },
    onJoinRoom: (roomId) => {
      dispatch(joinRoom(roomId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
