import { useEffect, useState } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { ChevronsUpDown } from "lucide-react";
import type { Project } from "../types/types";
import { useProjectContext } from "../context/projectContext";
import ProjectCard from "../components/ProjectCard";

import { motion } from "framer-motion";
import ProjectCardSkeleton from "../components/Skeleton/ProjectCardSkeleton";

const filters = [
  { label: "All", value: "" },
  { label: "React", value: "react" },
  { label: "Bootstrap", value: "bootstrap" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "TailwindCSS", value: "tailwind" },
  { label: "Framer Motion", value: "framer" },
];

const Projects = () => {
  const { theme } = useAppSettings();
  const { projects, loading } = useProjectContext();

  const [filterVal, setFilterVal] = useState("");
  const [filterProjects, setFilterProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);

  //button click animation

  const buttonTap = {
    initial: { scale: 1 },
    whileTap: {
      scale: [0.95, 1.05, 1],
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  useEffect(() => {
    if (!filterVal) {
      setFilterProjects(projects);
    } else {
      const filtered = projects.filter((project) =>
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(filterVal.toLowerCase())
        )
      );
      setFilterProjects(filtered);
    }
  }, [projects, filterVal]);

  const handleSelect = (val: string) => {
    setFilterVal(val);
    setOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-[64vh] px-4 md:px-10 lg:px-20 py-10 flex justify-center">
        <div className="projects lg:w-[65rem] w-full">
          <div className="skeleton bg-800 w-52 h-6 rounded-md animate-pulse mb-3"></div>
          <div className="skeleton bg-800 w-95 h-6 rounded-md animate-pulse"></div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div >
    )
  }

  return (
    <div className="min-h-[64vh] px-4 md:px-10 lg:px-20 py-10 flex justify-center">
      <div className="projects lg:w-[65rem] w-full">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
            <h2 className="text-3xl font-bold text-white">My Projects</h2>
            <p className="text-neutral-400 text-sm mt-1">
              A collection of my best frontend builds & experiments.
            </p>
          </motion.div>

          {/* Custom Dropdown Filter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative text-white z-10 w-fit">
            <motion.button
              {...buttonTap}
              onClick={() => setOpen(!open)}
              className="px-4 py-2 rounded-lg cursor-pointer bg-[#42424250] bg-blur-lg flex items-center gap-2 text-sm"
              style={{ border: `1px solid ${theme}80`, color: theme }}
            >
              {filters.find((f) => f.value === filterVal)?.label || "Search by Tech"}
              <ChevronsUpDown size={16} />
            </motion.button>

            {open && (
              <ul
                className="absolute w-48 mt-2 sm:right-0 bg-[#42424290] backdrop-blur-md rounded-lg overflow-hidden shadow-lg"
                style={{ border: `1px solid ${theme}50` }}
              >
                {filters.map((f) => (
                  <motion.li
                    {...buttonTap}
                    style={{ background: f.value === filterVal ? theme + "90" : "" }}
                    key={f.value}
                    onClick={() => handleSelect(f.value)}
                    className={`px-4 py-2 hover:bg-white/10 cursor-pointer text-sm ${f.value === filterVal ? "bg-white/10 text-100" : "text-white/70"
                      }`}
                  >
                    {f.label}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>

        {/* Project List or Empty */}
        {filterProjects.length === 0 ? (
          <p className="text-center text-neutral-500 mt-20">
            No projects found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {filterProjects.map((project, index) => {

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 14,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: index * 0.05,
                  }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
