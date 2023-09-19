import classes from './page.module.css'

export default function WayOfWorking() {
  return (
    <div className={classes.wayOfWorking}>
      <h1 className={classes.title}>Way of working</h1>
      <p className={classes.introText}>
        On this page, I&apos;ll describe very briefly the ideal development
        situation I&apos;d like to work in. This will cover code-related topics
        but also team work and organizing tasks.
      </p>

      <p>
        Overall I think that Martin Fowler&apos;s blog covers a lot of ideas I
        align with, here are some examples:
      </p>

      <ul className={classes.referenceList}>
        <li>
          On evolutionary design: {' '}
          <a href="https://www.martinfowler.com/articles/designDead.html">Is Design Dead?</a>
        </li>
        <li>
          On why software quality matter: {' '}
          <a href="https://martinfowler.com/articles/is-quality-worth-cost.html">Is High Quality Software Worth the Cost?</a>
        </li>
        <li>
          On opportunistic refactoring: {' '}
          <a href="https://martinfowler.com/bliki/OpportunisticRefactoring.html">OpportunisticRefactoring</a>
        </li>
        <li>
          On why testing extensively matters: {' '}
          <a href="https://martinfowler.com/bliki/SelfTestingCode.html">SelfTestingCode</a>
        </li>
      </ul>

      <p>
        Here are some other links that I really like and describe my way of
        thinking/working, so I don&apos;t have to duplicate it here :)
      </p>

      <ul className={classes.referenceList}>
        <li>
          On reducing software complexity: {' '}
          <a href="https://thevaluable.dev/cohesion-coupling-guide-examples/">Cohesion and Coupling in Software with Examples</a>
        </li>
        <li>
          On why DRY code is not always good: {' '}
          <a href="https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase">The wet codebase</a>
        </li>
        <li>
          Another article on the same topic: {' '}
          <a href="https://overreacted.io/goodbye-clean-code/">Goodbye, Clean Code</a>
        </li>
        <li>
          On how to write high quality tests: {' '}
          <a href="https://mtlynch.io/good-developers-bad-tests/">Why Good Developers Write Bad Unit Tests</a>
        </li>
      </ul>

      <h2>Do not reinvent the wheel</h2>
      <p>
        Instead of stepping into the {' '}
        <a href="https://en.wikipedia.org/wiki/Not_invented_here#In_computing">&quot;NIH Syndrom&quot;</a>
        {' '}trap, we should rely on FOSS solutions for problems that have been
        solved already. This way we don&apos;t have the maintenance burden of
        keeping the solutions alive or improving them while reaping the benefits of
        improvements and benefits.
      </p>

      <p>
        Code should only be written for domain-specific problems that can&apos;t be
        addressed by using public solutions and then composed with the
        available tools mentioned above. This way the code base stays as small as
        possible and maintenance to a minimum.
      </p>

      <h2>Simplicity is the key</h2>
      <p>
        Simplicity is the key to a maintainable, scalable and usable software.
        This does not just apply to code and architecture, but to user
        interfaces, documentation and communication as well. In regards to
        importance, I follow the{' '}
        <a href="https://en.wikipedia.org/wiki/Worse_is_better#New_Jersey_style">&quot;New Jersey Style&quot;</a>
        {' '}model of software design. At least in parts, especially {' '}
        <i>&quot;Simplicity is the most important consideration in a
        design&quot;</i>, although I think that the interface should be
        equally simple as the interface as the user interface must be as accessible as
        possible.
      </p>

      <p>
        The perception of the software by the target audience can make the
        difference between success and losing to a competitor. Therefore it&apos;s
        necessary to provide an intuitive user interface so that users don&apos;t
        have to think about how they can do what they want to do. They should
        be able to just do it.
      </p>

      <h3>Simple software</h3>
      <p>
        Simple software is easy to maintain because it is easy to understand
        how it works and where to find the code that needs to be found. The
        following text can be found on {' '}
        <a href="https://suckless.org/philosophy/">suckless.org/philosophy</a>
        {' '} and has been adjusted slightly by me:
      </p>
        
      <blockquote cite="https://suckless.org/philosophy/">
        We focus on simplicity, clarity and frugality. Our philosophy is about
        keeping things simple, minimal and usable. Unfortunately, the tendency
        for complex, error-prone and slow software seems to be prevalent in the
        present-day software industry. We intend to prove the opposite with our
        software.  
      </blockquote>
        
      <p>
        The user interface should be simple enough that it can be used
        intuitively by inexperience users (e.g. the older demographic) while
        powerusers can navigate and interact efficiently and effortlessly.
      </p>
        
      <p>
        Designing simple and elegant software is far more difficult than
        letting ad-hoc or over-ambitious features obscure the code over time.
        However one has to pay this price to achieve reliability and
        maintainability. Furthermore, minimalism results in reasonable and
        attainable goals. I strive to maintain minimalism and clarity to drive
        development to completion.
      </p>

      <h4>Features and rejecting feature requests</h4>
      <p>
        Features should only be added when necessary. The following quote
        summarizes my perspective perfectly:
      </p>

      <blockquote>
        we don&apos;t want to blindly add features just because. We
        want to add them if we feel they are useful and pass the benefit versus
        cost calculation. A new feature doesn&apos;t just mean writing some
        code and merging it; it also means testing, maintaining and supporting
        it and considering it whenever another new feature comes up. Also,
        quite often specific usecases can be realized with different
        solutions.<br />
        (<a href="https://github.com/i3/i3/issues/2107#issuecomment-238251240">source</a>)
      </blockquote>

      <h4>Software design</h4>
      <p>
        Designing the code and its architecture follows the evolutionary design
        philosophy. It&apos;s impossible to know what the code will look like
        eventually. Therefore it make sense to sit down with the team and
        dicuss how to implement the next feature only. This will include how
        code could potentially be refactored before any new code has been
        written. But that refactoring should only be on a small scale. Bigger
        refactors should happen on purpose in intervals instead of just when an
        obvious need get visible. This allows the developers to keep the code base
        as simple as possible, as the goal of the refactor is to make the code simpler.
        This could be done by adding or removing(!) abstractions.
        I find that a good way of approach this kind of refactoring is to reduce coupling
        and achieve a reasonable level of cohesion. {' '}
        <a href="Cohesion and Coupling in Software with Examples">Cohesion and
        Coupling in Software with Examples</a> {' '} is a very good article
        that not only explains which types of coupling and cohesion exist, but
        also how much cohesion should be strived for.
      </p>
    </div>
  )
}
