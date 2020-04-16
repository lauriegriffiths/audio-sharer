import React from "react";
import "./styles.css";
import firebase from "firebase/app";
import "firebase/storage";

const MicRecorder = require("mic-recorder-to-mp3");

var firebaseConfig = {
  apiKey: "AIzaSyDUHOZ9nNIHihQdd5bwe0cDxXkCeAhG46I",
  storageBucket: "retool-test-5fc6b.appspot.com"
};
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  recorder = new MicRecorder({
    bitRate: 128
  });
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audioFile: null,
      filename: "default"
    };
  }

  startRecording = () => {
    this.recorder
      .start()
      .then(() => {
        // something else
      })
      .catch(e => {
        console.error(e);
      });
  };

  stopRecording = () => {
    this.recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        // do what ever you want with buffer and blob
        // Example: Create a mp3 file and play
        const file = new File(buffer, "me-at-thevoice.mp3", {
          type: blob.type,
          lastModified: Date.now()
        });

        const player = new Audio(URL.createObjectURL(file));
        this.setState({ audioFile: URL.createObjectURL(file) });

        var storageRef = firebase.storage().ref();
        var fileRef = storageRef.child("audio/" + this.state.filename + ".mp3");

        fileRef.put(file).then(function(snapshot) {
          console.log("Uploaded a blob or file!");
        });
      })
      .catch(e => {
        alert("We could not retrieve your message");
        console.log(e);
      });
  };

  fileNameChanged = e => {
    this.setState({ filename: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <h1>Mic upload test</h1>
        <input onChange={this.fileNameChanged} />
        <button onClick={this.startRecording}>record</button>
        <button onClick={this.stopRecording}>stop</button>
      </div>
    );
  }
}

export default App;
