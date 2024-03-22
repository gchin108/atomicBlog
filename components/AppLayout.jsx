import { PostProvider } from "./PostProvider";
import Header from "./Header";
import Main from "./Main";
import Archive from "./Archive";
import Footer from "./Footer";
import DarkModeToggle from "./DarkModeToggle";
import { DarkModeProvider } from "@/context/DarkModeProvider";

export default function AppLayout() {
  return (
    <DarkModeProvider>
      <section className="max-w-[1140px] mt-0 m-auto h-screen flex flex-col">
        <DarkModeToggle />

        <PostProvider>
          <div className="flex-1">
            <Header />
            <Main />
            <Archive />
          </div>
          <Footer />
        </PostProvider>
      </section>
    </DarkModeProvider>
  );
}
