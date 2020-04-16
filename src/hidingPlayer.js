import ReactAudioPlayer from "react-audio-player";

export const HidingPlayer = url => {
  if (url) {
    return <ReactAudioPlayer src={url} controls />;
  } else {
    return;
  }
};
