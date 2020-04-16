import React from "react";
import "./styles.css";
import firebase from "firebase/app";
import "firebase/storage";
import { ReactMic } from "@cleandersonlobo/react-mic";

var firebaseConfig = {
  apiKey: "AIzaSyDUHOZ9nNIHihQdd5bwe0cDxXkCeAhG46I",
  storageBucket: "retool-test-5fc6b.appspot.com"
};
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      filename: "default",
      audioURL: ""
    };
  }

  onStartClicked = () => {
    this.setState({ recording: true });
  };
  onStopClicked = () => {
    this.setState({ recording: false });
  };

  uploadFile = recordedBlob => {
    console.log("recordedBlob is: ", recordedBlob);
    var storageRef = firebase.storage().ref();
    var fileRef = storageRef.child("audio/" + this.state.filename + ".mp3");
    this.setState({ audioURL: URL.createObjectURL(recordedBlob.blob) });

    fileRef.put(recordedBlob.blob).then(function(snapshot) {
      console.log("Uploaded a blob or file!");
    });
  };

  fileNameChanged = e => {
    this.setState({ filename: e.target.value });
  };
  audioComponent = url => {
    if (url === "") {
      return <p>no audio yet</p>;
    } else {
      return <audio src={url} type="audio/mpeg" />;
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Mic upload test</h1>
        <input onChange={this.fileNameChanged} />
        <button onClick={this.onStartClicked}>record</button>
        <button onClick={this.onStopClicked}>stop</button>
        {this.audioComponent(this.state.audioURL)}
        <div>
          <ReactMic
            record={this.state.recording} // defaults -> false.  Set to true to begin recording
            onStart={() => {}}
            onStop={this.uploadFile} // callback to execute when audio stops recording
            onData={() => {}} // callback to execute when chunk of audio data is available
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
