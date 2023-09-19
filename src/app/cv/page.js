import classes from './page.module.css'

export const metadata = {
  title: 'Mohammer5\'s CV',
}

export default function CV() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <h1 className={classes.title}>
          Curriculum Vitae
          <br />
          Jan-Gerke Salomon
        </h1>
        <h2 className={classes.subtitle}>Software Engineer</h2>

        <p className={classes.introText}>
          Frontend engineer with close to 12 years of experience in creating
          scalable, clear & maintainable frontend applications and websites.
          Working remote since April 2018. Knowledge addict.
        </p>

        <h3 className={classes.workExpHl}>Work experience</h3>

        <section className={classes.section}>
          <h4 className={classes.job}>
            <span className={classes.company}>DHIS 2, University of Oslo</span>
            <span className={classes.posLoc}>
              Senior Frontend Engineer, Oslo, Norway (remote)
            </span>
            <span className={classes.tenure}>January 2019 – Present</span>
          </h4>

          <ul className={classes.tasks}>
            <li className={classes.task}>
              Contributed to the open source code base of DHIS 2, the world’s
              largest health information management system, used by more than 70
              countries worldwide for the collection and analysis of the health
              data of billions of people.
            </li>
            <li className={classes.task}>
              Introduced e2e testing with cypress
            </li>
            <li className={classes.task}>
              Led rewrite of apps (GitHub: sms configuration, data entry app &
              maintenance app)
            </li>
            <li className={classes.task}>
              Improved and introduced supporting libraries (e.g. cypress testing &
              UI library)
            </li>
          </ul>
        </section>

        <section className={classes.section}>
          <h4 className={classes.job}>
            <span className={classes.company}>Tyroola PTY Ltd</span>
            <span className={classes.posLoc}>
              Senior Frontend Engineer, Sunshine Coast, Australia
            </span>
            <span className={classes.tenure}>June 2016 – July 2018</span>
          </h4>

          <ul className={classes.tasks}>
            <li className={classes.task}>
              Transformed the tech-stack from classic oop vanilla js to unit-tested react/flux/webpack architecture
            </li>
            <li className={classes.task}>
              Introduced and helped to implement SCRUM to the frontend team to improve the effectiveness of the agile environment
            </li>
            <li className={classes.task}>
              Refactored and extended the backend responsible for delivering and handling the frontend in PHP7
            </li>
            <li className={classes.task}>
              Optimized performance of the website on the client side
            </li>
            <li className={classes.task}>
              Advise and support stakeholders, product owner and UI/UX department
            </li>
            <li className={classes.task}>
              Worked remote for 4 months
            </li>
          </ul>
        </section>


        <section className={classes.section}>
          <h4 className={classes.job}>
            <span className={classes.company}>DerPunkt GmbH</span>
            <span className={classes.posLoc}>
              Apprentice & Frontend Engineer, Karlsruhe, Germany
            </span>
            <span className={classes.tenure}>November 2011 – April 2016</span>
          </h4>

          <ul className={classes.tasks}>
            <li className={classes.task}>
              Involved in Conception, calculation, planning, management and implementation of projects
            </li>
            <li className={classes.task}>
              Advised, supported and educated clients
            </li>
            <li className={classes.task}>
              Technical project management of complex web projects
            </li>
            <li className={classes.task}>
              Prepared budgets, quotes and supported acquisitions
            </li>
            <li className={classes.task}>
              Supervision of trainees
            </li>
            <li className={classes.task}>
              Front- and backend development
            </li>
            <li className={classes.task}>
              Integration of CMS systems (TYPO3)
            </li>
          </ul>
        </section>
      </div>

      <aside className={classes.aside}>
        <section className={classes.asideSection}>
          <h1 className={classes.asideTitle}>Contact</h1>
          <ul className={classes.asideList}>
            <li><a href="mailto:jgs.salomon+githubpages@gmail.com">E-Mail</a></li>
            <li><a href="https://github.com/Mohammer5">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/jan-gerke-salomon/">LinkedIn</a></li>
          </ul>
        </section>

        <section className={classes.asideSection}>
          <h1 className={classes.asideTitle}>Skills</h1>

          <p className={classes.asideListTite}>Tools and Frameworks:</p>
          <ul className={classes.asideList}>
            <li>React, Redux & RxJS</li>
            <li>Apollo & react-query</li>
            <li>Cypress & Jest</li>
            <li>ESNext, TypeScript</li>
            <li>Grandstack (Graphql & Neo4j)</li>
            <li>Vim, Kitty, Fish shell, Linux (NixOS & Debian)</li>
          </ul>

          <p className={classes.asideListTite}>Priorities:</p>
          <ul className={classes.asideList}>
            <li>Simplicity</li>
            <li>Open source &gt; Closed source</li>
            <li>Pragmatism</li>
          </ul>
        </section>

        <section className={`${classes.asideSection} ${classes.educationData}`}>
          <h1 className={classes.asideTitle}>Education</h1>

          <b style={{ display: 'block' }}>Heinrich-Hertz Schule</b>

          <span style={{ display: 'block' }}>
            IT specialist for application development
          </span>

          <span style={{
            display: 'block',
            fontSize: '10px',
          }}>
            Karlsruhe, Germany — Jan 2015
          </span>
        </section>

        <section className={classes.asideSection}>
          <h1 className={classes.asideTitle}>Languages</h1>
          <ul className={classes.asideList}>
            <li>German (native)</li>
            <li>English (experienced, between C1 and C2)</li>
          </ul>
        </section>

        <section className={classes.asideSection}>
          <h1 className={classes.asideTitle}>Other</h1>
          <ul className={classes.asideList}>
            <li>Musician (classical & e-guitar)</li>
            <li>Travel enthusiast</li>
            <li>Chillihead</li>
          </ul>
        </section>
      </aside>
    </div>
  )
}
