import React, { useState, useEffect, useRef } from "react";
import { Octokit } from "@octokit/core";
import Typed from "typed.js";
import GitHubCalendar from "react-github-calendar";

import UniLogo from "../images/kth.png";
import ProfilePic from "../images/myself.jpeg";

import * as appStyles from "../styles/app.module.css";

const App = () => {
  // Typing effect
  const profsContent = useRef(null);
  
  useEffect(() => {
    const typed = new Typed(profsContent.current, {
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

  // E-mail handler
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
  }

  // GitHub Contributions
  const selectLastHalfYear = contributions => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 6;
  
    return contributions.filter(activity => {
      const date = new Date(activity.date);
      const monthOfDay = date.getMonth();
  
      return (
        date.getFullYear() === currentYear &&
        monthOfDay > currentMonth - shownMonths &&
        monthOfDay <= currentMonth
      );
    });
  };

  // Fetch GitHub Scopes
  const [repos, setRepos] = useState([]);

  // Github Repositories
  useEffect(() => {
    const fetchGitHubScopes = async () => {
      const TOKEN = process.env.GATSBY_GITHUB_TOKEN;
  
      if (!TOKEN) {
        console.error("GitHub token is missing! Check your .env.development file.");
        return;
      }
  
      try {
        const octokit = new Octokit({ auth: TOKEN });
  
        const response = await octokit.graphql(
          `query ($login: String!) {
            user(login: $login) {
              pinnedItems(first: 5, types: [REPOSITORY]) {
                edges {
                  node {
                    ... on Repository {
                      id
                      name
                      url
                      description
                      languages(first: 5) {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }`,
          { login: "tarik-bratic" }
        );
  
        const repositories = response.user.pinnedItems.edges.map(edge => ({
          id: edge.node.id,
          name: edge.node.name,
          url: edge.node.url,
          description: edge.node.description,
          languages: edge.node.languages.edges.map(lang => lang.node.name),
        }));
  
        setRepos(repositories);
  
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
  
    fetchGitHubScopes();
  }, []);

  return (
    <>
      {/**
       * Information regarding name and current profession.
       * Interactive content with buttons to show CV and copy E-mail.
       * Images of Tarik (myself) and university logo.
       */}
      <header>
        <section className={appStyles.heroSection}>
          <section className={appStyles.content}>
            {/* Text window. My name and current status. */}
            <div className={appStyles.intro}>
              <span className={appStyles.greeting}>Hello, I'm Tarik</span>
              <span className={appStyles.profession} ref={profsContent}></span>
            </div>
            {/* Buttons CV and E-mail */}
            <div className={appStyles.actions}>
              <a href="/resources/Resume.pdf" download="Resume.pdf">
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
      {/**
       * Four layers of content; About me, Experties, Github Project, Github Activites.
       * About me: A paragraph about my background and other skills such as language, skills...
       * Experties: Displaing a grid-view of what programing languages I know.
       * (Other experties): Sub layer of same concept.
       * Github Project: Useing API to display my pinned projects from Github.
       * Github Activites: Useing API to display recent activites in my Github.
       */}
      <main>
        <section className={appStyles.about}>
          <h2 className={appStyles.aboutTitle}>About Me</h2>
          <article className={appStyles.content}>
            <p>
              A student in computer engineering at KTH with a passion for everything related to IT. My engagement extends beyond the classroom; system development is my main hobby. My other interests include strength training, movies, cars, and spending time with my friends. As personal projects, I have coded on a Raspberry Pi, created interactive websites using JavaScript, and edited videos for YouTube. I am someone who is humble and eager to learn; as a cashier at Filmstaden, I have learned to be communicative and social; as a warehouse worker at Hydroscand, I have developed organizational skills and attention to detail; and as a retail employee, I have gained experience in customer service, inventory management, and efficient logistics.
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
              <li><a href="https://www.linkedin.com/in/tarikbratic/">LinkedIn</a></li>
              <li><a href="https://github.com/tarik-bratic">Github</a></li>
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
                    <span className={appStyles.green}>{'const experties[] '}</span>
                    <span>{'= '}</span>
                    <span className={appStyles.lightYellow}>{'["HTML", "CSS", "JavaScript", ...others];'}</span>
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
                    <span className={appStyles.blue}>{'const Tarik'}</span>
                    <span>{' = '}</span>
                    <span className={appStyles.purple}>{'await '}</span>
                    <span className={appStyles.green}>{'Experties'}</span>
                    <span>{'.'}</span>
                    <span className={appStyles.Yellow}>{'find()'}</span>
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
                <div className={appStyles.others}>
                  <span>Swift</span>
                </div>
                <div className={appStyles.others}>
                  <span>Kotlin</span>
                </div>
                <div className={appStyles.others}>
                  <span>REST API</span>
                </div>
                <div className={appStyles.others}>
                  <span>TypeScript</span>
                </div>
                <div className={appStyles.others}>
                  <span>nginx</span>
                </div>
              </div>
            </section>
          </section>
          <section className={appStyles.codeSection}>
            <section className={appStyles.repoSection}>
              <h2 className={appStyles.repoTitle}>Repositories</h2>
              <ul className={appStyles.repoList}>
                {repos.length > 0 ? (
                  repos.map(repo => (
                    <div className={appStyles.repoCard} key={repo.id}>
                      <h2><a href={repo.url}>{repo.name}</a></h2>
                      <div className={appStyles.repoDescription}>
                        <p>{repo.description}</p>
                        <p>{repo.languages.join(', ')}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading repos....</p>
                )}
              </ul>
            </section>
            <section className={appStyles.gitHubCal}>
              <h2>GitHub Contributions</h2>
              <GitHubCalendar 
                username="tarik-bratic"
                transformData={selectLastHalfYear}  
                hideColorLegend
                hideTotalCount
              />
            </section>
          </section>
        </section>
      </main>
      {/**
       * Copyright.
       */}
      <footer>
        <span>Copyright © <time dateTime="2024">2024</time> Tarik Bratic</span>
      </footer>
    </>
  )
}

export default App