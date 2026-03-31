import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ProjectItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  category?: string;
  location?: string;
};

interface ProjectsPipeScrollerProps {
  title?: string;
  intro?: string;
  pipeImageSrc: string;
  projects: ProjectItem[];
}

const DESKTOP_STAGE_STYLE = {
  "--pipe-width": "clamp(68rem, 78vw, 92rem)",
  "--pipe-left": "calc(100% - var(--pipe-width))",
  "--pipe-card-x": "calc(100% - (var(--pipe-width) * 0.89))",
  "--pipe-copy-left": "calc(var(--pipe-card-x) + clamp(14rem, 18vw, 18rem))",
} as React.CSSProperties;

const PANEL_TOPS = ["73%", "50%", "27%"] as const;

export default function ProjectsPipeScroller({
  title = "Our Projects",
  intro = "Representative plumbing projects positioned along the pipe as you scroll through the section.",
  pipeImageSrc,
  projects,
}: ProjectsPipeScrollerProps) {
  const [isDesktop, setIsDesktop] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncDesktopState = (event?: MediaQueryList | MediaQueryListEvent) => {
      setIsDesktop((event ?? mediaQuery).matches);
    };

    syncDesktopState(mediaQuery);
    mediaQuery.addEventListener("change", syncDesktopState);

    return () => mediaQuery.removeEventListener("change", syncDesktopState);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const safeProjects = projects.slice(0, 3);
  const leadInScreens = isDesktop ? 1 : 0;
  const totalScreens = safeProjects.length + leadInScreens;
  const sectionHeight = `${totalScreens * 100}vh`;
  const trackTravel = `-${Math.max(totalScreens - 1, 0) * 100}vh`;
  const trackY = useTransform(scrollYProgress, [0, 1], ["0vh", trackTravel]);

  return (
    <section
      ref={sectionRef}
      id="projects-home"
      className="relative overflow-clip bg-primary text-text"
    >
      <div className="px-6 pb-6 pt-14 text-center md:hidden">
        <div className="mx-auto max-w-2xl">
          <h2 className="h2 text-heading">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text/80 md:text-base">
            {intro}
          </p>
        </div>
      </div>

      <div className="relative" style={{ minHeight: sectionHeight }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            className="relative"
            style={{ y: trackY, height: sectionHeight }}
          >
            <div
            className="pointer-events-none absolute inset-x-0 top-[10vh] z-20 hidden px-10 text-center md:block"
            style={{
              ...DESKTOP_STAGE_STYLE,
            }}
          >
              <h2 className="h2 text-heading">{title}</h2>
              <p className="mx-auto mt-4 max-w-[48rem] text-base leading-relaxed text-text/80">
                {intro}
              </p>
            </div>

            <img
              src={pipeImageSrc}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute top-0 hidden h-full w-auto max-w-none select-none md:block"
              style={{
                ...DESKTOP_STAGE_STYLE,
                right: "0",
                width: "var(--pipe-width)",
              }}
            />

            <div style={{ paddingTop: isDesktop ? "100vh" : "0vh" }}>
              {safeProjects.map((project, index) => (
                <div
                  key={`${project.title}-${index}`}
                  className="relative h-screen px-5 md:px-10"
                >
                  <div className="flex h-full items-center justify-center md:hidden">
                    <motion.div
                      className="mx-auto grid w-full max-w-3xl gap-6 text-center"
                      whileInView={{ opacity: [0.6, 1], scale: [0.96, 1] }}
                      viewport={{ amount: 0.4, once: false }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <div className="mx-auto w-[min(58vw,15rem)] overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-[0_20px_50px_rgba(26,56,61,0.18)]">
                        <img
                          src={project.imageSrc}
                          alt={project.imageAlt}
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </div>

                      <div>
                        {(project.category || project.location) && (
                          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-text/65">
                            {[project.category, project.location].filter(Boolean).join(" | ")}
                          </p>
                        )}

                        <h3
                          className="text-[clamp(1.8rem,3.5vw,3rem)] font-black leading-[0.92] text-heading"
                          style={{ fontFamily: "var(--font-tt-lakes)" }}
                        >
                          {project.title}
                        </h3>

                        <p className="mt-4 text-sm leading-relaxed text-text/80">
                          {project.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div
                    className="absolute hidden md:block"
                    style={{
                      ...DESKTOP_STAGE_STYLE,
                      left: "var(--pipe-card-x)",
                      top: PANEL_TOPS[index] ?? PANEL_TOPS[1],
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <motion.div
                      className="overflow-hidden rounded-[1.8rem] border border-primary/15 bg-white shadow-[0_22px_60px_rgba(26,56,61,0.18)]"
                      whileInView={{ opacity: [0.6, 1], scale: [0.96, 1] }}
                      viewport={{ amount: 0.4, once: false }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <img
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        className="aspect-[4/3] w-[clamp(15rem,25vw,27rem)] object-cover"
                      />
                    </motion.div>
                  </div>

                  <div
                    className="absolute hidden max-w-[36rem] md:block"
                    style={{
                      ...DESKTOP_STAGE_STYLE,
                      left: "var(--pipe-copy-left)",
                      top: PANEL_TOPS[index] ?? PANEL_TOPS[1],
                      transform: "translateY(-50%)",
                    }}
                  >
                    {(project.category || project.location) && (
                      <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-text/65">
                        {[project.category, project.location].filter(Boolean).join(" | ")}
                      </p>
                    )}

                    <h3
                      className="text-[clamp(2.2rem,4vw,4rem)] font-black leading-[0.9] text-heading"
                      style={{ fontFamily: "var(--font-tt-lakes)" }}
                    >
                      {project.title}
                    </h3>

                    <p className="mt-5 max-w-[32rem] text-[clamp(1rem,1.3vw,1.35rem)] leading-relaxed text-text/80">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
