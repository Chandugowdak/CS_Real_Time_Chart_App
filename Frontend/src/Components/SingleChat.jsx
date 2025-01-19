import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box,Text } from "@chakra-ui/react";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const {user, selectedChat, setSelectedChat} = ChatState();
  return (
    <>
      {selectedChat ? (
        <Text
          fontSize={{ base: "28px", md: "30px" }}
          pb={3}
          px={2}
          w="100%"
          fontFamily="work sans"
          d-flex
          alignItems="center"
          justifyContent={{ base: "space-between" }}
          color="white"
          fontWeight="bold"
        ></Text>
      ) : (
        <Box
          d="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          textAlign="center"
          mt="250px"
        >
          <Text fontSize="3xl">Select a chat to start chatting</Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
