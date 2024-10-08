import React, { useState, useEffect, useRef } from "react";
import Typed from "typed.js";

import ProfilePic from "../images/myself.jpeg";
import UniLogo from "../images/kth.png";

import * as appStyles from "../styles/app.module.css";

const App = () => {
  const statusContent = useRef(null);

  // Typed effect
  useEffect(() => {
    const typed = new Typed(statusContent.current, {
      strings: ['B.Sc. Comp. Eng.', 'Full-stack Developer'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      showCursor: false
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const email = "tarik.bratic@gmx.com";
  const [buttonText, setButtonText] = useState("E-mail");

  const handleConnect = () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        setButtonText("Copied!");
        setTimeout(() => {
          setButtonText("E-mail");
        }, 2000);
      })
      .catch((err) => {
        console.err('Could not copy email: ', err);
      });

    console.log(email);
  }

  return (
    <>
      <header>
        <section id="home" className={appStyles.heroSection}>
          <section className={appStyles.content}>
            {/* Text window. My name and current status. */}
            <div className={appStyles.intro}>
              <span className={appStyles.greeting}>Hello, I'm Tarik</span>
              <span className={appStyles.status} ref={statusContent}></span>
            </div>
            {/* Buttons CV and E-mail */}
            <div className={appStyles.actions}>
              <a href="/resume.pdf" download={"resume.pdf"}>
                <button className={appStyles.button} type="button">Resume</button>
              </a>
              <button 
                className={appStyles.button} 
                type="button" 
                onClick={handleConnect}>
                  {buttonText}
              </button>
            </div>
          </section>
          {/* Img of myself and uni logo */}
          <div className={appStyles.images}>
            <img 
              className={appStyles.profileImage} 
              src={ProfilePic} 
              alt="Profile picture of Tarik" />
            <img 
              className={appStyles.universityLog} 
              src={UniLogo} 
              alt="University Logo" />
          </div>
        </section>
      </header>
      <main>
        <section className={appStyles.about}>
          <h2 className={appStyles.aboutTitle}>About Me</h2>
          <article className={appStyles.content}>
            <p>A student in computer engineering at KTH with a passion for everything related to IT. My engagement extends beyond the classroom; system development is my main hobby. My other interests include strength training, movies, cars, and spending time with my friends. As personal projects, I have coded on a Raspberry Pi, created interactive websites using JavaScript, and edited videos for YouTube. I am someone who is humble and eager to learn; as a cashier at Filmstaden, I have learned to be communicative and social; as a warehouse worker at Hydroscand, I have developed organizational skills and attention to detail; and as a retail employee, I have gained experience in customer service, inventory management, and efficient logistics.
            </p>
          </article>
          <aside className={appStyles.aside}>
            <ul className={appStyles.languages}>
              <h3>Languages</h3>
              <li>Swedish</li>
              <li className={appStyles.skillLvl}>fluent</li>
              <li>English</li>
              <li className={appStyles.skillLvl}>fluent</li>
              <li>Bosnian</li>
              <li className={appStyles.skillLvl}>native</li>
            </ul>
            <ul className={appStyles.attributes}>
              <h3>Attributes</h3>
              <li>Self-Learning</li>
              <li>Adaptability</li>
              <li>Creativity</li>
              <li>Team Player</li>
              <li>Attention to Detail</li>
            </ul>
            <ul className={appStyles.hobbies}>
              <h3>Hobbies</h3>
              <li>Gym</li>
              <li>Motorsport</li>
              <li>Football</li>
            </ul>
            <ul className={appStyles.socials}>
              <h3>Socials</h3>
              <li>LinkedIn</li>
              <li>Github</li>
              <li>Discord</li>
            </ul>
          </aside>
        </section>
        <section className={appStyles.career}>
          <section className={appStyles.experties}>
            <h2 className={appStyles.expertiesTitle}>Experties</h2>
            <ul className={appStyles.expertiesGrid}>
                <li className={appStyles.grids}
                    id={appStyles.htmlCss}>
                  <div className={appStyles.gridTitle}>HTML / CSS</div>
                  <code>
                    <span className={appStyles.Yellow}>{'<div'}</span>
                    <span className={appStyles.lightYellow}>{' class'}</span>
                    <span>{'='}</span>
                    <span className={appStyles.green}>{'"experties"'}</span>
                    <span className={appStyles.Yellow}>{'></div>'}</span>
                  </code>
                </li>
                <li className={appStyles.grids}
                    id={appStyles.html}>
                  <div className={appStyles.gridTitle}>HTML</div>
                  <code>
                    <span>{'<div'}</span>
                    <span>{' class'}</span>
                    <span>{'='}</span>
                    <span>{'"experties"'}</span>
                    <span>{'></div>'}</span>
                  </code>
                </li>
                <li className={appStyles.grids}
                    id={appStyles.css}>
                  <div className={appStyles.gridTitle}>CSS</div>
                  <code>
                    <span>div</span>
                  </code>
                </li>
                <li className={appStyles.grids}
                    id={appStyles.js}>
                  <div className={appStyles.gridTitle}>JavaScript</div>
                  <code>
                  <code>
                    <span>{'const experties[] '}</span>
                    <span>{'= '}</span>
                    <span>{'["HTML", "CSS", "JavaScript", ...others];'}</span>
                  </code>
                  </code>
                </li>
                <li className={appStyles.grids}
                    id={appStyles.node}>
                  <div className={appStyles.gridTitle}>Node.js</div>
                  <code>
                    <span>div</span>
                  </code>
                </li>
                <li className={appStyles.grids}
                    id={appStyles.react}>
                  <div className={appStyles.gridTitle}>React</div>
                  <code>
                    <span>div</span>
                  </code>
                </li>
                <li className={appStyles.grids}
                    id={appStyles.sql}>
                  <div className={appStyles.gridTitle}>MySQL</div>
                  <code>
                    <span>{'const Tarik'}</span>
                    <span>{' = '}</span>
                    <span>{'await '}</span>
                    <span>{'Experties'}</span>
                    <span>{'.'}</span>
                    <span>{'find()'}</span>
                  </code>
                </li>
              </ul>
            <section className={appStyles.otherExperties}>
              <h3 className={appStyles.otherTitel}>Other Experties</h3>
              <div className={appStyles.othersList}>
                <div className={appStyles.others}>
                  <span>React</span>
                </div>
                <div className={appStyles.others}>
                  <span>Node.js</span>
                </div>
                <div className={appStyles.others}>
                  <span>Bootstrap</span>
                </div>
                <div className={appStyles.others}>
                  <span>MongoDB</span>
                </div>
                <div className={appStyles.others}>
                  <span>Java</span>
                </div>
                <div className={appStyles.others}>
                  <span>C</span>
                </div>
                <div className={appStyles.others}>
                  <span>C#</span>
                </div>
              </div>
            </section>
          </section>
          <section className={appStyles.projects}>
            <h2>Projects</h2>
          </section>
          <section className={appStyles.github}>
            <h2>GitHub</h2>
          </section>
        </section>
      </main>
      <footer>
        <span>Copyright © <time dateTime="2024">2024</time> Tarik Bratic</span>
      </footer>
    </>
  )
}

export default App