import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const orbVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "JavaScript", "SQL", "Kotlin", "Flutter", "C"],
    },
    {
      title: "Frameworks & Tools",
      skills: [
        "React",
        "PyTorch",
        "NumPy",
        "Pandas",
        "MongoDB",
        "OpenCV",
        "Ros2",
      ],
    },
    {
      title: "Specializations",
      skills: [
        "Machine Learning",
        "Data Science",
        "AI/ML",
        "Robotics",
        "Bioinformatics",
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-olivine text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Technical Arsenal
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="mb-16">
              <motion.h3
                className="text-2xl font-semibold text-beaver mb-8 text-center"
                initial={{ opacity: 0, x: -50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                }
                transition={{ delay: categoryIndex * 0.2 + 0.3 }}
              >
                {category.title}
              </motion.h3>

              <motion.div
                className="flex flex-wrap justify-center gap-8"
                variants={containerVariants}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    variants={orbVariants}
                    className="skill-orb text-sm font-medium"
                    whileHover={{
                      scale: 1.15,
                      rotateY: 15,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Floating skill particles */}
        <motion.div
          className="absolute top-20 left-20 w-4 h-4 bg-olivine rounded-full opacity-30"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-20 w-6 h-6 bg-beaver rounded-full opacity-25"
          animate={{
            y: [0, -40, 0],
            x: [0, -25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-1/2 left-10 w-3 h-3 bg-brunswick rounded-full opacity-40"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 4,
          }}
        />
      </div>
    </section>
  );
}
