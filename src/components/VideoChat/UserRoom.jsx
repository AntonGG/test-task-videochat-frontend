import React, { useState } from "react";
import "../../sass/room.sass";

const UserRoom = ({ room, user, onNewPersonalMessages, personalMessages }) => {
  const [message, setMessage] = useState("");
  const messageList = personalMessages.find((pm) => pm.name === room.name);
  console.log("messageList --- ", messageList);
  return room ? (
    <div className="room">
      <div className="room-title">
        <p className="room-title__name">{room.name}</p>
        <p className="room-title__room-id">{room.roomId}</p>
      </div>
      <div className="room-messages">
        {messageList &&
          messageList.messages &&
          messageList.messages.map((msg, i) => (
            <div
              className={`room-message ${
                user && msg.user && msg.user.name === user.name
                  ? "room-message__my-message"
                  : ""
              }`}
              key={i}
            >
              <div>
                {console.log(msg)}
                <p
                  style={{ backgroundColor: msg.user.color + "a1" }}
                  className="room-message__logo"
                >
                  {msg.user.name.substr(0, 1).toUpperCase()}
                </p>
              </div>
              <div>
                <p className="room-message__name">{msg.user.name}</p>
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="room-input">
        <input
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onNewPersonalMessages({
                fromUser: user,
                toUserName: room.name,
                message,
              });
              setMessage("");
            }
          }}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          value={message}
          type="text"
          className="room-input__input"
        />
        <div
          onClick={() => {
            onNewPersonalMessages({
              fromUser: user,
              toUserName: room.name,
              message,
            });
            setMessage("");
          }}
          className="room-input__send-button"
        >
          <p>&#8594;</p>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default UserRoom;
