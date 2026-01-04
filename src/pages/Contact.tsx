import { Map } from "lucide-react";
import ContactForm from "../components/ContactForm";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion } from "framer-motion";

const ContactPage = () => {
  const { theme } = useAppSettings();

const contactDetails = [
  {
    label: "Email",
    value: "shomiksii@gmail.com",
    link: "mailto:shomiksii@gmail.com",
  },
  {
    label: "Phone",
    value: "+880 1744553030",
    link: "tel:+8801744553030",
  },
  {
    label: "Location",
    value: "Bangladesh",
  },
  {
    label: "GitHub",
    value: "github.com/shomik-das",
    link: "https://github.com/shomik-das",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/shomik-das",
    link: "https://www.linkedin.com/in/shomik-das/",
  },
  {
    label: "Instagram",
    value: "instagram.com/shomik.das",
    link: "https://www.instagram.com/shomik.das/",
  },
];


  return (
    <motion.section
      className="min-h-screen px-4 md:px-10 lg:px-20 py-10 flex justify-center bg-900 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className="lg:w-[65rem] w-full space-y-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <h2 className="text-3xl font-bold text-white">
            Get in <span style={{ color: theme }}>touch</span>
          </h2>
          <p className="text-neutral-400 mt-2">
            Feel free to reach out via any of the platforms or contact methods below.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {contactDetails.map(({ label, value, link }) => (
            <motion.div
              key={label}
              className="bg-800 p-4 rounded-lg border border-transparent hover:border-[var(--theme)] transition"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 14,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <p className="text-sm text-neutral-400">{label}</p>
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-100 font-medium hover:underline"
                  style={{ color: theme }}
                >
                  {value}
                </a>
              ) : (
                <p className="text-100 font-medium" style={{ color: theme }}>
                  {value}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="map space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl flex items-center gap-2 font-semibold text-100">
            <Map style={{ color: theme }} /> Find Me on the Map
          </h2>

          <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-2xl">
            Whether you're around Delhi or just passing through, you're always welcome to drop a hello!
            Here's where I'm currently based — let's catch up for coffee, collaboration, or just a quick chat.
          </p>

          <div className="rounded-lg overflow-hidden border border-neutral-800 shadow-md">
            <iframe
              title="My Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112089.66442824132!2d77.14042636664048!3d28.519420460194893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1f7fc2c94ef%3A0x518f0c2c625d38df!2sPushp%20Vihar%2C%20New%20Delhi%2C%20Delhi%20110017!5e0!3m2!1sen!2sin!4v1720448123456!5m2!1sen!2sin"
              width="100%"
              height="350"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[350px]"
            ></iframe>
          </div>
        </motion.div>

        <div>
          <ContactForm />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ContactPage;