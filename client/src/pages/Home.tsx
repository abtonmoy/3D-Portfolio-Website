import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import ThreeBackground from "@/components/ThreeBackground";

export default function Home() {
  useEffect(() => {
    document.title = "Abdul Basit Tonmoy - Data Scientist & AI/ML Engineer";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Data Scientist & AI/ML Engineer specializing in intelligent solutions, autonomous robotics, and bioinformatics. Expert in Python, Machine Learning, and cutting-edge AI technologies.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Data Scientist & AI/ML Engineer specializing in intelligent solutions, autonomous robotics, and bioinformatics. Expert in Python, Machine Learning, and cutting-edge AI technologies.';
      document.head.appendChild(meta);
    }

    // Add Open Graph meta tags
    const addMetaTag = (property: string, content: string) => {
      const existing = document.querySelector(`meta[property="${property}"]`);
      if (existing) {
        existing.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    addMetaTag('og:title', 'Abdul Basit Tonmoy - Data Scientist & AI/ML Engineer');
    addMetaTag('og:description', 'Data Scientist & AI/ML Engineer specializing in intelligent solutions, autonomous robotics, and bioinformatics.');
    addMetaTag('og:type', 'website');
    addMetaTag('og:image', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630');
  }, []);

  return (
    <div className="font-inter">
      <ThreeBackground />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <footer className="py-8 border-t border-olivine/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-beaver">© 2024 Abdul Basit Tonmoy. Crafted with passion and precision.</p>
        </div>
      </footer>
    </div>
  );
}
