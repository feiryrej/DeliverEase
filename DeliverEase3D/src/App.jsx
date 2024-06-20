import { BrowserRouter } from "react-router-dom";

import { About, Feedbacks, Hero, Navbar, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Feedbacks />
        <StarsCanvas />
        <div className='relative z-0'>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
