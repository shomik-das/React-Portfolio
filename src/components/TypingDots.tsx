import { motion } from "framer-motion";
import { useAppSettings } from "../context/AppSettingsContext";

export const TypingDots = () => {

    const {theme} = useAppSettings(); // theme setting use kiya hai.

  return (
    <div className="flex gap-1 items-center h-5">
      {[0, 1, 2].map((dot) => (
        <motion.span
        style={{
            background: theme
        }}
          key={dot}
          className={`w-2 h-2 rounded-full`}
          initial={{ y: 0, opacity: 0.4 }}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: dot * 0.2,
          }}
        />
      ))}
    </div>
  );
};
