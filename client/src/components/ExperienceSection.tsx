import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const experiences = [
    {
      title: "Data Analyst",
      company: "Auxiliary Services, Wabash College",
      location: "Crawfordsville, IN",
      period: "Jan 2024 - Present",
      achievements: [
        "Conducted 15+ year fleet utilization analysis using Python and Excel",
        "Optimized fleet utilization, leading to cost savings and increasing projected revenue by $3,200 per vehicle",
        "Optimized acquisition strategies, generating annual cost savings of $20,160"
      ],
      color: "olivine"
    },
    {
      title: "Software Engineering Intern",
      company: "Motorpool, Wabash College",
      location: "Crawfordsville, IN",
      period: "Summer 2024",
      achievements: [
        "Built real-time data dashboard using React, Redux, and Material-UI",
        "Enhanced data security with authentication mechanisms and advanced search functionality",
        "Optimized backend data handling (MongoDB and Node.js), increasing efficiency by 40%",
        "Developed Dialogflow chatbot, automating 70% of common user queries"
      ],
      color: "beaver"
    },
    {
      title: "Teaching Assistant",
      company: "Physics Department, Wabash College",
      location: "Crawfordsville, IN",
      period: "Sep 2024 - Present",
      achievements: [
        "Led discussions and provided one-on-one tutoring for 40+ students",
        "Assisted with lab experiments and helped students grasp complex concepts",
        "Improved class performance and increased understanding of core concepts"
      ],
      color: "brunswick"
    },
    {
      title: "Vice-President",
      company: "Muslim Students' Association",
      location: "Wabash College",
      period: "Nov 2023 - Present",
      achievements: [
        "Organized weekly Jummah, interfaith events, and cultural exchanges for 500+ participants",
        "Fostered inclusivity and community engagement across campus",
        "Collaborated with other Indiana universities on Inter-MSA events"
      ],
      color: "chocolate"
    }
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-olivine text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Professional Journey
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="timeline-line h-auto absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-olivine via-brunswick to-chocolate"></div>
            
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                variants={itemVariants}
                className="relative mb-12 ml-16"
              >
                {/* Timeline Dot */}
                <motion.div 
                  className={`timeline-dot bg-${experience.color}`}
                  style={{ top: '1rem' }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    delay: index * 0.2 + 0.5, 
                    type: "spring", 
                    stiffness: 200 
                  }}
                />
                
                {/* Experience Card */}
                <motion.div 
                  className="glass-effect rounded-xl p-6 ml-6 hover:scale-[1.02] transition-all duration-300"
                  whileHover={{ 
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <motion.h3 
                      className="text-xl font-semibold text-olivine"
                      whileHover={{ scale: 1.05 }}
                    >
                      {experience.title}
                    </motion.h3>
                    <div className="flex items-center text-beaver text-sm mt-2 md:mt-0">
                      <Calendar className="w-4 h-4 mr-1" />
                      {experience.period}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-beaver mb-2">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {experience.company}
                  </div>
                  
                  <div className="flex items-center text-beaver/80 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    {experience.location}
                  </div>
                  
                  <motion.ul 
                    className="text-beaver space-y-2 text-sm"
                    variants={containerVariants}
                  >
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <motion.li
                        key={achievementIndex}
                        variants={itemVariants}
                        className="flex items-start"
                      >
                        <span className="text-olivine mr-2 font-bold">•</span>
                        {achievement}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div 
          className="absolute top-20 right-20 w-6 h-6 bg-olivine rounded-full opacity-30"
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 left-20 w-4 h-4 bg-beaver transform rotate-45 opacity-25"
          animate={{ 
            rotate: [45, 135, 225, 315, 45],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </section>
  );
}
