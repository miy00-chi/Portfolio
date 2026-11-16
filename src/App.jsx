import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CredentialsContent from "./CredentialsContent.jsx";
import ContactContent from "./ContactContent.jsx";
import ProjectsContent from "./ProjectsContent.jsx";

const iconPath = (name) => `/assets/icons/${name}.png`;

const sections = [
  {
    id: "projects",
    label: "projects",
    icon: "Folder-open",
    description: "My selected graphic design, web, and UI/UX projects will live here.",
  },
  {
    id: "credentials",
    label: "credentials",
    icon: "Award",
    description: "A little collection of my experience, education, and milestones.",
  },
  {
    id: "contact",
    label: "contact",
    icon: "Envelope-open",
    description: "For collaborations, questions, or a friendly hello.",
  },
  {
    id: "about",
    label: "about",
    icon: "Info-circle",
    description:
      "I'm Hazel, a graphic designer and web developer who enjoys turning thoughtful ideas into friendly digital experiences.",
  },
];

const socialLinks = [
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/hazel-mito-258a83380/" },
  { label: "Email", icon: "email", href: "mailto:hazelmito2029@gmail.com?subject=Portfolio%20inquiry" },
  { label: "GitHub", icon: "git", href: "https://github.com/miy00-chi" },
];

function SectionNavigation({ activeSection, onSelect }) {
  return (
    <nav className="section-navigation" aria-label="Portfolio sections">
      {sections.map((section) => (
        <button
          className="section-link transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chambray"
          type="button"
          key={section.id}
          aria-current={activeSection === section.id ? "page" : undefined}
          onClick={() => onSelect(section.id)}
        >
          <img src={iconPath(section.icon)} alt="" />
          <span>{section.label}</span>
        </button>
      ))}
    </nav>
  );
}

function HomeContent({ activeSection, onSelect }) {
  return (
    <div className="home-content">
      <h1>hello! i&apos;m hazel</h1>
      <p className="welcome-title">welcome to my portfolio</p>
      <p className="role-line">web developer & ui/ux</p>
      <SectionNavigation activeSection={activeSection} onSelect={onSelect} />
    </div>
  );
}

function AboutContent() {
  return (
    <div className="about-content" aria-live="polite">
      <div className="about-profile"> 
        <div className="about-avatar-frame">
          <img className="about-avatar" src="/assets/img/portraitwbg.png" alt="Hazel Mito portrait" />
        </div>

        <div className="about-summary">
          <h2>Hazel Mito</h2>
          <p>
            4th Year Student studying BSITWMA @ FEU TECH
            <br />
            would like to be something
          </p>
        </div>
      </div>

      <div className="about-bio">
        <p>
          hi! i&apos;m hazel, dreaming to be web developer and ui/ux designer. i...
        </p>
        <ul>
          <li>create wireframes.</li>
          <li>do front-end web development, and</li>
          <li>create custom avatars for avatars!</li>
        </ul>
        <p className="about-email-line">
          interested in working with me? send me an email at
          <a href="mailto:hazelmito2029@gmail.com"> hazelmito2029@gmail.com</a>
        </p>
      </div>

      <div className="about-subsection">
        <h3>EDUCATION</h3>
        <div className="about-detail">
          <span className="about-detail-accent" aria-hidden="true" />
          <p>
            Bachelor of Science in Information Technology Specializing in
            <br />
            Web &amp; Mobile Application
            <span className="about-detail-note">[expected graduation on 2027]</span>
          </p>
        </div>
      </div>

      <div className="about-subsection">
        <h3>OTHER INTERESTS</h3>
        <ul className="about-interest-list">
          <li>Illustrations</li>
          <li>Gaming</li>
          <li>Graphic Designs</li>
        </ul>
      </div>
    </div>
  );
}

function SectionContent({ section }) {
  if (section.id === "projects") return <ProjectsContent />;
  if (section.id === "credentials") return <CredentialsContent />;
  if (section.id === "contact") return <ContactContent />;
  if (section.id === "about") return <AboutContent />;

  return (
    <section className="section-content" aria-live="polite">
      <img className="section-icon" src={iconPath(section.icon)} alt="" />
      <h1>{section.label}</h1>
      <p>{section.description}</p>
    </section>
  );
}

