import { animate, useInView, useIsomorphicLayoutEffect } from "framer-motion";
import { useRef } from "react";
const AnimatedCounter = ({ from, to, animationOptions }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;
    if (!isInView) return;

    element.textContent = String(from);

    if (window.matchMedia("(prefers-reduced-motion)").matches) {
      element.textContent = String(to);
      return;
    }

    const controls = animate(from, to, {
      duration: 6,
      ease: "easeOut",
      ...animationOptions,

      onUpdate(value) {
        element.textContent = Number(value.toFixed(0)).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [ref, isInView, from, to]);
  return <span ref={ref}></span>;
};

export default AnimatedCounter;
