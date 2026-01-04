/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Send,
} from "lucide-react";
import { useAppSettings } from "../context/AppSettingsContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import { motion, spring } from "framer-motion";

const Contact = () => {
  const { theme, borderRadius } = useAppSettings(); // for theme use.
  const [result, setResult] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const { submit: onSubmit } = useWeb3Forms({
    access_key: import.meta.env.VITE_WEB3FORM_ACCESS_KEY,
    settings: {
      from_name: "Portfolio Contact Form",
      subject: "New message from portfolio",
    },
    onSuccess: () => {
      setIsSuccess(true);
      setResult("✅ Message sent successfully!");
      setIsSending(false);
      reset();
      setTimeout(() => setResult(""), 5000);
    },
    onError: () => {
      setIsSuccess(false);
      setIsSending(false);
      setResult("❌ Something went wrong. Please try again.");
    },
  });

  const handleFormSubmit = async (data: any) => {
    setIsSending(true);
    await onSubmit(data); // call onSubmit function.
  };

  const parentVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
        ,
      },
    },
  };

  const buttonTap = {
    whileTap: {
      scale: 0.96,
      transition: { type: spring, stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.section
      id="contact"
      className="lg:w-[65rem] w-full bg-900 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={parentVariant}
    >
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/* Left: Info section */}
        <motion.div className="flex-1 space-y-6" variants={childVariant}>
          <h2 className="text-3xl font-bold leading-tight">
            <span className="text-neutral-400">Let's</span> <span style={{ color: theme }}>connect</span > <span className="text-neutral-400">&</span><br />
            <span className="text-neutral-400">build something cool</span>
          </h2>
          <p className="text-neutral-400">
            I'm open to internships, freelance work, or cool projects. Message
            me, I'd love to connect!
          </p>
        </motion.div>

        {/* Right: Form */}
        <motion.form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex-1 space-y-4"
          variants={childVariant}
        >
          <input type="hidden" {...register("from_name")} value="Portfolio Contact Form" />
          <input type="hidden" {...register("subject")} value="New message from portfolio" />

          {/* Name & Email */}
          <motion.div className="flex flex-col md:flex-row gap-4" variants={childVariant}>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Your Name"
              className="bg-800 px-4 py-2 rounded-md w-full text-100"
              style={{ caretColor: theme }}
            />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Your Email"
              className="bg-800 px-4 py-2 rounded-md w-full text-100"
              style={{ caretColor: theme }}
            />
          </motion.div>

          {/* Message */}
          <motion.textarea
            {...register("message", { required: true })}
            placeholder="Your Message"
            rows={5}
            className="w-full bg-800 px-4 py-2 rounded-md text-100"
            style={{ caretColor: theme }}
            variants={childVariant}
          ></motion.textarea>

          {/* Submit */}
          <motion.button
            type="submit"
            {...buttonTap}
            className="px-4 py-2 text-100 font-medium transition cursor-pointer flex-center gap-2 hover-80"
            style={{
              background: theme,
              borderRadius: borderRadius + "px",
            }}
            variants={childVariant}
          >
            <Send size={16} className={`${isSending ? "rotate-45" : "rotate-0"} duration-300`} /> {isSending ? "Sending..." : "Send Message"}
          </motion.button>

          {/* Result Message */}
          {result && (
            <motion.span
              className={`text-sm block mt-2 ${isSuccess ? "text-green-400" : "text-red-400"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {result}
            </motion.span>
          )}
        </motion.form>
      </div>
    </motion.section>
  );
};

export default Contact;
