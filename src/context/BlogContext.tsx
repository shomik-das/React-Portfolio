/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { Blog, BlogContextType } from "../types/types";



const BlogContext = createContext<BlogContextType>({
  blogs: [],
  loading: true,
});

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Rohan04022003/my-project-data-repo/main/data/blogs.json") // blogs ko github repo se get kiya hai.
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blog data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, loading }}>
      {children}
    </BlogContext.Provider>
  );
};
