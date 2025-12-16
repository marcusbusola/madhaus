"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Media", href: "/media" },
    { name: "Design", href: "/design" },
    { name: "Blog", href: "https://madhaus.substack.com/" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "stained-glass-nav backdrop-blur-[20px]"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto pl-2 pr-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <Image
            src="/MH.svg"
            alt="Madhaus Logo"
            width={100}
            height={33}
            className={`transition-all duration-300 hover:opacity-100 ${
              isScrolled ? "invert" : ""
            }`}
            style={{ opacity: 0.85 }}
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative group nav-link-sweep overflow-hidden"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <span
                className={`font-medium text-sm transition-all duration-300 ${
                  isScrolled ? "text-white" : "text-black"
                }`}
                style={{ opacity: 0.85 }}
              >
                {link.name}
              </span>

              {/* Underline animation - expands from center */}
              <span
                className={`absolute left-1/2 bottom-0 h-[2px] w-0 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out origin-center ${
                  isScrolled ? "bg-white" : "bg-black"
                }`}
              />

              {/* Hover effect for opacity */}
              <style jsx>{`
                a:hover span {
                  opacity: 1 !important;
                }

                .nav-link-sweep::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.3),
                    transparent
                  );
                  transform: translateX(-100%);
                  transition: transform 300ms ease-out;
                  pointer-events: none;
                  z-index: -1;
                }

                .nav-link-sweep:hover::before {
                  transform: translateX(100%);
                }
              `}</style>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
