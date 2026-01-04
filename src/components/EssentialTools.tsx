import { useAppSettings } from "../context/AppSettingsContext";
import { tools } from "../data/toolsData";
import { motion, spring } from "framer-motion";

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
      ,
    },
  },
};

const ToolsSection = () => {
  const { theme } = useAppSettings(); // theme settings usage ke liye.

  return (
    <section className="text-100 lg:w-[65rem] w-full">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-3xl sm:text-4xl font-semibold"
      >
        <span className="text-white">Essential Tools</span> I Use
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.2,
        }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-neutral-400 mt-2 max-w-xl"
      >
        These are the tools and technologies I regularly use to build responsive,
        performant, and production-ready frontend applications.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            variants={itemVariant}
            whileHover={{
              scale: 1.03,
              transition: {
                type: spring,
                stiffness: 200,
                damping: 12,
              },
            }}
            style={{
              background: theme + "08",
              border: `1px solid ${theme + "40"}`,
            }}
            className="rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer"
          >
            <img src={tool.logo} alt={tool.name} className="w-10 h-10" />
            <div>
              <p className="font-semibold text-nowrap">{tool.name}</p>
              <p className="text-sm text-neutral-400 text-nowrap">{tool.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ToolsSection;
