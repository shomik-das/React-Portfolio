import { useAppSettings } from "../context/AppSettingsContext";
import { useState } from "react";
import { socialMedia } from "../utils/socialMediaLinks";

const Footer = () => {
    const { theme, borderRadius } = useAppSettings();
    const [hovered, setHovered] = useState("");

    return (
        <footer className="bg-900 text-100 px-4 py-6 border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                {/* Social Links */}
                <div className="flex gap-4">
                    {socialMedia.map(({ label, href, Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHovered(label)}
                            onMouseLeave={() => setHovered("")}
                            className="p-2 transition border border-transparent bg-800"
                            style={{
                                color: hovered === label ? theme : "",
                                borderColor: hovered === label ? theme : "",
                                borderRadius: borderRadius + 'px'
                            }}
                        >
                            <Icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>

                {/* Name and Love Message */}
                <p className="text-sm text-neutral-400 text-center">
                    Made 
                    {/* with{" "} <Heart className="inline-block w-4 h-4 text-red-500 animate-pulse" />{" "} */}
                    by <span className="font-semibold" style={{ color: theme }}>SHOMIK</span> © {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
