import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets"; // Importing various icons from the assets folder

// Navigation links for the application
export const navLinks = [
  {
    id: "about",
    title: "About", // Title of the About section in navigation
  },
  // Add more navigation links as needed
];

// Services offered section with icons
const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
  // Add more services with their respective icons
];

// Technologies section with names and icons
const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  // Add more technologies with their respective icons
];

// Experiences section detailing past work experiences
const experiences = [
  {
    title: "React.js Developer",
    company_name: "Starbucks",
    icon: starbucks,
    iconBg: "#383E56", // Background color for the icon
    date: "March 2020 - April 2021", // Duration of employment
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ], // Key achievements and responsibilities
  },
  // Add more experiences with similar structure
];

// Testimonials section with client feedback
const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee", // Client's name
    designation: "CFO", // Client's designation
    company: "Acme Co", // Client's company
    image: "https://randomuser.me/api/portraits/women/4.jpg", // URL to client's image
  },
  // Add more testimonials with similar structure
];

// Projects section showcasing past projects
const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient", // Tag color for technology used
      },
      // Add more tags for other technologies used
    ],
    image: carrent, // Image representing the project
    source_code_link: "https://github.com/", // Link to the project's source code
  },
  // Add more projects with similar structure
];

export { services, technologies, experiences, testimonials, projects };

