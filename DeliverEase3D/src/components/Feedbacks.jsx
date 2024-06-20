import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";



const Feedbacks = () => {
  return (
    <div className={`mt-18 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px] flex flex-col justify-center items-center`}
      >
        <motion.div variants={textVariant()} className="text-center">
          <p className={styles.sectionSubText}>Access the App here!</p>
          <h2 className={styles.sectionHeadText}>DeliverEase.</h2>
          <motion.p
            variants={textVariant()}
            className='text-white tracking-wider text-[18px] mt-4 max-w-md'
          >
            Our application is designed to streamline your delivery process.
          </motion.p>
          <div className="mt-4 flex justify-center items-center"> {/* Adjusted alignment for the button */}
            <Link to="http://127.0.0.1:8080">
              <motion.button
                variants={textVariant()}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg text-xl font-bold hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                View App
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
