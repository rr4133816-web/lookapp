import type { Transition, Variants } from "framer-motion";

/** Shared easing curve from the design brief. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const springTransition: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 30,
  mass: 0.8,
};

export const smoothTransition: Transition = {
  duration: 0.3,
  ease: EASE_OUT_EXPO,
};

/** Page-level entrance: fade + rise 14px. */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

/** Container that staggers its children by 60ms. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

/** Card hover lift used across marketplace cards. */
export const cardHover = {
  rest: { y: 0 },
  hover: { y: -4, transition: smoothTransition },
} as const;

/** Button press feedback. */
export const pressable = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.98 },
} as const;

/** Modal / drawer / popover entrance. */
export const overlayVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: EASE_OUT_EXPO },
  },
  exit: { opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.15 } },
};
