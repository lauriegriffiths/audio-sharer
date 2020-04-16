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
import { Redirect, Link } from "react-router-dom";

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      makingNewConvo: false
    };
  }
  newConversationClicked = () => {
    this.setState({ makingNewConvo: true });
  };

  render = () => {
    if (this.state.makingNewConvo) {
      return <Redirect to="/abcd" />;
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
                    <Input />
                    <Button>Join</Button>
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
