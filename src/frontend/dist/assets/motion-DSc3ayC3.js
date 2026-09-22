const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const smoothTransition = {
  duration: 0.3,
  ease: EASE_OUT_EXPO
};
const pageVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO }
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } }
};
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 }
  }
};
const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO }
  }
};
const cardHover = {
  rest: { y: 0 },
  hover: { y: -4, transition: smoothTransition }
};
const overlayVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: EASE_OUT_EXPO }
  },
  exit: { opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.15 } }
};
export {
  staggerItem as a,
  cardHover as c,
  overlayVariants as o,
  pageVariants as p,
  staggerContainer as s
};
