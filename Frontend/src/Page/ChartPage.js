import React,{useState} from "react";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import MyChats from "../Components/MyChats";
import ChartBox from "../Components/ChartBox";
import { ChatState } from "../Context/ChatProvider"; // Correct import from the ChatProvider file
import { Box } from "@chakra-ui/react";

const ChartPage = () => {
 const { user } = ChatState(); // Only destructure `user` as you're not using `setuser`

  const [fetchAgain , setFetchAgain] = useState(false);
  return (
    // HEAR WE USE USER TO CHECK IF THE USER IS LOGGED IN OR NOT AND THEN MOVE TO THE CHAT PAGE
    <div style={{ width: "100%" }}>
      {/* {user && */}
      <SideDrawer />
      <Box
        display="flex" // Use "display" instead of "d" (d is deprecated)
        flexDirection="row" // Explicitly set flexDirection to row
        justifyContent="space-between" // Space between the child components
        w="100%" // Full width
        h="91.5vh" // Full height
        p="10px" // Padding
      >
        {/* {user && } */}
        <MyChats fetchAgain={fetchAgain}  />

        {/* {user && } */}
        <ChartBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </div>
  );
};

export default ChartPage;


