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
            className="fixed inset-0 z-[60] bg-gray-900/40 backdrop-blur-sm"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-1/2 top-1/2 z-[70] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2"
          >
            <div className="border border-rose-100 bg-white p-6 shadow-2xl rounded-2xl">
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
      "flex w-full items-center gap-4",
      "border border-rose-100",
      "bg-white px-4 py-3.5 text-left rounded-xl",
      "transition-colors hover:border-rose-200 hover:bg-rose-50/50",
    )}
  >
    <Icon className="h-5 w-5 shrink-0 text-rose-500" />

    <span className="font-sans text-sm tracking-wide text-gray-700">
      {label}
    </span>
  </motion.button>
);

const SingleEventCard = ({ eventData }) => {
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
    const start = `${eventData.date.replace(
      /-/g,
      "",
    )}T${eventData.startTime.replace(/:/g, "")}00`;

    const end = `${eventData.date.replace(
      /-/g,
      "",
    )}T${eventData.endTime.replace(/:/g, "")}00`;

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
    const start = `${eventData.date.replace(
      /-/g,
      "",
    )}T${eventData.startTime.replace(/:/g, "")}00`;

    const end = `${eventData.date.replace(
      /-/g,
      "",
    )}T${eventData.endTime.replace(/:/g, "")}00`;

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
        className="relative overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm"
      >
        <div className="p-6 sm:p-8">
          {/* Section label */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-rose-200" />

            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-rose-500">
              Wedding Reception
            </span>

            <span className="h-px w-8 bg-rose-200" />
          </div>

          {/* Date */}
          <div className="text-center">
            <p className="font-serif text-5xl leading-none text-rose-500 sm:text-6xl">
              {date.day}
            </p>

            <p className="mt-2 font-serif text-xl text-gray-800 sm:text-2xl">
              {date.month} {date.year}
            </p>

            <p className="mt-1 font-sans text-xs uppercase tracking-[0.25em] text-gray-400">
              {date.weekday}
            </p>
          </div>

          {/* Divider */}
          <div className="my-7 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-rose-100" />

            <span className="h-1.5 w-1.5 rotate-45 border border-rose-300 bg-white" />

            <span className="h-px w-12 bg-rose-100" />
          </div>

          {/* Time */}
          <div className="flex items-center justify-center gap-3 text-center">
            <Clock3 className="h-4 w-4 text-rose-500" />

            <span className="font-serif text-lg text-gray-700">
              {eventData.startTime} – {eventData.endTime}
            </span>
          </div>

          {/* Calendar button */}
          <motion.button
            onClick={() => setShowCalendarModal(true)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mx-auto mt-7 flex items-center gap-2 rounded-xl border border-rose-300 px-5 py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] text-rose-500 transition-colors hover:bg-rose-500 hover:text-white"
          >
            <CalendarPlus className="h-4 w-4" />
            Add to Calendar
          </motion.button>
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-rose-100" />
      </motion.div>

      {/* Calendar Modal */}
      <Modal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
      >
        <div className="space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-rose-500">
                Save the date
              </p>

              <h3 className="mt-2 font-serif text-2xl text-gray-800">
                Add to Calendar
              </h3>
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setShowCalendarModal(false)}
              className="text-gray-400 transition-colors hover:text-rose-500"
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
