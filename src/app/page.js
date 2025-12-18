"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import HighlightText from "./components/HighlightText";
import FlipCard from "./components/FlipCard";
import Marquee from "./components/Marquee";
import StickyScrollSection from "./components/StickyScrollSection";
import StackSection from "./components/StackSection";
import Nav from "./components/Nav";

export default function Home() {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlashing((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Nav />
      {/* SECTION 1: HERO */}
      <StackSection sectionNumber={1} backgroundColor="bg-black">
        <div className="section-hero flex flex-col justify-center items-center h-full px-8">
          <HighlightText />
          <div className="w-full flex justify-center md:justify-end pb-12 mt-12">
            <div className="flex gap-4 rounded-full border border-[#EDE7DE] py-1.5 px-1.5">
              <a
                href="https://www.linkedin.com/company/madhaus-africa"
                className="light-border border border-white text-[#EDE7DE] px-6 py-2 rounded-full text-sm hover:bg-[#EDE7DE] hover:text-black transition-all duration-300 ease-in-out relative overflow-hidden"
              >
                LINKED IN →
              </a>
              <a
                href="mailto:pr@madhaus.africa"
                className="light-border bg-[#EDE7DE] text-black px-6 py-2 rounded-full text-sm hover:bg-gray-200 transition-all duration-300 ease-in-out relative overflow-hidden"
              >
                Let&apos;s Talk →
              </a>
            </div>
          </div>
        </div>
      </StackSection>

      {/* SECTION 2: IDENTITY */}
      <StackSection
        sectionNumber={2}
        backgroundColor="bg-white"
        className="rounded-t-3xl"
        minHeight={true}
      >
        <div className="section-identity">
          <div className="section-marquee">
            <Marquee />
          </div>
          <StickyScrollSection />
        </div>
      </StackSection>

      {/* SECTION 3: IMPACT */}
      <StackSection sectionNumber={3} backgroundColor="bg-white" minHeight={true}>
        <div className="section-impact flex flex-col h-full">
          <div className="section-marquee">
            <Marquee />
          </div>
          <div className="flex flex-col justify-center items-center flex-1 px-8 py-16">
            <FlipCard />
          </div>
        </div>
      </StackSection>

      {/* SECTION 4: ENGAGEMENT */}
      <StackSection
        sectionNumber={4}
        backgroundColor="bg-black"
        minHeight={true}
      >
        <div className="section-engagement flex flex-col min-h-screen">
          <div className="section-marquee">
            <Marquee />
          </div>

          <div className="flex-grow flex items-center justify-center px-8 py-20">
            <div className="max-w-2xl w-full">
              <div className="flex flex-col items-center gap-6">
                <h2 className="text-5xl font-bold text-[#EDE7DE] mb-2 text-center">
                  Join the Madness
                </h2>

                {/* Newsletter Form */}
                <div className="relative w-full max-w-md mt-5">
                  <div className="flex items-center rounded-full border border-[#EDE7DE] overflow-hidden">
                    <input
                      type="email"
                      className="w-full bg-transparent py-2 px-8 text-[#EDE7DE] placeholder-[#EDE7DE] focus:outline-none text-sm"
                      placeholder="Enter your email"
                    />
                    <motion.button
                      className={`rounded-full ${
                        isFlashing ? "bg-white" : "bg-[#EDE7DE]"
                      } text-black py-0.5 px-4 text-sm mx-1 hover:bg-gray-300 transition-colors duration-300`}
                      animate={{
                        backgroundColor: isFlashing
                          ? ["#EDE7DE", "#FFFFFF", "#EDE7DE"]
                          : "#EDE7DE",
                        scale: isFlashing ? [1, 1.05, 1] : 1,
                      }}
                      transition={{
                        duration: 1,
                        ease: "easeInOut",
                      }}
                    >
                      Subscribe
                    </motion.button>
                  </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-6 mt-5">
                  {[
                    {
                      icon: <FaFacebook size={18} />,
                      href: "https://facebook.com",
                    },
                    {
                      icon: <FaInstagram size={18} />,
                      href: "https://www.instagram.com/madhausafrica/",
                    },
                    {
                      icon: <FaTwitter size={18} />,
                      href: "https://x.com/Madhaus_Africa",
                    },
                    {
                      icon: <FaLinkedin size={18} />,
                      href: "https://www.linkedin.com/company/madhaus-africa",
                    },
                    {
                      icon: <FaYoutube size={18} />,
                      href: "https://youtube.com",
                    },
                    {
                      icon: <FaTiktok size={18} />,
                      href: "http://www.tiktok.com/@madhaus.africa",
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.href}
                      className="bg-[#EDE7DE] text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-white transition-colors"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Logo at bottom */}
          <div className="w-full flex justify-center pb-12">
            <div className="w-40">
              <Image
                src="/MH.svg"
                alt="Madhaus Logo"
                width={260}
                height={120}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </StackSection>
    </>
  );
}
