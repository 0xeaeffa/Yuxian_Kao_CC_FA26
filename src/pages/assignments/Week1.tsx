export function Week1() {
  return (
    <div class='assignment'>
      <h2>Week-1 Assignment</h2>
      <blockquote class='twitter-tweet' data-media-max-width='560'>
        <p lang='en' dir='ltr'>
          Fine tuning the poking physics
          <a href='https://t.co/KOygwoIm2l'>https://t.co/KOygwoIm2l</a>{' '}
          <a href='https://t.co/WQBq8e2ONC'>pic.twitter.com/WQBq8e2ONC</a>
        </p>
        &mdash; Tolis C (@tol_is){' '}
        <a href='https://x.com/tol_is/status/2066500681268080849?ref_src=twsrc%5Etfw'>
          June 15, 2026
        </a>
      </blockquote>{' '}
      <script
        async
        src='https://platform.x.com/widgets.js'
        charset='utf-8'
      ></script>

      <a href='https://tol.is/balloon' target='_blank'>
        https://tol.is/balloon
      </a>
      
      <p>
        This is a web-based physics simulation of a balloon. While the concept
        may be simple, there are many points of execution in this project that
        elevates it as a refined, interactive piece. One of the highlights of
        the simulation is the multiple ways the user's cursor can interact with
        the balloon. The user is able to push and poke the balloon around the
        2-dimensional space, while the velocity and shape of the balloon
        accurately reflects the force that was applied. Additionally, the user
        can also pull on string or pop the balloon with a pin for a well rounded
        interactive experience.
      </p>
      <p>
        My favorite aspects of the work are the stylistic choices that was made
        to present the subject as a technical, bare-boned simulation, rather
        than a realistic replica of a balloon. The two ellipses used to
        represent the 3-dimensionality of the balloon is enough to cleanly
        showcase the physical effects from user interaction. And funnily, only
        showcased in the video post from X (formerly known as Twitter), but not
        on the webpage (unless you manually set the color-scheme to light in the
        web console), are directional indicators for the position of cursor that
        allows you to visually follow along the formation of a mini turbulence
        that lightly changes the movement of the balloon whenever you move the
        cursor across the screen.
      </p>
    </div>
  );
}
// These are details that would not be present in a simulator that tries to mimic reality,
