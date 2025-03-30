"use client"; // Mark this file as a Client Component

import { useEffect, useRef, useState, useMemo } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const HighlightText = () => {
  const words = ['From', 'content', 'to', 'consciousness', 'to', 'change!'];
  const containerRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [textPositions, setTextPositions] = useState({
    content: { x: 0, y: 0 },
    consciousness: { x: 0, y: 0 },
    change: { x: 0, y: 0 }
  });

  // Set up text positions after render
  useEffect(() => {
    if (containerRef.current) {
      const spanElements = containerRef.current.querySelectorAll('span');
      const positions = {};
      
      spanElements.forEach(span => {
        const text = span.textContent.toLowerCase();
        if (text === 'content' || text === 'consciousness' || text === 'change!') {
          const rect = span.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          positions[text.replace('!', '')] = { 
            x: rect.left - containerRect.left + rect.width / 2, 
            y: rect.top - containerRect.top + rect.height / 2 
          };
        }
      });

      setTextPositions(positions);
      setPathLength(1);
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-end max-w-4xl ml-auto text-right min-h-[80vh] relative" ref={containerRef}>
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
      
      {/* Squiggly line removed */}
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
            <span className="text-base">Let&apos;s Talk</span>
            <Link
              href="mailto:pr@madhaus.africa"
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

// ProjectAccordion Component - REFACTORED WITH UPDATED STYLING
const ProjectAccordion = () => {
  // Project data with text and image information
  const projects = useMemo(() => [
    {
      id: 1,
      title: "Pods",
      description: "At Pods, we believe in the power of experiential learning. Designed for NYSC members, Pods is a dynamic space where young changemakers can explore social innovation, build impactful projects, and connect with like-minded peers.",
      image: "/5.svg", // You might want to replace these with your actual high-contrast images
      link: "/pods"
    },
    {
      id: 2,
      title: "Forge",
      description: "Forge is our advanced incubation program that transforms promising ideas into sustainable initiatives through mentorship, resources, and strategic partnerships across Africa.",
      image: "/4.svg",
      link: "/forge"
    },
    {
      id: 3,
      title: "Keyhole",
      description: "Keyhole offers critical insights and research on African issues, unlocking new perspectives that inform policy, drive innovation, and create pathways for meaningful societal change.",
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
    <div className="min-h-screen py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Accordion Container - Now with increased margins between items */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="mb-0">
              {/* Accordion Item */}
              <div className="w-full">
                {/* Accordion Header - Removed white border */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 relative">
                  {/* Left side - High contrast Image */}
                  <div className="w-full aspect-video relative bg-black overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover filter brightness-125 saturate-0"
                      priority
                    />
                  </div>
                  
                  {/* Right side - Text and expand button */}
                  <div className="flex flex-col justify-center items-center text-center bg-white p-10 h-full relative">
                    <div className="max-w-md">
                      <h3 className="text-xl font-light mb-4">{project.title}</h3>
                      <p className="text-lg mb-8">{project.description}</p>
                    </div>
                    <button
                      onClick={() => toggleItem(project.id)}
                      className="border border-black rounded-full w-10 h-10 flex items-center justify-center focus:outline-none absolute bottom-8"
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
                        {project.id === 1 && (
                          <>
                            <p className="mb-4">
                              About Pods
Pods is a structured learning and collaboration space designed to help NYSC members engage meaningfully with social innovation during their service year. Recognizing that this period presents a unique opportunity for young professionals to immerse themselves in different communities and industries, Pods provides a framework for structured experimentation, hands-on learning, and impactful project development.

The program is built around the idea that innovation is best cultivated through real-world problem-solving. Participants work on initiatives that address pressing societal challenges across various sectors, including education, sustainability, technology, and economic development. By combining practical work with mentorship and strategic guidance, Pods ensures that every project is not just an idea but a step toward tangible impact.

A core component of Pods is its emphasis on skill-building. Through a series of curated workshops, hands-on projects, and knowledge-sharing sessions, participants develop expertise in leadership, entrepreneurship, and project management. These skills are not just theoretical—they are applied in real-time, allowing members to test solutions, adapt to challenges, and refine their approaches in a collaborative setting.

Mentorship is also a key part of the Pods experience. Participants engage with experienced professionals, industry leaders, and social entrepreneurs who provide insights, guidance, and feedback throughout the process. This exchange of knowledge ensures that ideas are not developed in isolation but are informed by real-world expertise and best practices.

Beyond individual skill-building, Pods fosters a strong sense of community. Participants work together, exchanging ideas and resources while learning from one another's experiences. This collaborative approach strengthens networks and creates an environment where innovation is not just encouraged but actively supported.

By the end of the program, participants leave with more than just a project—they gain a deeper understanding of problem-solving, the confidence to implement their ideas, and a network of peers and mentors who continue to support their growth. Pods is not just about working on social innovation during the service year; it is about developing the mindset and tools to engage with impactful work long after the program ends.
                            </p>
                            <p className="mb-4">
                              Through collaboration, mentorship, and structured innovation frameworks, 
                              we enable young leaders to develop sustainable projects.
                            </p>
                          </>
                        )}
                        
                        {project.id === 2 && (
                          <>
                            <p className="mb-4">
                              About Forge
Forge is our intensive incubation program designed to transform promising ideas into sustainable initiatives. We believe that great ideas need more than just enthusiasm—they require resources, strategic guidance, and a supportive ecosystem to truly flourish. 

At Forge, we provide a comprehensive suite of resources for visionary leaders and organizations working on high-impact projects across Africa. Our program offers access to funding opportunities, technical expertise, and operational support tailored to each initiative's unique needs and challenges.

A cornerstone of Forge is our strategic partnership approach. We connect innovators with a diverse network of organizations, from local community groups to international institutions, creating powerful collaborations that amplify impact and reach. These partnerships not only provide additional resources but also open doors to new markets, audiences, and implementation opportunities.

The Forge curriculum is built around proven innovation methodologies and practical business strategies. Participants engage in targeted workshops, receive personalized coaching, and benefit from regular feedback sessions with industry experts. This rigorous process ensures that ideas are thoroughly tested, refined, and positioned for long-term success.

What sets Forge apart is our commitment to contextually relevant innovation. We recognize that challenges in African communities require solutions that honor local knowledge, culture, and systems. Our approach emphasizes deep community engagement, participatory design, and solutions that build upon existing strengths and resources.

The Forge experience extends beyond the program duration through our active alumni network. Graduates continue to receive support, access to resources, and opportunities for collaboration, creating a growing ecosystem of innovators driving positive change across the continent.

Through Forge, we're not just supporting individual projects—we're building a movement of strategic, sustainable, and impactful initiatives that address some of Africa's most pressing challenges.
                            </p>
                            <p className="mb-4">
                              With deep mentorship, resource provision, and strategic partnerships, 
                              Forge transforms promising concepts into viable, sustainable enterprises.
                            </p>
                          </>
                        )}
                        
                        {project.id === 3 && (
                          <>
                            <p className="mb-4">
                              About Keyhole
Keyhole is our research and knowledge-sharing initiative focused on providing critical insights into complex African challenges. Named for its ability to unlock new perspectives, Keyhole produces thoughtful analysis that bridges the gap between academic knowledge and practical application in policy and innovation spaces.

Our research process begins with identifying key issues where better understanding can drive meaningful change. We engage with diverse stakeholders—from community members to policymakers—to ensure that our investigations are relevant, contextually grounded, and capable of informing real-world decisions.

Keyhole employs a mix of methodologies, combining rigorous data analysis with qualitative approaches that capture the rich context and lived experiences shaping African realities. This multi-dimensional approach allows us to produce findings that are both empirically sound and genuinely insightful about the human dimensions of the issues we explore.

A defining feature of Keyhole is its commitment to accessibility. We translate complex findings into engaging, accessible formats—from policy briefs and visual reports to interactive digital content and community conversations. This ensures that valuable insights reach those who can apply them, regardless of their technical background.

Keyhole also serves as a platform for African researchers, thinkers, and practitioners to share their expertise and perspectives. By amplifying local knowledge production, we contribute to a more balanced and authentic knowledge ecosystem around African development and innovation.

Strategic dissemination is central to Keyhole's approach. We actively engage with policymakers, media outlets, educational institutions, and community organizations to ensure our research informs key conversations and decision-making processes across multiple levels.

Through Keyhole, we're not just producing research—we're creating pathways for knowledge to catalyze action, inform better decisions, and ultimately contribute to more effective and equitable solutions to African challenges.
                            </p>
                            <p className="mb-4">
                              Through careful research and strategic dissemination, 
                              Keyhole provides critical insights that inform policy and drive innovation.
                            </p>
                          </>
                        )}
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
  const consciousnessRef = useRef(null);
  const secondSectionRef = useRef(null);
  const [linePathPoints, setLinePathPoints] = useState({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    height: 0
  });

  // Effect to calculate and update line path based on scroll position
  useEffect(() => {
    const updateLinePath = () => {
      if (consciousnessRef.current && secondSectionRef.current) {
        const consciousnessRect = consciousnessRef.current.getBoundingClientRect();
        const secondSectionRect = secondSectionRef.current.getBoundingClientRect();
        
        setLinePathPoints({
          start: {
            x: consciousnessRef.current.offsetLeft + (consciousnessRef.current.offsetWidth / 2),
            y: consciousnessRef.current.offsetTop + consciousnessRef.current.offsetHeight
          },
          end: {
            x: window.innerWidth / 2,
            y: secondSectionRect.top + (secondSectionRect.height * 0.1) // 10% down into second section
          },
          height: secondSectionRect.top - (consciousnessRef.current.offsetTop + consciousnessRef.current.offsetHeight)
        });
      }
    };

    // Initial calculation
    updateLinePath();
    
    // Update on scroll and resize
    window.addEventListener('scroll', updateLinePath);
    window.addEventListener('resize', updateLinePath);
    
    return () => {
      window.removeEventListener('scroll', updateLinePath);
      window.removeEventListener('resize', updateLinePath);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <section className="relative bg-black text-white min-h-screen flex flex-col justify-between px-25 py-12 overflow-hidden">
        <div className="absolute top-8 left-8 z-10">
          <Image src="/MH.svg" alt="Madhaus Logo" width={120} height={40} />
        </div>
        
        <HighlightText />
        
        {/* Reference div to get position of "consciousness" */}
        <div ref={consciousnessRef} className="invisible absolute" style={{ top: '50%', left: '50%' }} />
      </section>
      
      {/* SystemsThinking is now in section two position with ref for line ending */}
      <section ref={secondSectionRef} className="w-full">
        <SystemsThinking />
      </section>
      
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
                href="https://www.instagram.com/madhausafrica/"
                aria-label="Instagram"
                className="bg-[#EDE7DE] text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://x.com/Madhaus_Africa"
                aria-label="Twitter"
                className="bg-[#EDE7DE] text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/madhaus-africa"
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
                href="http://www.tiktok.com/@madhaus.africa"
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
