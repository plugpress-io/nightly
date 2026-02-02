import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSettings, updateSettings } from '../api/endpoints';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { PageShell } from '../components/layout/page-shell';

const Settings = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  const [exampleText, setExampleText] = useState('');
  const [enableFeature, setEnableFeature] = useState(false);

  useEffect(() => {
    if (data) {
      setExampleText(data.example_text ?? '');
      setEnableFeature(Boolean(data.enable_feature));
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settings'] }),
  });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({
      example_text: exampleText,
      enable_feature: enableFeature,
    });
  };

  return (
    <PageShell
      title="Settings"
      description="Update Nightly plugin settings via REST."
    >
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading settings…</p>
          ) : (
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="example-text">
                  Example text
                </label>
                <input
                  id="example-text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={exampleText}
                  onChange={(event) => setExampleText(event.target.value)}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border border-input text-primary focus-visible:ring-2 focus-visible:ring-ring"
                  checked={enableFeature}
                  onChange={(event) => setEnableFeature(event.target.checked)}
                />
                Enable feature flag
              </label>
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? 'Saving…' : 'Save settings'}
                </Button>
                {mutation.isError ? (
                  <span className="text-sm text-destructive">
                    {(mutation.error as Error).message}
                  </span>
                ) : null}
                {mutation.isSuccess ? (
                  <span className="text-sm text-muted-foreground">Saved.</span>
                ) : null}
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </PageShell>
  );
};

export default Settings;
