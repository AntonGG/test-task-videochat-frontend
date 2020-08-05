import { videoObj, videoStream } from "../components/VideoChat/Camera";
import socket from "./socket";

const rtcConfig = {
  iceServers: [
    { url: "stun:stun2.l.google.com:19302" },
    { url: "stun:stun2.l.google.com:19302" },
    { url: "stun:stun2.l.google.com:19302" },
    { url: "stun:stun2.l.google.com:19302" },
  ],
};

//для стримера
let peerConnections = {};

//для наблюдателя
let onePeerConnection = {};

// стример
export const createOffer = async (userId) => {
  const peerConnection = new RTCPeerConnection(rtcConfig);

  for (const track of videoStream.getTracks()) {
    peerConnection.addTrack(track, videoStream);
    console.log("peerConnection addTrack: ", track);
  }

  await peerConnection.setLocalDescription();

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("3 sendCandidate: ", { userId, candidate: event.candidate });
      socket.emit("watcher-candidate", { userId, candidate: event.candidate });
    }
  };

  console.log("1 createOffer: ", {
    userId,
    description: peerConnection.localDescription,
  });

  socket.emit("offer", {
    userId,
    description: peerConnection.localDescription,
  });

  peerConnections[userId] = peerConnection;
};

export const setAnswer = (userId, description) => {
  peerConnections[userId]
    .setRemoteDescription(description)
    .catch((err) => console.log(err));

  console.log("2 setAnswer: " + userId);
};

export const setCandidate = (userId, candidate) => {
  peerConnections[userId]
    .addIceCandidate(new RTCIceCandidate(candidate))
    .catch((err) => console.log(err));
  console.log("4 setCandidate: ", userId, candidate);
};

export const disconnectPeer = (userId) => {
  peerConnections[userId].close();
  delete peerConnections[userId];
  console.log("disconnectPeer: " + userId);
};

//наблюдатель
export const createAnswer = async (userId, description) => {
  try {
    onePeerConnection = new RTCPeerConnection(rtcConfig);
    //колбек для видеопотока
    onePeerConnection.ontrack = (event) => {
      if (videoObj) videoObj.srcObject = event.streams[0];
    };

    //устанавливаем sdp от стримера
    await onePeerConnection.setRemoteDescription(description);
    //генерим свой sdp
    const sdp = onePeerConnection.createAnswer();
    await onePeerConnection.setLocalDescription(sdp);
    //отслыаем стримеру
    if (onePeerConnection.localDescription) {
      socket.emit("answer", {
        userId,
        description: onePeerConnection.localDescription,
      });
    }

    onePeerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("3 sendPresenterCandidate", userId, event.candidate);
        socket.emit("candidate", { userId, candidate: event.candidate });
      }
    };
  } catch (err) {
    console.log(err);
  }
};

export const setWatcherCandidate = (userId, candidate) => {
  console.log("2 setWatcherCandidate", userId, candidate);
  if (userId && candidate)
    onePeerConnection
      .addIceCandidate(new RTCIceCandidate(candidate))
      .then(() => {})
      .catch((e) => console.error(e));
};

export const disconnectWatcherPeer = () => {
  onePeerConnection.close();
  console.log("disconnectWatcherPeer");
};

export const disconnectAll = () => {
  Object.entries(peerConnections).forEach((key, peer) => {
    if (key[1]) {
      key[1].close();
    }
  });
};
