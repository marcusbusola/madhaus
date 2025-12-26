"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import SubscribeButton from "../SubscribeButton";

const Section6_Close = () => {
  const socialLinks = [
    { icon: <FaFacebook size={18} />, href: "https://facebook.com" },
    { icon: <FaInstagram size={18} />, href: "https://www.instagram.com/madhausafrica/" },
    { icon: <FaTwitter size={18} />, href: "https://x.com/Madhaus_Africa" },
    { icon: <FaLinkedin size={18} />, href: "https://www.linkedin.com/company/madhaus-africa" },
    { icon: <FaYoutube size={18} />, href: "https://youtube.com" },
    { icon: <FaTiktok size={18} />, href: "http://www.tiktok.com/@madhaus.africa" },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-between px-8 py-12 bg-black text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl w-full space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-h2 text-center"
        >
          Join the madness.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-body-lg text-center opacity-80 max-w-2xl"
        >
          If you believe Africa&apos;s future will be designed by Africans, let&apos;s
          talk.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 items-center"
        >
          <motion.a
            href="mailto:pr@madhaus.africa"
            className="light-border px-8 py-3 border border-white text-white text-body-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            animate={{
              boxShadow: [
                "0 0 0px rgba(255, 255, 255, 0)",
                "0 0 20px rgba(255, 255, 255, 0.6)",
                "0 0 30px rgba(255, 255, 255, 0.8)",
                "0 0 20px rgba(255, 255, 255, 0.6)",
                "0 0 0px rgba(255, 255, 255, 0)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            Partner With Us
          </motion.a>
          <motion.a
            href="https://madhaus.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="light-border px-8 py-3 border border-white text-white text-body-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            animate={{
              boxShadow: [
                "0 0 0px rgba(255, 255, 255, 0)",
                "0 0 20px rgba(255, 255, 255, 0.6)",
                "0 0 30px rgba(255, 255, 255, 0.8)",
                "0 0 20px rgba(255, 255, 255, 0.6)",
                "0 0 0px rgba(255, 255, 255, 0)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.75,
              },
            }}
          >
            Read Our Thinking
          </motion.a>
        </motion.div>

        {/* Newsletter */}
        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex gap-6"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.href}
              className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300 transition-colors"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(255, 255, 255, 0)",
                  "0 0 15px rgba(255, 255, 255, 0.8)",
                  "0 0 25px rgba(255, 255, 255, 1)",
                  "0 0 15px rgba(255, 255, 255, 0.8)",
                  "0 0 0px rgba(255, 255, 255, 0)",
                ],
                scale: [1, 1.1, 1.15, 1.1, 1],
              }}
              transition={{
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                },
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                },
              }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="w-full flex flex-col items-center gap-6 pt-8 border-t border-white/10"
      >
        {/* Logo */}
        <div className="w-32">
          <Image
            src="/MH.svg"
            alt="Madhaus Logo"
            width={160}
            height={80}
            className="w-full h-auto opacity-60"
          />
        </div>

        {/* Footer Text */}
        <div className="text-center text-caption opacity-40 space-y-1">
          <p>MADHAUS / Lagos, Nigeria / © 2025</p>
          <p>Bold ideas in black and white.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Section6_Close;
