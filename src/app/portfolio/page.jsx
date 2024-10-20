"use client";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const items = [
  {
    id: 1,
    color: "from-red-300 to-blue-300",
    title: "Our Voice",
    desc: " A social media application designed for community engagement, enabling citizens to engage directly with their respective Members of Parliament.",
    img: "https://images.pexels.com/photos/18073372/pexels-photo-18073372/free-photo-of-young-man-sitting-in-a-car-on-a-night-street.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    link: "https://dev.itsourvoice.com",
  },
  {
    id: 2,
    color: "from-blue-300 to-violet-300",
    title: "HTML Portfolio",
    desc: "Html portfolio build with animations",
    img: "https://images.pexels.com/photos/18023772/pexels-photo-18023772/free-photo-of-close-up-of-a-person-holding-a-wristwatch.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    link: "https://programmer-krish.github.io/WebpageBrandi/",
  },
  {
    id: 3,
    color: "from-violet-300 to-purple-300",
    title: "Restaurant Manager Platform",
    desc: "The idea is to empower the restaurants and make sure to satisfy the customer needs and provide the items with the reasonable price.",
    img: "https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    link: "https://eatme.sg/",
  },
  {
    id: 4,
    color: "from-purple-300 to-red-300",
    title: "LeapIn",
    desc: "The Leap in! team wanted to build an app that would be a one-stop shop for users to prepare, plan and manage their NDIS budget.",
    img: "https://images.pexels.com/photos/18540208/pexels-photo-18540208/free-photo-of-wood-landscape-water-hill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://mitrai.com/casestudy/leap-in/",
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
      "Krishna is an exceptionally talented engineer/tech-lead who thrives in fast-paced environments. His ability to learn quickly and adapt to new challenges is remarkable. He consistently produces optimised code and demonstrates outstanding analytical skills. I had the pleasure of collaborating with him on a complex project, where his strong problem-solving capabilities and quick thinking made a significant impact. Working with Krishna is a great experience, and I truly appreciate his commitment to excellence",
  },
  {
    name: "Dakshika Cooray",
    review:
      "While Krishna and I have not worked together in a corporate capacity, we have been heavily involved together in extra-curriculars such as employee engagement activities and CSR during our time at Swivel Group. He has always been very forthcoming and helpful, as well as being very efficient in managing his responsibilities and ensuring that everything is up-to-date. He will constantly be in communication, so the whole team is aware of the status of his workload. He was a delight and an a pleasure to work with as well as a colleague I would definitely love to work together with again. I wish him all the best!",
  },
  {
    name: "Eddie Kowalsk",
    review:
      "Krishnamohan is a great developer who played a big role in our project, finding solutions to problems and doing a great job. It was a pleasure to work with him!",
  },
  {
    name: "Bhanuka Krish",
    review:
      "Krishnamohan and I worked together on several projects, and I was lucky to call him my coworker. He consistently gave 100 percent effort to the team and played a significant role in ensuring that we completed assignments on time. Both smart and professional. Experienced, deadline-oriented, and intelligent person. I recommended him more for any business looking for new talent.",
  },
  {
    name: "Dilshan Kahawita",
    review:
      "I have worked with Krishna in Fupay. He is a very dedicated person and he is helpful as well. He has never hesitated to provide support when needed. Therefore I would recommend Krishna to any team out there. I'm pretty sure he will shine..",
  },
  {
    name: "Ali Ahamed Thowfeek",
    review:
      "Krishna and I worked together during the time at EatMe Global. He is a very good communicator and he has a good personality. He consistently gave 100 percent effort to the team and played a significant role in ensuring that we completed assignments on time. I would recommend Krishna for any team out there. I'm pretty sure he will shine.",
  },
];

