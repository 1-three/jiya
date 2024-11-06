import React, { useState } from "react";
import Head from "next/head";
import { cubicBezier, motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import ReactGa from "react-ga";

interface indexProps {}

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
      "%c mwah %c\n",
      "color: #fff; background: #8000ff; padding:5px 0;",
      "color: #fff; background: #242424; padding:5px 0 5px 5px;",
      "background: #242424; padding:5px 0",
      "background: #242424; padding:5px 5px 5px 0",
    ]);
    console.log.apply(console, [
      "%c OVER !!!!!!\n",
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
                <h6><span>two </span>
                <span className="header__hero--heading-gradient">
                  cures {" "}
                </span>
                 <span>for birthday melancholia:
                  < br /> 
                1. </span> 
                <span className="header__hero--heading-gradient">
                  phone {" "}
                </span>
                <span> or </span>
                <span className="header__hero--heading-gradient">
                  write{" "}
                </span>
                <span>a letter</span>
                <br />
                <span>2. the easy way: </span>
                <span className="header__hero--heading-gradient">
                  repress{" "}
                </span>
                <span>till you feel better</span>
                </h6>
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
            NOTE(S):
          <br /> 1. open on laptop ONLY
            <br /> 2.  in case i cannot figure out how to make it work, i need you to know that the background music is supposed to be vienna
            <br /> 3. ok toggle the on/off button on the left and it <i>should</i> work. cheers!
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
                  <br /> mummy
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  My sunshine,
                  <br /> You turned 20. <br />
                  Kal ki baat lagti hai jab tumhe pehli baar dekha tha <br />
                  Wish you good health, success and everything you desire. <br />
                  Love you ढेर सारा <br />
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
                  <br /> papa jawa

                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
Jiyaya, <br />
You have turned 20 and we are all senti 😜 because everyday you go to college but then you are not in college. 
<br /> On this day of yours we wish and pray for you to fly high but always stay grounded. Live the way you want to and celebrate your day the way you wish to…!
<br /> Most importantly, go to college, stay in college and come back straight home because you are only 20, not 40 :) 
<br /> Very many happy budday 2 u
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
                  <br /> dadi
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
My dear granddaughter,
<br /> you have turned 20 but for me you are still a little kid. You are the first and dearest daughter and granddaughter of the Jawa family and we love you very much. 
<br /> I am proud of how smart and intelligent you have become but never stop learning. Be aware of your surroundings always. 
<br /> Meri taraf se dher saara pyaar. 
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
                  <br /> dadu
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
Happy birthday. God bless, be happy always. Dadu loves you very much. 
<br /> (man of very few words indeed. he did not say this but he wants his 20 साल का बच्चा to know she is his greatest treasure and wishes that she always continues to spend all his money on clothes and expensive pizza) 
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
                  data-scroll-class="alexxandria-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> saanu
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
happy birthday dear jiya didi (i call u that all the time btw not just when i want something)
<br /> i love u very much and u still look like a 17 yr old even though ur 20 now lol 
<br /> thank u for being older than me bcs that means i have access to all ur stuff and also you spend more money than i do so papa thinks i m a great child (i use whatever expensive stuff u buy 😹😹) (u let me get away w putting ur name 😹😹) (amateur 😹😹) 
<br /> all our inside jokes (water fanclub etc) , shared interests (taylor swift, books, fried chicken) and movie nights (notable ones include dps, julie and the phantoms rewatch no. 12 and notting hill) r very much treasured by me. 
<br /> pls continue feeding me great food and always being urself (minus the anger issues) 
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
                  data-scroll-class="safarika-anim"
                  className="heading-2"
                >
                  FROM:
                  <br /> the mota aashman
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
dear jiya didi, 
<br /> i believe u r a 
<br /> rodent and a chipmunk 
<br /> but you still help me with everything 
<br /> so i m wishing you a very splendid 20th birthday
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
                  <br /> anya
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
              happy birthday jiya didi ( although technically i don’t think ive called you that a single day in my life i thought it would be appropriate for right now)😉 i cannot believe you are 20 i still think of you as my age and probably forever will. thank you for all your advice and all the times you told me to get out of your room ifykyk. i am so sad we live so far away. and i love when we have visits. 
thank you for introducing me to taylor swift i will forever thank you for that. 🙏🙏 have the greatest birthday oldie💕
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
                  <br /> your fav cousin
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
dear jiya didi, you are one of the wisest and most pulchritudinous people i know. you always have a solution to my first world problems and inspire me to be a better person everyday. talking to you is like a breath of fresh air after dealing with all kinds of frustrations throughout the week. i hope 20 treats you well and success follows you everywhere you go. i also hope you do something crazy this year like finally get a bf but honestly even watching a horror movie will be a big accomplishment ;)                </a>
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
                <img src="svg/pic14.jpg" alt="GOOD MORNING JIYA NATION" />
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
                  <br /> devshree & john
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
D: happiest birthday jiyaaaa! 🥳🌟
<br /> I’m so grateful to diya for introducing me to you! 
<br /> such a cutuu you are! sending loads of love😙💗    
< br />  
<br /> J:                   Happy Birthday Jiya!!!!!🥳 
                  <br /> Enjoy your day with your family and friends❤️ 
                  <br /> May God bless you🫰🏼                
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
                  <br /> sarayu
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
Jiya jaae na jaae na jaae na ore piya re!! ❤️
<br /> Happiest Birthday Jiya!! 
<br /> Hope you’ve the bestest day ✨❤️ 
<br /> Keep serving those aesthetics🫶🏼🫶🏼                </a>
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
                  <br /> armaan
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
Hiiiii Jiya!!! 🍄 
<br /> (I've been told to say that—jus' kidding) 
<br /> I know you very little (ironic given that momo 
<br /> just won't shut up about you) but here's wishing 
<br /> you the HAPPIEST BIRTHDAY 🪻 Have a smacking day!!
<br /> (I'd love to chat sometime but I really don't 
<br />appreciate having my typos pointed out and pinned 🙈)
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
                  <br /> cutie patootie simar
                  <br /> TO:
                  <br /> cutie pattootiest jiya didi
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
Happy birthday jiya didi . Ur better than saanvi and ur very nice . U hv nice fashion sense and u hv nice hair . I like ur face it is nice and ur ghar is also nice also ur very smart I'm saanvis bestie and best friend whom she loves sabse jada but instead of loving her I love u because u deserve more love and Harvard (saanvi here, idk why she thinks u want to go to harvard. pls just go with it)                 </a>
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
                  <br /> ishrat
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  HAPPY BIRTHDAY JIYAA. 
                  <br /> u r so so cool, PRETTIEST scorpio out there
                  <br />please please 🙏  do more song covers
                  <br /> and i hope u get to have lots of fun and get those louis tickets
                  <br /> post many many pretty pictures bc i love to see them 
                  <br />and love love ur creative, incredible mind. ❤️❤️
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
                  <br /> tee
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
putting on my love tinted glasses 2 wish u a hbd jiya sorry I can’t come to your party someone’s floating through the room on a big balloon :/ i love ur multiple talents & ur styles & every time u pick up little things to rmr me by :’) i will need u to keep growing and advancing and thriving and becoming the gorjusest version of urself effective immediately. Love u forever have a good year                </a>
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
                  <br /> pournami
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  hihiiii jiyaaa happy birthdayyy 💜💜💜
<br /> i can’t believe we met almost 5 years ago that’s crazy
<br /> you’re genuinely one of the funnest and funniest and gorgeousest and most TALENTED person i have met omg and i’m so glad i had your support over the last few years, i swear i would not have gotten through boards and college without you
<br /> every single time i pass an acca exam i’m soooooooooooo excited to tell you just because your reaction is always the best 🥹🥹🥹🥹🥹
<br /> and omg your stories and posts? forever unmatched 
<br /> i’m so glad i was the first (official) customer of jiyazstudio; a badge i will wear forever with pride 😌😌😌
<br /> love you lots always,
<br /> your purple rat twin 🐀👩‍❤️‍💋‍👩👯‍♂
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
                <img src="svg/aditya.jpeg" alt="GOOD MORNING JIYA NATION" />
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
                  <br /> aditya
                </h2>

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
                <img src="svg/tanya.jpeg" alt="GOOD MORNING JIYA NATION" />
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
                  <br /> tanya
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  hello happy birthday to my favourite (and only)
                   <br /> crackhead rat girl in this life (I hope).
                   <br />On this highly terrifying day (20th) 
                   <br /> let me recount some integral moments in this friendship. 
                   <br /> One that comes to mind is when we went to buy a 
                   <br />  coach bag for Ambika’s mom(!?!) after bargaining 
                   <br />  for a ₹50 auto.
                   <br />   Another would be our beloved hike around Amar Colony 
                   <br />  when you wrote that tshirt that said Taylor swift 
                   <br />  is my wife and I’m never divorcing her 
                   <br />Or when we went to see Sunidhi in a nightsuit 
                   <br /> Or perhaps spending hours (minutes) cutting paper 
                   <br /> making a banner that says 19 and on fire  
                   <br /> Now a year later, the only thing I’d say is 
                   <br />  I’m so so grateful to fucking Lakshmibai 
                   <br />  I cannot comprehend what I would do without you. 
                   <br />  I love you happy birthday
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
                  hi babygurl, the 🍎 of my eye and my pop-culture encyclopaedia. age old lore - we met when we were 6 ... didn't like each other first ... sat together in class ... became best friends ... yada yada ... well, everyone and their (our) moms know this story - so thanking aunty for giving birth to you - bestest gift ever! 

