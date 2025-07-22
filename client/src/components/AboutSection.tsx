import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import p1 from "../../../assets/p1.png";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const stats = [
    { number: "15+", label: "Projects" },
    { number: "3+", label: "Years Experience" },
    { number: "500+", label: "Students Tutored" },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-olivine mb-8"
            >
              About Me
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-beaver text-lg leading-relaxed"
            >
              I'm a passionate Data Scientist and AI/ML Engineer with a strong
              foundation in Computer Science and Mathematics. Based in
              Crawfordsville, IN, I specialize in creating intelligent solutions
              that bridge the gap between complex data and actionable insights.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-beaver text-lg leading-relaxed"
            >
              My expertise spans from autonomous robotics and machine learning
              to bioinformatics and protein structure analysis. I believe in the
              power of technology to solve real-world problems and create
              meaningful impact.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-3 gap-6 mt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center glass-effect rounded-lg p-4 hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-2xl font-bold text-olivine"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      delay: index * 0.1 + 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-beaver text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Professional Image */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              className="w-80 h-80 glass-effect rounded-3xl flex items-center justify-center animate-glow"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-center">
                <motion.img
                  src={p1}
                  alt="Abdul Basit Tonmoy - Professional Portrait"
                  className="w-64 h-64 rounded-2xl object-cover shadow-2xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.p
                  className="text-olivine mt-4 font-semibold"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.8 }}
                ></motion.p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
