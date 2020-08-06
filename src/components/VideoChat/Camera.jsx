import React, { useState, useRef } from "react";
import Measure from "react-measure";
import { useMediaStream } from "../../hooks/useMediaStream";
import { useCardRatio } from "../../hooks/useCardRatio";
import { useOffsets } from "../../hooks/useOffsets";
import "../../sass/camera.sass";
import { disconnectAll } from "../../services/webrtc";

const CAPTURE_OPTIONS = {
  audio: true,
  video: true,
};

export let videoObj = undefined;
export let videoStream = undefined;

export const Camera = ({
  isPresenter,
  onStartPresenter,
  onStopPresenter,
  roomId,
}) => {
  const videoRef = useRef();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  console.log("isPresenter", isPresenter);
  const mediaStream = useMediaStream({
    requestedMedia: CAPTURE_OPTIONS,
    isPresenter,
  });
  console.log("isPresenter", isPresenter);

  if (
    isPresenter &&
    mediaStream &&
    videoRef.current &&
    !videoRef.current.srcObject
  ) {
    videoRef.current.srcObject = mediaStream;
    videoStream = mediaStream;
  }

  function handleResize(contentRect) {
    setIsVideoPlaying(true);
  }

  function handleCanPlay() {
    setIsVideoPlaying(true);
    try {
      videoRef.current.play();
    } catch (e) {
      console.log(e);
    }
  }

  if (isPresenter && !mediaStream) {
    return null;
  }

  if (!isPresenter && videoRef.current) {
    videoObj = videoRef.current;
    console.log("videoObj", videoRef.current);
  }

  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <div className="camera">
          <div className="camera-container" ref={measureRef}>
            <video
              className="video"
              ref={videoRef}
              onCanPlay={handleCanPlay}
              autoPlay
              muted
              playsInline
            />
          </div>
          {isPresenter && (
            <div>
              <div
                onClick={() => onStartPresenter(mediaStream, roomId)}
                className="camera__begin-stream"
              >
                <p>Начать стрим</p>
              </div>
              <div
                onClick={() => onStopPresenter(roomId)}
                className="camera__begin-stream"
              >
                <p>Закончить стрим</p>
              </div>
            </div>
          )}
        </div>
      )}
    </Measure>
  );
};
