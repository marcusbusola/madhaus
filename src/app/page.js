
"use client"; // Add this line at the top

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

// Highlight Words Component
const HighlightText = () => {
  const words = ['Bold', 'ideas', 'in', 'black', 'and', 'white.'];

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

// Flip Card Component
const FlipCard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const handleHover = (index) => {
    setHoveredCard(index);
  };

  const handleLeave = () => {
    setHoveredCard(null);
  };

  // Define the card data with expanded dummy content
  const cards = [
    {
      id: 0,
      bgColor: "bg-black",
      textColor: "text-white",
      title: "Living in Lagos Study",
      content: (
        <div className="min-h-[400px]">
          <div className="flex flex-col md:flex-row">
            {/* Left Text Section */}
            <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-5xl font-bold mb-8 mt-8 leading-tight">
                Living in
                <br />
                Lagos Study
              </h2>
              <div className="w-full h-[1px] bg-gray-600 mb-8"></div>
              <p className="text-base mb-6 leading-relaxed">
                Our comprehensive research into urban life in Africa's largest metropolis examines the tensions between opportunity and inequality, innovation and infrastructure limitations.
              </p>
              <p className="text-base mb-6 leading-relaxed">
                Through interviews with over 1,000 residents across socioeconomic backgrounds, we've captured insights that reveal the complexity of navigating Lagos as a resident, entrepreneur, or policymaker.
              </p>
            </div>

            {/* Vertical Line (visible only on desktop) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-gray-600"></div>

            {/* Right Text Section */}
            <div className="w-full md:w-1/2 pl-0 md:pl-8">
              <p className="text-base mb-6 leading-relaxed mt-0 md:mt-20">
                Our findings highlight five key areas requiring urgent intervention: transportation, housing affordability, digital access, environmental resilience, and governance systems.
              </p>
              <p className="text-base mb-6 leading-relaxed">
                This study moves beyond problem identification to explore potential innovations and policy approaches that could transform Lagos into a more equitable, sustainable, and vibrant urban center for all its inhabitants.
              </p>
              <p className="text-base mb-10 leading-relaxed">
                The Living in Lagos Study serves as a foundational resource for policymakers, social entrepreneurs, and community leaders working to address the city's complex challenges through collaborative, systems-based approaches.
              </p>
            </div>
          </div>

          {/* Blog Link */}
          <div className="flex justify-end items-center gap-4 mb-8">
            <span className="text-base">Our Blog</span>
            <Link
              href="/work"
              className="flex items-center gap-2 bg-[#f2ece3] py-2 px-4 md:py-3 md:px-6 rounded-md"
            >
              <motion.span
                className="text-black"
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      bgColor: "bg-[#f2ece3]",
      textColor: "text-black",
      title: "Design Thinking",
      previewText: "Our design philosophy centers on creating solutions that are both human-centered and systems-aware...",
      content: (
        <div className="min-h-[400px] flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-8 mt-8">Design for Impact</h2>
            <div className="w-full h-[1px] bg-gray-600 mb-8"></div>
            <p className="text-base mb-6 leading-relaxed">
              Our design philosophy centers on creating solutions that are both human-centered and systems-aware. We combine ethnographic research with innovation methodologies to address complex challenges.
            </p>
            <p className="text-base mb-6 leading-relaxed">
              From community workshops in Lagos to policy co-creation sessions with government agencies, our approach emphasizes collaboration, iteration, and contextual understanding that leads to meaningful outcomes.
            </p>
          </div>
          <div className="flex justify-end">
            <Link
              href="/design"
              className="flex items-center gap-2 bg-black text-white py-2 px-4 md:py-3 md:px-6 rounded-md"
            >
              <motion.span
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      bgColor: "bg-black",
      textColor: "text-white",
      title: "Media Innovation",
      previewText: "At Madhaus, we're reimagining African media through a lens of social innovation and systems thinking...",
      content: (
        <div className="min-h-[400px] flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-8 mt-8">Media That Matters</h2>
            <div className="w-full h-[1px] bg-gray-600 mb-8"></div>
            <p className="text-base mb-6 leading-relaxed">
              At Madhaus, we're reimagining African media through a lens of social innovation and systems thinking. Our content goes beyond entertainment to foster understanding and catalyze change.
            </p>
            <p className="text-base mb-6 leading-relaxed">
              Our productions range from documentary series examining urban challenges to podcasts featuring thought leaders across the continent. We believe in the power of storytelling to shift paradigms and inspire action.
            </p>
          </div>
          <div className="flex justify-end items-center gap-4 mb-8">
            <span>Our Media</span>
            <Link
              href="/media"
              className="flex items-center gap-2 bg-[#f2ece3] py-2 px-4 md:py-3 md:px-6 rounded-md"
            >
              <motion.span
                className="text-black"
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.section 
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative mb-32 flex flex-col items-center"
    >
      {/* Render cards in reverse order for proper stacking */}
      {cards.slice().reverse().map((card, reversedIndex) => {
        const index = cards.length - 1 - reversedIndex; // Convert back to original index
        
        // Calculate width based on the original index - Lagos (index 0) should be largest
        const widthPercentage = index === 0 ? 90 : (90 - ((index) * 3)); // Lagos: 90%, Design: 87%, Media: 84%
        
        return (
          <motion.div
            key={card.id}
            className={`relative ${card.bgColor} ${card.textColor} rounded-lg overflow-hidden shadow-lg p-10 mt-[-50px]`}
            style={{
              zIndex: hoveredCard === index ? 30 : 10 + reversedIndex, // Higher z-index for cards rendered earlier
              width: `${widthPercentage}%`,
              marginLeft: `${index * 1.5}%`,
              marginRight: `${index * 1.5}%`,
            }}
            onHoverStart={() => handleHover(index)}
            onHoverEnd={handleLeave}
            animate={{
              y: hoveredCard === index ? -30 : 0, // Lift the card less high
              scale: hoveredCard === index ? 1.03 : 1, // Scale the card less
              height: hoveredCard === index ? "auto" : index === 0 ? "auto" : "120px", // Top card always shows full content
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {index === 0 ? (
              // First card always shows full content
              card.content
            ) : (
              <>
                {/* For cards 1 and 2, show preview or full content based on hover state */}
                {hoveredCard === index ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.content}
                  </motion.div>
                ) : (
                  <motion.div className="flex flex-col h-full justify-center">
                    <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                    <p className="text-sm opacity-80 line-clamp-2">{card.previewText}</p>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        );
      })}
    </motion.section>
  );
};

// Home Page Component
export default function Home() {
  const secondSectionRef = useRef(null);
  const isSecondSectionInView = useInView(secondSectionRef, { once: false, amount: 0.2 });
  const [isFlashing, setIsFlashing] = useState(false);

  // Toggle flashing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlashing(prev => !prev);
    }, 3000); // Flash every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-black text-white min-h-screen flex flex-col justify-between px-25 py-12">
        <div className="absolute top-8 left-8">
          <Image src="/MH.svg" alt="Madhaus Logo" width={120} height={40} />
        </div>

        {/* Highlight Text Animation */}
        <HighlightText />

        {/* LinkedIn and Let's Talk Buttons */}
        <div className="w-full flex justify-end pb-12">
          <div className="flex gap-4 rounded-full border border-[#EDE7DE] py-1.5 px-1.5">
            <a
              href="https://linkedin.com"
              className="light-border border border-white text-[#EDE7DE] px-6 py-2 rounded-full text-sm hover:#EDE7DE hover:text-black transition-all duration-300 ease-in-out relative overflow-hidden"
            >
              LINKED IN →
            </a>
            <a
              href="/contact"
              className="light-border bg-[#EDE7DE] text-black px-6 py-2 rounded-full text-sm hover:bg-gray-200 transition-all duration-300 ease-in-out relative overflow-hidden"
            >
              Let"s Talk →
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="flex flex-col font-manrope py-12 bg-white text-black">
        <main className="max-w-6xl mx-auto flex-grow">
          {/* Fade In Section */}
          <motion.section
            initial={{ opacity: 0 }} // Start invisible
            animate={{ opacity: 1 }} // Fade in
            transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }} // Slower and smoother
            className="grid grid-cols-1 gap-8 mb-20 mt-50"
          >
            <div>
              <p className="text-base leading-relaxed mb-4 font-bold text-[30px]">
                Madhaus is a media company meets social innovation lab. The majority of its work
                involves disseminating systems thinking content on social problems so Africans gain
                the collective consciousness to become part of the solution, whether through YouTube,
                white papers, or short-form engagement.
              </p>
            </div>

            <div className="max-w-[500px] ml-auto text-right">
              <p className="text-base leading-relaxed mb-4 text-[20px]">
                Madhaus helps foster these ideas and the community of thinkers, that create impact.
                The overall goal is to drive a value-driven, profit-aware mindset rather than a
                profit-driven, value-aware mindset which characterizes the Silicon Valley model. It's
                the audacity to want to do things differently that makes us madmen, and our workspace
                a Madhaus.
              </p>
            </div>
          </motion.section>

          {/* Pods, Funds, Key Hole Section with Fade In */}
          <motion.section 
            ref={secondSectionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isSecondSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-30 mt-30"
          >
            <motion.div 
              className="bg-[#f2ece3] p-12 md:p-25 flex items-center justify-center rounded-md overflow-hidden relative"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0"
                animate={{ 
                  opacity: [0, 0.3, 0],
                  left: ["-100%", "100%", "100%"]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  repeatDelay: 3
                }}
              />
              <Image 
                src="/pod.svg" 
                alt="Pods"
                width={220}
                height={100}
                className="relative z-10"
              />
              <h3 className="text-xl font-normal relative z-10">Project Pods</h3>
            </motion.div>
            <motion.div 
              className="bg-[#f2ece3] p-6 md:p-12 flex items-center justify-center rounded-md overflow-hidden relative"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0"
                animate={{ 
                  opacity: [0, 0.3, 0],
                  left: ["-100%", "100%", "100%"]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  repeatDelay: 3,
                  delay: 1
                }}
              />
                            <Image 
                src="/forge.svg" 
                alt="Forge"
                width={220}
                height={100}
                className="relative z-10"
              />
              <h3 className="text-xl font-normal relative z-10"> The Forge</h3>
            </motion.div>
            <motion.div 
              className="bg-[#f2ece3] p-6 md:p-12 flex items-center justify-center rounded-md overflow-hidden relative"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0"
                animate={{ 
                  opacity: [0, 0.3, 0],
                  left: ["-100%", "100%", "100%"]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  repeatDelay: 3,
                  delay: 2
                }}
              />
              <Image 
                src="/Keyhole.svg" 
                alt="Keyhole"
                width={180}
                height={90}
                className="relative z-10"
              />
              <h3 className="text-xl font-normal relative z-10">Project Key Hole</h3>
            </motion.div>
          </motion.section>

          {/* Explore Our Work Section */}
          <div className="flex justify-end items-center gap-4 mb-50">
            <span className="text-base">Explore our Work</span>
            <Link
              href="/portfolio"
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

          {/* Flip Card Section */}
          <FlipCard />
        </main>

        {/* Footer Section */}
        <footer className="w-full bg-black py-50 px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-40">
              <Image src="/MH.svg" alt="Madhaus Logo" width={260} height={120} />
            </div>

            <div className="flex flex-col items-center md:items-start gap-6 font-manrope">
              <h2 className="text-3xl font-light text-[#EDE7DE]">Join the Madness</h2>

              {/* Subscribe Button with Flashing effect */}
              <div className="relative w-full max-w-md mt-5">
                <div className="flex items-center rounded-full border border-[#EDE7DE] overflow-hidden">
                  <input
                    type="email"
                    className="w-full bg-transparent py-2 px-8 text-[#EDE7DE] placeholder-[#EDE7DE] focus:outline-none text-sm"
                    placeholder="Enter your email"
                  />
                  <motion.button 
                    className={`rounded-full ${isFlashing ? 'bg-white' : 'bg-[#EDE7DE]'} text-black py-0.5 px-4 text-sm mx-1 hover:bg-gray-300 transition-colors duration-300`}
                    animate={{
                      backgroundColor: isFlashing ? ['#EDE7DE', '#FFFFFF', '#EDE7DE'] : '#EDE7DE',
                      scale: isFlashing ? [1, 1.05, 1] : 1
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut"
                    }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-6 mt-5">
                {[
                  { icon: <FaFacebook size={18} />, href: 'https://facebook.com' },
                  { icon: <FaInstagram size={18} />, href: 'https://instagram.com' },
                  { icon: <FaTwitter size={18} />, href: 'https://twitter.com' },
                  { icon: <FaLinkedin size={18} />, href: 'https://linkedin.com' },
                  { icon: <FaYoutube size={18} />, href: 'https://youtube.com' },
                  { icon: <FaTiktok size={18} />, href: 'https://tiktok.com' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.href}
                    className="bg-[#EDE7DE] text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
