import { motion } from "framer-motion"; // Import motion from Framer Motion library

import { styles } from "../styles"; // Import styles object from "../styles"
import { staggerContainer } from "../utils/motion"; // Import staggerContainer function from "../utils/motion"

// Higher Order Component (HOC) that wraps a component with motion animation
const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()} // Apply staggered animation to children
        initial='hidden' // Set initial animation state to hidden
        whileInView='show' // Trigger animation when component is in view
        viewport={{ once: true, amount: 0.25 }} // Viewport settings for animation
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`} // Apply Tailwind CSS classes for padding and layout
      >
        <span className='hash-span' id={idName}>
          &nbsp; {/* Hash span for smooth scrolling offsets */}
        </span>

        <Component /> {/* Render the wrapped component */}
      </motion.section>
    );
  };

export default StarWrapper; // Export the StarWrapper HOC

