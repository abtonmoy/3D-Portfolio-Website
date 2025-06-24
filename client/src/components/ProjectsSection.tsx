import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ArrowRight } from "lucide-react";

export default function ProjectsSection() {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const projects = [
    {
      title: "HackEnzyme",
      description:
        "Protein generation model using RosLab ProT_T5_Large achieving 15% higher accuracy and 25% faster processing with custom enzyme-chemical dataset.",
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200",
      tags: ["Python", "PyTorch", "Bioinformatics", "ML"],
      github: "https://github.com/abtonmoy/HackEnzyme",
      category: "AI/ML",
    },
    {
      title: "Autonomous Weather Drone",
      description:
        "AI-powered autonomous weather drone integrating OpenCV, PyTorch, and Arduino with Raspberry Pi for edge processing and multi-sensor fusion.",
      image:
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200",
      tags: ["OpenCV", "Arduino", "Robotics", "IoT"],
      github: "https://github.com/abtonmoy/weather-drone", // example
      category: "Robotics",
    },
    {
      title: "Fleet Analytics Dashboard",
      description:
        "Real-time data dashboard using React, Redux, and Material-UI with cost-saving analysis resulting in $20,160 annual savings.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200",
      tags: ["React", "Redux", "Data Analysis", "Full-Stack"],
      github: "https://github.com/abtonmoy/fleet-analytics",
      category: "Web Development",
    },
    {
      title: "Bioinformatics Suite",
      description:
        "Full-stack bioinformatics application integrating ESM-Fold for 3D protein structure mapping, enhancing computational efficiency by 20%.",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200",
      tags: ["ESM-Fold", "3D Modeling", "Full-Stack", "Bioinformatics"],
      github: "https://github.com/abtonmoy/bioinformatics-suite",
      category: "Bioinformatics",
    },
    {
      title: "Robotics & IoT Club",
      description:
        "Founded and led educational initiative providing hands-on AI and IoT experience to 20+ students, fostering next-generation tech leaders.",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200",
      tags: ["Leadership", "IoT", "Education", "Mentoring"],
      github: "https://github.com/abtonmoy/robotics-club",
      category: "Leadership",
    },
    {
      title: "Intelligent Chatbot",
      description:
        "Developed AI chatbot with advanced search functionality using Dialogflow, reducing response time by 30% and boosting engagement by 25%.",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200",
      tags: ["Dialogflow", "NLP", "AI", "Chatbot"],
      github: "https://github.com/abtonmoy/chatbot",
      category: "AI/ML",
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-olivine text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="project-card rounded-2xl p-6 card-3d group"
              whileHover={{
                y: -15,
                rotateX: 5,
                transition: { type: "spring", stiffness: 300 },
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
              }}
            >
              <motion.img
                src={project.image}
                alt={`${project.title} - ${project.category} Project`}
                className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              />

              <motion.div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-olivine">
                    {project.title}
                  </h3>
                  <span className="text-xs bg-brunswick/20 text-olivine border border-olivine/30 px-2.5 py-0.5 rounded-full">
                    {project.category}
                  </span>
                </div>

                <p className="text-beaver text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-brunswick/10 text-olivine border border-olivine/20 hover:bg-brunswick/20 transition-colors px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olivine hover:text-beaver transition-colors duration-300 flex items-center"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olivine hover:text-beaver transition-colors duration-300 flex items-center"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-10 right-10 w-8 h-8 bg-gradient-to-r from-olivine to-beaver rounded-full opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-10 left-10 w-6 h-6 bg-brunswick rounded-lg opacity-25 transform rotate-45"
          animate={{
            y: [0, -20, 0],
            rotate: [45, 90, 45],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>
    </section>
  );
}
