import React, { useEffect, useRef, useState } from "react";
import "../../sass/room.sass";
import { Camera } from "./Camera";
import Chat from "./Chat";
import RoomsList from "./RoomsList";

const Room = ({ room, user, onSendMessage, onStartPresenter }) => {
  const [isPresenter, setPresenter] = useState(false);

  useEffect(() => {
    if (room.owner === user.name) {
      setPresenter(true);
    }
  }, []);

  return room ? (
    <div className="room">
      <div className="room-body">
        <div className="room-body-left-block">
        
            <div className="room-video-player">
              <Camera
                isPresenter={isPresenter}
                roomId={room.roomId}
                onStartPresenter={onStartPresenter}
              />
            </div>
         
        </div>
        <div className="room-body-right-block">
          <Chat room={room} user={user} onSendMessage={onSendMessage} />
        </div>
        <div className="room-users">
          <p className="room-title__name">{room.name}</p>
          <p>В комнате</p>
          {room.users &&
            room.users.map((user, i) => (
              <div key={i} className="room-users-item">
                <p
                  style={{ backgroundColor: user.color + "a1" }}
                  className="room-users-item__logo"
                >
                  {user.name.substr(0, 1).toUpperCase()}
                </p>
                <p className="room-users-item__name">{user.name}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Room;
