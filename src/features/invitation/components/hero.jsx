import React from "react";
import { Calendar, Clock, Heart, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useInvitation } from "@/hooks/use-invitation";
import config from "@/config/config";
import { useTranslation } from "react-i18next";

// Animation presets
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

// Countdown Timer
function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const difference =
        new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto"
      variants={fadeInUp}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white/80 backdrop-blur-sm border border-rose-100 rounded-xl px-2 py-4 sm:px-4 sm:py-5 shadow-sm"
        >
          <div className="text-2xl sm:text-4xl font-semibold text-rose-600 tabular-nums">
            {String(item.value).padStart(2, "0")}
          </div>

          <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-gray-500">
            {item.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

// Decorative floating petals
function FloatingPetals() {
  const petals = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-rose-300/40"
          style={{
            left: `${8 + ((index * 17) % 84)}%`,
            top: `${8 + ((index * 23) % 82)}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, index % 2 === 0 ? 10 : -10, 0],
            rotate: [0, index % 2 === 0 ? 20 : -20, 0],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 4 + (index % 3),
            repeat: Infinity,
            delay: index * 0.35,
            ease: "easeInOut",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C8 6 5 9 5 13c0 4 3 7 7 9 4-2 7-5 7-9 0-4-3-7-7-11Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const { guestName } = useInvitation();
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-5 py-16 sm:px-8">
      <FloatingPetals />

      {/* Soft background details */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-rose-50 blur-3xl opacity-70" />

        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-pink-50 blur-2xl opacity-60" />

        <div className="absolute top-1/3 right-10 w-28 h-28 rounded-full bg-rose-50 blur-2xl opacity-50" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Small decorative element */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-3 mb-7"
        >
          <div className="h-px w-12 sm:w-20 bg-rose-200" />

          <Heart
            className="w-4 h-4 text-rose-400 fill-rose-100"
            strokeWidth={1.5}
          />

          <div className="h-px w-12 sm:w-20 bg-rose-200" />
        </motion.div>

        {/* Reception label */}
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs sm:text-sm font-medium tracking-[0.18em] uppercase text-rose-600 mb-7"
        >
          <Heart className="w-3.5 h-3.5 fill-rose-200" />
          Wedding Reception
        </motion.div>

        {/* Couple names */}
        <motion.div variants={fadeInUp}>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-gray-800">
            Sruthi
          </h1>

          <div className="flex items-center justify-center gap-3 sm:gap-5 my-2">
            <div className="h-px w-10 sm:w-16 bg-rose-200" />

            <span className="font-serif text-2xl sm:text-3xl text-rose-500 italic">
              &
            </span>

            <div className="h-px w-10 sm:w-16 bg-rose-200" />
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-gray-800">
            Rohith
          </h1>
        </motion.div>

        {/* Intro */}
        <motion.p
          variants={fadeInUp}
          className="max-w-xl mx-auto mt-7 text-sm sm:text-base leading-7 text-gray-500"
        >
          With the blessings of our families,
          <br className="hidden sm:block" />
          we invite you to celebrate this special evening with us.
        </motion.p>

        {/* Date and time */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 text-gray-700"
        >
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-rose-500" />
            <span className="text-sm sm:text-base font-medium">
              22 November 2026
            </span>
          </div>

          <div className="hidden sm:block h-5 w-px bg-rose-200" />

          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-rose-500" />
            <span className="text-sm sm:text-base font-medium">
              5:00 PM – 9:00 PM
            </span>
          </div>
        </motion.div>

        {/* Venue */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500"
        >
          <MapPin className="w-4 h-4 text-rose-400" />

          <span>
            Krishna Pillai Memorial Auditorium · Kovoor, Kozhikode
          </span>
        </motion.div>

        {/* Guest greeting */}
        {guestName && (
          <motion.div
            variants={fadeInUp}
            className="mt-8 text-sm text-gray-500"
          >
            <span className="text-rose-500">Dear</span>{" "}
            <span className="font-medium text-gray-700">{guestName}</span>
          </motion.div>
        )}

        {/* Countdown */}
        <motion.div variants={fadeInUp} className="mt-10">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">
            Counting down to the celebration
          </p>

          <CountdownTimer targetDate="2026-11-22T17:00:00" />
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <div className="h-px w-16 bg-rose-100" />

          <Heart
            className="w-5 h-5 text-rose-400 fill-rose-100"
            strokeWidth={1.5}
          />

          <div className="h-px w-16 bg-rose-100" />
        </motion.div>
      </motion.div>
    </section>
  );
}
