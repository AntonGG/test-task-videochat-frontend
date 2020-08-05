import { videoObj, videoStream } from "../../components/VideoChat/Camera";
import socket from "../../services/socket";
import {
  createOffer,
  setAnswer,
  setCandidate,
  disconnectPeer,
  setWatcherCandidate,
  disconnectWatcherPeer,
  createAnswer,
} from "../../services/webrtc";

const initialState = {
  name: "",
  rooms: [],
  users: [],
  activeRoom: null,
  mediaStream: null,
  peerConnections: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    //socket-io actions
    case "update-users":
      return { ...state, users: payload.users };
    case "update-rooms":
      return { ...state, rooms: payload.rooms };

    //socket-io webrtc presenter actions
    case "watcher":
      createOffer(payload.userId).catch((err) => console.log(err));
      return { ...state };
    case "answer":
      setAnswer(payload.userId, payload.description);
      return { ...state };
    case "candidate":
      setCandidate(payload.userId, payload.candidate);
      return { ...state };
    case "disconnect-peer":
      disconnectPeer(payload.userId);
      return { ...state };

    //socket-io webrtc watcher actions
    case "offer":
      createAnswer(payload.userId, payload.description).catch((err) =>
        console.log(err)
      );
      return { ...state };
    case "watcher-candidate":
      setWatcherCandidate(payload.userId, payload.candidate);
      return { ...state };
    case "disconnect-watcher-peer":
      disconnectWatcherPeer();
      return { ...state };

    //redux actions
    case "SET_INPUT_USER":
      return { ...state, ...payload };
    case "CLEAR_USER":
      return { ...state, name: "" };
    case "UPDATE_ROOMS":
      return { ...state, rooms: payload };
    case "UPDATE_USERS":
      return { ...state, users: payload };
    case "SET_ACTIVE_ROOM":
      return { ...state, activeRoom: payload };
    default:
      return state;
  }
};
