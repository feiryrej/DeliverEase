import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>About Us.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        DeliverEase is an innovative prototype routing system designed to streamline route planning for delivery riders. This system optimizes delivery routes to save time, 
        reduce fuel consumption, and enhance efficiency, making the delivery process smoother and more reliable.
      </motion.p>
    </>
  );
};

export default SectionWrapper(About, "about");
