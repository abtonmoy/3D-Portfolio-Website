import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showToast, setShowToast] = useState<{
    title: string;
    description: string;
    variant?: string;
  } | null>(null);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setShowToast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setShowToast(null), 5000);
    },
    onError: (error) => {
      setShowToast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
      setTimeout(() => setShowToast(null), 5000);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setShowToast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setTimeout(() => setShowToast(null), 3000);
      return;
    }
    contactMutation.mutate(formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "School/Work Email",
      value: "atonmoy27@wabash.edu",
      color: "brunswick",
    },
    {
      icon: Mail,
      label: "Personal Email",
      value: "abdulbasittonmoy@gmail.com",
      color: "brunswick",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Crawfordsville, IN 47933",
      color: "brunswick",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/abdul-basit-tonmoy",
      color: "brunswick",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/abtonmoy",
      color: "brunswick",
    },
  ];

  const getLink = (info: (typeof contactInfo)[0]) => {
    switch (info.label) {
      case "Email":
        return `mailto:${info.value}`;
      case "Location":
        return `https://www.google.com/maps?q=${encodeURIComponent(
          info.value
        )}`;
      case "LinkedIn":
        return `https://${
          info.value.startsWith("linkedin.com")
            ? info.value
            : `www.linkedin.com/in/${info.value}`
        }`;
      case "GitHub":
        return `https://${
          info.value.startsWith("github.com")
            ? info.value
            : `github.com/${info.value}`
        }`;
      default:
        return "#";
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-olivine text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Let's Connect
        </motion.h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.h3
                className="text-2xl font-semibold text-beaver mb-6"
                variants={itemVariants}
              >
                Get In Touch
              </motion.h3>
              <motion.p
                className="text-beaver text-lg mb-8"
                variants={itemVariants}
              >
                I'm always excited to discuss new opportunities, innovative
                projects, or collaborations in data science and AI/ML. Let's
                create something amazing together!
              </motion.p>
            </div>
            <motion.div className="space-y-6" variants={containerVariants}>
              {contactInfo.map((info) => (
                <motion.a
                  key={info.label}
                  href={getLink(info)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className="flex items-center space-x-4 group cursor-pointer"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={`w-12 h-12 bg-${info.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 hover:shadow-lg hover:shadow-${info.color}/25`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <info.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-olivine font-semibold">{info.label}</p>
                    <p className="text-beaver">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="glass-effect rounded-2xl p-8"
          >
            <motion.h3
              className="text-2xl font-semibold text-beaver mb-6"
              variants={itemVariants}
            >
              Send Message
            </motion.h3>
            <motion.form
              className="space-y-6"
              variants={containerVariants}
              onSubmit={handleSubmit}
            >
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="name"
                  className="block text-olivine font-medium mb-2"
                >
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-pakistan/20 border border-olivine/30 rounded-lg text-beaver placeholder-beaver/60 focus:border-olivine focus:outline-none transition-colors duration-300"
                  placeholder="Your Name"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-olivine font-medium mb-2"
                >
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-pakistan/20 border border-olivine/30 rounded-lg text-beaver placeholder-beaver/60 focus:border-olivine focus:outline-none transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="subject"
                  className="block text-olivine font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-pakistan/20 border border-olivine/30 rounded-lg text-beaver placeholder-beaver/60 focus:border-olivine focus:outline-none transition-colors duration-300"
                  placeholder="Project Collaboration"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="block text-olivine font-medium mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-pakistan/20 border border-olivine/30 rounded-lg text-beaver placeholder-beaver/60 focus:border-olivine focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-brunswick hover:bg-olivine text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brunswick/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactMutation.isPending ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>

        {/* Floating contact elements */}
        <motion.div
          className="absolute top-10 left-10 w-8 h-8 bg-gradient-to-r from-olivine to-beaver rounded-full opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-6 h-6 bg-brunswick transform rotate-45 opacity-25"
          animate={{
            y: [0, -25, 0],
            rotate: [45, 135, 45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <div
            className={`p-4 rounded-lg shadow-lg ${
              showToast.variant === "destructive"
                ? "bg-red-600"
                : "bg-green-600"
            } text-white`}
          >
            <div className="font-semibold">{showToast.title}</div>
            <div className="text-sm opacity-90">{showToast.description}</div>
          </div>
        </div>
      )}
    </section>
  );
}
