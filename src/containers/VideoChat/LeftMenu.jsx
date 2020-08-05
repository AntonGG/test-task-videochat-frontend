import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addRoom, joinRoom, setActiveRoom } from "../../actions/User";
import RoomsList from "../../components/VideoChat/RoomsList";
import "../../sass/leftMenu.sass";

const LeftMenu = ({
  name,
  rooms,
  users,
  onAddRoom,
  activeRoom,
  onSetActiveRoom,
  onJoinRoom,
}) => {
  // const match = useRouteMatch();
  // const [switchMenu, setSwitchMenu] = useState(
  //   match.path.indexOf("/user") > -1 ? true : false
  // );
  const [roomName, setRoomName] = useState("");

  return (
    <div className="left-menu">
      <>
        <div className="room-adding">
          <input
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onAddRoom({ roomName, ownerName: name });
                setRoomName("");
              }
            }}
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
            type="text"
            placeholder="Имя новой комнаты"
          />
          <div
            onClick={() => {
              onAddRoom({ roomName, ownerName: name });
              setRoomName("");
            }}
            className="room-adding__button"
          >
            <p>+</p>
          </div>
        </div>
        <RoomsList
          rooms={rooms}
          activeRoom={activeRoom}
          onSetActiveRoom={onSetActiveRoom}
          onJoinRoom={onJoinRoom}
        />
      </>
    </div>
  );
};

const mapStateToProps = (state) => ({
  rooms: state.User.rooms,
  users: state.User.users,
  activeRoom: state.User.activeRoom,
  name: state.App.name,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onAddRoom: ({ roomName, ownerName }) => {
      dispatch(addRoom({ roomName, ownerName }));
    },
    onSetActiveRoom: (roomId) => {
      dispatch(setActiveRoom(roomId));
    },
    onJoinRoom: (roomId) => {
      dispatch(joinRoom(roomId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
