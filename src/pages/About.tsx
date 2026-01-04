import { ExternalLink, Github } from "lucide-react";
import { useAppSettings } from "../context/AppSettingsContext";
import { Link } from "react-router-dom";
import { motion, spring } from "framer-motion";

const About = () => {
  const { theme, borderRadius } = useAppSettings();

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 1.3,
        type: spring,
        stiffness: 100,
        damping: 16,
      },
    }),
  };

  return (
    <div className="min-h-screen px-4 md:px-10 lg:px-20 py-10 flex justify-center">
      <motion.div
        className="lg:w-[65rem] w-full text-100 space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div custom={1} variants={fadeUp} className="space-y-2">
          <h2 className="text-2xl font-semibold mb-2">About Me</h2>
          <p className="text-400">
            Hey, I'm Shomik Das — a frontend developer from Delhi, originally from Bihar. I love building clean, responsive, and scalable web applications using tools like HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS, Bootstrap, and shadcn/ui. Along the way, I've also worked with things like Framer Motion, API integration, Context API, Git, and GitHub. After completing my 12th in 2020 with 76.20%, I did an ADCA to strengthen my computer basics. Then from 2021 to 2024, I completed my B.C.A. from Sirifort Institute of Management Studies (GGSIPU), where I scored a CGPA of 8.85. Since then, I've been focused on sharpening my frontend skills, exploring backend, and diving into AI.
          </p>
          <p className="text-400">
            Some of my key projects include BotForge AI (a multi-model AI chatbot platform), Fashion Market (an e-commerce frontend), Pixisphere (a photographer discovery platform), and more. I also enjoy writing about what I learn, and once even secured Appreciable place in a C++ coding intra college competition. Right now, I’m actively looking for job opportunities and building full-stack capabilities alongside AI-based tools. You can reach out to me at <a className="underline hover-80" style={{ color: theme }} href="mailto:devshomikdas@gmail.com">devshomikdas@gmail.com</a>, or check out my work on <a href="#" target="_blank" rel="noopener noreferrer" className="underline hover-80" style={{ color: theme }}>GitHub</a> and <a href="#" target="_blank" rel="noopener noreferrer" className="underline hover-80" style={{ color: theme }}>LinkedIn</a>.
          </p>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} className="border-l-2 border-white/10 pl-4 mt-8 space-y-2">
          <p className="text-neutral-300">
            • Started B.C.A. in 2021 with a deep interest in technology and creativity.
          </p>
          <p className="text-neutral-300">
            • Learned HTML, CSS, and JavaScript by building real-world UI components.
          </p>
          <p className="text-neutral-300">
            • Explored React and TypeScript to develop scalable frontend applications.
          </p>
          <p className="text-neutral-300">
            • Built real apps: news UI, portfolios, e-commerce, and multi-model chatbots.
          </p>
          <p className="text-neutral-300">
            • Now sharing learnings and insights through my <Link to="/blog" style={{ color: theme }} className="underline hover-80">Blog</Link>.
          </p>
        </motion.div>

        <motion.div custom={3} variants={fadeUp}>
          <h2 className="text-2xl font-semibold mb-2">Education</h2>
          <ul className="text-neutral-300 list-disc list-inside space-y-1">
            <li><strong className="text-100">B.C.A.</strong> – Sirifort Institute of Management Studies (GGSIPU), 2021–2024 | CGPA: 8.85</li>
            <li><strong className="text-100">XII</strong> – Bihar School Examination Board (BSEB), 2020 | 76.20%</li>
          </ul>
        </motion.div>

        <motion.div custom={3} variants={fadeUp}>
          <h2 className="text-2xl font-semibold mb-2">Certifications</h2>
          <ul className="text-neutral-300 list-disc list-inside space-y-1">
            <li><strong className="text-100">Web Developer BootCamp</strong> – Udemy, 2024-2025</li>
            <li><strong className="text-100">Advanced Diploma in Computer Application</strong> – Wizard Tech, 2020-2021 | 84%</li>
          </ul>
        </motion.div>

        <motion.div custom={4} variants={fadeUp}>
          <h2 className="text-2xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2 text-sm text-100">
            {["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Bootstrap", "shadcn/ui", "Framer Motion", "API Integration", "Context API", "Git", "Github"].map((skill, index) => (
              <motion.span
                key={skill}
                className="px-3 py-1 text-100/90"
                style={{
                  backgroundColor: theme + "20",
                  border: `1px solid ${theme}50`,
                  borderRadius: borderRadius + "px",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div custom={5} variants={fadeUp} className="space-y-5">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-100">BotForge AI</h3>
            <p className="text-sm text-neutral-300 mb-2">
              A full-featured AI chatbot platform that allows users to interact with models like Cohere, Gemini, and Mistral. The app supports custom bot creation, chat history export as PDF, dark/light theme, onboarding modals, and mobile-friendly design.
            </p>
            <div className="flex gap-3">
              <a href="#" target="_blank" className="text-sm flex-center gap-1 hover-80" style={{ color: theme }}><ExternalLink size={18} /> Live Demo</a>
              <a href="#" target="_blank" className="text-sm flex-center gap-1 hover-80" style={{ color: theme }}><Github size={18} /> GitHub</a>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-100">Fashion Market</h3>
            <p className="text-sm text-neutral-300 mb-2">
              A clean and responsive e-commerce frontend that simulates a real shopping experience. Includes category filters, product previews, dynamic cart updates, theme toggling, and simulated checkout using React, TypeScript, and Tailwind CSS.
            </p>
            <div className="flex gap-4">
              <a href="#" target="_blank" className="text-sm flex-center gap-1 hover-80" style={{ color: theme }}><ExternalLink size={18} /> Live Demo</a>
              <a href="#" target="_blank" className="text-sm flex-center gap-1 hover-80" style={{ color: theme }}><Github size={18} /> GitHub</a>
            </div>
          </div>

          <p className="text-400 text-sm">
            You can find more of my projects on the <Link to="/projects" className="underline hover-80" style={{ color: theme }}>Projects page</Link> or explore learning stories and tutorials on my <Link to="/blog" className="underline hover-80" style={{ color: theme }}>Blog</Link>.
          </p>
        </motion.div>

        <motion.div custom={6} variants={fadeUp} className="text-400 text-sm">
          If you’re looking for a developer who codes with clarity, consistency, and creativity —
          <br />
          Let’s connect via the <Link to="/contact" className="underline hover-80" style={{ color: theme }}>contact page</Link> and create something impactful together.
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
