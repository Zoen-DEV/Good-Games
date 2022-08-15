import React from "react";
import linkedin from "../images/linkedin.png";
import github from "../images/github.png";

const About = () => {
  return (
    <div className="about">
      <h1>Good Games App</h1>
      <p>
        Esta aplicacion fue hecha por Enzo Gabriel Holgado, como proyecto
        individual para el bootcamp de desarrollo fullstack de Henry. Este
        proyecto fue desarrollado con React.js, Redux, Scss y Axios para el
        frontend; Node.js y Express para el backend; y la base de datos con
        postgreSQL y Sequelize.
      </p>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/enzo-gabriel-holgado/" target="_blank" rel="noreferrer">
            <img className="li" src={linkedin} alt="linkedin link" />
          </a>
        </li>
        <li>
          <a className="portfolio" target="_blank" href="https://enzoholgado.vercel.app/" rel="noreferrer">
            <h3>PORTFOLIO</h3>
          </a>
        </li>
        <li>
          <a href="https://github.com/Zoen-DEV/" target="_blank" rel="noreferrer">
            <img className="gh" src={github} alt="github link" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default About;
