import { useState, useEffect } from "react";
import type { Blog } from "../types/types";
import { useBlogContext } from "../context/BlogContext";
import BlogCard from "../components/BlogCard";
import { motion } from "framer-motion";
import ProjectCardSkeleton from "../components/Skeleton/ProjectCardSkeleton";

const BlogPage = () => {
  const { blogs,loading } = useBlogContext();
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (blogs) {
      setFilteredBlogs(blogs);
    }
  }, [blogs]);

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
      <div className="blogs lg:w-[65rem] w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <h2 className="text-3xl font-bold text-white">Blog Posts</h2>
            <p className="text-neutral-400 text-sm mt-1">
              Stories and breakdowns from my learning & building journey.
            </p>
          </motion.div>
        </div>

        {/* Blog Cards */}
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-neutral-500 mt-10">
            No blog posts available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {filteredBlogs.map((blog, index) => (
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
                <BlogCard {...blog} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
