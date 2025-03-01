import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route,Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { useAuthStore } from "./store/UseAuthStore.jsx"; // Corrected the import to match the case
import {Loader} from 'lucide-react'
import { Toaster } from "react-hot-toast";
import { UseThemeStore } from "./store/UseThemeStore.jsx";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth  } = useAuthStore();
    const { theme } = UseThemeStore(); //THIS IS USED TO GET THE CURRENT THEME

  
  useEffect(() => {
    const checkAuthentication = async () => {
      
      await checkAuth(); // THIS WILL CLARIFY WEATHER THE USER IS AUTH OR NOT
    };
    checkAuthentication();
  }, [checkAuth]);
  
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage />: <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ?<SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ?  <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage /> } />
        <Route path="/profile" element={authUser ?<ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
