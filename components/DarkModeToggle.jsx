"use client"
import { useDarkMode } from "@/context/DarkModeProvider";


export default function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
      return (
        <button onClick={toggleDarkMode} className="fixed top-0 right-0 p-[16px] text-[26px] border-none ">
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      );
}
