"use client";
import { useEffect, useState } from "react";
import { PostProvider } from "./PostProvider";
import Header from "./Header";
import Main from "./Main";
import Archive from "./Archive";
import Footer from "./Footer";


export default function App() {
const [isFakeDark, setIsFakeDark] = useState(true);

  
  useEffect(() => {
    if (isFakeDark) {
      document.documentElement.classList.add("fake-dark-mode");
    } else {
      document.documentElement.classList.remove("fake-dark-mode");
    }
  }, [isFakeDark]);

  return (
    <section className="max-w-[1140px] mt-0 m-auto h-screen flex flex-col">
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <PostProvider>
        <div className="flex-1">
          <Header />
          <Main />
          <Archive />
        </div>
        <Footer />
      </PostProvider>
    </section>
  );
}
