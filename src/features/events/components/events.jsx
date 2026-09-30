import EventCards from "@/features/events/components/events-card";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { motion } from "motion/react";
import { useMotionPreset, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Events() {
  const config = useConfig();

  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");
  const scaleIn = useMotionPreset("scaleIn");

  return (
    <section
      id="event"
      className={cn(
        "relative overflow-hidden bg-white py-20 sm:py-28"
      )}
    >
      {/* Soft decorative background */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-rose-50/60 blur-3xl" />

      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 mx-auto max-w-5xl px-5"
      >
        {/* Section heading */}
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 text-center sm:mb-16"
        >
          {/* Decorative divider */}
          <motion.div
            variants={scaleIn}
            className="mb-5 flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-rose-200" />

            <span className="h-1.5 w-1.5 rotate-45 border border-rose-300 bg-white" />

            <span className="h-px w-10 bg-rose-200" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-sans text-[10px] uppercase tracking-[0.35em] text-rose-500"
          >
            Save the date
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-4xl leading-tight text-gray-800 sm:text-5xl"
          >
            The Reception
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-md font-serif text-sm italic leading-relaxed text-gray-500"
          >
            An evening of celebration, family and togetherness.
          </motion.p>
        </motion.div>

        {/* Event card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <EventCards events={config.agenda} />
        </motion.div>
      </motion.div>

      {/* Subtle bottom decoration */}
      <div className="absolute bottom-0 left-1/2 h-px w-24 -translate-x-1/2 bg-rose-200" />
    </section>
  );
}
