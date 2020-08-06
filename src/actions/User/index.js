import socket from "../../services/socket";
import { disconnectAll } from "../../services/webrtc";

export const setInputUser = (payload) => async (dispatch) => {
  dispatch({ type: "SET_INPUT_USER", payload });
};

//отправляем новое сообщение
export const newPersonalMessages = ({
  fromUser,
  toUserName,
  message,
}) => async (dispatch) => {
  console.log("newPersonalMessages", fromUser, toUserName, message);
  socket.emit("new-personal-messages", { fromUser, toUserName, message });
  return true;
};

//запрашиваем личные сообщения с нужным юзером
export const getPersonalMessages = (fromUserName, toUserName) => async (
  dispatch
) => {
  socket.emit("get-personal-messages", { fromUserName, toUserName });
};

//задание активной комнаты
export const setActiveRoom = (roomId) => async (dispatch) => {
  dispatch({ type: "SET_ACTIVE_ROOM", payload: roomId });
};

//вход  в комнату
export const joinRoom = (roomId) => async (dispatch) => {
  socket.emit("join-room", { roomId });
  //dispatch(setActiveRoom(roomId));
};

export const sendMessage = (roomId, message, user) => async (dispatch) => {
  socket.emit("new-message", { roomId, message, user });
};

export const addRoom = ({ roomName, ownerName }) => async (dispatch) => {
  socket.emit("new-room", { roomName, ownerName });
};
const rtcConfig = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302"],
    },
  ],
};
export const startPresenter = (stream, roomId) => async (dispatch) => {
  socket.emit("stream-room", { roomId });
};

export const stopPresenter = (roomId) => async (dispatch) => {
  socket.emit("stop-stream-room", { roomId });
  disconnectAll();
};
// var peerConnection;
// export const startWatcher = (videoObj) => async (dispatch) => {
//   console.log("startWatcher");
//   socket.on("offer", async (id, description) => {
//     try {
//       peerConnection = new RTCPeerConnection(rtcConfig);
//       await peerConnection.setRemoteDescription(description);
//       const sdp = await peerConnection.createAnswer();
//       console.log("sdp", sdp);

//       await peerConnection.setLocalDescription(sdp);
//       if (peerConnection.localDescription) {
//         socket.emit("answer", id, peerConnection.localDescription);
//       }

//       peerConnection.ontrack = (event) => {
//         videoObj.srcObject = event.streams[0];
//       };

//       peerConnection.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit("candidate", id, event.candidate);
//         }
//       };

//       socket.on("disconnectPeer", () => {
//         peerConnection.close();
//       });

//       window.onunload = window.onbeforeunload = () => {
//         socket.close();
//       };
//     } catch (err) {
//       console.error(err);
//     }
//   });
// };
