export type NightlyConfig = {
  restUrlBase: string;
  nonce: string;
};

declare global {
  interface Window {
    NIGHTLY?: NightlyConfig;
  }
}

const config = window.NIGHTLY;

if (!config) {
  // eslint-disable-next-line no-console
  console.warn('Nightly config is not available');
}

export const apiFetch = async <T>(path: string, options: RequestInit = {}) => {
  if (!config) {
    throw new Error('Nightly config is missing.');
  }

  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  const response = await fetch(`${config.restUrlBase}${normalizedPath}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json.',
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
