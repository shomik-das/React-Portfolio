import { useAppSettings } from "../context/AppSettingsContext"
import Navbar from "./Navbar";
import AppSettings from "./AppSettings";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"

const Header = () => {

  const { theme, borderRadius } = useAppSettings(); // theme settings usage ke liye.
  const navigate = useNavigate(); // navigation ke liye.
  const [isOpen, setIsOpen] = useState(false);

  //button click animation

  const buttonTap = {
    initial: { scale: 1 },
    whileTap: {
      scale: [0.95, 1.05, 1],
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };


  return (
    <motion.header
      initial={{
        opacity: 0,
        y: 0
      }}
      animate={{
        y: [-40, 10, 0],
        opacity: 1
      }}

      transition={{
        duration: 1,
        ease: "easeInOut"
      }}

      className="flex items-center justify-between px-4 lg:px-20 h-20 top-0 sticky z-50 overflow-hidden">
      <motion.div
  {...buttonTap}
  onClick={() => navigate("/")}
  className="cursor-pointer px-4 py-2 flex items-center font-bold text-2xl tracking-wide text-100 bg-blur-lg"
  style={{
    background: `linear-gradient(135deg, ${theme + "10"}, ${theme})`,
    borderRadius: borderRadius + "px",
  }}
>
  SD
</motion.div>


      <div className={`middle ${isOpen ? "block" : "sm:block hidden"} bg-transparent`}>
        <Navbar />
      </div>
      <div className="right flex-center gap-3">
        <motion.button
          {...buttonTap}
        >
          <Link to={"/contact"} style={{ border: `1px solid ${theme}`, borderRadius: borderRadius + 'px' }} className={`btn-default sm:flex hidden px-4 py-[.4rem] text-100 bg-neutral-900 hover-80`}>Hire Me</Link>
        </motion.button>
        <AppSettings />

        {/* yeh section hamburger ke liye hai for mobile device  */}
        <motion.button
          {...buttonTap}
          style={{ borderRadius: borderRadius + 'px', background: `linear-gradient(135deg, ${theme + "20"}, ${theme + "30"})`, borderColor: theme }} onClick={() => setIsOpen((prev) => !prev)} className="text-100 bg-blur-lg border bg-neutral-900 p-1 rounded-lg flex sm:hidden hover-80 cursor-pointer">{isOpen ? <X size={27} /> : <Menu size={27} />}</motion.button>
      </div>
    </motion.header>
  )
}

export default Header