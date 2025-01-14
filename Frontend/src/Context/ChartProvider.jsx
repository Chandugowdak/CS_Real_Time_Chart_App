import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChartContext = createContext(); //GLOBEL STATE

const ChatProvider = ({ children }) => {
    const [user, setuser] = useState();
    const history = useHistory();


    //THIS WILL CHECK IF THE USER IS ALREADY LOGIN OR NOT
    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setuser(userInfo);
        if (userInfo) {
            history.push('/');
        }
    },[history]); //THIS IS DEPENDENCY ARRAY HISTORY 
    return (
        <ChartContext.Provider value = {{user,setuser}}>
            {children}
        </ChartContext.Provider>
    )
}
export const ChartState = () => useContext(ChartContext);



export default ChatProvider;