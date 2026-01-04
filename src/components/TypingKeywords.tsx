import { TypeAnimation } from "react-type-animation";
import { useAppSettings } from "../context/AppSettingsContext";

const TypingKeywords = () => {
  const { theme } = useAppSettings(); // theme settings use kiye hai.

  return (
    <TypeAnimation
    key={theme}
      sequence={[
        "React.js UIs", 1500,
        "", 500,
        "TypeScript Dashboards", 1500,
        "", 500,
        "Tailwind Interfaces", 1500,
        "", 500,
        "shadcn/ui Components", 1500,
        "", 500,
        "No-code Chatbots", 1500,
        "", 500,
        "Pixel Perfect Designs", 1500,
        "", 500,
        "Theme Toggle Systems", 1500,
        "", 500,
        "Real-Time News Apps", 1500,
        "", 500,
        "Modular Frontends", 1500,
        "", 500,
        "E-commerce Platforms", 1500,
        "", 500,
      ]}
      wrapper="span"
      speed={40}
      deletionSpeed={30}
      repeat={Infinity}
      className="font-semibold"
      style={{ color: theme }}
    />
  );
};

export default TypingKeywords;
