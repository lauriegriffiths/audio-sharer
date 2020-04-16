import React from "react";
import { Stack, Text, IconButton } from "@chakra-ui/core";
import ReactAudioPlayer from "react-audio-player";

class AudioLine extends React.Component {
  render() {
    return (
      <Stack isInline shouldWrapChildren textAlign="left">
        <Text color="gray.600">{this.props.text}</Text>
        <ReactAudioPlayer src={this.props.url} controls />
        <IconButton aria-label="icon" icon="delete" textAlign="left" />
      </Stack>
    );
  }
}

export default AudioLine;
