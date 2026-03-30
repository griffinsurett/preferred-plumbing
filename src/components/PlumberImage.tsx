// src/components/PlumberImage.tsx
import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface PlumberImageProps {
  src: string;
  priority?: boolean;
  className?: string;
}

export default function PlumberImage({ src, priority = false, className = "" }: PlumberImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          controls.start("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <div ref={ref} className={className}>
      <motion.img
        src={src}
        alt=""
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchpriority={priority ? "high" : undefined}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
        }}
        className="block h-auto w-full translate-y-[3.5rem]"
      />
    </div>
  );
}
