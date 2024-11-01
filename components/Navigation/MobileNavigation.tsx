import * as React from "react";
import { cubicBezier, motion } from "framer-motion";

const openTransition = {
  duration: 1.1,
  delay: 1.2,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
};

const openTopTransition = {
  duration: 1.1,
  delay: 1.3,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
};


const closedTansition = {
  duration: 1,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
};

export const MobileNavigation = ({ variants, isOpen }: any) => (
  <motion.div
    data-scroll
    data-scroll-sticky
    data-scroll-target="#menu-target"
    variants={variants}
    className="menu-wrapper"
  >
    <motion.div
      animate={
        isOpen
          ? { opacity: 1, transition: openTransition }
          : { opacity: 0, transition: closedTansition }
      }
    >
      <motion.div
        animate={
          isOpen
            ? { opacity: 1, transition: openTopTransition }
            : { opacity: 0, transition: closedTansition }
        }
        className="navigation-top"
      >
<div className="navigation-top__left">
  <h4 className="navigation-h4">most you song, acc to diya</h4>
  <a
    href="https://open.spotify.com/track/19CSr8rwW05VJL2F91KFNK"
    target="_blank"
  >
    guess. <br /> <h6>  i literally googled and clicked on the link. <br /> that's how
    much i love you </h6>
  </a>
</div>
        <div className="navigation-top__right">
          <h4 className="navigation-h4">BEST OF: jiya</h4>
          <a
            href="https://www.instagram.com/billypopzine/"
            target="_blank"
          >
           billypopzine
          </a>
        </div>
      </motion.div>

    </motion.div>
  </motion.div>
);
