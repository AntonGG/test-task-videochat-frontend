import React, { Component } from "react";
import "../../sass/appBar.sass";
import RightMenu from "../../components/AppBar/RightMenu/RightMenu";
import { connect } from "react-redux";
import { logout } from "../../actions/Auth";
import { withRouter } from "react-router";

class AppBar extends Component {
  render() {
    return (
      <div className="app-bar">
        <div className="app-bar_left-container">
          <p>Videochat</p>
        </div>
        <RightMenu
          isAuth={this.props.isAuth}
          onLogout={() => this.props.onLogout()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.App.isAuth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppBar));
