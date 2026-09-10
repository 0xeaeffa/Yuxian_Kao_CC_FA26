import { useLocation } from 'preact-iso';

const assignmentTotal = 1;
const routeMappings = [{ name: 'landing page', route: '/' }];
getAssignmentRoutes();

function getAssignmentRoutes() {
  for (var i = 0; i < assignmentTotal; i++) {
    routeMappings.push({
      name: `week${i + 1} assignment`,
      route: `/Yuxian_Kao_CC_FA26/week${i + 1}-assignment`,
    });
  }
}

export const Side = () => {
  const { route } = useLocation();
  const handleNavigate = (routePath: string) => {
    route(routePath, false); 
  };

  return (
    <div className='sidebar-cont'>
      {routeMappings.map((r) => (
        <div className='sidebar-grid' key={`sidebar-${r.name}`}>
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
