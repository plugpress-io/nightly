import Router from './router';
import { Card, CardContent } from './components/ui/card';

const App = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold">Nightly Admin</h2>
          <p className="text-sm text-muted-foreground">
            Manage settings and REST-powered actions from this single-page app.
          </p>
        </CardContent>
      </Card>
      <Router />
    </div>
  </div>
);

export default App;
