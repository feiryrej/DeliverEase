import { BrowserRouter } from "react-router-dom";
import { About, Feedbacks, Hero, Navbar, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        {/* Hero section with background image */}
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar /> {/* Navigation bar */}
          <Hero /> {/* Hero section */}
        </div>
        <About /> {/* About section */}
        <Feedbacks /> {/* Feedbacks section */}
        <StarsCanvas /> {/* Stars canvas background */}
        <div className='relative z-0'></div> {/* Placeholder for future content */}
      </div>
    </BrowserRouter>
  );
}

export default App;
