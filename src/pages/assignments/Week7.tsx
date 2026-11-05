import { PageTitle } from '../../components/layout';
import { repoName } from '../../utils';

const vidPath = `${repoName}/week7-winter_1.mp4`;
// const vidPath = 'week7-winter_1.mp4';

export const Week7 = () => {
  return (
    <div class='page'>
      <PageTitle
        title='Week-7 Documentation'
        subtitle='I was assigned winter for our projection mapping sketch (i like winter)'
      />
      <div class='div-centered'>
        <div class='image-wrapper'>
          <video src={vidPath} class='image' autoplay loop />
        </div>
      </div>

      <div class='div-centered'>
        <p>Visual Elements</p>
        <ul>
          <li>Simulated snow fall (rotation, oscillating scaleX value)</li>
          <li>Natural downward motion (sin() + linear directional constant)</li>
        </ul>
      </div>
      <div class='div-centered'>
        <p>Key Parameters</p>
        <ul>
          <li>
            Customizable parameters that makes each object instance unique
          </li>
          <li>
            number of sides (6 or 7), length of sides, angle of the offshoot
            branches, stroke weight,color
          </li>
          <li>
            rotation speed, oscillation speed, fall speed, directional constant,
            horizontal movement amplitude
          </li>
        </ul>
      </div>

      <div class='divider'/>
    </div>
  );
};
