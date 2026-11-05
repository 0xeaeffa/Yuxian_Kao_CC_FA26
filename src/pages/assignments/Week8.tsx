import { PageTitle } from '../../components/layout';
import { repoName } from '../../utils';

const vidPath = `${repoName}/week7-winter_2.mp4`;
// const vidPath = 'week7-winter_2.mp4';

export const Week8 = () => {
  return (
    <div class='page'>
      <PageTitle
        title='Week-8 Documentation'
        subtitle='dawn of the final day'
      />
      <div class='div-centered'>
        <div class='image-wrapper'>
          <video src={vidPath} class='image' autoplay loop />
        </div>
      </div>

      <div class='div-centered'>
        <p>Changelog</p>
        <ul>
          <li>Adjust for wider range of scale in snowflake’s instantiation</li>
          <li>
            Background gradients that connect to adjacent sketches (spring left,
            fall right)
          </li>
          <li>
            Simple snowy terrain representation (the terrain generation was
            hastily written, this might cause trouble later) (foreshadowing)
          </li>
          <li>
            {`Linear gradation for grass generation 
            (20% chance for grass to generate when x=0, 0% when x > width/8)`}
          </li>
        </ul>
      </div>

      <div class='divider' />
    </div>
  );
};
