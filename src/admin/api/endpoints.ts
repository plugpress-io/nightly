import { apiFetch } from './client';

export type SettingsResponse = {
  enabled: boolean;
  default_mode: 'system' | 'dark' | 'light';
  show_toggle: boolean;
  toggle_position: 'bottom-right' | 'bottom-left';
  exclude_selectors: string;
};

export const getSettings = () => apiFetch<SettingsResponse>('/options');

export const updateSettings = (payload: SettingsResponse) =>
  apiFetch<SettingsResponse>('/options', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
