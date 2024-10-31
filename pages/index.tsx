import React, { useState } from "react";
import Head from "next/head";
import { cubicBezier, motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import ReactGa from "react-ga";

interface indexProps {}

const projects = [
  {
    techStack: "HTML, SCSS, JAVASCRIPT, GSAP",
    version: "Version 1",
    sourceCode: "https://github.com/adeolaadeoti/adeolaadeoti-portfolio-1",
    images: [
      { src: "webp/image1-1.webp", alt: "Image 1 for project 1" },
      { src: "webp/image1-2.webp", alt: "Image 2 for project 1" },
    ],
  },
  {
    techStack: "HTML, SCSS, JAVASCRIPT, GSAP",
    version: "Version 2",
    sourceCode: "https://github.com/adeolaadeoti/adeolaadeoti-portfolio-2",
    dribbleLink: "https://dribbble.com/shots/12338926-Adeola-Adeoti-Portfolio-2",
    images: [
      { src: "webp/image2-1.webp", alt: "Image 1 for project 2" },
      { src: "webp/image2-2.webp", alt: "Image 2 for project 2" },
    ],
  },
  // Add more project objects for each project
  // ...
  {
    techStack: "HTML, SCSS, JAVASCRIPT, GSAP",
    version: "Version 20",
    sourceCode: "https://github.com/adeolaadeoti/adeolaadeoti-portfolio-20",
    dribbleLink: "https://dribbble.com/shots/12338926-Adeola-Adeoti-Portfolio-20",
    images: [
      { src: "webp/image20-1.webp", alt: "Image 1 for project 20" },
      { src: "webp/image20-2.webp", alt: "Image 2 for project 20" },
    ],
  },
];

const locomotiveScroll =
  typeof window !== `undefined` ? require("locomotive-scroll").default : null;

const hoverEffect =
  typeof window !== `undefined` ? require("hover-effect").default : null;

const transition: { duration: number; ease: any } = {
  duration: 1.4,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
  // ease: [0.6, 0.01, -0.05, 0.9],
};

const index: React.FC<indexProps> = () => {
  const [speakerState, setSpeakerState] = useState("muted");
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const refScroll = React.useRef(null);
  let lscroll: any;

  React.useEffect(() => {
    ReactGa.initialize("UA-177100391-3");
    ReactGa.pageview(window.location.pathname + window.location.search);

    if (!refScroll.current) return;
    // @ts-ignore
    lscroll = new locomotiveScroll({
      el: refScroll.current,
      smooth: true,
      reloadOnContextChange: true,
      multiplier: 0.75,
      inertia: 0.5,
    });

    // update locomotive scroll
    window.addEventListener("load", () => {
      let image = document.querySelector("img");
      // @ts-ignore
      const isLoaded = image!.complete && image!.naturalHeight !== 0;
      lscroll.update();
    });

    // image hover effect
    Array.from(document.querySelectorAll(".project-card__middle")).forEach(
      (el: any) => {
        const imgs: any = Array.from(el.querySelectorAll("img"));
        new hoverEffect({
          parent: el,
          intensity: 0.2,
          speedIn: el.dataset.speedin || undefined,
          speedOut: el.dataset.speedout || undefined,
          easing: el.dataset.easing || undefined,
          hover: el.dataset.hover || undefined,
          image1: imgs[0].getAttribute("src"),
          image2: imgs[1].getAttribute("src"),
          displacementImage: el.dataset.displacement,
        });
      }
    );

    // header cursor
    const cursor = document.querySelector(".cursor");
    window.onmousemove = (e: any) => {
      cursor!.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px;`);
    };

    console.clear();
    console.log.apply(console, [
      "%c Designed and Developed by Adeola Adeoti %c %c🚀 %c\n",
      "color: #fff; background: #8000ff; padding:5px 0;",
      "color: #fff; background: #242424; padding:5px 0 5px 5px;",
      "background: #242424; padding:5px 0",
      "background: #242424; padding:5px 5px 5px 0",
    ]);
    console.log.apply(console, [
      "%c Thanks for stopping by, I’m currently looking to a new team of creative designers and developers.\n",
      "color: #fff; background: #8000ff; padding:5px 0;",
    ]);
  }, []);

  const handleSpeaker = () => {
    const audio = document.querySelector("#audioPlayer") as HTMLVideoElement;

    if (speakerState === "muted") {
      setSpeakerState("unmuted");
      audio.pause();
    } else {
      setSpeakerState("muted");
      audio.play();
    }
  };

  function toggleBodyScroll(isToggleOpen: boolean) {
    if (isToggleOpen === false) {
      setIsToggleOpen(true);
    } else if (isToggleOpen === true) {
      setIsToggleOpen(false);
    }
  }

  return (
    <>
      <div id="menu-target" data-scroll-container ref={refScroll}>
        <Head>
          <link rel="icon" href="svg/favicon.svg" />
          <link href="https://adeolaadeoti.xyz/" rel="canonical" />
          <meta name="theme-color" content="#10101A" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#10101A"
          />
          <title>Adeola Adeoti 🚀 &mdash; Frontend Devloper</title>
          <meta
            name="description"
            content="I'm a self-taught Front End Developer and turning ideas into real life products is my calling."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Adeola Adeoti 🚀 &mdash; Frontend Devloper"
          />
          <meta property="og:url" content="https://adeolaadeoti.xyz/" />
          <meta property="og:image" content="webp/preview-image.png" />
          <meta
            property="og:description"
            content="I'm a self-taught Front End Developer and turning ideas into real life products is my calling."
          />
          <meta
            name="twitter:title"
            content="Adeola Adeoti 🚀 &mdash; Frontend Devloper"
          />
          <meta
            name="twitter:description"
            content="I'm a self-taught Front End Developer and turning ideas into real life products is my calling."
          />
          <meta name="twitter:image" content="webp/preview-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <audio loop id="audioPlayer" autoPlay style={{ display: "none" }}>
          <source src="sound/preloader1.mp3" type="audio/mp3" />
        </audio>
        <motion.div
          data-scroll
          data-scroll-sticky
          data-scroll-target="#menu-target"
          animate={{ top: "-100vh", transition: { ...transition, delay: 9 } }}
          className="preloader"
        >
          <div className="preloader__wrapper">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__left"
            >
            <img src="svg\J7_ggEP5R_-NJZNp0bhl9g.png" alt="HAPPY BIRTHDAY" style={{ width: '50px', height: 'auto' }} />
</motion.div>
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__right"
            >
              <p className="preloader__text">JIYU</p>
              <p className="preloader__text">BHIKHARI</p>
              <p className="preloader__text">RAT</p>
              <p className="preloader__text">BARBIE</p>
              <p className="preloader__text">TOTA SINGH</p>
              <p className="preloader__text">JOHNNY</p>
              <p className="preloader__text">FRAMER MOTION</p>
            </motion.div>
          </div>
        </motion.div>
        <div className="cursor"></div>
        <Navigation
          isOpen={isToggleOpen}
          toggleOpen={() => toggleBodyScroll(isToggleOpen)}
        />
        <div className="header-wrapper">
          <header className="header">
            <div className="header__hero">
              <div className="header__hero--heading">
                <span>turning ideas into </span> <br />
                <span>real life </span>
                <span className="header__hero--heading-gradient">
                  products{" "}
                </span>
                <br />
                <span>is my calling.</span>
              </div>
              <a
                data-scroll-to
                className="header__hero--cta"
                href="#sectionProjects"
              >
                VIEW PROJECTS
              </a>
            </div>
          </header>
          <div className="header__footer">
            <div className="header__footer--left">
              <div className="speaker">
                <div
                  onClick={handleSpeaker}
                  className={`${"speaker__toggle"} ${
                    speakerState === "unmuted"
                      ? `${"speaker__toggle--anim"}`
                      : ``
                  }`}
                >
                  &nbsp;
                </div>
                <div className="speaker__muted">
                  <img src="svg/muted.svg" alt="muted icon" />
                </div>
                <div className="speaker__unmuted">
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 15 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.599976"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect1-anim"
                    />
                    <rect
                      x="9"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect2-anim"
                    />
                    <rect
                      x="4.79999"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect3-anim"
                    />
                    {/* <rect
                      x="13.2"
                      y="1.06665"
                      width="1.4"
                      height="10"
                      fill="#F2F2F2"
                      className="rect4-anim"
                    /> */}
                  </svg>
                </div>
              </div>
            </div>
            <div className="header__footer--right">
              <a
                href="https://github.com/adeolaadeoti"
                rel="noopener"
                target="_blank"
              >
                👾 GH
              </a>
              <a
                href="https://twitter.com/adeolajs"
                rel="noopener"
                target="_blank"
              >
                🐦 TW
              </a>
              <a
                href="https://www.linkedin.com/in/adeoladev"
                rel="noopener"
                target="_blank"
              >
                💼 LD
              </a>
              <a
                href="https://www.instagram.com/adeolaadeoti_"
                rel="noopener"
                target="_blank"
              >
                {" "}
                📸 IN
              </a>
            </div>
          </div>
        </div>
        <main className="container">
          <p className="about-text">
            happy jiya day, jiyu!!!!!!           </p>
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span>happy 20th! </span> <small>💼</small>
            </h1>
            <p className="paragraph">
              scroll
            </p>

            {projects.map((project, index) => (
    <div className="project-card" key={index}>
      <div className="project-card__left">
        <h4 className="heading-4">{project.techStack}</h4>
      </div>
      <div className="project-card__middle" data-displacement={`webp/myDistorsionImage-${index + 1}.webp`}>
        {project.images.map((image, imgIndex) => (
          <img key={imgIndex} src={image.src} alt={image.alt} />
        ))}
      </div>
      <div className="project-card__right">
        <h2 className="heading-2">
          AdeolaAdeoti
          <br /> {project.version}
        </h2>
        <a
          rel="noopener"
          target="_blank"
          href={project.sourceCode}
          className="project-card__link"
        >
          VIEW SOURCE CODE
        </a>
        <div className="project-card__socials">
          <a
            rel="noopener"
            target="_blank"
            href={project.dribbleLink}
          >
            <img src="svg/dribble.svg" alt="Dribbble icon" />
          </a>
          <a
            rel="noopener"
            target="_blank"
            href={project.sourceCode}
          >
            <img src="svg/github.svg" alt="GitHub icon" />
          </a>
        </div>
      </div>
    </div>
  ))}
</section>
          <section className="section-contact">
            <h1 className="heading-1">
              <span>LOVE YOU </span>
            </h1>
          </section>
        </main>
        <footer className="footer">
        </footer>
      </div>
    </>
  );
};

export default index;
