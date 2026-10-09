import { Tree3 } from '../../components';
import { PageTitle } from '../../components/layout';

export const Week5 = () => {
  return (
    <div class='page'>
      <PageTitle
        title='Week-5 Update'
        subtitle='adding this section almost borke all my layout, but hey I fixed my tree'
      />

      <div class='div-two-columns'>
        <div class='div-centered'>
          <Tree3 />
        </div>
        <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <p>
            {`it was the resetMatrix() function that hecked up my ellipses'
                translation. \na circle of tree is also cool :)`}
          </p>
        </div>
      </div>
    </div>
  );
};
