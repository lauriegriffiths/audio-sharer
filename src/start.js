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
  Button
} from "@chakra-ui/core";

import CodeGenerator from "./codeGenerator";

import { Redirect, Link } from "react-router-dom";

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joiningExistingClass: false,
      makingNewConvo: false,
      classCode: ""
    };
  }

  classCodeChanged = e => {
    this.setState({ classCode: e.target.value });
  };
  joinClicked = () => {
    this.setState({ joiningExistingClass: true });
  };
  newConversationClicked = () => {
    this.setState({ classCode: CodeGenerator(5), makingNewConvo: true });
  };

  render = () => {
    if (this.state.joiningExistingClass) {
      return <Redirect push={true} to={"/" + this.state.classCode} />;
    } else if (this.state.makingNewConvo) {
      return <Redirect push={true} to={"/" + this.state.classCode} />;
    } else {
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
                A-B Conversation
              </Text>
            </Flex>
            <Text color="gray.500">Chat together online</Text>
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
                <Stack shouldWrapChildren spacing={5} pl={4} pt={4}>
                  <Stack shouldWrapChildren spacing={2}>
                    <Tag size="md" variant="solid" variantColor="facebook">
                      Existing Conversation
                    </Tag>
                    <Input onChange={this.classCodeChanged} />
                    <Button onClick={this.joinClicked}>Join</Button>
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
                <Stack shouldWrapChildren spacing={5} pl={4} pt={4}>
                  <Stack shouldWrapChildren spacing={2}>
                    <Tag size="md" variant="solid" variantColor="facebook">
                      New Conversation
                    </Tag>
                    <Link to="/abcd">New</Link>
                    <Button onClick={this.newConversationClicked}>Start</Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </ThemeProvider>
      );
    }
  };
}

export default Start;
