export type NightlyConfig = {
  restUrl: string;
  nonce: string;
  pluginUrl: string;
};

declare global {
  interface Window {
    NightlyConfig?: NightlyConfig;
  }
}

const config = window.NightlyConfig;

if (!config) {
  // eslint-disable-next-line no-console
  console.warn('NightlyConfig is not available');
}

export const apiFetch = async <T>(path: string, options: RequestInit = {}) => {
  if (!config) {
    throw new Error('NightlyConfig is missing.');
  }

  const response = await fetch(`${config.restUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': config.nonce,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || 'Request failed');
  }

  return (await response.json()) as T;
};
