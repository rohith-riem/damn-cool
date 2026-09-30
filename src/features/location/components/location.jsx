import { useConfig } from "@/features/invitation/hooks/use-config";
import { motion } from "motion/react";
import {
  Clock3,
  MapPin,
  CalendarDays,
  ExternalLink,
} from "lucide-react";
import { useMotionPreset, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Location() {
  const config = useConfig();

  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");
  const scaleIn = useMotionPreset("scaleIn");

  return (
    <section
      id="location"
      className="relative overflow-hidden bg-[#faf5e8] py-20 sm:py-28"
    >
      {/* Decorative top border */}
      <div className="absolute left-0 top-0 h-1.5 w-full bg-[#0d4b3e]" />

      {/* Very subtle decorative circles */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full border border-[#b79b62]/10" />
      <div className="pointer-events-none absolute left-1/2 top-28 h-48 w-48 -translate-x-1/2 rounded-full border border-[#b79b62]/10" />

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
          <motion.div
            variants={scaleIn}
            className="mb-5 flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-[#b79b62]/50" />

            <span className="h-1.5 w-1.5 rotate-45 border border-[#b79b62] bg-[#faf5e8]" />

            <span className="h-px w-10 bg-[#b79b62]/50" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#8d1730]"
          >
            Find us here
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-3 font-serif text-4xl leading-tight text-[#3d101d] sm:text-5xl"
          >
            The Venue
          </motion.h2>
        </motion.div>

        {/* Venue composition */}
        <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Decorative map illustration */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center"
          >
            {/* Outer rings */}
            <div className="absolute inset-5 rounded-full border border-[#b79b62]/30" />
            <div className="absolute inset-12 rounded-full border border-[#b79b62]/20" />

            {/* Map-like flowing lines */}
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                d="M35 115 C100 75, 135 145, 190 110 S300 65, 365 105"
                fill="none"
                stroke="#b79b62"
                strokeOpacity="0.35"
                strokeWidth="1"
              />

              <path
                d="M25 205 C90 170, 125 230, 190 195 S310 160, 375 205"
                fill="none"
                stroke="#b79b62"
                strokeOpacity="0.3"
                strokeWidth="1"
              />

              <path
                d="M45 290 C105 245, 145 305, 205 270 S310 245, 355 285"
                fill="none"
                stroke="#b79b62"
                strokeOpacity="0.3"
                strokeWidth="1"
              />

              <path
                d="M105 45 C145 105, 115 150, 160 195 S185 290, 145 355"
                fill="none"
                stroke="#b79b62"
                strokeOpacity="0.2"
                strokeWidth="1"
              />

              <path
                d="M285 45 C245 105, 280 155, 235 200 S215 295, 260 355"
                fill="none"
                stroke="#b79b62"
                strokeOpacity="0.2"
                strokeWidth="1"
              />
            </svg>

            {/* Location marker */}
            <motion.div
              variants={scaleIn}
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-[#b79b62]/50 bg-[#faf5e8]"
            >
              <MapPin
                className="h-9 w-9 text-[#8d1730]"
                strokeWidth={1.3}
              />
            </motion.div>

            {/* Small decorative diamonds */}
            <span className="absolute left-10 top-24 h-1.5 w-1.5 rotate-45 border border-[#b79b62]" />
            <span className="absolute right-12 top-32 h-1.5 w-1.5 rotate-45 border border-[#b79b62]" />
            <span className="absolute bottom-20 left-20 h-1.5 w-1.5 rotate-45 border border-[#b79b62]" />
          </motion.div>

          {/* Venue information */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center md:text-left"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#b08d4f]">
              Reception Venue
            </p>

            <h3 className="mt-4 font-serif text-3xl leading-tight text-[#8d1730] sm:text-4xl">
              {config.location}
            </h3>

            <p className="mt-3 font-serif text-base italic leading-relaxed text-[#786b58]">
              {config.address}
            </p>

            {/* Details */}
            <div className="mx-auto mt-8 max-w-sm space-y-4 md:mx-0">
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <CalendarDays className="h-4 w-4 text-[#b08d4f]" />

                <span className="font-sans text-xs tracking-wide text-[#5f5346]">
                  22 November 2026 · Sunday
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 md:justify-start">
                <Clock3 className="h-4 w-4 text-[#b08d4f]" />

                <span className="font-sans text-xs tracking-wide text-[#5f5346]">
                  {config.time}
                </span>
              </div>
            </div>

            {/* Maps button */}
            <motion.a
              href={config.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mx-auto mt-9 inline-flex items-center gap-2 border border-[#8d1730] bg-[#8d1730] px-6 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#fffaf0] transition-colors hover:bg-[#6f1026] md:mx-0"
            >
              <MapPin className="h-4 w-4" />
              Open in Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 h-1.5 w-full bg-[#8d1730]" />
    </section>
  );
}
