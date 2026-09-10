import { render } from 'preact';
import { useEffect } from 'preact/hooks';
import { LocationProvider, Router, Route, useLocation } from 'preact-iso';

import { Landing, Week1 } from './pages';
import { Side } from './components';

import './styles/style.css';
import './styles/assignment-style.css';

function NotFound() {
  const { route } = useLocation();
  useEffect(() => {
    // redirect to home, replacing history entry
    route('/', true);
  }, []);
  return null;
}

export function App() {
  return (
    <LocationProvider>
      <main>
        <Side/>
        <div class='main-content'>
          <Router>
            <Route path='/' component={Landing} />
            <Route
              path='/Yuxian_Kao_CC_FA26/week1-assignment'
              component={Week1}
            />
            <Route default component={NotFound} />
          </Router>
        </div>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById('app') as Element);
