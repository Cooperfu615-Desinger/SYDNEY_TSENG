import React, { useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { Howl } from "howler";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Crosshair,
  Heart,
  Mail,
  Menu,
  Play,
  Sparkle,
  X,
} from "lucide-react";
import { soundLabCategories, works } from "./data/siteData.js";
import { appPath, assetPath } from "./utils/assets.js";

const blue = "#0757ff";
const formspreeEndpoint = "https://formspree.io/f/mzdynnjj";

function DoodleText({ children, className = "" }) {
  return <span className={`doodle-text ${className}`}>{children}</span>;
}

function DrawnLine({ className = "", delay = 0 }) {
  return (
    <motion.svg
      className={`drawn-line ${className}`}
      viewBox="0 0 220 28"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.path
        d="M7 19 C53 8 108 9 148 11 C175 12 194 10 214 7"
        fill="none"
        stroke={blue}
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

function DoodleCircle({ children, className = "", onClick }) {
  return (
    <motion.button
      className={`doodle-circle ${className}`}
      onClick={onClick}
      whileHover={{ rotate: -3, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <svg viewBox="0 0 220 130" aria-hidden="true">
        <motion.path
          d="M23 72 C12 28 64 8 111 12 C167 17 210 46 202 82 C193 122 123 128 66 111 C40 103 27 90 23 72 Z"
          fill="none"
          stroke={blue}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <span>{children}</span>
    </motion.button>
  );
}

function useAudioEngine() {
  const howlRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);

  const stop = () => {
    howlRef.current?.stop();
    howlRef.current = null;
    setPlayingId(null);
  };

  const toggle = (sample) => {
    if (playingId === sample.id) {
      stop();
      return;
    }

    stop();
    const howl = new Howl({
      src: [sample.audio],
      html5: true,
      volume: 0.82,
      onend: () => setPlayingId(null),
    });
    howlRef.current = howl;
    setPlayingId(sample.id);
    howl.play();
  };

  return { playingId, toggle, stop };
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a href={appPath("#top")} className="brand" aria-label="Sydney Tseng home">
        Sydney Tseng
      </a>
      <nav aria-label="Primary navigation">
        <a href={appPath("#work")}>Work</a>
        <a href={appPath("about")}>About</a>
        <a href={appPath("#sound-lab")}>Sound Lab</a>
        <a href={appPath("#contact")}>Contact</a>
      </nav>
      <img
        className="header-spark"
        src={assetPath("/images/doodles/header-spark.svg")}
        alt=""
        aria-hidden="true"
      />
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
        <Menu />
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mobile-menu-card">
              <div className="mobile-menu-top">
                <span>Sydney Tseng</span>
                <img src={assetPath("/images/doodles/header-spark.svg")} alt="" aria-hidden="true" />
                <button type="button" onClick={closeMenu} aria-label="Close menu">
                  <X />
                </button>
              </div>
              <nav aria-label="Mobile navigation">
                <a href={appPath("#work")} onClick={closeMenu}>
                  Work
                </a>
                <a href={appPath("about")} onClick={closeMenu}>
                  About
                </a>
                <a href={appPath("#sound-lab")} onClick={closeMenu}>
                  Sound Lab
                </a>
                <a href={appPath("#contact")} onClick={closeMenu}>
                  Contact
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <Header />
      <div className="hero-stage">
        <div className="hero-copy">
          <p className="eyebrow">
            Sound designer
            <br />
            for games &
            <br />
            digital experiences
          </p>
          <DrawnLine className="eyebrow-line" />
          <h1>
            I design
            <br />
            sound that
            <br />
            makes pixels
            <br />
            feel alive.
          </h1>
          <DrawnLine className="hero-underline" delay={0.25} />
        </div>
        <motion.img
          className="hero-image"
          src={assetPath("/images/hero/main.png")}
          alt="Sydney Tseng smiling in a black and white portrait"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <DoodleText className="go-classy">Go classy!</DoodleText>
        <a className="scroll-note" href="#work">
          <span>Scroll down</span>
          <ArrowDown size={30} />
        </a>
      </div>
    </section>
  );
}

function WorkCard({ work, onOpen, onPlayAudio, playingId }) {
  const audioId = `work-${work.id}`;
  const isAudioPlaying = playingId === audioId;

  const handlePlay = () => {
    if (work.audio) {
      onPlayAudio({ id: audioId, audio: work.audio });
      return;
    }

    onOpen(work);
  };

  return (
    <article className="work-card">
      <img src={work.image} alt={`${work.title} project cover`} />
      <div className="work-scrim" />
      <DoodleText className="work-title">{work.title}</DoodleText>
      <button
        className={`play-button${isAudioPlaying ? " is-active" : ""}`}
        onClick={handlePlay}
        aria-label={`Play ${work.title}`}
      >
        <Play size={28} fill="currentColor" />
      </button>
      <div className="work-meta">
        <p>{work.description}</p>
      </div>
    </article>
  );
}

function SelectedWorks({ onOpen, onPlayAudio, playingId }) {
  const [emblaRef] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

  return (
    <section className="dark-section works-section" id="work">
      <div className="section-title-row">
        <h2>Selected Works</h2>
        <img
          className="blue-star"
          src={assetPath("/images/doodles/header-spark.svg")}
          alt=""
          aria-hidden="true"
        />
        <DoodleText className="tap-note">Tap to play</DoodleText>
      </div>
      <div className="carousel-wrap">
        <div className="embla" ref={emblaRef}>
          <div className="embla-container">
            {works.map((work) => (
              <div className="embla-slide" key={work.id}>
                <WorkCard work={work} onOpen={onOpen} onPlayAudio={onPlayAudio} playingId={playingId} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SoundLab({ onPlayAudio, playingId }) {
  return (
    <section className="dark-section sound-about-grid" id="sound-lab">
      <div className="sound-lab">
        <div className="mini-title">
          <h2>Sound Lab</h2>
          <DrawnLine />
          <DoodleText>Click & listen</DoodleText>
        </div>
        <div className="sound-cards">
          {soundLabCategories.map((item) => (
            <button
              className={`sound-card ${playingId === `soundlab-${item.id}` ? "is-active" : ""}`}
              key={item.id}
              type="button"
              onClick={() => onPlayAudio({ id: `soundlab-${item.id}`, audio: item.audio })}
              aria-label={`Play ${item.title}`}
            >
              <img src={item.image} alt="" aria-hidden="true" loading="lazy" />
              <strong>{item.title}</strong>
              <span>
                Play now
                <ArrowRight className="card-arrow" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </div>
      <About />
    </section>
  );
}

function About() {
  return (
    <section className="about-panel" id="about">
      <div className="about-copy">
        <h2>About Me</h2>
        <DrawnLine />
        <p>
          I&apos;m a sound designer who loves turning ideas into{" "}
          <span className="circled-word">feelings</span>. With a mix of creativity and technical skills, I craft
          audio that connects players to the world.
        </p>
        <a className="outline-button" href={appPath("about")}>More about me</a>
      </div>
      <div className="about-polaroids" aria-label="Sydney studio photos">
        <motion.figure
          className="polaroid polaroid-primary"
          whileHover={{ rotate: -1.5, y: -4 }}
          transition={{ type: "spring", stiffness: 220, damping: 17 }}
        >
          <span className="tape" />
          <img src={assetPath("/images/about/side.jpeg")} alt="Sydney in a recording studio" />
          <figcaption>:-)</figcaption>
        </motion.figure>
        <motion.figure
          className="polaroid polaroid-secondary"
          whileHover={{ rotate: 1.5, y: -4 }}
          transition={{ type: "spring", stiffness: 220, damping: 17 }}
        >
          <span className="tape" />
          <img src={assetPath("/images/about/side_2.jpeg")} alt="Sydney in a recording studio" />
          <figcaption>:-)</figcaption>
        </motion.figure>
        <motion.figure
          className="polaroid polaroid-tertiary"
          whileHover={{ rotate: -1, y: -4 }}
          transition={{ type: "spring", stiffness: 220, damping: 17 }}
        >
          <span className="tape" />
          <img src={assetPath("/images/about/side_3.jpeg")} alt="Sydney in a recording studio" />
          <figcaption>:-)</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

function CurrentlyNote({ className = "" }) {
  return (
    <section className={`currently-note ${className}`} aria-labelledby="home-currently-title">
      <span className="currently-tape" />
      <h2 id="home-currently-title">Currently</h2>
      <DrawnLine />
      <ul>
        <li>crafting playful and addictive sound experiences</li>
        <li>exploring textures, voices, and experimental stuff</li>
        <li>leveling up my game every day</li>
      </ul>
      <Sparkle className="currently-spark" aria-hidden="true" />
      <DoodleText>
        Let’s create
        <br />
        something cool !
      </DoodleText>
    </section>
  );
}

function ContactModal({ open, onClose }) {
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setStatus("sent");
      setFeedback("Thanks! I’ll get back to you soon.");
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setFeedback("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="close-button" type="button" onClick={handleClose} aria-label="Close contact form">
              <X />
            </button>
            <h2 id="contact-modal-title">Let&apos;s make some noise</h2>
            <DrawnLine />
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Email
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label>
                Subject
                <input type="text" name="subject" required />
              </label>
              <label>
                Message
                <textarea name="message" rows="6" required />
              </label>
              <label className="form-trap" aria-hidden="true">
                Leave this empty
                <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" />
              </label>
              <button className="outline-button contact-submit" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {feedback && <p className={`form-feedback ${status}`}>{feedback}</p>}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContactSection({ variant = "home" }) {
  const [contactOpen, setContactOpen] = useState(false);
  const isAbout = variant === "about";

  return (
    <footer className={isAbout ? "about-contact" : "footer"} id="contact">
      <DoodleText className="footer-note">Let&apos;s make some noise!</DoodleText>
      <button className="outline-button contact-button" type="button" onClick={() => setContactOpen(true)}>
        <Mail /> Contact Me
      </button>
      <img
        className={`globe-doodle${isAbout ? " about-globe" : ""}`}
        src={assetPath("/images/doodles/globe-smile.svg")}
        alt=""
        aria-hidden="true"
      />
      {!isAbout && <DoodleText className="thanks-note">Thanks for visiting!</DoodleText>}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </footer>
  );
}

function Footer() {
  return <ContactSection />;
}

const approachItems = [
  {
    icon: "chaos",
    title: "Embrace Chaos",
    copy: "I dive into the messy part to find what’s real.",
  },
  {
    icon: "purpose",
    title: "Shape With Purpose",
    copy: "Every sound has a reason. I make it count.",
  },
  {
    icon: "heart",
    title: "Feel First",
    copy: "If it doesn’t feel right, it’s not done.",
  },
  {
    icon: "care",
    title: "Deliver With Care",
    copy: "Creative mind, professional outcome.",
  },
];

function AboutApproachIcon({ type }) {
  if (type === "purpose") return <Crosshair />;
  if (type === "heart") return <Heart />;
  if (type === "care") return <Check />;

  return (
    <span className="chaos-icon" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <i key={index} />
      ))}
    </span>
  );
}

function ToolIcon({ type }) {
  const iconMap = {
    logic: {
      className: "tool-icon-wave",
      src: "/images/doodles/tool-logic-wave.svg",
    },
    ai: {
      className: "tool-icon-openai",
      src: "/images/doodles/tool-openai.svg",
    },
    smile: {
      className: "tool-icon-smile",
      src: "/images/doodles/tool-curiosity-smile.svg",
    },
  };
  const icon = iconMap[type] ?? iconMap.smile;

  return (
    <img
      className={`tool-icon ${icon.className}`}
      src={assetPath(icon.src)}
      alt=""
      aria-hidden="true"
      loading="lazy"
    />
  );
}

function AboutPage() {
  return (
    <main className="about-page">
      <a className="about-back" href={appPath("#top")}>
        <ArrowLeft size={18} /> Back
      </a>

      <section className="about-poster" aria-labelledby="about-page-title">
        <div className="about-main-copy">
          <div className="about-title-row">
            <h1 id="about-page-title">About Me</h1>
            <Sparkle className="about-title-spark" aria-hidden="true" />
          </div>
          <DrawnLine className="about-title-line" />

          <div className="about-story">
            <p>
              I’m a sound designer who
              <br />
              turns ideas into feelings.
              <br />
              Part art, part tech—
              <br />
              all instinct.
            </p>
            <p>
              From playful bleep to
              <br />
              heavy impact, I design
              <br />
              sound that fits the world
              <br />
              it lives in.
            </p>
          </div>

          <DoodleText className="about-blue-notes">
            I get excited by weird ideas.
            <br />
            I care about details.
            <br />
            I deliver what’s needed.
          </DoodleText>

          <section className="tools-card" aria-labelledby="tools-title">
            <h2 id="tools-title">Tools & Weapons</h2>
            <DrawnLine />
            <ul>
              <li>
                <span>→ Logic Pro X</span>
                <ToolIcon type="logic" />
              </li>
              <li>
                <span>→ AI</span>
                <ToolIcon type="ai" />
              </li>
              <li>
                <span>→ Curiosity :P</span>
                <ToolIcon type="smile" />
              </li>
            </ul>
          </section>
        </div>

        <div className="about-photo-column">
          <motion.figure
            className="about-feature-polaroid"
            initial={{ opacity: 0, y: 16, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0.8 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="about-photo-tape" />
            <img src={assetPath("/images/about/about_me.jpeg")} alt="Sydney Tseng at a piano" />
            <figcaption>
              Making noise
              <br />
              since forever <span>⌣</span>
            </figcaption>
          </motion.figure>

          <section className="work-tags" aria-labelledby="work-tags-title">
            <h2 id="work-tags-title">I Work On</h2>
            <DrawnLine />
            <div>
              <span>Game Audio</span>
              <span>UI / UX Sound</span>
              <span>Sound System</span>
              <span>Voice & Narrative</span>
              <span>Music & Sound Design</span>
            </div>
            <DoodleText>Always down for something new.</DoodleText>
          </section>
        </div>

        <aside className="about-side">
          <DoodleText className="about-side-note">
            I design sound
            <br />
            that makes pixels
            <br />
            feel alive.
          </DoodleText>

          <section className="approach-section" aria-labelledby="approach-title">
            <h2 id="approach-title">My Approach</h2>
            <DrawnLine />
            <div className="approach-list">
              {approachItems.map((item) => (
                <article className="approach-item" key={item.title}>
                  <AboutApproachIcon type={item.icon} />
                  <ArrowRight className="approach-arrow" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <CurrentlyNote />
        </aside>
      </section>

      <ContactSection variant="about" />
    </main>
  );
}

function WorkModal({ work, onClose }) {
  return (
    <AnimatePresence>
      {work && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="work-modal"
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="close-button" onClick={onClose} aria-label="Close video">
              <X />
            </button>
            <video src={work.video} controls autoPlay playsInline poster={work.image} />
            <div>
              <DoodleText>{work.title}</DoodleText>
              <p>
                {work.category} / {work.role}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HomePage() {
  const [activeWork, setActiveWork] = useState(null);
  const { playingId, toggle, stop } = useAudioEngine();

  return (
    <>
      <Hero />
      <main>
        <SelectedWorks onOpen={setActiveWork} onPlayAudio={toggle} playingId={playingId} />
        <SoundLab onPlayAudio={toggle} playingId={playingId} />
        <CurrentlyNote className="home-currently-note" />
      </main>
      <Footer />
      <WorkModal
        work={activeWork}
        onClose={() => {
          setActiveWork(null);
          stop();
        }}
      />
    </>
  );
}

function getRoute() {
  const basePath = new URL(import.meta.env.BASE_URL, window.location.origin).pathname;
  let path = window.location.pathname;

  if (path.startsWith(basePath)) {
    path = path.slice(basePath.length);
  }

  return `/${path.replace(/^\/+/, "")}`;
}

export default function App() {
  return getRoute() === "/about" ? <AboutPage /> : <HomePage />;
}
