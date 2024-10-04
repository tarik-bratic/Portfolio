import React, { useState, useEffect, useRef } from "react";
import Typed from "typed.js";

import ProfilePic from "../images/myself.jpeg";
import UniLogo from "../images/kth.png";

import * as appStyles from "../styles/app.module.css"

const App = () => {
  // Create reference to store the DOM element containing the animation
  const statusContent = useRef(null);

  useEffect(() => {
    const typed = new Typed(statusContent.current, {
      strings: ['B.Sc. Comp. Eng.', 'Full-stack Developer'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      showCursor: false
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => { 
    setMenuOpen(!menuOpen); 
  }

  const scrollIntoSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <header>
        {/* Navigation bar, compatible for mobile and desktop */}
        <nav className={`${appStyles.navbar} ${!menuOpen ? appStyles.menuClosed : ''}`}>
          {/* Only displayed on mobile */}
          <h1 className={appStyles.navTitle}>Tarik Bratic</h1>
          <svg onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 40 50">
            <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
          </svg>
          {/* Displayed both devices */}
          <ul className={`${appStyles.menu} ${menuOpen ? appStyles.menuOpen : ''}`}>
            <li className={appStyles.menuItem} onClick={() => scrollIntoSection('home')}>Home</li>
            <li className={appStyles.menuItem} onClick={() => scrollIntoSection('about')}>About Me</li>
            <li className={appStyles.menuItem} onClick={() => scrollIntoSection('career')}>Career</li>
          </ul>
        </nav>
        <section id="home" className={appStyles.heroSection}>
          <section className={appStyles.content}>
            {/* Text window. My name and status. */}
            <div className={appStyles.intro}>
              <span className={appStyles.greeting}>Hello, I'm Tarik</span>
              <span className={appStyles.status} ref={statusContent}></span>
            </div>
            {/* Buttons CV and Connect */}
            <div className={appStyles.actions}>
              <button className={appStyles.button} type="button">Resume</button>
              <button className={appStyles.button} type="button">Connect</button>
            </div>
          </section>
          {/* Img of myself and uni logo */}
          <div className={appStyles.images}>
            <img className={appStyles.profileImage} src={ProfilePic} alt="Profile picture of Tarik" />
            <img className={appStyles.universityLog} src={UniLogo} alt="University Logo" />
          </div>
        </section>
      </header>
      <main>
        <section id="about" className={appStyles.about}>
          <h2 className={appStyles.aboutTitle}>About Me</h2>
          <article className={appStyles.content}>
            <p>En student inom datateknik på KTH med passion för allt IT-
              relaterat. Engagemanget sträcker sig bortom klassrummet;
              systemutveckling är min stora hobby. Mina andra intressen är
              styrketräning, film, bilar och att umgås med mina vänner. Som
              fritidsprojekt har jag kodat på Raspberry PI, skapat rörliga
              hemsidor med JavaScript, och videoredigerat klipp för YouTube.
              Jag är någon som är ödmjuk och villig att lära sig; som kassör på
              Filmstaden har jag lärt mig vara kommunikativ och social; som
              lagermedarbetare på Hydroscand har jag lärt mig vara
              organiserad och detaljorienterad; som butiksmedarbetare har
              jag lärt mig kundservice, lagerhantering och effektiv logistik.
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
              <li>Fotball</li>
            </ul>
            <ul className={appStyles.socials}>
              <h3>Socials</h3>
              <li>LinkedIn</li>
              <li>Github</li>
              <li>Discord</li>
            </ul>
          </aside>
        </section>
        <section id="career" className={appStyles.career}>
          <section className={appStyles.experties}>
            <h2>Experties</h2>
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