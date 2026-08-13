import Features from "./components/Home/Features";
import Footer from "./components/Home/Footer";
import Hero from "./components/Home/Hero";
import NavBar from "./components/Home/NavBar";

export default function Home() {
  return (
    <div className="bg-slate-50 w-full h-screen">
      <NavBar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
