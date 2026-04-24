import React, { useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { Howl } from "howler";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Instagram,
  Mail,
  MapPin,
  Pause,
  Play,
  Power,
  Sparkle,
  Star,
  Waves,
  X,
} from "lucide-react";
import { soundLabCategories, works } from "./data/siteData.js";

const blue = "#0757ff";

function DoodleText({ children, className = "" }) {
  return <span className={`doodle-text ${className}`}>{children}</span>;
}

function DrawnLine({ className = "", delay = 0 }) {
  return (
    <motion.svg
      className={`drawn-line ${className}`}
      viewBox="0 0 220 28"
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

function Waveform({ active = false }) {
  return (
    <span className={`waveform ${active ? "is-active" : ""}`} aria-hidden="true">
      {Array.from({ length: 16 }).map((_, index) => (
        <i key={index} style={{ "--i": index }} />
      ))}
    </span>
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
  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Sydney Tseng home">
        Sydney Tseng
      </a>
      <nav aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#sound-lab">Sound Lab</a>
        <a href="#contact">Contact</a>
      </nav>
      <Sparkle className="header-spark" aria-hidden="true" />
    </header>
  );
}

function Hero({ onSignaturePlay, signaturePlaying }) {
  return (
    <section className="hero" id="top">
      <Header />
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
        src="/images/hero/main.png"
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
      <DoodleCircle className="signature" onClick={onSignaturePlay}>
        Signature
        <br />
        Sound
        <Waveform active={signaturePlaying} />
      </DoodleCircle>
    </section>
  );
}

function WorkCard({ work, onOpen }) {
  return (
    <article className="work-card">
      <img src={work.image} alt={`${work.title} project cover`} />
      <div className="work-scrim" />
      <DoodleText className="work-title">{work.title}</DoodleText>
      <button className="play-button" onClick={() => onOpen(work)} aria-label={`Play ${work.title}`}>
        <Play size={28} fill="currentColor" />
      </button>
      <div className="work-meta">
        <span>{work.category}</span>
        <span>{work.role}</span>
      </div>
    </article>
  );
}

function SelectedWorks({ onOpen }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });

  return (
    <section className="dark-section works-section" id="work">
      <div className="section-title-row">
        <h2>Selected Works</h2>
        <Sparkle className="blue-star" aria-hidden="true" />
        <DoodleText className="tap-note">Tap to play</DoodleText>
      </div>
      <div className="carousel-wrap">
        <button className="carousel-btn prev" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous work">
          <ArrowLeft />
        </button>
        <div className="embla" ref={emblaRef}>
          <div className="embla-container">
            {works.map((work) => (
              <div className="embla-slide" key={work.id}>
                <WorkCard work={work} onOpen={onOpen} />
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-btn next" onClick={() => emblaApi?.scrollNext()} aria-label="Next work">
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}

function SoundIcon({ type }) {
  if (type === "power") return <Power />;
  if (type === "star") return <Star />;
  return <Waves />;
}

function SoundLab({ playingId, onToggle }) {
  const [activeCategory, setActiveCategory] = useState(soundLabCategories[0].id);
  const category = useMemo(
    () => soundLabCategories.find((item) => item.id === activeCategory),
    [activeCategory],
  );

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
              className={`sound-card ${activeCategory === item.id ? "active" : ""}`}
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
            >
              <SoundIcon type={item.icon} />
              <strong>{item.title}</strong>
              <span>{item.description}</span>
              <Waveform active={activeCategory === item.id} />
              <ArrowRight className="card-arrow" />
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="sample-panel"
            key={category.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {category.samples.map((sample) => (
              <button
                className={`sample-row ${playingId === sample.id ? "playing" : ""}`}
                key={sample.id}
                onClick={() => onToggle(sample)}
              >
                {playingId === sample.id ? <Pause /> : <Play />}
                <span>
                  <strong>{sample.title}</strong>
                  <small>{sample.subtitle}</small>
                </span>
                <Waveform active={playingId === sample.id} />
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
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
        <a className="outline-button" href="#contact">More about me</a>
      </div>
      <motion.figure
        className="polaroid"
        whileHover={{ rotate: -1.5, y: -4 }}
        transition={{ type: "spring", stiffness: 220, damping: 17 }}
      >
        <span className="tape" />
        <img src="/images/about/side.jpeg" alt="Sydney in a recording studio" />
        <figcaption>:-)</figcaption>
      </motion.figure>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <DoodleText className="footer-note">Let&apos;s make some noise!</DoodleText>
      <address>
        <a href="mailto:sydneytseng.sound@gmail.com">
          <Mail /> sydneytseng.sound@gmail.com
        </a>
        <a href="https://instagram.com/sydneytseng.sound" target="_blank" rel="noreferrer">
          <Instagram /> @sydneytseng.sound
        </a>
        <span>
          <MapPin /> Taipei, Taiwan
        </span>
      </address>
      <div className="globe-doodle" aria-hidden="true">
        <span>☺</span>
      </div>
      <DoodleText className="thanks-note">Thanks for visiting!</DoodleText>
    </footer>
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

export default function App() {
  const [activeWork, setActiveWork] = useState(null);
  const signatureSample = soundLabCategories[0].samples[0];
  const { playingId, toggle, stop } = useAudioEngine();

  return (
    <>
      <Hero
        onSignaturePlay={() => toggle({ ...signatureSample, id: "signature-sound" })}
        signaturePlaying={playingId === "signature-sound"}
      />
      <main>
        <SelectedWorks onOpen={setActiveWork} />
        <SoundLab playingId={playingId} onToggle={toggle} />
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
