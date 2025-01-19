import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuItem,
  MenuList,
  MenuDivider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Spinner,
  Input,
  useToast,


} from "@chakra-ui/react";
import axios from "axios"
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";  //WE USE ../../ BECAUSE ARE INT THE TWO FOLDER INSIDE



const SideDrawer = () => {
   const { user, setSelectedChat , chats ,setChats } = ChatState(); // Uncomment if ChatState is configured

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]); // List of users
  const [loading, setLoading] = useState(false); // Loading state for search
  const [loadingChat, setLoadingChat] = useState(false); // Loading state for chat
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const history = useHistory();

  // Logout handler
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  // Search handler
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something in the search box",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

    try {
      setLoading(true); // Start loading

      // Define the headers for the API request
      const config = {
        headers: {
        // HAVE TO ADD // Authorization: `Bearer ${token}`, // Make sure `userInfo` is defined and contains `token`
        },
      };

      // Make the API call to search for users
      const { data } = await axios.get(
        `http://localhost:3000/api/user?search=${search}`,
        config
      );

      setLoading(false); // Stop loading
      setSearchResult(data); // Update the search result state

      // Optional: Show success message
      toast({
        title: "Search completed",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (error) {
      setLoading(false); // Stop loading in case of error

      // Show error toast
      toast({
        title: "Failed to fetch users",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

    
  
   

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        'http://localhost:3000/api/chart',
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
       setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ base: "row", md: "row" }}
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems="center"
        bg="white"
        w="100%"
        p="10px"
        borderWidth="2px"
        borderRadius="md"
      >
        {/* Tooltip with Search Button */}
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        {/* Title */}
        <Text fontSize="2xl" fontFamily="Work sans" fontWeight="bold">
          Talt-A-Tive
        </Text>
        <div>
          {/* Notification Menu */}
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>
          {/* Profile Menu */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name="Guest" />
            </MenuButton>
            <MenuList>
              <ProfileModal user={{ name: "Guest" }}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBlockStartWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" flexDirection="row" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              // THIS CHATLOADING WILL MAKE THE SEARCHED USERS TO BE LOADED
              <ChatLoading />
            ) : (
                searchResult.map((user) => (
               
                <UserListItem
                  key={user._id}
                  borderWidth="1px"
                  borderRadius="md"
                  p={2}
                  mb={2}
                  cursor="pointer"
                    onClick={() => accessChat(user._id)}
                >
                  {user.name}
                </UserListItem>
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
