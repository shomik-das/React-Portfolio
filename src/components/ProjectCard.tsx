import { ExternalLink, Github } from "lucide-react";
import { useAppSettings } from "../context/AppSettingsContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { ProjectProps } from "../types/types";


const ProjectCard = ({
  slug,
  title,
  description,
  techStack,
  tags,
  githubLink,
  liveDemo,
  screenshots,
  isLatest,
}: ProjectProps) => {
  const navigate = useNavigate(); // for navigation.
  const { theme, borderRadius } = useAppSettings(); // theme use ke liye.
  const [hovered, setHovered] = useState(false); // hover pe project glow krne ke liye.

  return (
    <div
      className="bg-800 rounded-xl overflow-hidden shadow transition p-3 cursor-pointer relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/projects/${slug}`)}
      style={{
        border: `1px solid ${theme}40`,
        boxShadow: hovered ? `0px 0px 10px ${theme}60` : "",
      }}
    >
      {/* Image */}
      <motion.img
        src={screenshots[0]}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
        style={{ border: `1px solid ${theme}40` }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* New Badge */}
      {isLatest && (
        <motion.span
          className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-[0.65rem] uppercase shadow"
          style={{
            backgroundColor: "#000000aa",
            color: "#fff",
            border: `1px solid ${theme}99`,
            backdropFilter: "blur(4px)",
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          New ✨
        </motion.span>
      )}

      {/* Content */}
      <div className="pt-4 space-y-3">
        <motion.h3
          className="text-xl font-semibold text-white"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-sm text-neutral-300"
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
        >
          {description.slice(0, 120) + " ..."}
        </motion.p>

        {/* Tech Stack */}
        <motion.div
          className="flex flex-wrap gap-2 text-xs"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {techStack.slice(0, 4).map((tech, index) => (
            <motion.span
              key={index}
              className="px-2 py-1 text-[0.7rem] text-100"
              style={{
                backgroundColor: theme + "20",
                border: `1px solid ${theme}50`,
                borderRadius: borderRadius + "px",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Actions & Tags */}
        <motion.div
          className="flex justify-between mt-4 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Buttons */}
          <div className="flex gap-2">
            {liveDemo && (
              <motion.a
                href={"#"}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                className="flex items-center gap-1 text-sm px-3 py-1 rounded-lg transition text-100 hover:opacity-80"
                style={{
                  backgroundColor: theme,
                  borderRadius: borderRadius + "px",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" /> Live
              </motion.a>
            )}

            <motion.a
              href={"#"}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              className="flex items-center gap-1 text-sm text-100 px-3 py-1 rounded-lg border hover:opacity-80 transition"
              style={{
                borderColor: theme,
                color: theme,
                borderRadius: borderRadius + "px",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" /> GitHub
            </motion.a>
          </div>

          {/* Tags */}
          <div className="flex gap-1 flex-wrap justify-end text-xs text-neutral-400">
            {tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="text-[0.7rem]">#{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectCard;
