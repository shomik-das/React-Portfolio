import { useNavigate, useParams } from "react-router-dom";
import { useAppSettings } from "../context/AppSettingsContext";
import { CalendarDays, Clock4, Search, NotebookPen, ArrowLeft } from "lucide-react";
import rohan from "../assets/rohan.png";
import { useBlogContext } from "../context/BlogContext";
import { motion } from "framer-motion";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const { blogs } = useBlogContext();
  const blog = blogs.find((b) => b.slug === slug);
  const { theme, borderRadius } = useAppSettings();
  const navigate = useNavigate();

  if (!blog) return <div className="min-h-[88vh] flex items-center justify-center text-lg text-100">Blog not found</div>;

  return (
    <motion.section
      className="px-4 sm:px-6 lg:px-20 pt-4 pb-8 max-w-7xl mx-auto text-100 space-y-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm px-3 py-1 hover-80 border cursor-pointer"
        style={{
          backgroundColor: theme + "20",
          border: `1px solid ${theme}50`,
          borderRadius: borderRadius + "px"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative"
      >
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <motion.img
            src={blog.coverImage}
            alt={blog.title}
            className="rounded-lg w-full md:w-[300px] h-auto object-cover border"
            style={{ borderColor: `${theme}55` }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <div className="flex-1 space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold leading-snug">{blog.title}</h1>
            <p className="text-sm text-neutral-300">{blog.description}</p>
          </div>
        </div>

        <motion.div
          className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <img
              src={rohan}
              alt={blog.author.name}
              className="w-14 h-14 rounded-full border object-cover"
              style={{ background: theme + 40, border: `1px solid ${theme + "80"}` }}
            />
            <div className="flex flex-col gap-1">
              {/* <span className="text-sm text-100">{blog.author.name}</span> */}
              <span className="text-sm text-100">Shomik Das</span>
              <span className="text-neutral-500 text-sm flex items-center gap-1">
                <CalendarDays className="w-4 h-4" /> {blog.date}
                <span className="mx-2">•</span>
                <Clock4 className="w-4 h-4" /> {blog.readTime}
              </span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap text-xs">
            {blog.tags.map((tag, idx) => (
              <motion.span
                key={idx}
                className="px-2 py-1 text-[0.7rem]"
                style={{
                  backgroundColor: theme + "20",
                  border: `1px solid ${theme}50`,
                  borderRadius: borderRadius + "px"
                }}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.article
          className="mt-10 space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {blog.content.sections.map((section, idx) => (
            <motion.div
              key={idx}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {idx === 0 ? <Search size={20} /> : <NotebookPen size={20} />}
                {section.heading}
              </h2>
              {"text" in section && section.text && (
                <p className="text-neutral-300 leading-relaxed">{section.text}</p>
              )}
              {"list" in section && section.list && (
                <ul className="list-disc pl-6 text-neutral-300 space-y-1">
                  {section.list.map((item, i) => (
                    section.heading === "Links" ? (
                      <li key={i}>
                        <a
                          style={{ color: theme, fontSize: "12px" }}
                          className="underline"
                          href={item}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item}
                        </a>
                      </li>
                    ) : (
                      <li key={i}>{item}</li>
                    )
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.article>

        {blog.projectSlug && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href={`/projects/${blog.projectSlug}`}
              className="inline-flex text-100 items-center gap-2 text-sm px-4 py-2 transition hover-80"
              style={{ backgroundColor: theme, borderRadius: borderRadius }}
            >
              View Project Details ↗
            </a>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default BlogDetailsPage;
