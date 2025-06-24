import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowDown } from "lucide-react";

export default function HeroSection() {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      left: number;
      top: number;
      delay: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    // Generate particles
    const particleArray = [];
    for (let i = 0; i < 50; i++) {
      particleArray.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 10 + 5,
      });
    }
    setParticles(particleArray);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Particles */}
      <div className="particle-bg">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="hero-comic text-6xl md:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Abdul Basit
            <br />
            <span className="text-5xl md:text-7xl">Tonmoy</span>
          </motion.h1>

          <motion.p
            className="text-olivine text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Data Scientist & AI/ML Engineer crafting intelligent solutions with
            code, mathematics, and creativity
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="bg-brunswick hover:bg-olivine text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brunswick/25"
            >
              View My Work
            </button>

            <a
              href="/c_assets/AbdulBasit_Tonmoy_resume.pdf"
              download
              className="border-2 border-beaver text-beaver hover:bg-beaver hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating 3D Elements */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-olivine to-brunswick rounded-lg transform rotate-45 opacity-70"
        animate={{
          y: [0, -20, -10, 0],
          rotate: [45, 50, 40, 45],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-32 right-16 w-12 h-12 bg-gradient-to-br from-beaver to-chocolate rounded-full opacity-60"
        animate={{
          y: [0, -20, -10, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/3 right-20 w-8 h-8 bg-olivine transform rotate-45 opacity-50"
        animate={{
          y: [0, -20, -10, 0],
          rotate: [45, 90, 0, 45],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={() => scrollToSection("about")}
          className="text-olivine hover:text-beaver transition-colors duration-300"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </motion.div>
    </section>
  );
}
