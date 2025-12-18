"use client";
import Footer from "./components/molecules/footer";
import Navbar from "./components/molecules/navbar";
import Home from "./components/templates/Home";
import SignupPage from "./Signup/page";
import LoginPage from "./Login/page";
import Gemini from "./Gemini/page";

export default function HomePage() {
  return (
    
    <main className="relative h-full w-full overflow-hidden  text-white font-sans">
      <Navbar />
      <Home/>
    </main>
  );
}
