import React from "react";
import { Link } from "react-router-dom";
import "../../sass/leftMenuList.sass";
const RoomsList = ({ rooms, activeRoom, onSetActiveRoom, onJoinRoom }) => {
  return (
    <div className="left-menu-list">
      {rooms &&
        rooms.map((room, i) => (
          <Link
            to={`/vc/videochat/${room.roomId}`}
            onClick={() => {
              onSetActiveRoom(room.roomId);
              onJoinRoom(room.roomId);
            }}
            key={i}
            className={`left-menu-list__item ${
              room.roomId === activeRoom ? "left-menu-list__item__active" : ""
            }`}
          >
            <div>
              <p
                style={{ backgroundColor: `${room.color}a1` }}
                className="left-menu-list__logo"
              >
                {room.name.substr(0, 1).toUpperCase()}
              </p>
            </div>
            <div>
              <p>{room.name}</p>
              {/* <p>{room.roomId}</p> */}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default RoomsList;