function SectionWindow({ section, onClose }) {
  const windowRef = useRef(null);
  const closeButtonRef = useRef(null);
  const dragRef = useRef(null);
  const [position, setPosition] = useState(null);
  const windowLabel = section.id === "contact" ? "Contact Me" : section.id === "about" ? "About Me" : section.label;

  useLayoutEffect(() => {
    const bounds = windowRef.current.getBoundingClientRect();
    const maxLeft = Math.max(0, window.innerWidth - bounds.width);
    const maxTop = Math.max(0, window.innerHeight - bounds.height);
    const offsetX = Math.min(48, maxLeft / 2);
    const offsetY = Math.min(36, maxTop / 2);

    setPosition({
      left: Math.min(maxLeft, bounds.left + offsetX),
      top: Math.min(maxTop, bounds.top + offsetY),
    });
  }, []);

  const startDragging = (event) => {
    if (event.button !== 0 || event.target.closest("button")) return;

    const bounds = windowRef.current.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: bounds.left,
      top: bounds.top,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveWindow = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const bounds = windowRef.current.getBoundingClientRect();
    const maxLeft = Math.max(0, window.innerWidth - bounds.width);
    const maxTop = Math.max(0, window.innerHeight - bounds.height);
    setPosition({
      left: Math.min(maxLeft, Math.max(0, drag.left + event.clientX - drag.startX)),
      top: Math.min(maxTop, Math.max(0, drag.top + event.clientY - drag.startY)),
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    } else if (event.key === "Tab") {
      event.preventDefault();
      closeButtonRef.current?.focus();
    }
  };

  return (
    <div
      className="section-window-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={windowRef}
        className={`browser-window section-window${section.id === "credentials" ? " credentials-window" : ""}${section.id === "contact" ? " contact-window" : ""}${section.id === "about" ? " about-window" : ""}`}
        style={position ? { left: position.left, top: position.top, transform: "none" } : undefined}
        role="dialog"
        aria-modal="true"
        aria-labelledby="section-window-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <div
          className="section-window-bar"
          onPointerDown={startDragging}
          onPointerMove={moveWindow}
          onPointerUp={() => { dragRef.current = null; }}
          onPointerCancel={() => { dragRef.current = null; }}
        >
          <span
            className={`section-window-tab${section.id === "about" ? " about-window-tab" : ""}${section.id === "contact" ? " contact-window-tab" : ""}`}
            id="section-window-title"
          >
            {windowLabel}
          </span>
          <button
            ref={closeButtonRef}
            className="section-window-close focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chambray"
            type="button"
            aria-label={`Close ${section.label}`}
            onClick={onClose}
            autoFocus
          >
            [x]
          </button>
        </div>
        <div
          className={`section-window-content${section.id === "projects" ? " projects-window-content" : ""}${section.id === "credentials" ? " credentials-window-content" : ""}${section.id === "contact" ? " contact-window-content" : ""}${section.id === "about" ? " about-window-content" : ""}`}
        >
          <SectionContent section={section} />
        </div>
      </section>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMuted, setIsMuted] = useState(false);
  const clickSoundRef = useRef(null);
  const exitSoundRef = useRef(null);
  const keyboardSoundRef = useRef(null);
  const backgroundMusicRef = useRef(null);
  const activePage = sections.find((section) => section.id === activeSection);

  const startBackgroundMusic = (force = false) => {
    const music = backgroundMusicRef.current;
    if (!music || (!force && isMuted) || !music.paused) return;

    music.play().catch((error) => {
      if (error.name !== "NotAllowedError" && error.name !== "AbortError") {
        console.error("Unable to play the background music.", error);
      }
    });
  };

  useEffect(() => {
    const music = backgroundMusicRef.current;
    if (!music) return;

    music.volume = 0.35;
    music.play().catch((error) => {
      if (error.name !== "NotAllowedError" && error.name !== "AbortError") {
        console.error("Unable to play the background music.", error);
      }
    });
  }, []);

  const playSound = (soundRef, description) => {
    const sound = soundRef.current;
    if (!sound) return;

    [clickSoundRef, exitSoundRef, keyboardSoundRef]
      .filter((otherRef) => otherRef !== soundRef)
      .forEach((otherRef) => {
        const otherSound = otherRef.current;
        if (!otherSound) return;
        otherSound.pause();
        otherSound.currentTime = 0;
      });

    sound.muted = false;
    sound.currentTime = 0;
    sound.play().catch((error) => {
      if (error.name !== "AbortError") {
        console.error(`Unable to play the ${description} sound.`, error);
      }
    });
  };

  const playClickSound = () => playSound(clickSoundRef, "button click");
  const playKeyboardSound = () => playSound(keyboardSoundRef, "keyboard click");

  const closeSectionWindow = () => {
    if (!isMuted) playSound(exitSoundRef, "tab exit");
    setActiveSection("home");
  };

  const handleButtonClick = (event) => {
    if (isMuted || event.detail === 0 || !(event.target instanceof Element)) return;

    const button = event.target.closest("button");
    if (!button || button.matches(".music-button, .section-window-close")) return;
    playClickSound();
  };

  const handleKeyboardActivation = (event) => {
    startBackgroundMusic();
    if (isMuted || event.repeat || !(event.target instanceof Element)) return;

    const control = event.target.closest("button, a[href]");
    if (!control || control.matches(".music-button, .section-window-close")) return;
    if (event.key === "Enter" || (event.key === " " && control.tagName === "BUTTON")) {
      playKeyboardSound();
    }
  };

  const handleProjectHover = (event) => {
    if (isMuted || !(event.target instanceof Element)) return;

    const control = event.target.closest(".project-tag, .project-action-button");
    if (!control || (event.relatedTarget instanceof Node && control.contains(event.relatedTarget))) return;
    playKeyboardSound();
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    [clickSoundRef.current, exitSoundRef.current, keyboardSoundRef.current, backgroundMusicRef.current].forEach((sound) => {
      if (!sound) return;

      sound.muted = nextMuted;
      if (nextMuted && sound !== backgroundMusicRef.current) {
        sound.pause();
        sound.currentTime = 0;
      }
    });

    if (nextMuted) {
      backgroundMusicRef.current?.pause();
    } else {
      startBackgroundMusic(true);
      playClickSound();
    }
  };

  return (
    <main
      className="beach-scene relative min-h-screen overflow-hidden"
      onClickCapture={handleButtonClick}
      onKeyDownCapture={handleKeyboardActivation}
      onMouseOverCapture={handleProjectHover}
      onPointerDownCapture={startBackgroundMusic}
    >
      <audio
        ref={backgroundMusicRef}
        src="/assets/sounds/seaside-ambience.mp3"
        preload="auto"
        loop
        muted={isMuted}
        aria-hidden="true"
      />
      <audio
        ref={clickSoundRef}
        src="/assets/sounds/minecraft-click-menu.mp3"
        preload="auto"
        muted={isMuted}
        aria-hidden="true"
      />
      <audio
        ref={exitSoundRef}
        src="/assets/sounds/clicksoundeffect.mp3"
        preload="auto"
        muted={isMuted}
        aria-hidden="true"
      />
      <audio
        ref={keyboardSoundRef}
        src="/assets/sounds/creamy-keyboard-v7.mp3"
        preload="auto"
        muted={isMuted}
        aria-hidden="true"
      />
      <div className="ocean" aria-hidden="true">
        <svg className="ocean-wave ocean-wave--far" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0 72 C120 22 240 122 360 72 S600 22 720 72 S960 122 1080 72 S1320 22 1440 72 V320 H0 Z" />
        </svg>
        <svg className="ocean-wave ocean-wave--near" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0 92 C180 42 300 142 480 92 S780 42 960 92 S1260 142 1440 92 V320 H0 Z" />
        </svg>
      </div>

      <button
        className="music-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chambray"
        type="button"
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        aria-pressed={isMuted}
        title={isMuted ? "Unmute sound" : "Mute sound"}
        onClick={toggleMute}
      >
        <img src={iconPath(isMuted ? "Volume-off" : "Volume-up")} alt="" />
      </button>

      <div className="scene-content">
        <section className="browser-window" aria-label="Hazel's portfolio browser window">
          <div className="browser-bar">
            <button
              className="browser-tab"
              type="button"
              aria-label="Go to home"
              onClick={() => setActiveSection("home")}
            >
              home
            </button>
            <span className="new-tab" aria-hidden="true">
              <img src={iconPath("Plus")} alt="" />
            </span>
          </div>

          <div className="browser-page">
            <HomeContent activeSection={activeSection} onSelect={setActiveSection} />
          </div>
        </section>

        <nav className="social-links" aria-label="Social media">
          {socialLinks.map((social) => (
            <a
              className="social-link transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-chambray"
              href={social.href}
              key={social.label}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              title={social.label}
            >
              <img src={iconPath(social.icon)} alt="" />
            </a>
          ))}
        </nav>
      </div>
      {activePage && <SectionWindow section={activePage} onClose={closeSectionWindow} />}
    </main>
  );
}

export default App;
