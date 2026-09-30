import { useTranslation } from "@/lib/i18n";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { motion } from "motion/react";
import { Calendar, Heart } from "lucide-react";
import {
  useMotionPreset,
  staggerContainer,
  LOOP,
  useReducedMotionFlag,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const LandingPage = ({ onOpenInvitation }) => {
  const config = useConfig();
  const reduceMotion = useReducedMotionFlag();
  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");
  const { t } = useTranslation();

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      className="min-h-screen relative overflow-hidden bg-white"
    >
      {/* Soft background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white" />

      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-rose-100/20 blur-3xl" />

      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-pink-100/20 blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-5 py-10">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg"
        >
          <div className="text-center">

            {/* Small decorative heart */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="h-px w-12 sm:w-16 bg-rose-200" />

              <Heart
                className="w-4 h-4 text-rose-400 fill-rose-100"
                strokeWidth={1.5}
              />

              <div className="h-px w-12 sm:w-16 bg-rose-200" />
            </motion.div>

            {/* Invitation label */}
            <motion.p
              variants={fadeUp}
              className="text-xs sm:text-sm uppercase tracking-[0.25em] text-rose-500 mb-6"
            >
              Wedding Reception
            </motion.p>

            {/* Couple names */}
            <motion.div variants={fadeUp}>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-gray-800 tracking-tight">
                {config.brideName}
              </h1>

              <div className="flex items-center justify-center gap-4 my-2">
                <div className="h-px w-10 sm:w-14 bg-rose-200" />

                <span className="font-serif text-2xl sm:text-3xl italic text-rose-500">
                  &
                </span>

                <div className="h-px w-10 sm:w-14 bg-rose-200" />
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-gray-800 tracking-tight">
                {config.groomName}
              </h1>
            </motion.div>

            {/* Invitation text */}
            <motion.p
              variants={fadeUp}
              className="mt-7 text-sm sm:text-base leading-7 text-gray-500 max-w-md mx-auto"
            >
              With the blessings of our families,
              <br />
              we invite you to celebrate with us.
            </motion.p>

            {/* Date */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-2 mt-8 text-gray-700"
            >
              <Calendar className="w-4 h-4 text-rose-500" />

              <span className="text-sm sm:text-base font-medium">
                22 November 2026
              </span>
            </motion.div>

            {/* Venue */}
            <motion.p
              variants={fadeUp}
              className="mt-2 text-xs sm:text-sm text-gray-400"
            >
              Krishna Pillai Memorial Auditorium · Kozhikode
            </motion.p>

            {/* Open invitation */}
            <motion.div
              variants={fadeUp}
              className="mt-9"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenInvitation}
                className={cn(
                  "group relative inline-flex items-center justify-center",
                  "min-w-[210px] px-8 py-3.5",
                  "bg-rose-500 text-white",
                  "rounded-xl font-medium",
                  "shadow-lg shadow-rose-200/50",
                  "hover:bg-rose-600",
                  "transition-all duration-200",
                  "overflow-hidden"
                )}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>{t("landing.openInvitation")}</span>

                  <motion.span
                    animate={
                      reduceMotion ? undefined : { x: [0, 4, 0] }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            repeat: Infinity,
                            duration: LOOP.nudge,
                          }
                    }
                  >
                    →
                  </motion.span>
                </span>

                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.button>
            </motion.div>

            {/* Bottom decoration */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-3 mt-10"
            >
              <div className="h-px w-16 bg-rose-100" />

              <Heart
                className="w-3.5 h-3.5 text-rose-300 fill-rose-50"
                strokeWidth={1.5}
              />

              <div className="h-px w-16 bg-rose-100" />
            </motion.div>

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
