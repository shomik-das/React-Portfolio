import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Bas route change pe scroll upar
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
