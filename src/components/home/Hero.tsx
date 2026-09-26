import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionTemplate } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

/* ────────────────────────────────────────────────
   Hero — fullscreen with parallax image, gradient
    dissolve, and staggered text entrance
   ──────────────────────────────────────────────── */

/* Attempt to load the hero image; fall back to CSS gradient */
let heroSrc: string | null = null;
try {
  const modules = import.meta.glob("@/assets/images/hero.jpg", { eager: true, query: "?url", import: "default" });
  const key = Object.keys(modules)[0];
  if (key) heroSrc = modules[key] as string;
} catch {
  /* no image – will use CSS fallback */
}


/* Stagger animation variants */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Hero scrollYProgress:", latest.toFixed(3));
  });

  /* Parallax + zoom: image moves slower than scroll and scales up */
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1, 3]);
  const darkOverlayY = useTransform(scrollYProgress, [0.2, 0.6], ["100%", "0%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.25], ["0px", "-100px"]);
  const contentFilter = useMotionTemplate`opacity(${contentOpacity})`;

  return (
    <div ref={heroRef} style={{ height: "280vh", position: "relative" }}>
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* ── Background layers wrapper ──────────────
          overflow:hidden + contain:paint are scoped here so they clip
          ONLY background visuals. The text content (below) is in normal
          flow and can grow past 100svh on short viewports without being
          clipped.
      ──────────────────────────────────────────── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            contain: "paint",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {/* ── Sharp image layer ─────────────────── */}
          <motion.div
            data-parallax
            style={{
              position: "absolute",
              inset: 0,
              scale: imageScale,
              transformOrigin: "50% 100%",
              ...(heroSrc
                ? {
                  backgroundImage: `url(${heroSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center bottom",
                }
                : {
                  /* CSS-only fallback: layered radial gradients */
                  background: [
                    "radial-gradient(ellipse 120% 80% at 30% 60%, rgba(70, 194, 207, 0.12) 0%, transparent 70%)",
                    "radial-gradient(ellipse 100% 100% at 80% 30%, rgba(18, 39, 49, 0.9) 0%, transparent 60%)",
                    "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(26, 52, 65, 0.7) 0%, transparent 50%)",
                    "linear-gradient(180deg, #0E2430 0%, #0B1B24 100%)",
                  ].join(", "),
                }),
            }}
          >
            {/* Side vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "radial-gradient(ellipse 60% 62% at 50% 55%, transparent 60%, rgba(11,27,36,0.5) 100%)",
              }}
            />
          </motion.div>

          {/* ── Edge-blur layer (heroSrc only) ────────
            Duplicates the sharp image, masks centre transparent so
            only edges receive blur — "sharp centre / soft edges" effect.
            scale(1.1) prevents blur() border artefacts.
        ──────────────────────────────────────────── */}
          {heroSrc && (
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${heroSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
                filter: "blur(28px)",
                maskImage:
                  "radial-gradient(ellipse 60% 62% at 50% 55%, transparent 60%, black 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 60% 62% at 50% 55%, transparent 60%, black 100%)",
                scale: imageScale,
                transformOrigin: "50% 100%",
              }}
            />
          )}

          {/* ── Dark overlay ──────────────────────── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: heroSrc
                ? "linear-gradient(180deg, rgba(11,27,36,0.6) 0%, rgba(11,27,36,0.35) 40%, rgba(11,27,36,0.55) 100%)"
                : "linear-gradient(180deg, transparent 0%, transparent 80%, var(--color-canvas) 100%)",
            }}
          />

          {/* ── Text-area contrast booster ────────────
            Radial shadow behind the copy block guarantees legibility
            regardless of what the photo shows at that spot.
        ──────────────────────────────────────────── */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse 55% 45% at 50% 42%, rgba(6,15,20,0.4) 0%, transparent 70%)",
            }}
          />

          {/* ── Canvas engulfment overlay ──────────── */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundColor: "var(--bg-current, var(--color-canvas))",
              y: darkOverlayY,
              zIndex: 2,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-8vh",
                left: 0,
                right: 0,
                height: "8vh",
                background: "linear-gradient(to top, var(--color-canvas) 0%, transparent 100%)",
              }}
            />
          </motion.div>
        </div>

        {/* ── Content ───────────────────────────── */}
        {/*
        FIX: Replaced justifyContent:center + paddingTop combo.
        justifyContent:center distributes remaining space symmetrically, which
        could pull content above the paddingTop boundary on short viewports.
        Now using flex-start + paddingTop only, which gives deterministic placement.

        Navbar total height breakdown:
          header paddingTop: clamp(20px, 3vw, 32px)
          <nav> height:      56px
          header paddingBtm: clamp(20px, 3vw, 32px)
          desired gap:       ~48px
          ----------------------------------
          Total minimum:     ~168px → clamp min set to 168px
      */}
        <motion.div
          key="hero-content-wrapper"
          style={{
            position: "relative",
            zIndex: 3,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: "clamp(150px, 11vw, 140px)",
            paddingBottom: 0,
            opacity: contentOpacity,
            filter: contentFilter,
            y: contentY,
          }}
        >
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{
                maxWidth: "720px",
                marginInline: "auto",
                textAlign: "center",
              }}
            >
              <motion.div variants={itemVariants} style={{ marginBottom: "20px" }}>
                <Eyebrow>
                  Atelier acuático privado · Lindavista
                </Eyebrow>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="hero-heading"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-display)",
                  fontWeight: 600,
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  color: "var(--color-text)",
                  marginBottom: "48px",
                }}
              >
                Donde la técnica se convierte{" "}
                <br className="hero-break" />
                en <span style={{ color: "var(--color-accent)", fontStyle: "normal" }}>serenidad.</span>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="hero-cta"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button variant="primary" size="lg" href="/inscripcion">
                  Agendar clase diagnóstica
                </Button>
              </motion.div>
            </motion.div>
          </Container>

        </motion.div>



        {/* ── Responsive styles ─────────────────── */}
        <style>{`
        .hero-break {
          display: none;
        }
        @media (min-width: 768px) {
          .hero-break {
            display: block;
          }
        }

        .hero-cta {
          justify-content: center;
        }

        /* Scale down the headline on short viewports so CTAs stay visible */
        @media (max-height: 760px) {
          .hero-heading {
            font-size: clamp(2.25rem, 6vw, 4rem) !important;
          }
        }
      `}</style>
      </section>
    </div>
  );
}
