import { apiFetch } from './client';

export type SettingsResponse = {
  example_text: string;
  enable_feature: boolean;
};

export const getSettings = () => apiFetch<SettingsResponse>('/settings');

export const updateSettings = (payload: SettingsResponse) =>
  apiFetch<SettingsResponse>('/settings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
