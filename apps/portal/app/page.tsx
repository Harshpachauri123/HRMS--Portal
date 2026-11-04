import HeroSection from "@/components/FirstPage/Home/page"; // Import ko alias de diya
import SecondPage from "@/components/FirstPage/secondpage/page"; // Import ko alias de diya
import ThirdPage from "@/components/FirstPage/thirdpage/page"; // Import ko alias de diya 
import FourthPage from "@/components/FirstPage/fourthpage/page"; // Import ko alias de diya  

export default function Home() {
  return (
    <>
      <HeroSection />
      <SecondPage />
      <ThirdPage />
      <FourthPage />
    </>
  );
}
