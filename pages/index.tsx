import React, { useState } from "react";
import Head from "next/head";
import { cubicBezier, motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import ReactGa from "react-ga";

interface indexProps {}

const locomotiveScroll =
  typeof window !== `undefined` ? require("locomotive-scroll").default : null;

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
          <link rel="icon" href="svg/cursor.svg" />
          <meta name="theme-color" content="#10101A" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#10101A"
          />
          <title>HAPPY birthday jiyu</title>
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
                <span>you </span>
                  <span className="header__hero--heading-gradient">
                    <a href="https://www.instagram.com/p/C-Hu-mXvTP4/?img_index=7">               
                         did{" "}
                    </a>
                </span>

                <span>turn </span>
                <span className="header__hero--heading-gradient">
                  twenty{" "}
                </span>
                <span>regardless.                  <br />
                and it is going to look so </span>
                <span className="header__hero--heading-gradient">
                  happy{" "}
                </span>
                <span>on you</span>

              </div>
              <a
                data-scroll-to
                className="header__hero--cta"
                href="#sectionProjects"
              >
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
          </div>
        </div>
        <main className="container">
          <section id="sectionProjects" className="section-projects">
          <h2 className="section-contact__h2">
              in case i cannot figure out how to make it work, i need you to know that the background music is supposed to be vienna
            </h2>


            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                7TH NOVEMBER, 2024
                </h4>
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="alexxandria-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> diya
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  diya's wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">7TH NOVEMBER, 2024</h4>
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="safarika-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> vanshika

                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                  <br></br>
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                7TH NOVEMBER, 2024                </h4>
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="heatrow-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> mummy
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">7TH NOVEMBER, 2024</h4>
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="adeola-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> papa
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                7TH NOVEMBER, 2024                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic1.jpeg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="alexxandria-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">7TH NOVEMBER, 2024</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic2.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="safarika-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                7TH NOVEMBER, 2024                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic3.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="heatrow-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">7TH NOVEMBER, 2024</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic4.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="adeola-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> wish
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                7TH NOVEMBER, 2024                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic5.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="alexxandria-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">7TH NOVEMBER, 2024</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic6.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="safarika-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                7TH NOVEMBER, 2024                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic7.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="heatrow-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">7TH NOVEMBER, 2024</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic8.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="adeola-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                7TH NOVEMBER, 2024                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic9.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="alexxandria-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> NAME
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  WISH
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">7TH NOVEMBER, 2024</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic10.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="safarika-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                7TH NOVEMBER, 2024                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic11.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="heatrow-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">7TH NOVEMBER, 2024</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic12.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="adeola-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                7TH NOVEMBER, 2024                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic13.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="alexxandria-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">7TH NOVEMBER, 2024</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic14.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="safarika-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                7TH NOVEMBER, 2024                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic15.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="heatrow-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">7TH NOVEMBER, 2024</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="svg/pic16.jpg" alt="GOOD MORNING JIYA NATION" />
                <img src="svg/switchscreen.jpg" alt="happy BIRTHDAY" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="adeola-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> name
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  wish
                </a>
              </div>
            </div>

          </section>
          <section className="section-contact">
            <h1 className="heading-1">
              <span>click on the menu!!!! </span>
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
