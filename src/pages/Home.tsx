import AboutIntro from '../components/AboutIntro';
import EssentialTools from '../components/EssentialTools';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { useProjectContext } from '../context/projectContext';
import ContactForm from '../components/ContactForm';
import { useBlogContext } from '../context/BlogContext';
import { ArrowRight } from 'lucide-react';
import { useAppSettings } from '../context/AppSettingsContext';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
import BlogCard from '../components/BlogCard';
import ProjectCardSkeleton from '../components/Skeleton/ProjectCardSkeleton';

const Home = () => {

    const { theme, borderRadius } = useAppSettings();

    const { projects, loading: ProjectLoading } = useProjectContext(); // yaha pe projects ko context se le rhe hai.
    const { blogs, loading: BlogLoading } = useBlogContext(); // yaha pe blogs ko context se le rhe hai.

    const navigate = useNavigate();

    //button click animation

    const buttonTap = {
        initial: { scale: 1 },
        whileTap: {
            scale: [0.95, 1.05, 1],
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
        },
    };

    return (
        <>
            <section className="sm:min-h-[88vh] sm:py-0 py-10 w-full flex-center flex-col md:flex-row px-4 lg:px-20">
                <Hero />
            </section>

            <section className="about-intro flex-center px-4 lg:px-20 my-10">
                <AboutIntro />
            </section>

            <section className="about-intro flex-center px-4 lg:px-20 mt-20 mb-10">
                <EssentialTools />
            </section>
            <section className="px-4 lg:px-20 py-10 flex-center" id='projects'>
                <div className="projects lg:w-[65rem] w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className='flex-between mb-10'>
                        <h2 className="text-3xl font-bold text-100">My Projects</h2>
                        <motion.button
                            {...buttonTap}
                            onClick={() => navigate("/projects")} style={{ background: theme + 20, border: `1px solid ${theme + "50"}`, borderRadius: borderRadius + 'px' }} className='text-100 p-2 rounded-lg hover-80 cursor-pointer'><ArrowRight size={18} /></motion.button>
                    </motion.div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>

                        {ProjectLoading ?

                            (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <ProjectCardSkeleton key={index} />
                                ))
                            )
                            :

                            (
                                projects.slice(0, 3).map((project, index) => {
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 120,
                                                damping: 18,
                                                delay: index * 0.15,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                        > <ProjectCard
                                                slug={project.slug}
                                                title={project.title}
                                                description={project.description}
                                                techStack={project.techStack}
                                                tags={project.tags}
                                                githubLink={project.githubLink}
                                                liveDemo={project.liveDemo}
                                                screenshots={project.screenshots}
                                                isLatest={project.isLatest}
                                            />
                                        </motion.div>

                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </section>
            <section className="px-4 lg:px-20 py-10 flex-center">
                <div className="projects lg:w-[65rem] w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className='flex-between mb-10'>
                        <h2 className="text-3xl font-bold text-100">My Blogs</h2>
                        <motion.button
                            {...buttonTap}
                            onClick={() => navigate("/blog")} style={{ background: theme + 20, border: `1px solid ${theme + "50"}`, borderRadius: borderRadius + 'px' }} className='text-100 p-2 rounded-lg hover-80 cursor-pointer'><ArrowRight size={18} /></motion.button>
                    </motion.div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>

                        {BlogLoading ?

                            (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <ProjectCardSkeleton key={index} />
                                ))
                            )
                            :

                            blogs.slice(0, 3).map((blog, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 18,
                                        delay: index * 0.15,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                ><BlogCard
                                        key={blog.id}
                                        title={blog.title}
                                        slug={blog.slug}
                                        description={blog.description}
                                        coverImage={blog.coverImage}
                                        date={blog.date}
                                        readTime={blog.readTime}
                                        tags={blog.tags}
                                    />
                                </motion.div>

                            ))
                        }
                    </div>
                </div>
            </section>
            <section className="px-4 lg:px-20 py-10 flex-center">
                <ContactForm />
            </section>
        </>
    )
}

export default Home