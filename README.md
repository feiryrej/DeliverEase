<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/feiryrej/DeliverEase">
    <img src="https://github.com/feiryrej/DeliverEase/assets/116869096/00dcb64d-eefc-422a-994d-f5d487b0d654" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">DeliverEase</h1>
  <p align="center">
    Your Commuting Buddy
    <br />
    <a href="https://drive.google.com/file/d/1E3R_EzwUSOkM1mru39Y1aff4z2n17pVw/view?usp=drive_link"><strong>Explore the paper »</strong></a>
    <br />
    <br />
    <a href="#demo">View Demo</a>
    ·
    <a href="https://github.com/feiryrej/DeliverEase/issues">Report Bug</a>
    ·
    <a href="https://github.com/feiryrej/DeliverEase/issues">Request Feature</a>
  </p>
</div>

## Demo
https://github.com/feiryrej/DeliverEase/assets/116869096/de02f5b0-48b5-45bb-b08e-1bc9549a63ed

<!-- ABOUT THE PROJECT -->
## About The Project

DeliverEase is an innovative prototype routing system designed to streamline route planning for delivery riders. This system optimizes delivery routes to save time, reduce fuel consumption, and enhance efficiency, making the delivery process smoother and more reliable.

<!-- TABLE OF CONTENTS -->
### Table Of Contents
<ol>
  <li>
    <a href="#about-the-project">About The Project</a>
    <ul>
      <li><a href="#table-of-contents">Table Of Contents</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#technologies-used">Technologies Used</a></li>
    </ul>
  </li>
  <li>
    <a href="#application-snapshots">Application Snapshots</a>
  </li>
  <li>
    <a href="#installation">Installation</a>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
    </ul>
  </li>
  <li>
    <a href="#run">Run</a>
  </li>
  <li>
    <a href="#contributors">Contributors</a>
  </li>
  <li>
    <a href="#license">License</a>
  </li>
</ol> 

### Features
- Landing page with user input
- Interactive 3D landing page with a "View App" button
- User-friendly routing page with input fields and dynamic route display
- Map page showcasing delivery addresses
- Comprehensive delivery management with add, delete, optimize, and reset functions
- Satellite view for enhanced map visualization
- Efficient routing system powered by the A* algorithm
- Automatic map panning and zoom in/out functionality

### Technologies

DeliverEase utilizes a variety of technologies to ensure smooth and efficient operation:

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapidly building custom designs.
- **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**: The programming language used for client-side scripting.
- **[API Integration](https://en.wikipedia.org/wiki/API)**: Used for connecting to various external services.
- **[Three.js](https://threejs.org/)**: A JavaScript library used to create and display animated 3D graphics.
- **[Framer Motion](https://www.framer.com/motion/)**: A library for creating animations in React.
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)**: A React renderer for Three.js.

<!-- APPLICATION SNAPSHOTS -->
## Application Snapshots

### Landing Page
![Landing Page](https://github.com/feiryrej/DeliverEase/assets/116869096/1728604f-aa4a-4f62-9237-7597dc7676ee)

### Maps Page
![Maps Page1](https://github.com/feiryrej/DeliverEase/assets/116869096/8309091c-af40-403f-91f2-f6b45db88907)
![Maps Page2](https://github.com/feiryrej/DeliverEase/assets/116869096/f81469cc-1f5e-4a12-aeb4-9c2d7e3238cb)
![Maps Page3](https://github.com/feiryrej/DeliverEase/assets/116869096/3c688331-8c02-4812-bf5a-d863e02afcf6)
![Maps Page4](https://github.com/feiryrej/DeliverEase/assets/116869096/779a72e0-ee23-464a-adcf-c3b5593de66d)
![Maps Page5](https://github.com/feiryrej/DeliverEase/assets/116869096/a6b080d0-4be3-4565-91b5-24b02b33ac3e)


<!-- INSTALLATION -->
### Getting Started

DeliverEase is not yet accessible to the World Wide Web, as it is yet to be deployed. However, if you're interested in seeing the UI and experiencing the website yourself, you are in the right section of the README. To get started with accessing the source code, follow the steps below.

#### Prerequisites
Ensure that [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) are installed on your machine.

#### Installation
You can fork this repository, or you can also clone this repository directly on your local machine:

```bash
git clone https://github.com/your-username/deliverease.git
```
After cloning the repository on your local machine, access it on any IDE.

After opening the project, you should see all the files listed in the folder structure, but without the .env file for the server-side code.

Install dependencies using:

```bash
npm install
```

Create a .env file in the server folder and configure it as needed.

Configure the database connection in server/config/db.js as per your environment.

Run the server on /server:

```bash
node server.js
```
<!-- RUN -->
## Run

To run DeliverEase, open your terminal and execute the following command:

```bash
npm run dev
``` 

<!-- Contributor's Table -->
  <h3>Contributor's Table</h3>
  <table style="width: 100%; text-align: center;">
    <thead>
      <tr>
        <th>Name</th>
        <th>Avatar</th>
        <th>GitHub</th>
        <th>Contributions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Regina Bonifacio</td>
        <td><img src="https://avatars.githubusercontent.com/u/116869096?v=4" alt="" style="border-radius: 50%; width: 50px;"></td>
        <td><a href="https://github.com/feiryrej">Feiryrej</a></td>
        <td>Frontend Developer, User Interface Design, Map styling</td>
      </tr>
      <tr>
        <td>Kyla Morcillos</td>
        <td><img src="https://avatars.githubusercontent.com/u/117506093?v=4" alt="" style="border-radius: 50%; width: 50px;"></td>
        <td><a href="https://github.com/akzechkyla">Akzechkyla</a></td>
        <td>Lead Developer, Implemented A* Algorithm</td>
      </tr>
      <tr>
        <td>Franz De Villa</td>
        <td><img src="https://avatars.githubusercontent.com/u/142954849?v=4" alt="" style="border-radius: 50%; width: 50px;"></td>
        <td><a href="https://github.com/dotBisch">DotBisch</a></td>
        <td>Server-side Developer, Fetched deliveries data</td>
      </tr>
    </tbody>
  </table>
</section>


## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License. See [LICENSE](LICENSE) for more information.

<p align="right">[<a href="#readme-top">Back to top</a>]</p>
