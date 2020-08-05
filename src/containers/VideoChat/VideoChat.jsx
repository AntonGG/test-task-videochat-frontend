import React, { useEffect, useState } from "react";
import "../../sass/videoChat.sass";
import LeftMenu from "./LeftMenu";
import { Redirect, useRouteMatch } from "react-router";
import { connect } from "react-redux";
import { joinRoom, setActiveRoom } from "../../actions/User";
import ActiveRooms from "./ActiveRoom";

const VideoChat = ({
  isAuth,
  name,
  onSetActiveRoom,
  activeRoom,
  onJoinRoom,
}) => {
  const match = useRouteMatch();
  console.log(match);
  if (match.params && match.params.roomId) {
    localStorage.setItem("beginRoomId", match.params.roomId);
    onSetActiveRoom(match.params.roomId);
  }
  // const match = useRouteMatch();
  useEffect(() => {
    onJoinRoom(activeRoom);
  }, [activeRoom]); // [] - не удалять
  if (!isAuth || name === "") {
    return <Redirect to="/" />;
  }
  return (
    <div className="videochat">
      <div className="videochat-left-menu">
        <LeftMenu />
      </div>
      <div className="videochat-active-rooms">
        <ActiveRooms />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.App.name,
  isAuth: state.App.isAuth,
  activeRoom: state.User.activeRoom,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSetActiveRoom: (roomId) => {
      dispatch(setActiveRoom(roomId));
    },
    onJoinRoom: (roomId) => {
      dispatch(joinRoom(roomId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);
