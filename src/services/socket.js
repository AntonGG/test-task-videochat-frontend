import io from "socket.io-client";

const socket = io(window.location.hostname + ":5000", { forceNew: true });

window.onunload = window.onbeforeunload = () => {
  socket.close();
};

export default socket;
