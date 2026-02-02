import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../api/endpoints';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { PageShell } from '../components/layout/page-shell';

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  return (
    <PageShell
      title="Dashboard"
      description="Overview of your Nightly plugin data."
    >
      <Card>
        <CardHeader>
          <CardTitle>Settings Snapshot</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading settings…</p>
          ) : (
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Example text:</span>{' '}
                {data?.example_text || '—'}
              </p>
              <p>
                <span className="font-medium">Feature enabled:</span>{' '}
                {data?.enable_feature ? 'Yes' : 'No'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </PageShell>
  );
};

export default Dashboard;