const FlipCard = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <div
      className="relative w-[30rem] h-[25rem] m-8 shadow-lg rounded-lg overflow-hidden"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}>
      <motion.div
        className="absolute w-full h-full"
        variants={flipCardVariants}
        animate={isFlipped ? "back" : "front"}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}>
        {/* Front of the card */}
        <motion.div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: "visible" }}>
          <div className="px-6 py-4 flex flex-col justify-center h-full bg-gradient-to-r from-blue-500 to-slate-900">
            <h1 className="font-bold text-xl mb-2 text-white">{item.title}</h1>
            <p className="text-white text-base">{item.desc}</p>
          </div>
        </motion.div>

        {/* Back of the card */}
        <motion.div
          className="absolute w-full h-full flex items-center justify-center"
          style={{ rotateY: 180, backfaceVisibility: "hidden" }}>
          <Image src={item.img} alt="" layout="fill" objectFit="cover" />
          <a
            href={item.link}
            className="absolute bg-white text-gray-600 font-semibold py-2 px-4 rounded"
            style={{ zIndex: 10 }} // Ensure the button is above the image
          >
            See Demo
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

const PortfolioPage = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const ref = useRef();
  const controls = useAnimation();
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const testimonialCount = testimonials.length;
  const isMounted = useRef(false); // Tracks if the component is mounted

  useEffect(() => {
    // Set isMounted to true when the component mounts
    isMounted.current = true;

    // Set isMounted to false when the component unmounts
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const cycleTestimonials = () => {
      setCurrentTestimonialIndex(
        (prevIndex) => (prevIndex + 1) % testimonialCount
      );
    };

    const interval = setInterval(cycleTestimonials, 5000); // Switch to the next testimonial every 5 seconds
    return () => clearInterval(interval);
  }, [testimonialCount]);

  useEffect(() => {
    const sequence = () => {
      // Check if the component is mounted before starting the animation
      if (isMounted.current) {
        controls.start({ opacity: 1 });
        setTimeout(() => {
          if (isMounted.current) {
            controls.start({ opacity: 0 });
          }
        }, 4500); // Fade out before switching to the next testimonial
      }
    };

    sequence();
  }, [currentTestimonialIndex, controls]);

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}>
      {/* <div className=" relative bg-blue-200" ref={ref}>
        <div className="w-screen  flex items-center justify-center text-6xl text-center mt-2">
          Projects
        </div>
        <div className="flex justify-center items-center flex-wrap mt-8 ">
          {items.map((item) => (
            <FlipCard key={item.id} item={item} />
          ))}
        </div>
      </div> */}
      {/* Testimonials Section */}
      <div className="w-screen py-16 bg-gradient-to-r from-red-300 to-green-300">
        <h2 className="text-4xl text-center font-semibold mb-12">
          Testimonials
        </h2>
        <div className="max-w-4xl mx-auto">
          <blockquote className="text-xl italic text-center">
            {`${testimonials[currentTestimonialIndex].review}`}
          </blockquote>
          <p className="text-right mt-4">
            - {testimonials[currentTestimonialIndex].name}
          </p>
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`inline-block h-3 w-3 mr-2 rounded-full ${
                  index === currentTestimonialIndex
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
                onClick={() => setCurrentTestimonialIndex(index)}
                style={{ cursor: "pointer" }}></span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-screen h-screen flex flex-col gap-16 items-center justify-center text-center">
        <h1 className="text-8xl">Do you have a project?</h1>
        <div className="relative">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            viewBox="0 0 300 300"
            className="w-64 h-64 md:w-[500px] md:h-[500px] ">
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
              />
            </defs>
            <text fill="#000">
              <textPath xlinkHref="#circlePath" className="text-xl">
                Front-end Developer and UI Designer
              </textPath>
            </text>
          </motion.svg>
          <Link
            href="/contact"
            className="w-16 h-16 md:w-28 md:h-28 absolute top-0 left-0 right-0 bottom-0 m-auto bg-black text-white rounded-full flex items-center justify-center">
            Hire Me
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
