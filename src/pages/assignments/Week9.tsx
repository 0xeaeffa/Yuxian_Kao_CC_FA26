import { PageTitle } from '../../components/layout';
import { repoName } from '../../utils';
import { Sketch9 } from '../../components';

const vidPath = `/${repoName}/week7-winter_2.mp4`;
// const vidPath = 'week7-winter_2.mp4';

export const Week9 = () => {
  return (
    <div class='page'>
      <PageTitle title='Week-9' subtitle='where am i who am i' />
      <div style={{ display: 'grid', width: '100%', placeItems: 'center' }}>
        <Sketch9 />
      </div>
    </div>
  );
};
