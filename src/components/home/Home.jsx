import { Beam } from "../../components/ui/beam";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision";

import { CometCard } from "./../ui/comet-card";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaCode } from "react-icons/fa6";
import "./Home.css";
import { FloatingItems } from "./docItems";
import { Cover } from "../../components/ui/cover";

const professions = [
  "Fullstack Engineer",
  "MERN Stack Engineer",
  "Machine Learning Enthusiast",
];

const socialLinks = [
  {
    icon: <FaGithub />,
    url: "https://github.com/Ankush-25",
    label: "GitHub",
    color: "#6e5494",
  },
  {
    icon: <FaLinkedinIn />,
    url: "https://www.linkedin.com/in/ankit-bhandari25/",
    label: "LinkedIn",
    color: "#0077b5",
  },
  {
    icon: <FaXTwitter />,
    url: "https://x.com/bhandariji1298/",
    label: "X",
    color: "#1da1f2",
  },
  {
    icon: <FaCode />,
    url: "https://leetcode.com/u/Ankush-25/",
    label: "LeetCode",
    color: "#ffa116",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export const BeamContainer = () => {
  return (
    <div className="relative h-64 w-full bg-black overflow-hidden">
      <Beam />
      <div className="text-white p-6">Your content here</div>
    </div>
  );
};

export function CometCardDemo() {
  return (
    <CometCard>
      <button
        type="button"
        className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 !bg-[#000000] p-2 saturate-100 md:my-20 md:p-4"
        aria-label="That's Me"
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          opacity: 1,
        }}
      >
        <div className="mx-2 flex-1">
          <div className="relative mt-2 aspect-[3/4] w-full">
            <img
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-100"
              alt="Invite background"
              src="/public/photo.jpg"
              style={{
                boxShadow: "rgba(49, 34, 34, 0.05) 0px 5px 6px 0px",
                opacity: 1,
              }}
            />
          </div>
        </div>
        <div className="text-s text-gray-300 opacity-100">Touch me 😎</div>
      </button>
    </CometCard>
  );
}

const Home = () => {
  const [professionIndex, setProfessionIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Ensure the page loads at the top and prevent auto-scrolling
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProfessionIndex((prev) => (prev + 1) % professions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="main-container" ref={ref} aria-label="Introduction">
      <section id="home" className="home !relative">
        <div className="container home-grid">
          {/* Content Section */}
          <motion.div
            className="home-content"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="home-title">
              Hi, I'm{" "}
              <span className="highlight">
                {" "}
                <Cover>Ankit Bhandari</Cover>
              </span>
            </motion.div>

            <motion.div className="text-animate" variants={itemVariants}>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={professionIndex}
                  className="profession-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {professions[professionIndex]}
                </motion.h2>
              </AnimatePresence>
            </motion.div>
            <BackgroundBeamsWithCollision>
              <h4 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
                I craft exceptional digital experiences with clean, efficient
                code and{" "}
                <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                  <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                    <span className="">beautiful designs.</span>
                  </div>
                  <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                    <span className="">beautiful designs.</span>
                  </div>
                </div>
              </h4>
            </BackgroundBeamsWithCollision>

            <motion.div
              className="flex cursor-pointer gap-5 items-center mt-2 mb-2 justify-start"
              variants={itemVariants}
            >
              <ScrollLink
                to="contact"
                smooth
                duration={1}
                className=" cursor-pointer bg-black border border-white !pl-5 !pr-5 !py-2 w-25%  border-radius-2px rounded-full"
              >
                Get In Touch
              </ScrollLink>
              <ScrollLink
                to="projects"
                smooth
                duration={1}
                offset={-80}
                className=" cursor-pointer bg-black border border-white !pl-5 !pr-5 !py-2 w-25%  border-radius-2px rounded-full"
              >
                View My Work
              </ScrollLink>
            </motion.div>
          </motion.div>
          <motion.div>
            <FloatingItems className=" flex absolute z-10 bottom-25 left-2/5 !p-2 !flex !align-items-center !pb-3" />
          </motion.div>
          
          <motion.div className="home-image">
            <CometCardDemo  />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll Down</span>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
