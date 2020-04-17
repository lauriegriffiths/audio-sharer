import React from "react";
import { Stack, Text, IconButton } from "@chakra-ui/core";
import ReactAudioPlayer from "react-audio-player";

class AudioLine extends React.Component {
  render() {
    return (
      <Stack isInline shouldWrapChildren textAlign="left">
        <Stack>
          <Text color="gray.600">{this.props.text}</Text>
          <ReactAudioPlayer src={this.props.url} controls />
        </Stack>
        <Stack>
          <IconButton
            onClick={this.props.onDelete}
            aria-label="icon"
            icon="delete"
            textAlign="left"
          />
        </Stack>
      </Stack>
    );
  }
}

export default AudioLine;
