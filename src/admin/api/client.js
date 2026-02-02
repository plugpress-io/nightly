const config = window.NIGHTLY;

if (!config) {
  // eslint-disable-next-line no-console
  console.warn('Nightly config is not available');
}

export const apiFetch = async (path, options = {}) => {
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

  return response.json();
};
