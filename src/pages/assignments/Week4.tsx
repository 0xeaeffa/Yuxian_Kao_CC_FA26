import { Tree2, Tree3 } from '../../components';
import { repoName } from '../../utils';

const svgPath = `${repoName}/week-4_output.svg`;

export const Week4 = () => {
  return (
    <div class='assignment'>
      <div class='title-box'>
        <h2>Week-4 Assignment</h2>
        <div class='subtitle-box'>
          <div class='indent-bar' />
          <p>This page might be about trees</p>
        </div>
      </div>

      {/* <Tree3/> */}

      <div class='div-two-columns'>
        <div class='div-centered'>
          <Tree2 />
        </div>
        <div style={{ width: '100%', minWidth: '20rem', display: 'block' }}>
          <p>
            Upon seeing the suggestion to use recursive logic for this week's
            assignment, I immediately thought of the classic recursive binary
            tree. I wanted to showcase not only the tree graph structure, but
            also to incorporate some randomness in the generation to create a
            natural look.
          </p>
          <p>
            After the basic structure was complete, I wanted to add more shapes
            other than the line primitive to the drawing to have more
            interesting and diverse visuals. Which is why I then added some
            additional chance based logic for ellipse generation.
          </p>
        </div>
      </div>

      <div class='div-two-columns'>
        <div style={{ minWidth: '300px', display: 'block' }}>
          <p>
            However, I also encountered some trouble with the consistency of the
            ellipse generation across the preview and browsers due to the nature
            of positioning after translating and rotating the canvas. In order
            to make sure all ellipses are drawn last so as to not be overlapped
            by the branches, I wanted to save all positions of the ellipses in a
            list then plot all of them using a loop at the end of the draw
            function.
          </p>
          <p>
            One of the core mechanics of the recursive tree's generation is
            basing the child branch's growth off of the translation and rotation
            of the parent. Because translation and rotation directly manipulates
            the canvas and does not save the position value, I end up having to
            infer the positioning through the drawingContext() function. The
            drawingContext() function felt like a life saver at first as it
            returns all the necessary info about the current state of the
            canvas. But it was only until I deployed the github page when I
            realized that there are other factors that can influence the
            drawingContext() values, such as the pixel density of the browser's
            renderer or of the screen itself. This resulted in the ellipses'
            positions being scaled incorrectly and ended up looking like they
            were randomly placed across the canvas instead of the logic based
            generation.
          </p>
          <p>
            While the solution ended up being simpler than I thought (as
            pixelDensity() is also an available function to easily retrieve data
            from), it definitely took me longer than expected to figure out the
            concept of pixel density and its discrepancy across different
            renderers.
          </p>
        </div>

        <div class='div-centered'>
          <div class='image-wrapper' style={{ width: '384px' }}>
            <img src={svgPath} alt='week-4 SVG output' class='image' />
          </div>
        </div>
      </div>

      <div class='div-centered' style={{ paddingBottom: '1.2rem' }}>
        <p>
          Just when I thought I was done debugging, what seemed to be the same
          issue happened again when exporting the sketch to an SVG (fig. right).
          But upon opening the SVG file in inkscape, I noticed that all the
          ellipses' data are still in the file, but were just cut off in the SVG
          display. And instead of an incorrectly scaled positioning, only the
          translation was off. I was able to quickly fix the offset in inkscape
          before using the pen plotter, but this will definitely be a bug to
          squash before finalizing the sketch next week.
        </p>
      </div>

      <div style={{ paddingBottom: '1.2rem' }} class='divider' />

      <div>
        <div class='title-box'>
          <h2>Week-5 Update</h2>
          <div class='subtitle-box'>
            <div class='indent-bar' />
            <p>I fix my tree</p>
          </div>
        </div>
      </div>

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
