import { useState } from 'react';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';
import { Button } from './components/ui/button';

export type RouteKey = 'dashboard' | 'settings';

const routes: Record<RouteKey, { label: string; component: JSX.Element }> = {
  dashboard: { label: 'Dashboard', component: <Dashboard /> },
  settings: { label: 'Settings', component: <Settings /> },
};

const Router = () => {
  const [active, setActive] = useState<RouteKey>('dashboard');

  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap gap-2">
        {Object.entries(routes).map(([key, route]) => (
          <Button
            key={key}
            variant={active === key ? 'default' : 'secondary'}
            onClick={() => setActive(key as RouteKey)}
          >
            {route.label}
          </Button>
        ))}
      </nav>
      <div>{routes[active].component}</div>
    </div>
  );
};

export default Router;
