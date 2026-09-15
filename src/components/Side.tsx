import { useLocation } from 'preact-iso';
import { getRouteMappings } from '../utils';

const routeMappings = getRouteMappings();

export const Side = () => {
  const { route } = useLocation();
  const handleNavigate = (routePath: string) => {
    route(routePath, false);
  };

  return (
    <div className='sidebar-cont'>
      {routeMappings.map((r) => (
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
