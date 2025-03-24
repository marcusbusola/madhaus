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

// SystemsThinking Component - Moved from section three to section two
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

// ProjectAccordion Component
const ProjectAccordion = () => {
  // Project data with text and image information
  const projects = useMemo(() => [
    {
      id: 1,
      title: "Pods",
      description: "With Pods, we're creating a new model for youth-led social innovation across Nigeria",
      image: "/1.svg",
      link: "/pods"
    },
    {
      id: 2,
      title: "Forge",
      description: "With Pods, we're creating a new model for youth-led social innovation across Nigeria",
      image: "/7.svg",
      link: "/forge"
    },
    {
      id: 3,
      title: "Keyhole",
      description: "With Pods, we're creating a new model for youth-led social innovation across Nigeria",
      image: "/6.svg",
      link: "/keyhole"
    }
  ], []);

  // State to track which accordion item is open
  const [openItem, setOpenItem] = useState(null);

  // Toggle accordion item
  const toggleItem = (id) => {
    if (openItem === id) {
      setOpenItem(null);
    } else {
      setOpenItem(id);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Accordion Container */}
        <div className="flex flex-col">
          {projects.map((project) => (
            <div key={project.id} className="mb-8 last:mb-0">
              {/* Accordion Item */}
              <div className="w-full">
                {/* Accordion Header */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
                  {/* Left side - Image */}
                  <div className="w-full aspect-[3/2] relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  
                  {/* Right side - Text and expand button */}
                  <div className="flex flex-col justify-end items-center text-center h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-light mb-2">{project.title}</h3>
                      <p className="text-lg mb-4">{project.description}</p>
                    </div>
                    <button
                      onClick={() => toggleItem(project.id)}
                      className="border border-black rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
                      aria-label={openItem === project.id ? "Collapse content" : "Expand content"}
                    >
                      {openItem === project.id ? "-" : "+"}
                    </button>
                  </div>
                </div>
                
                {/* Accordion Content */}
                <AnimatePresence>
                  {openItem === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-[#f2ece3] w-full p-6"
                    >
                      <div className="pb-4">
                        <p className="mb-4">
                          More detailed information about {project.title}. Our initiative focuses on 
                          empowering youth across Nigeria to create meaningful change in their communities.
                        </p>
                        <p className="mb-4">
                          Through collaboration, mentorship, and structured innovation frameworks, 
                          we enable young leaders to develop sustainable projects.
                        </p>
                        <div className="flex justify-end">
                          <Link 
                            href={project.link}
                            className="border border-black rounded-full w-8 h-8 flex items-center justify-center"
                          >
                            →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CompletePods = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <section className="relative bg-black text-white min-h-screen flex flex-col justify-between px-25 py-12 overflow-hidden">
        <div className="absolute top-8 left-8 z-10">
          <Image src="/MH.svg" alt="Madhaus Logo" width={120} height={40} />
        </div>
        <HighlightText />
      </section>
      
      {/* SystemsThinking is now in section two position */}
      <SystemsThinking />
      
      {/* ProjectAccordion is now in section three position */}
      <ProjectAccordion />
      
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
