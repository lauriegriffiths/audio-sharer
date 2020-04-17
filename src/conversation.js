import React from "react";
import {
  ThemeProvider,
  CSSReset,
  theme,
  Stack,
  Input,
  Grid,
  Flex,
  Text,
  Box,
  Tag,
  Heading,
  IconButton
} from "@chakra-ui/core";

import { ReactMic } from "@cleandersonlobo/react-mic";

import { DB, Storage } from "./firebase";
import AudioLine from "./audioLine";

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationText: [],
      audio: [],
      recording: false,
      name: ""
    };
  }
  componentDidMount() {
    DB.collection("conversations")
      .doc(this.props.conversationId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data();
          this.setState({
            conversationText: data.conversation,
            audio: data.audio
          });
        }
      });
  }

  audioLines = (audio, conversation) => {
    console.log("audio lines");
    console.log(conversation);
    return audio.map((url, index) => (
      <AudioLine
        url={url}
        text={conversation[index]}
        onDelete={() => this.deleteAudio(index)}
      />
    ));
  };
  deleteAudio = index => {
    const convo = this.state.conversationText;
    const audio = this.state.audio;
    var conversationRef = DB.collection("conversations").doc(
      this.props.conversationId
    );
    const newData = {
      conversation: convo
        .slice(0, index)
        .concat(convo.slice(index + 1, convo.length)),
      audio: audio.slice(0, index).concat(audio.slice(index + 1, audio.length))
    };
    console.log(newData);
    conversationRef.set(newData, { merge: true });
    console.log("delete at position " + index);
  };

  onStartClicked = () => {
    this.setState({ recording: true });
  };
  onStopClicked = () => {
    this.setState({ recording: false, actuallyRecording: false });
  };

  onNameChanged = e => {
    this.setState({ name: e.target.value });
  };

  uploadFile = recordedBlob => {
    console.log("recordedBlob is: ", recordedBlob);
    var storageRef = Storage.ref();
    var fileRef = storageRef.child(
      "audio/" +
        this.props.conversationId +
        "/" +
        this.state.conversationText.length +
        ".mp3"
    );

    //this.setState({ blobURL: recordedBlob.blobURL });

    fileRef.put(recordedBlob.blob).then(snapshot => {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        var conversationRef = DB.collection("conversations").doc(
          this.props.conversationId
        );
        const newData = {
          conversation: [...this.state.conversationText, this.state.name + ":"],
          audio: [...this.state.audio, downloadURL]
        };
        conversationRef.set(newData, { merge: true });
      });
      console.log("Uploaded a blob or file!");
    });
  };

  render = () => {
    return (
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Flex
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          mt={4}
        >
          <Flex
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Text fontSize="3xl" fontWeight="bold">
              Make A Conversation
            </Text>
            <Text fontSize="3xl" fontWeight="bold" />
          </Flex>
        </Flex>
        <Grid
          p={10}
          gap={6}
          templateColumns="repeat(auto-fit, minmax(350px, 1fr))"
        >
          <Box>
            <Box
              backgroundColor="white"
              borderRadius="lg"
              shadow="sm"
              pl={3}
              pr={3}
              pt={5}
              pb={5}
            >
              <Flex
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="flex-start"
                mb={2}
                pl={4}
              >
                <Heading
                  size="md"
                  as="h2"
                  lineHeight="shorter"
                  fontWeight="bold"
                  fontFamily="heading"
                >
                  Name
                </Heading>
              </Flex>
              <Stack shouldWrapChildren spacing={5} pl={4} pt={4}>
                <Stack shouldWrapChildren spacing={4}>
                  <Tag size="md" variant="solid" variantColor="facebook">
                    Name
                  </Tag>
                  <Input onChange={this.onNameChanged} />
                </Stack>
              </Stack>
            </Box>
          </Box>
          <Box>
            <Box
              backgroundColor="white"
              borderRadius="lg"
              shadow="sm"
              pl={3}
              pr={3}
              pt={5}
              pb={5}
            >
              <Flex
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="flex-start"
                mb={2}
                pl={4}
              >
                <Heading
                  size="md"
                  as="h2"
                  lineHeight="shorter"
                  fontWeight="bold"
                  fontFamily="heading"
                >
                  Conversation
                </Heading>
              </Flex>
              <Stack shouldWrapChildren spacing={5} pl={4} pt={4}>
                <Stack shouldWrapChildren spacing={4}>
                  {this.audioLines(
                    this.state.audio,
                    this.state.conversationText
                  )}
                  <Stack isInline shouldWrapChildren>
                    <Text>
                      {this.state.recording ? "Recording" : "Push to record->"}
                    </Text>
                    <IconButton
                      disabled={this.state.recording}
                      onClick={this.onStartClicked}
                      aria-label="icon"
                      icon="chat"
                    />
                    <IconButton
                      disabled={!this.state.recording}
                      onClick={this.onStopClicked}
                      aria-label="icon"
                      icon="add"
                    />
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
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </ThemeProvider>
    );
  };
}
export default Conversation;
