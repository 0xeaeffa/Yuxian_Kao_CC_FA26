import { useLocation } from 'preact-iso';
import { useState } from 'preact/hooks';
import { landingTab, getAssignmentTabs } from '../utils';

const assignmentTabs = getAssignmentTabs(2);

export const Side = () => {
  const { route } = useLocation();
  const [open, setOpen] = useState<boolean>(true);

  const handleNavigate = (routePath: string) => {
    route(routePath, false);
  };

  return (
    <div className='sidebar-cont' style={{ width: open ? '12rem' : '4rem' }}>
      <button className='sidebar-button' onClick={() => setOpen((p) => !p)}>
        x
      </button>

      <button
        className={`sidebar-button ${location.pathname === landingTab.route && 'selected'}`}
        onClick={() => handleNavigate(landingTab.route)}
      >
        <p>{landingTab.name}</p>
      </button>

      {assignmentTabs.map((r) => (
        // <div className='sidebar-grid' key={`sidebar-${r.name}`}>
        <div key={`sidebar-${r.name}`}>
          <button
            className={`sidebar-button ${location.pathname === r.route && 'selected'}`}
            onClick={() => handleNavigate(r.route)}
          >
            <p>{r.name}</p>
          </button>
        </div>
      ))}
    </div>
  );
};
