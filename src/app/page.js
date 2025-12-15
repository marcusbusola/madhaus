"use client"; // Add this line at the top

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

export default function Home() {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlashing((prev) => !prev);
    }, 3000); // Flash every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-black text-white min-h-screen flex flex-col justify-between px-25 py-12">
        <HighlightText />

        <div className="w-full flex justify-end pb-12">
          <div className="flex gap-4 rounded-full border border-[#EDE7DE] py-1.5 px-1.5">
            <a
              href="https://www.linkedin.com/company/madhaus-africa"
              className="light-border border border-white text-[#EDE7DE] px-6 py-2 rounded-full text-sm hover:#EDE7DE hover:text-black transition-all duration-300 ease-in-out relative overflow-hidden"
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
      </section>

      {/* Marquee Strip */}
      <Marquee />

      {/* Main Content Section */}
      <div className="flex flex-col font-manrope py-12 bg-white text-black">
        <main className="max-w-6xl mx-auto flex-grow">
          {/* Fade In Section */}
          <motion.section
            initial={{ opacity: 0 }} // Start invisible
            animate={{ opacity: 1 }} // Fade in
            transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }} // Slower and smoother
            className="grid grid-cols-1 gap-8 mb-50 mt-50"
          >
            <div>
              <p className="text-base leading-relaxed mb-4 font-bold text-[30px]">
                Madhaus is a media company meets social innovation lab. The
                majority of its work involves disseminating systems thinking
                content on social problems so Africans gain the collective
                consciousness to become part of the solution, whether through
                YouTube, white papers, or short-form engagement.
              </p>
            </div>

            <div className="max-w-[500px] ml-auto text-right">
              <p className="text-base leading-relaxed mb-4 text-[20px]">
                Madhaus helps foster these ideas and the community of thinkers,
                that create impact. The overall goal is to drive a value-driven,
                profit-aware mindset rather than a profit-driven, value-aware
                mindset which characterizes the Silicon Valley model. It&apos;s
                the audacity to want to do things differently that makes us
                madmen, and our workspace a Madhaus.
              </p>
            </div>
          </motion.section>

          <FlipCard />
        </main>

        {/* Footer Section */}
        <footer className="w-full bg-black py-50 px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-40">
              <Image
                src="/MH.svg"
                alt="Madhaus Logo"
                width={260}
                height={120}
              />
            </div>

            <div className="flex flex-col items-center md:items-start gap-6 font-manrope">
              <h2 className="text-3xl font-light text-[#EDE7DE]">
                Join the Madness
              </h2>

              {/* Subscribe Button with Flashing effect */}
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
