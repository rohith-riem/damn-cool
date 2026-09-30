import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CalendarDays,
  Clock3,
  CalendarPlus,
  X,
  Globe,
  Apple,
  Calendar as CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import { useMotionPreset } from "@/lib/motion";

const Modal = ({ isOpen, onClose, children }) => {
  const fade = useMotionPreset("fade");
  const fadeUp = useMotionPreset("fadeUp");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-[#3d101d]/50 backdrop-blur-sm"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-1/2 top-1/2 z-[70] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2"
          >
            <div className="border border-[#b79b62]/40 bg-[#faf5e8] p-6 shadow-2xl">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CalendarButton = ({ icon: Icon, label, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      "flex w-full items-center gap-4 border border-[#b79b62]/30",
      "bg-[#fffaf0] px-4 py-3.5 text-left",
      "transition-colors hover:border-[#8d1730]/40 hover:bg-[#f8f0dc]",
    )}
  >
    <Icon className="h-5 w-5 shrink-0 text-[#8d1730]" />
    <span className="font-sans text-sm tracking-wide text-[#3d101d]">
      {label}
    </span>
  </motion.button>
);

const SingleEventCard = ({ eventData }) => {
  const { t } = useTranslation();
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const fadeUp = useMotionPreset("fadeUp");

  const formatDisplayDate = (dateString) => {
    const date = new Date(`${dateString}T12:00:00`);

    return {
      day: date.toLocaleDateString("en-IN", {
        day: "2-digit",
      }),
      month: date.toLocaleDateString("en-IN", {
        month: "long",
      }),
      year: date.toLocaleDateString("en-IN", {
        year: "numeric",
      }),
      weekday: date.toLocaleDateString("en-IN", {
        weekday: "long",
      }),
    };
  };

  const date = formatDisplayDate(eventData.date);

  const googleCalendarLink = () => {
    const start = `${eventData.date.replace(/-/g, "")}T${eventData.startTime.replace(
      /:/g,
      "",
    )}00`;

    const end = `${eventData.date.replace(/-/g, "")}T${eventData.endTime.replace(
      /:/g,
      "",
    )}00`;

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: eventData.title,
      dates: `${start}/${end}`,
      details:
        eventData.description ||
        "Wedding Reception of Sruthi K & Rohith A C",
      location: `${eventData.location}, ${eventData.address}`,
      ctz: "Asia/Kolkata",
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const generateICSContent = () => {
    const start = `${eventData.date.replace(/-/g, "")}T${eventData.startTime.replace(
      /:/g,
      "",
    )}00`;

    const end = `${eventData.date.replace(/-/g, "")}T${eventData.endTime.replace(
      /:/g,
      "",
    )}00`;

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sruthi & Rohith//Wedding Reception//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART;TZID=Asia/Kolkata:${start}
DTEND;TZID=Asia/Kolkata:${end}
SUMMARY:${eventData.title}
DESCRIPTION:${eventData.description || "Wedding Reception of Sruthi K & Rohith A C"}
LOCATION:${eventData.location}, ${eventData.address}
URL:${window.location.href}
END:VEVENT
END:VCALENDAR`;
  };

  const downloadICSFile = () => {
    const icsContent = generateICSContent();

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "sruthi-rohith-reception.ics";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden border border-[#b79b62]/45 bg-[#fffaf0]"
      >
        {/* Decorative top line */}
        <div className="h-px w-full bg-[#b79b62]/60" />

        <div className="p-6 sm:p-8">
          {/* Small label */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#b79b62]/50" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8d1730]">
              Wedding Reception
            </span>
            <span className="h-px w-8 bg-[#b79b62]/50" />
          </div>

          {/* Date */}
          <div className="text-center">
            <p className="font-serif text-5xl leading-none text-[#8d1730] sm:text-6xl">
              {date.day}
            </p>

            <p className="mt-2 font-serif text-xl text-[#3d101d] sm:text-2xl">
              {date.month} {date.year}
            </p>

            <p className="mt-1 font-sans text-xs uppercase tracking-[0.25em] text-[#8b7860]">
              {date.weekday}
            </p>
          </div>

          {/* Brass divider */}
          <div className="my-7 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#b79b62]/40" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#b79b62] bg-[#faf5e8]" />
            <span className="h-px w-12 bg-[#b79b62]/40" />
          </div>

          {/* Time */}
          <div className="flex items-center justify-center gap-3 text-center">
            <Clock3 className="h-4 w-4 text-[#b08d4f]" />
            <span className="font-serif text-lg text-[#3d101d]">
              {eventData.startTime} – {eventData.endTime}
            </span>
          </div>

          {/* Calendar button */}
          <motion.button
            onClick={() => setShowCalendarModal(true)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mx-auto mt-7 flex items-center gap-2 border border-[#8d1730] px-5 py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] text-[#8d1730] transition-colors hover:bg-[#8d1730] hover:text-[#fffaf0]"
          >
            <CalendarPlus className="h-4 w-4" />
            Add to Calendar
          </motion.button>
        </div>

        {/* Decorative bottom line */}
        <div className="h-1 bg-[#0d4b3e]" />
      </motion.div>

      {/* Calendar Modal */}
      <Modal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
      >
        <div className="space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8d1730]">
                Save the date
              </p>

              <h3 className="mt-2 font-serif text-2xl text-[#3d101d]">
                Add to Calendar
              </h3>
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setShowCalendarModal(false)}
              className="text-[#8b7860] transition-colors hover:text-[#8d1730]"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>

          <div className="space-y-3">
            <CalendarButton
              icon={Globe}
              label="Google Calendar"
              onClick={() => {
                window.open(googleCalendarLink(), "_blank");
                setShowCalendarModal(false);
              }}
            />

            <CalendarButton
              icon={Apple}
              label="Apple Calendar"
              onClick={() => {
                downloadICSFile();
                setShowCalendarModal(false);
              }}
            />

            <CalendarButton
              icon={CalendarIcon}
              label="Outlook / Download .ics"
              onClick={() => {
                downloadICSFile();
                setShowCalendarModal(false);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const EventCards = ({ events }) => {
  return (
    <div className="mx-auto w-full max-w-xl">
      {events.map((event, index) => (
        <SingleEventCard key={index} eventData={event} />
      ))}
    </div>
  );
};

export default EventCards;
