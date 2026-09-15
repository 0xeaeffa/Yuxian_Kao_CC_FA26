import { render } from 'preact';
import { useEffect } from 'preact/hooks';
import { LocationProvider, Router, Route, useLocation } from 'preact-iso';
import { repoName, getAssignmentPaths } from './utils';

import { Landing, Week1, Week2 } from './pages';
import { Side } from './components';

import './styles/style.css';
import './styles/assignment-style.css';

function NotFound() {
  const { route } = useLocation();
  useEffect(() => {
    // redirect to home, replacing history entry
    route(`/${repoName}`, true);
  }, []);
  return null;
}
function assignmentPathsMap() {
  const assignment = [Week1, Week2];
  return assignment.map((a, i) => ({
    component: a,
    path: getAssignmentPaths(2)[i],
  }));
}

export function App() {
  return (
    <LocationProvider>
      <main>
        <Side />
        <div class='main-content'>
          <Router>
            <Route path={`/${repoName}`} component={Landing} />
            {assignmentPathsMap().map((a) => (
              <Route path={a.path} component={a.component} />
            ))}
            <Route default component={NotFound} />
          </Router>
        </div>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById('app') as Element);