<br /> i've seen 14 years worth of hobbies, celebrity love sicknesses, book marathons and series bingeing, and each week i still look forward to your sparkly eyes and giddy voice when tell me about your newest obsession 🤭 

<br />  you are the best hype girl, the best earring maker, the best dress designer, the best crocheter, the best gift-giver, the best swiftie and the best directioner. so hoping i make enough money to fund your 25k heart bag cos you deserve the fucking BEST !

<br />  from our silly little emails, our lunch break wala khamba and 9th grade event planning company, to our random ass sleepovers (trying to make you watch bollywood comedies is a mission i must fulfill 🙏🏼) the chandigarh trip that never happened 🤠, and the college life we get to share (we meet once every month), god bless the stars for sending you to me every single time. (tho i’m still mad about the year you turned taller than me, like aren’t you supposed to be my little chotu who can’t tell left from right???)

<br /> thank you for being a little extra dreamy, a little extra creative and a little extra fun. i wanted to make this a funny one, but damn girl, i might cry now. happiest birthday love ❤️ you are the sunshine that lights up my world ☀ lots of kissi to you 😚😚 love your big boobs 💋
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
                  <br /> diya
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  holyshit HAPPY BIRTHDAY JIYA BABYGIRL what da hell . ur the first of us to make it to 20 that's so so so scary and ur so brave for it😨 i love everything about u and this isn't an exaggeration or a generalization i mean it in a very #real way. meeting u twice was the highlight of my stupid baka life man i love you so much my love. everything that i know about love is everything that i've learnt from loving you. i wish i had the right words to tell u truly how much u mean to me but i guess the whole point of love is in showing, not telling. and so i wish u nothing but the absolute best in everything that you do, i hope i get 2 be a small part of ur life and witness it forever. you might be miles and miles and miles away but u are for real the closest 2 my heart always (so cringe but i mean it) can't believe ur hampster died so tragically i hope ur not missing him too much tonight babe😿 don't ever forget the fact that u are literally barbie. sometimes i feel like the heart cut-out dress because my heart is cut out and it is with u. ilu baby u are my sab kuch for real
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
                  <br /> neil
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  this is the 5th time i've started writing this because I either do not know what to say or it gets away from me and turns into a chronicle of all the ways you've affected my life. which is a very long list. from your chess earrings to the anatomically correct heart ones, from your hair that reflects different colors at the roots and ends, from your love for purple that permeates the screen into even <i>my</i> life to your inclination to crash your car, you're sort of perfect. my favorite thing ever is making you laugh and it also happens to be the easiest because you're a five (x4) year old who laughs at everything. im not even really jealous of olivia because does she get to talk to you all day, every day !!!!!!! no. i do !!!!!! thank you for making everything better by just <i>being</i>, even when you reply "huh" to three messages in a row. i would say you have brought glorious technicolor to my life (you have) but this is starting to feel like a love rosie-esque wedding speech so im pulling the breaks here. i love you more than i can put into coherent words so all i will say is i hope i get to update this website every 7th of november for the rest of my life
                </a>
              </div>
            </div>

          </section>
          <section className="section-contact">
            <h1 className="heading-1">
              <span>THE END !!!!!!! HAPPY 20TH BIRTHDAY</span>
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
