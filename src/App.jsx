import React, { Component } from "react";
import { connect } from "react-redux";
import AppBar from "./containers/AppBar/AppBar";
import ROUTES, { RenderRoutes } from "./routes";
import "./App.sass";
import Footer from "./components/Footer/Footer";
import { signIn } from "./actions/Auth";
import { withRouter } from "react-router-dom";

export class App extends Component {
  componentDidMount() {
    // if (window.location.pathname.indexOf("videochat")) {
    //   console.log(window.location);
    //   console.log(this.props.match);
    //   //localStorage.setItem("beginUrl", window.location);
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
    return (
      <div>
        <AppBar />
        <div className="body">
          <RenderRoutes routes={ROUTES} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.App.isAuth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (name, history, location) => {
      dispatch(signIn(name, history, location));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
