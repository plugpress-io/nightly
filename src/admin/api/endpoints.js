import { apiFetch } from './client';

export const getSettings = () => apiFetch('/options');

export const updateSettings = (payload) =>
  apiFetch('/options', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
