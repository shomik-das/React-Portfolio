import { FolderGit2, Home, Mail, PenLine, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion, type Variants, type Transition, } from "framer-motion";
import type { NavLinkProps } from "../types/types";

const Navbar = () => {
    const location = useLocation();
    const { theme, borderRadius } = useAppSettings();

    const navLinks: NavLinkProps[] = [
        { label: "Home", path: "/", icon: <Home size={18} /> },
        { label: "About", path: "/about", icon: <User size={18} /> },
        { label: "Projects", path: "/projects", icon: <FolderGit2 size={18} /> },
        { label: "Contact", path: "/contact", icon: <Mail size={18} /> },
        { label: "Blog", path: "/blog", icon: <PenLine size={18} /> },
    ];

    // Standard easing curves
    const easeInOut: Transition["ease"] = [0.4, 0, 0.2, 1];
    const easeOut: Transition["ease"] = [0, 0, 0.2, 1];

    // Button click animation
    const buttonTap = {
        initial: { scale: 1 },
        whileTap: {
            scale: [0.95, 1.05, 1],
            transition: { duration: 0.5, ease: easeInOut },
        },
    };

    // Container animation variants
    const containerVariants: Variants = {
        hidden: {
            opacity: 0,
            y: -10,
            scale: 0.98
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: easeOut,
                staggerChildren: 0.05
            }
        }
    };

    // Nav item animation variants
    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            x: -20
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: easeOut
            }
        },
        hover: {
            scale: 1.02,
            transition: {
                duration: 0.2,
                ease: easeOut
            }
        }
    };

    // Active indicator animation
    const activeIndicatorVariants: Variants = {
        hidden: {
            scale: 0.8,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: easeOut
            }
        }
    };

    // Icon animation variants
    const iconVariants: Variants = {
        idle: {
            scale: 1,
            rotate: 0
        },
        hover: {
            scale: 1.1,
            rotate: 2,
            transition: {
                duration: 0.2,
                ease: easeOut
            }
        },
        active: {
            scale: 1.05,
            transition: {
                duration: 0.2,
                ease: easeOut
            }
        }
    };

    // Text slide animation
    const textVariants: Variants = {
        hidden: {
            opacity: 0,
            x: -8
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.2,
                ease: easeOut
            }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
                border: `1px solid ${theme + "40"}`,
                borderRadius: borderRadius + 'px'
            }}
            className="sm:w-auto w-48 navbar bg-blur-lg sm:relative sm:flex-row flex-col fixed sm:top-0 top-18 sm:right-0 right-4 overflow-hidden"
        >
            {/* Subtle background gradient */}
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                    background: [
                        `linear-gradient(45deg, ${theme}10, transparent, ${theme}10)`,
                        `linear-gradient(45deg, transparent, ${theme}10, transparent)`
                    ]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "linear"
                }}
                style={{ borderRadius: borderRadius + 'px' }}
            />

            {navLinks.map((item, index) => {
                const isActive = location.pathname === item.path;

                return (
                    <motion.button
                        key={index}
                        {...buttonTap}
                        variants={itemVariants}
                        whileHover="hover"
                        className="w-full relative group"
                    >
                        {/* Active state background */}
                        {isActive && (
                            <motion.div
                                variants={activeIndicatorVariants}
                                initial="hidden"
                                animate="visible"
                                className="absolute inset-0 bg-neutral-100"
                                style={{ borderRadius: borderRadius + 'px' }}
                            />
                        )}

                        {/* Hover effect background */}
                        <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100"
                            style={{
                                background: `linear-gradient(135deg, ${theme}15, ${theme}08)`,
                                borderRadius: borderRadius + 'px'
                            }}
                            transition={{
                                duration: 0.2,
                                ease: easeOut
                            }}
                        />

                        <Link
                            style={{ borderRadius: borderRadius + 'px' }}
                            to={item.path}
                            className={`navlinks w-full relative z-10 ${isActive ? "bg-transparent w-full" : ""}`}
                        >
                            {/* Icon with animation */}
                            <motion.span
                                variants={iconVariants}
                                initial="idle"
                                animate={isActive ? "active" : "idle"}
                                whileHover="hover"
                                className={`inline-block ${isActive ? "text-neutral-800" : "text-neutral-400"} transition-colors duration-200`}
                            >
                                {item.icon}
                            </motion.span>

                            {/* Text with slide animation */}
                            <motion.span
                                variants={textVariants}
                                className={`${isActive ? "flex text-neutral-800" : "sm:hidden"} transition-colors duration-200`}
                            >
                                {item.label}
                            </motion.span>
                        </Link>
                    </motion.button>
                );
            })}
        </motion.div>
    );
};

export default Navbar;
