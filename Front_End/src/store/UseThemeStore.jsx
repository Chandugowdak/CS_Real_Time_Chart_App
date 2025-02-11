import { create } from "zustand";
//THIS IS USED TO MANAGE THE THEME OF WEB
export const UseThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
