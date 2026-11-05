import { useEffect, useRef, useState } from 'preact/hooks';
import { PageTitle } from '../../components/layout';
import { Sketch6_1 } from '../../components/sketches/sketchW6';

export const Week7 = () => {
  return (
    <div class='page'>
      <PageTitle title='Week-7 Assignment' subtitle='fih' />
      <div style={{ height: '100%', display: 'grid', placeItems: 'center', padding: 0 }}>
        <Sketch6_1 />
      </div>
    </div>
  );
};
