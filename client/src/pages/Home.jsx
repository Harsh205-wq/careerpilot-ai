import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FeatureCards from "../components/FeatureCards.jsx";
import HeroSection from "../components/HeroSection.jsx";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    if (!location.hash) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const section = document.querySelector(location.hash);

    if (!section) {
      return;
    }

    requestAnimationFrame(() => {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [location.hash, location.pathname]);

  return (
    <section className="home-shell">
      <HeroSection />
      <FeatureCards />
    </section>
  );
}

export default Home;
