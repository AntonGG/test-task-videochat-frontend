import React, { useEffect, useRef, useState } from "react";

const Chat = ({ room, user, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [room.messages]);
  
  return (
    <div className="chat">
      <div className="room-messages">
        {room.messages &&
          room.messages.map((msg, i) => (
            <div
              className={`room-message ${
                user && msg.user && msg.user.name === user.name
                  ? "room-message__my-message"
                  : ""
              }`}
              key={i}
            >
              <div>
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
        <div ref={messagesEndRef} />
      </div>
      <div className="room-input">
        <input
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSendMessage(room.roomId, message, user);
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
            onSendMessage(room.roomId, message, user);
            setMessage("");
          }}
          className="room-input__send-button"
        >
          <p>&#8594;</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
