import React from "react";
import "./styles.css";

import { ReactMic } from "@cleandersonlobo/react-mic";
import ReactAudioPlayer from "react-audio-player";

import HidingPlayer from "./hidingPlayer";
import firebase from "./firebase";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      actuallyRecording: false,
      filename: "default",
      audioURL: "",
      blobURL: ""
    };
  }

  onStartClicked = () => {
    this.setState({ recording: true });
  };
  onStopClicked = () => {
    this.setState({ recording: false, actuallyRecording: false });
  };

  uploadFile = recordedBlob => {
    console.log("recordedBlob is: ", recordedBlob);
    var storageRef = firebase.storage().ref();
    var fileRef = storageRef.child("audio/" + this.state.filename + ".mp3");
    this.setState({ blobURL: recordedBlob.blobURL });

    fileRef.put(recordedBlob.blob).then(snapshot => {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        this.setState({ audioURL: downloadURL });
      });
      console.log("Uploaded a blob or file!");
    });
  };
  onData = recordedBlob => {
    this.setState({ actuallyRecording: true });
  };

  fileNameChanged = e => {
    this.setState({ filename: e.target.value });
  };

  hidingPlayer = url => {
    if (url) {
      return <ReactAudioPlayer src={url} controls />;
    } else {
      return;
    }
  };
  render() {
    return (
      <div className="App">
        <h1>Mic upload test</h1>
        <input onChange={this.fileNameChanged} />
        <button disabled={this.state.recording} onClick={this.onStartClicked}>
          record
        </button>
        <button disabled={!this.state.recording} onClick={this.onStopClicked}>
          stop
        </button>
        <p>
          status:
          {this.state.recording
            ? this.state.actuallyRecording
              ? "recording"
              : "loading"
            : "not recording"}
        </p>
        <h3>Blob:</h3>
        <HidingPlayer url={this.state.blobURL} />
        <h3>Uploaded:</h3>
        <HidingPlayer url={this.state.audioURL} />
        <div style={{ display: "none" }}>
          <ReactMic
            record={this.state.recording} // defaults -> false.  Set to true to begin recording
            onStop={this.uploadFile} // callback to execute when audio stops recording
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#FF4081"
            className="sound-wave"
            mimeType={"audio/mp3"} // defaults -> audio/wav. Set audio/mp3 to switch to MP3     // defaults -> 44100. It accepts values only in range: 22050 to 96000
          />
        </div>
      </div>
    );
  }
}

export default App;
