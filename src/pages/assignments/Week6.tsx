import { useEffect, useRef, useState } from 'preact/hooks';
import { PageTitle } from '../../components/layout';
import { Sketch6_1 } from '../../components/sketches/sketchW6';

export const Week6 = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  // window resize festivity i guess
  function getPageDimension() {
    if (pageRef.current) {
      const dimensions = pageRef.current.getBoundingClientRect();
      setWidth(dimensions.width);
      setHeight(dimensions.height);
    }
  }
  useEffect(() => {
    getPageDimension();
    window.addEventListener('resize', getPageDimension);
    return () => window.removeEventListener('resize', getPageDimension);
  }, []);
  useEffect(() => {
    console.log(`width: ${width}, height: ${height}`);
  }, [width, height]);

  return (
    <div
      class='page'
      ref={pageRef}
      style={{ height: '100%', display: 'grid', placeItems: 'center' }}
    >
      {/* <PageTitle
        title='Week-5 Update'
        subtitle='adding this section almost borke all my layout, but hey I fixed my tree'
      /> */}
      <Sketch6_1 />
    </div>
  );
};
