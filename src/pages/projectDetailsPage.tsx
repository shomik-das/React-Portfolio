import { useNavigate, useParams } from "react-router-dom";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { useAppSettings } from "../context/AppSettingsContext";
import { useProjectContext } from "../context/projectContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

const ProjectDetailsPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { theme, borderRadius } = useAppSettings();
  const { projects } = useProjectContext();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-[88vh] flex items-center justify-center text-lg text-100">
        Project Not Found.
      </div>
    );
  }

  return (
    <motion.div
      className="px-4 sm:px-6 lg:px-20 pt-4 pb-8 max-w-7xl mx-auto text-100 space-y-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm px-3 py-1 rounded-lg hover-80 border cursor-pointer"
        style={{
          backgroundColor: theme + "20",
          border: `1px solid ${theme}50`,
          borderRadius: borderRadius + 'px'
        }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </motion.button>

      <motion.div
        className="flex flex-col lg:flex-row gap-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-neutral-400 text-transparent bg-clip-text">
            {project.title}
          </h1>
          <p className="text-400 text-sm sm:text-base max-w-xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <motion.span
                key={i}
                className="text-sm px-3 py-1"
                style={{
                  backgroundColor: theme + "20",
                  border: `1px solid ${theme}50`,
                  borderRadius: borderRadius + 'px'
                }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            navigation
            loop={true}
            speed={2000}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 200,
              modifier: 3,
              slideShadows: true,
            }}
            className="w-full"
          >
            {project.screenshots.map((src, index) => (
              <SwiperSlide
                key={index}
                className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={src}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-auto object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </motion.div>

      <Section title="Key Features">
        <motion.ul
          className="list-disc pl-5 space-y-1 text-neutral-300 text-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.05 }}
        >
          {project.features.map((f, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              {f}
            </motion.li>
          ))}
        </motion.ul>
      </Section>

      <Section title="Folder Structure">
        <div className="space-y-4">
          {project.folderStructure &&
            Object.entries(project.folderStructure).map(([folder, items], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h4 className="font-semibold text-100">{folder}/</h4>
                <ul className="ml-4 mt-1 text-sm text-neutral-400 space-y-1">
                  {items.map((item, j) => {
                    const [name, desc] = item.split("**");
                    return (
                      <li key={j}>
                        - <span style={{ color: theme }}>{name}</span> {desc}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
        </div>
      </Section>

      <Section title="README Highlights">
        <motion.div
          className="space-y-4 text-sm text-neutral-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <p className="font-semibold text-100 pb-8">Installation:</p>
            <code style={{ borderColor: theme + "80", backgroundColor: theme + "10", borderRadius: borderRadius + 'px' }} className="npm-box-design px-8 py-4 border cursor-text">{project.readmeHighlights.installation}</code>
          </div>
          <div className="pt-5">
            <strong className={`text-100 ${project.readmeHighlights.envSetup.length > 0 ? "flex" : "hidden"}`}>.env Setup:</strong>
            <ul className="list-disc pl-6 mt-1">
              {project.readmeHighlights.envSetup.map((env, i) => (
                <li key={i}>
                  <code>{env}</code>
                </li>
              ))}
            </ul>
          </div>
          <p>
            <strong className="text-100">Usage:</strong> {project.readmeHighlights.usage}
          </p>
        </motion.div>
      </Section>

      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex gap-3">
          <a
            href={project.liveDemo}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 text-100 text-sm hover-80"
            style={{ backgroundColor: theme, borderRadius: borderRadius + 'px' }}
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border hover-80"
            style={{ color: theme, borderColor: theme, borderRadius: borderRadius + 'px' }}
          >
            <Github size={16} />
            GitHub
          </a>
        </div>

        <div className="flex gap-2 flex-wrap text-sm text-400">
          {project.tags.map((tag, i) => (
            <span key={i}>#{tag}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.section
    className="space-y-3"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-xl sm:text-2xl font-semibold text-100">{title}</h2>
    <div>{children}</div>
  </motion.section>
);

export default ProjectDetailsPage;