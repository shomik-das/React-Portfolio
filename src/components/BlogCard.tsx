import { Calendar, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../context/AppSettingsContext";
import { useState } from "react";
import { motion } from "framer-motion";
import type { BlogCardProps } from "../types/types";

const BlogCard = ({
  slug,
  title,
  description,
  coverImage,
  date,
  readTime,
  tags,
}: BlogCardProps) => {
  const navigate = useNavigate();
  const { theme, borderRadius } = useAppSettings(); // yeh theme settings use krne ke liye.
  const [hovered, setHovered] = useState(false); // yeh box shadow ke liye use huaa hai jb hover hoga.

  return (
    <motion.div
      className="bg-800 rounded-xl overflow-hidden shadow transition p-3 cursor-pointer relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/blogs/${slug}`)}
      style={{
        border: `1px solid ${theme}40`,
        boxShadow: hovered ? `0px 0px 10px ${theme}60` : "",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Image */}
      <motion.img
        src={coverImage}
        alt={title}
        className="w-full h-48 object-center rounded-lg"
        style={{ border: `1px solid ${theme}40` }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Blog Badge */}
      <motion.span
        className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-[0.65rem] uppercase shadow-lg"
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
        Blog 📘
      </motion.span>

      {/* Content */}
      <div className="pt-4 space-y-3">
        <motion.h3
          className="text-xl font-semibold text-white"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {title.slice(0, 50) + " ..."}
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

        {/* Meta Info */}
        <motion.div
          className="flex justify-between text-xs text-neutral-400 pt-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {date}
          </span>
          <span className="flex items-center gap-1">
            <Timer className="w-4 h-4" /> {readTime}
          </span>
        </motion.div>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2 text-xs mt-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08 }}
        >
          {tags.slice(0, 4).map((tag, index) => (
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
              #{tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
