import { useState, useEffect } from "react";

export const useMediaStream = ({requestedMedia, isPresenter}) => {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    async function enableVideoStream() {
      try {
        console.log("isPresenter", requestedMedia);
        if (!isPresenter) {
          return undefined;
        }
        const stream = await navigator.mediaDevices.getUserMedia(
          requestedMedia
        );
        setMediaStream(stream);
      } catch (err) {
        console.log("useMediaStream", err);
      }
    }

    if (!mediaStream) {
      enableVideoStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }
  }, [mediaStream, requestedMedia, isPresenter]);

  return mediaStream;
}
