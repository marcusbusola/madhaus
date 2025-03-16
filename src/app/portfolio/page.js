"use client"; // Mark this file as a Client Component

import { useEffect, useRef, useState, useMemo } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const HighlightText = () => {
  const words = ['From', 'content', 'to', 'consciousness', 'to', 'change!'];

  return (
    <div className="w-full flex items-center justify-end max-w-4xl ml-auto text-right min-h-[80vh]">
      <h1 className="font-light leading-tight text-[30px]">
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }} // Faster animation
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </h1>
    </div>
  );
};

// Refactored ProjectCarousel Component with portrait images and centered nav arrows
const ProjectCarousel = () => {
  // Project data with text and image information - wrapped in useMemo to avoid re-creation on each render
  const projects = useMemo(() => [
    {
      id: 1,
      title: "Forge",
      description: "Forge empowers Nigerian youth to create impactful solutions through collaboration, mentorship, and structured innovation frameworks during their service year. We provide resources, training, and support to help young leaders develop sustainable community projects.",
      images: ["/7.svg", "/5.svg", "/4.svg"],
      link: "/forge",
      cta: "Contact Us"
    },
    {
      id: 2,
      title: "Keyhole",
      description: "Keyhole connects corps members with resources, networks, and opportunities that unlock their potential to address community challenges effectively. Our platform facilitates knowledge sharing and cross-pollination of ideas across different regions of Nigeria.",
      images: ["/6.svg", "/8.svg", "/9.svg"],
      link: "/keyhole",
      cta: "Go to our Website"
    },
    {
      id: 3,
      title: "Pods",
      description: "Pods creates vibrant hubs where like-minded corps members collaborate on community challenges through structured frameworks and mentorship. Each Pod serves as an innovation laboratory where ideas are refined, tested, and implemented with local community involvement.",
      images: ["/1.svg", "/2.svg", "/3.svg"],
      link: "/pods",
      cta: "Take our Survey"
    }
  ], []); // Empty dependency array means this array is only created once

  // State for current project and image
  const [currentProject, setCurrentProject] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const carouselRef = useRef(null);

  // Handle manual navigation between projects
  const navigateToProject = (index) => {
    setCurrentProject(index);
    setCurrentImage(0); // Reset image rotation when changing projects
  };

  // Next and previous project navigation
  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
    setCurrentImage(0);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    setCurrentImage(0);
  };

  // Automatic image rotation within a project
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prevImg) => (prevImg + 1) % projects[currentProject].images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(imageInterval);
  }, [currentProject, projects]); // Now projects won't cause unnecessary re-renders as it's memoized

  return (
    <div 
      ref={carouselRef} 
      className="min-h-screen py-20 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Carousel Section */}
        <div className="relative">
          {/* Project Content */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentProject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Text Content - Left Side */}
              <div className="w-full md:w-1/2 md:pr-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Circle with title */}
                  <div className="border border-gray-300 rounded-full w-20 h-20 flex items-center justify-center text-base text-gray-800 mb-6 font-medium">
                    {projects[currentProject].title}
                  </div>
                  
                  {/* Description without repeating the title as a heading */}
                  <p className="text-base leading-relaxed mb-8">
                    {projects[currentProject].description}
                  </p>
                  
                  {/* Consistent button style with text outside and arrow inside */}
                  <div className="flex justify-start items-center gap-4 text-black">
                    <span className="text-base">{projects[currentProject].cta}</span>
                    <Link
                      href={projects[currentProject].link}
                      className="flex items-center gap-2 bg-[#f2ece3] py-2 px-4 md:py-3 md:px-6 rounded-md"
                    >
                      <motion.span
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </div>
                </motion.div>
              </div>
              
              {/* Images - Right Side - Modified for portrait/rectangle format */}
              <div className="w-full md:w-1/2 relative h-96 md:h-120">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 rounded-lg overflow-hidden"
                  >
                    <div className="relative w-full h-full" style={{ aspectRatio: '2/3' }}>
                      <Image
                        src={projects[currentProject].images[currentImage]}
                        alt={`${projects[currentProject].title} image ${currentImage + 1}`}
                        className="object-cover rounded-lg"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Image indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {projects[currentProject].images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentImage === idx ? 'bg-white' : 'bg-white/50'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Centralized Navigation Controls */}
        <div className="flex flex-col items-center mt-16">
          {/* Navigation Arrows directly above pagination dots */}
          <div className="flex justify-center space-x-8 mb-6">
            <button 
              onClick={prevProject}
              className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Previous project"
            >
              <FaArrowLeft />
            </button>
            
            <button 
              onClick={nextProject}
              className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Next project"
            >
              <FaArrowRight />
            </button>
          </div>
          
          {/* Project Navigation Dots */}
          <div className="flex justify-center gap-4">
            {projects.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => navigateToProject(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentProject === idx ? 'bg-black' : 'bg-gray-300'
                }`}
                aria-label={`Go to ${project.title} project`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SystemsThinking = () => {
  const steps = ['Problem?', 'Research', 'Inform', 'Discuss'];
  
  // Create refs for each carousel item
  const slideRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white p-8">
      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full">
        {/* Custom Carousel Implementation */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {steps.map((text, index) => (
            <motion.div
              key={index}
              ref={slideRefs[index]}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 1, 1, 0], 
                scale: [0.8, 1, 1, 0.8],
                x: [0, 0, 0, 50] 
              }}
              transition={{ 
                duration: 5,
                times: [0, 0.2, 0.8, 1],
                repeat: Infinity, 
                repeatDelay: 1,
                delay: index * 1.5 
              }}
              className={`border border-white/70 rounded-full w-36 h-36 md:w-48 md:h-48 flex items-center justify-center text-sm md:text-base text-white/90`}
            >
              {text}
            </motion.div>
          ))}
        </div>

        {/* Text and Button Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <p className="text-base md:text-lg leading-relaxed max-w-2xl">
            We bring systems thinking to African challenges, then craft engaging
            content that builds collective consciousness. Our vibrant
            communities become laboratories where bold ideas transform into
            practical solutions. Through rigorous testing and strategic
            partnerships, we turn promising concepts into sustainable
            initiatives.
          </p>
          <div className="flex justify-end items-center gap-4">
            <span className="text-base">Let's Talk</span>
            <Link
              href="/work"
              className="flex items-center gap-2 bg-[#f2ece3] py-2 px-4 md:py-3 md:px-6 rounded-md"
            >
              <motion.span className="text-black"
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompletePods = () => {
  const circleRef = useRef(null);
  const archRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollY / scrollHeight;

      if (circleRef.current) {
        const scale = 1 + scrollPercentage * 10; // Adjust the multiplier to control the growth rate
        circleRef.current.style.transform = `scale(${scale})`;
        circleRef.current.style.opacity = 1 - scrollPercentage; // Fade out as it grows
      }
      
      if (archRef.current) {
        // The arch should expand horizontally and vertically
        const scaleX = 1 + scrollPercentage * 1.5;
        const scaleY = 1 + scrollPercentage * 1;
        archRef.current.style.transform = `scaleX(${scaleX}) scaleY(${scaleY})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <section className="relative bg-black text-white min-h-screen flex flex-col justify-between px-25 py-12 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-184 w-254 bg-white rounded-t-full transform translate-y-1/2 z-10" ref={archRef}>
          <div className="absolute inset-0" ref={circleRef}>
            <svg
              viewBox="10 10 900 900"
              className="w-full h-full"
              preserveAspectRatio="xMinYMin slice"
              style={{ transform: 'rotate(92deg)' }}
            >
              {[450, 370, 320, 270, 220, 180, 140, 100].map((radius, index) => (
                <motion.circle
                  key={index}
                  cx={650 - index * 40}
                  cy={250 - index * 5}
                  r={radius}
                  fill="none"
                  stroke="#f2ece3"
                  strokeWidth="0.6"
                  initial={{ strokeOpacity: 0.2 }}
                  animate={{ 
                    strokeOpacity: [0.2, 1, 0.2],
                    r: [radius, radius * 1.1, radius]
                  }}
                  transition={{
                    duration: 2 + index * 0.5,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
              ))}
            </svg>
          </div>
        </div>
        <div className="absolute top-8 left-8 z-10">
          <Image src="/MH.svg" alt="Madhaus Logo" width={120} height={40} />
        </div>
        <HighlightText />
      </section>
      
      {/* Refactored ProjectCarousel */}
      <ProjectCarousel />
      
      <SystemsThinking />
      <footer className="w-full bg-black py-50 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-40">
            <Image src="/MH.svg" alt="Madhaus Logo" width={260} height={120} />
          </div>
          <div className="flex flex-col items-center md:items-start gap-6 font-manrope">
            <h2 className="text-3xl font-light text-[#EDE7DE]">Join the Madness</h2>
            <div className="relative w-full max-w-md mt-5">
              <div className="flex items-center rounded-full border border-[#EDE7DE] overflow-hidden">
                <input
                  type="email"
                  className="w-full bg-transparent py-1.5 px-4 text-[#EDE7DE] placeholder-[#EDE7DE] focus:outline-none text-sm"
                />
                <button className="rounded-full bg-[#EDE7DE] text-black py-0.5 px-4 text-sm mx-1 hover:bg-gray-300 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="flex gap-6 mt-5">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="bg-[#EDE7DE] text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="bg-[#EDE7DE] text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="bg-[#EDE7DE] text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="bg-[#EDE7DE] text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                className="bg-[#EDE7DE] text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
              >
                <FaYoutube size={18} />
              </a>
              <a
                href="https://tiktok.com"
                aria-label="TikTok"
                className="bg-[#EDE7DE] text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
              >
                <FaTiktok size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompletePods;
