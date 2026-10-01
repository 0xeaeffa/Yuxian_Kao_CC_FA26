import { useLocation } from 'preact-iso';
import { useState, useRef, useEffect } from 'preact/hooks';
import { landingTab, getAssignmentTabs, NumberIcons } from '../utils';
import { HomeIcon, LeftArrowIcon } from '../styles/icons';

const assignmentTabs = getAssignmentTabs(4);

export const Side = () => {
  const { route } = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(true);
  const [openLabel, setOpenLabel] = useState<boolean>(false);

  const handleNavigate = (routePath: string) => {
    route(routePath, false);
  };

  const tabHeight = '2.4rem';
  const padding = '0.4rem';
  const tabGap = `calc(${padding} / 2)`;
  const tabButtonCorner = '0.2rem';
  useEffect(() => {
    if (ref.current) {
      const r = ref.current;
      r.style.setProperty('--sidebar-padding', padding);
      r.style.setProperty('--tab-height', tabHeight);
      r.style.setProperty('--tab-button-corner', tabButtonCorner);
    }
  }, []);

  function getIcon(index: number) {
    const Icon = NumberIcons[index];
    return Icon ? <Icon size={'1rem'} /> : null;
  }

  return (
    <div
      ref={ref}
      className='sidebar-cont'
      style={{
        width: open ? '12rem' : `calc(${tabHeight} + calc(${padding} * 2))`,
      }}
    >
      <button className='sidebar-button top' onClick={() => setOpen((p) => !p)}>
        <LeftArrowIcon
          size={'1rem'}
          style={{
            transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.2s',
          }}
        />
      </button>

      <button
        className={`sidebar-button ${location.pathname === landingTab.route && 'selected'}`}
        onClick={() => handleNavigate(landingTab.route)}
      >
        <HomeIcon size={'1rem'} />
        {open && <p class='home-text'>Landing (alleged)</p>}
      </button>

      {assignmentTabs.map((r, i) => (
        <>
          <div key={`sidebar-${r.name}`}>
            <button
              className={`sidebar-button ${location.pathname === r.route && 'selected'}`}
              onClick={() => handleNavigate(r.route)}
              onMouseOver={() => setOpenLabel(!open)}
              onMouseLeave={() => setOpenLabel(false)}
            >
              {open ? <p>{r.name}</p> : getIcon(i)}
            </button>
          </div>

          {/* reminder to make a tab button component */}
          {openLabel && (
            <div
              style={{
                position: 'absolute',
                height: tabHeight,
                background: 'rgba(255,255,255,0.5)',
                marginTop: `calc(calc(-1 * ${tabHeight}) - ${tabGap})`,
                marginLeft: `calc(${tabHeight} + ${tabGap})`,
                padding: '0rem 0.8rem',
                display: 'flex',
                alignItems: 'center',

                borderRadius: tabButtonCorner,
                border: '1px solid grey',
              }}
            >
              <p>{r.name}</p>
            </div>
          )}
        </>
      ))}
    </div>
  );
};
