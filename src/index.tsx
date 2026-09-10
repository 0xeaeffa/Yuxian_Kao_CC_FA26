import { render } from 'preact';
import { useEffect } from 'preact/hooks';
import { LocationProvider, Router, Route, useLocation } from 'preact-iso';
import { route } from 'preact-router';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import './style.css';

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
      <Header />
      <main>
        <Router>
          <Route path='/' component={Home} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById('app') as Element);
