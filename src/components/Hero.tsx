import { ArrowDown } from "lucide-react";
import myImage from "../assets/shomik.jpg";
import TypingKeywords from "../components/TypingKeywords";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion } from "framer-motion";

const parentVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.35, // slow line-by-line reveal hoga.
    },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, // slow fade-in hoga.
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const buttonTap = {
  initial: { scale: 1 },
  whileTap: {
    scale: [0.95, 1.05, 1],
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const Hero = () => {
  const { theme, borderRadius } = useAppSettings(); // yaha se hum basically styling ko use kr rhe hai.

  return (
    <motion.div
      className="flex-between lg:w-[65rem] w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={parentVariant}
    >
      {/* Left Section */}
      <motion.div className="max-w-xl space-y-4" variants={childVariant}>
        {/* Availability */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
          <p className="text-sm text-400">Available for work</p>
        </motion.div>

        {/* Animated Heading */}
        <motion.div
          className="text-4xl sm:text-5xl font-bold text-100 leading-tight"
        >
          <motion.span className="block" variants={childVariant}>
            Hi, I’m Shomik Das
          </motion.span>
          <motion.span className="block" variants={childVariant}>
            Building Fast, Clean & Modern UIs.
          </motion.span>
        </motion.div>


        <motion.p className="text-lg" variants={childVariant}>
          I Build <TypingKeywords /> {/* yeh typing keywords ke liye use huaa hai. */}
        </motion.p>

        <motion.p className="text-neutral-400 mt-2" variants={childVariant}>
          Frontend-first developer growing into full-stack by building real-world, production-ready projects.
        </motion.p>


        {/* resume and project buttons */}
        <motion.div className="flex gap-4 mt-5" variants={childVariant}>
          <motion.a
            {...buttonTap}
            style={{
              background: theme,
              borderRadius: borderRadius + "px",
            }}
            href={"/shomik_resume.pdf"}
            download
            className="text-100 lg:text-base text-sm px-5 py-2 shadow transition hover-80 flex-center gap-2"
          >
            Download CV <ArrowDown size={18} className="animate-bounce" />
          </motion.a>
          <motion.a
            {...buttonTap}
            style={{
              border: `1px solid ${theme}`,
              color: theme,
              borderRadius: borderRadius + "px",
            }}
            href="#projects"
            className="text-100 lg:text-base text-sm px-5 py-2 transition hover-80"
          >
            View Projects
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="relative rounded-xl overflow-hidden z-10 lg:flex hidden"
      >
        <motion.img
          src={myImage}
          alt="shomik-profile"
          className="w-[370px] shadow-md z-10 brightness-[80%] transform scale-x-[-1]"
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
