import React, { useEffect, useCallback } from "react";
import { motion } from "motion/react";
import {
  Home,
  CalendarHeart,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DURATION, useReducedMotionFlag } from "@/lib/motion";
import { useTranslation } from "@/lib/i18n";

const menuItems = [
  {
    icon: Home,
    labelKey: "nav.home",
    href: "#home",
    id: "home",
  },
  {
    icon: CalendarHeart,
    labelKey: "nav.event",
    href: "#event",
    id: "event",
  },
  {
    icon: MapPin,
    labelKey: "nav.location",
    href: "#location",
    id: "location",
  },
];

const BottomBar = () => {
  const { t } = useTranslation();
  const [active, setActive] = React.useState("home");
  const reduceMotion = useReducedMotionFlag();

  const handleMenuClick = useCallback((e, href, id) => {
    e.preventDefault();

    const element = document.querySelector(href);

    if (element) {
      setActive(id);

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          const validSection = menuItems.find(
            (item) => item.id === sectionId,
          );

          if (validSection) {
            setActive(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    menuItems.forEach((item) => {
      const element = document.getElementById(item.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div
        className="w-auto"
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { y: 100, opacity: 0 }
        }
        animate={
          reduceMotion
            ? { opacity: 1 }
            : { y: 0, opacity: 1 }
        }
        transition={
          reduceMotion
            ? { duration: DURATION.base }
            : {
                duration: DURATION.base,
                type: "spring",
                stiffness: 100,
              }
        }
      >
        <div
          className={cn(
            "backdrop-blur-md bg-white/90",
            "border border-rose-100",
            "rounded-2xl",
            "shadow-[0_8px_30px_rgb(0,0,0,0.07)]",
            "px-3 py-2",
          )}
        >
          <nav className="flex items-center gap-1">
            {menuItems.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center",
                  "py-2 px-3 rounded-xl",
                  "transition-all duration-300 ease-in-out",
                  "hover:bg-rose-50/70",
                  "cursor-pointer",
                  "min-w-[65px]",
                  active === item.id
                    ? "bg-rose-50 text-rose-500"
                    : "text-gray-600",
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) =>
                  handleMenuClick(
                    e,
                    item.href,
                    item.id,
                  )
                }
              >
                <motion.div
                  animate={{
                    scale: active === item.id ? 1.1 : 1,
                  }}
                  transition={{
                    duration: DURATION.fast,
                  }}
                >
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] sm:h-5 sm:w-5 mb-0.5 sm:mb-1",
                      "transition-all duration-300",
                      active === item.id
                        ? "stroke-rose-500 stroke-[2.5px]"
                        : "stroke-gray-600 stroke-2",
                    )}
                  />
                </motion.div>

                <motion.span
                  className={cn(
                    "text-[10px] sm:text-xs font-medium",
                    "transition-all duration-300",
                    active === item.id
                      ? "text-rose-500 font-semibold"
                      : "text-gray-600",
                  )}
                  animate={{
                    scale: active === item.id ? 1.05 : 1,
                  }}
                  transition={{
                    duration: DURATION.fast,
                  }}
                >
                  {t(item.labelKey)}
                </motion.span>
              </motion.a>
            ))}
          </nav>
        </div>
      </motion.div>
    </div>
  );
};

export default BottomBar;
