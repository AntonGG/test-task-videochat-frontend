import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  joinRoom,
  newPersonalMessages,
  sendMessage,
  startPresenter,
  stopPresenter,
} from "../../actions/User";

import Room from "../../components/VideoChat/Room";
// import UserRoom from "../../components/VideoChat/UserRoom";

const ActiveRoom = ({
  rooms,
  myName,
  activeRoom,
  users,
  onSendMessage,
  onStartPresenter,
  onStopPresenter,
  onJoinRoom,
}) => {
  if (activeRoom) {
    console.log("activeRoom", activeRoom);
    const myProfile = users.find((user) => user.name === myName);
    if (myProfile && rooms) {
      const room = rooms.find((room) => room.roomId === activeRoom);
      if (room) {
        return (
          <div className="current-room">
            <Room
              user={myProfile}
              room={room}
              onSendMessage={onSendMessage}
              onStartPresenter={onStartPresenter}
              onStopPresenter={onStopPresenter}
            />
          </div>
        );
      }
    }
  }

  return (
    <div className="current-room__not-found">
      <p>Войдите в комнату</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeRoom: state.User.activeRoom,
  rooms: state.User.rooms,
  users: state.User.users,
  myName: state.App.name,
  personalMessages: state.User.personalMessages,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSendMessage: (roomId, message, user) => {
      dispatch(sendMessage(roomId, message, user));
    },
    onNewPersonalMessages: ({ fromUser, toUserName, message }) => {
      dispatch(newPersonalMessages({ fromUser, toUserName, message }));
    },
    onStartPresenter: (stream, roomId) => {
      dispatch(startPresenter(stream, roomId));
    },
    onStopPresenter: (roomId) => {
      dispatch(stopPresenter(roomId));
    },
    onJoinRoom: (roomId) => {
      dispatch(joinRoom(roomId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveRoom);
