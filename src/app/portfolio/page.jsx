"use client";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { handleEmailClick } from "../page";
// --- DATA ---
const items = [
  {
    id: 1,
    color: "from-red-300 to-blue-300",
    title: "Our Voice",
    desc: "A social media application designed for community engagement, enabling citizens to engage directly with their respective Members of Parliament.",
    img: "https://images.pexels.com/photos/18073372/pexels-photo-18073372/free-photo-of-young-man-sitting-in-a-car-on-a-night-street.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    link: "https://dev.itsourvoice.com",
  },
  {
    id: 2,
    color: "from-blue-300 to-violet-300",
    title: "HTML Portfolio",
    desc: "A visually engaging personal portfolio website built with HTML and enhanced with captivating animations to showcase projects and skills.",
    img: "https://images.pexels.com/photos/18023772/pexels-photo-18023772/free-photo-of-close-up-of-a-person-holding-a-wristwatch.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    link: "https://programmer-krish.github.io/WebpageBrandi/",
  },
  {
    id: 3,
    color: "from-violet-300 to-purple-300",
    title: "Restaurant Manager Platform",
    desc: "An platform designed to empower restaurants, streamline operations, and enhance customer satisfaction by offering items at reasonable prices.",
    img: "https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    link: "https://eatme.sg/",
  },
  {
    id: 4,
    color: "from-purple-300 to-red-300",
    title: "LeapIn",
    desc: "A one-stop mobile application for users to seamlessly prepare, plan, and manage their NDIS (National Disability Insurance Scheme) budget.",
    img: "https://images.pexels.com/photos/18540208/pexels-photo-18540208/free-photo-of-wood-landscape-water-hill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://mitrai.com/casestudy/leap-in/",
  },
  {
    id: 5,
    color: "from-green-300 to-cyan-300",
    title: "E-commerce Website",
    desc: "A full-featured e-commerce platform with a modern design, product filtering, a shopping cart, and a secure checkout process.",
    img: "https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "#",
  },
  {
    id: 6,
    color: "from-cyan-300 to-teal-300",
    title: "Task Management App",
    desc: "A productivity application to help users organize tasks, set deadlines, and track progress with an intuitive drag-and-drop interface.",
    img: "https://images.pexels.com/photos/7194915/pexels-photo-7194915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "#",
  },
];

const testimonials = [
  {
    name: "Jeremy Hastings",
    review:
      "Krishna was a valuable member of the team and did an excellent job. Solid skills and a pleasure to work with. Also a very good table tennis partner 🏓",
  },
  {
    name: "Dinusha Ambagahawita",
    review:
      "Krishna is an exceptionally talented engineer/tech-lead who thrives in fast-paced environments. His ability to learn quickly and adapt to new challenges is remarkable. He consistently produces optimised code and demonstrates outstanding analytical skills.",
  },
  {
    name: "Dakshika Cooray",
    review:
      "He has always been very forthcoming and helpful, as well as being very efficient in managing his responsibilities. He will constantly be in communication, so the whole team is aware of the status of his workload. A pleasure to work with!",
  },
  {
    name: "Eddie Kowalsk",
    review:
      "Krishnamohan is a great developer who played a big role in our project, finding solutions to problems and doing a great job. It was a pleasure to work with him!",
  },
  {
    name: "Bhanuka Krish",
    review:
      "Krishnamohan and I worked together on several projects, and I was lucky to call him my coworker. He consistently gave 100 percent effort to the team and played a significant role in ensuring that we completed assignments on time.",
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// --- COMPONENTS ---
const FlipCard = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    // Card container with perspective for 3D effect
    <motion.div
      className="w-full h-96 [perspective:1000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      variants={cardVariants}>
      {/* Motion div for the flip animation */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}>
        {/* Front of the card */}
        <div
          className="absolute w-full h-full p-6 flex flex-col justify-center rounded-xl bg-slate-900/80 backdrop-blur-sm border border-slate-700"
          style={{ backfaceVisibility: "hidden" }}>
          <h2 className="font-bold text-2xl mb-3 text-cyan-400">
            {item.title}
          </h2>
          <p className="text-slate-300 text-base">{item.desc}</p>
        </div>

        {/* Back of the card */}
        <div
          className="absolute w-full h-full flex items-center justify-center rounded-xl overflow-hidden"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}>
          {/* Background image for the back */}
          <img
            src={item.img}
            alt={item.title}
            className="absolute w-full h-full object-cover saturate-50"
          />
          {/* Overlay to darken the image */}
          <div className="absolute inset-0 bg-black/50"></div>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-cyan-500 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-transform hover:scale-105">
            See Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioPage = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Auto-cycle testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex(
        (prevIndex) => (prevIndex + 1) % testimonials.length
      );
    }, 5000); // Switch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-slate-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      {/* --- PROJECTS SECTION --- */}
      <div className="p-4 sm:p-8 md:p-12 lg:p-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full flex items-center justify-center text-4xl sm:text-5xl md:text-6xl text-center mb-12">
          <h1 className="font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">
            My Projects
          </h1>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          {items.map((item) => (
            <FlipCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>

      {/* --- TESTIMONIALS SECTION --- */}
      <div className="w-full py-16 sm:py-24 bg-slate-800/50">
        <h2 className="text-4xl text-center font-semibold mb-12 bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">
          Testimonials
        </h2>
        {/* Container for testimonial content */}
        <div className="max-w-4xl mx-auto px-4 h-48 sm:h-32 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonialIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center">
              <blockquote className="text-lg sm:text-xl italic text-slate-300">
                {`"${testimonials[currentTestimonialIndex].review}"`}
              </blockquote>
              <p className="text-right text-cyan-400 mt-4">
                - {testimonials[currentTestimonialIndex].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Navigation dots for testimonials */}
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 mx-1.5 rounded-full transition-colors duration-300 ${
                index === currentTestimonialIndex
                  ? "bg-cyan-400"
                  : "bg-slate-600 hover:bg-slate-500"
              }`}
              onClick={() => setCurrentTestimonialIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* --- CALL TO ACTION SECTION --- */}
      <div className="w-full min-h-screen flex flex-col gap-16 items-center justify-center text-center p-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold">
          Do you have a project?
        </motion.h1>
        <div className="relative">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            viewBox="0 0 300 300"
            className="w-64 h-64 md:w-[500px] md:h-[500px] ">
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
              />
            </defs>
            <text fill="#94a3b8">
              {" "}
              {/* slate-400 color */}
              <textPath xlinkHref="#circlePath" className="text-xl">
                Front-end Developer and UI Designer
              </textPath>
            </text>
          </motion.svg>
          <motion.a
            href="mailto:"
            onChange={handleEmailClick}
            className="w-20 h-20 md:w-28 md:h-28 absolute top-0 left-0 right-0 bottom-0 m-auto bg-white text-slate-900 rounded-full flex items-center justify-center font-semibold text-lg"
            whileHover={{ scale: 1.1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            Hire Me
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
