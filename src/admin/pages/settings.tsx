import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSettings, updateSettings } from '../api/endpoints';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import { PageShell } from '../components/layout/page-shell';

type NightlySettings = {
  enabled: boolean;
  default_mode: 'system' | 'dark' | 'light';
  show_toggle: boolean;
  toggle_position: 'bottom-right' | 'bottom-left';
  exclude_selectors: string;
};

const defaultSettings: NightlySettings = {
  enabled: false,
  default_mode: 'system',
  show_toggle: true,
  toggle_position: 'bottom-right',
  exclude_selectors: '',
};

const selectorPattern = /^[a-zA-Z0-9#.\-_\s,:>\[\]\(\)="'~+*\\/]*$/;

const Settings = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  const [formState, setFormState] = useState<NightlySettings>(defaultSettings);
  const [initialState, setInitialState] = useState<NightlySettings | null>(null);
  const [touchedExclude, setTouchedExclude] = useState(false);

  useEffect(() => {
    if (data) {
      const nextState = {
        enabled: Boolean(data.enabled),
        default_mode: data.default_mode ?? 'system',
        show_toggle: Boolean(data.show_toggle),
        toggle_position: data.toggle_position ?? 'bottom-right',
        exclude_selectors: data.exclude_selectors ?? '',
      } satisfies NightlySettings;
      setFormState(nextState);
      setInitialState(nextState);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: (updated) => {
      queryClient.setQueryData(['settings'], updated);
      setInitialState(updated);
    },
  });

  const isDirty = useMemo(() => {
    if (!initialState) {
      return false;
    }
    return JSON.stringify(formState) !== JSON.stringify(initialState);
  }, [formState, initialState]);

  const excludeSelectorsError =
    formState.exclude_selectors.trim().length > 0 &&
    !selectorPattern.test(formState.exclude_selectors);

  const statusLabel = mutation.isPending
    ? 'Saving…'
    : mutation.isError
      ? 'Error'
      : mutation.isSuccess && !isDirty
        ? 'Saved'
        : '';

  const handleSave = () => {
    mutation.mutate(formState);
  };

  const isDisabled = !formState.enabled;

  return (
    <PageShell
      title="Nightly"
      description="Universal dark mode that follows the system, with a user override."
    >
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading settings…</p>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Behavior</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="nightly-enabled">
                    Enabled
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Turn the universal dark mode on or off.
                  </p>
                </div>
                <Switch
                  id="nightly-enabled"
                  checked={formState.enabled}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, enabled: event.target.checked }))
                  }
                />
              </div>
              <div className={isDisabled ? 'space-y-6 opacity-50' : 'space-y-6'}>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="nightly-default-mode">
                    Default mode
                  </label>
                  <Select
                    id="nightly-default-mode"
                    value={formState.default_mode}
                    disabled={isDisabled}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        default_mode: event.target.value as NightlySettings['default_mode'],
                      }))
                    }
                  >
                    <option value="system">System</option>
                    <option value="dark">Always Dark</option>
                    <option value="light">Always Light</option>
                  </Select>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <label className="text-sm font-medium" htmlFor="nightly-show-toggle">
                      Show toggle button
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Allow users to override the system preference.
                    </p>
                  </div>
                  <Switch
                    id="nightly-show-toggle"
                    checked={formState.show_toggle}
                    disabled={isDisabled}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, show_toggle: event.target.checked }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="nightly-toggle-position">
                    Toggle position
                  </label>
                  <Select
                    id="nightly-toggle-position"
                    value={formState.toggle_position}
                    disabled={isDisabled}
                    onChange={(event) =>
                      setFormState((prev) => ({
                        ...prev,
                        toggle_position: event.target.value as NightlySettings['toggle_position'],
                      }))
                    }
                  >
                    <option value="bottom-right">Bottom right</option>
                    <option value="bottom-left">Bottom left</option>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Compatibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className={isDisabled ? 'space-y-2 opacity-50' : 'space-y-2'}>
                <label className="text-sm font-medium" htmlFor="nightly-exclude-selectors">
                  Exclude selectors
                </label>
                <Textarea
                  id="nightly-exclude-selectors"
                  placeholder=".site-logo, .hero img, .brand-mark"
                  value={formState.exclude_selectors}
                  disabled={isDisabled}
                  onBlur={() => setTouchedExclude(true)}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, exclude_selectors: event.target.value }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated CSS selectors to exclude from inversion.
                </p>
                {touchedExclude && excludeSelectorsError ? (
                  <p className="text-xs text-destructive">
                    Only commas, spaces, and common selector characters are allowed.
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>
          <div className="sticky bottom-0 z-10 -mx-6 border-t border-border bg-background/95 px-6 py-4 backdrop-blur">
            <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-4">
              <Button
                type="button"
                disabled={!isDirty || mutation.isPending || excludeSelectorsError}
                onClick={handleSave}
              >
                Save changes
              </Button>
              <span className="text-sm text-muted-foreground">{statusLabel}</span>
              {mutation.isError ? (
                <span className="text-sm text-destructive">
                  {(mutation.error as Error).message}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
};

export default Settings;
