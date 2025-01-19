import React, { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  useToast,
  Button,
  Text,
  Stack,
  Flex,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from './miscellaneous/GroupChatModal';

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:3000/api/chart",
        config
      );

      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={4}
      bgGradient="linear(to-r, teal.500, blue.500)"
      w={{ base: "100%", md: "30%" }}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "24px", md: "26px" }}
        fontFamily="Poppins, sans-serif"
        fontWeight="bold"
        color="white"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "16px", md: "14px", lg: "16px" }}
            rightIcon={<AddIcon />}
            bg="teal.600"
            color="white"
            _hover={{ bg: "teal.700" }}
            _active={{ bg: "teal.800" }}
            transition="all 0.3s ease"
            boxShadow="md"
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="white"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        boxShadow="sm"
      >
        {chats ? (
          <Stack spacing={3} overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "teal.500" : "gray.100"}
                color={selectedChat === chat ? "white" : "black"}
                px={4}
                py={3}
                borderRadius="lg"
                key={chat._id}
                boxShadow={selectedChat === chat ? "lg" : "sm"}
                _hover={{
                  bg: selectedChat === chat ? "teal.600" : "gray.200",
                  transform: "scale(1.02)",
                }}
                transition="all 0.2s ease-in-out"
              >
                <Text fontSize="md" fontWeight="bold">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="sm" noOfLines={1}>
                    <b>{chat.latestMessage.sender.name}:</b>{" "}
                    {chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
