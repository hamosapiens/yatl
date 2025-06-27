// src/mocks/mockFetch.ts

export function setupMockFetch() {
  // Avoid double patching in dev
  if (typeof window === 'undefined' || (window as typeof window & { __FETCH_MOCKED__?: boolean }).__FETCH_MOCKED__) {
    return;
  }

  (window as typeof window & { __FETCH_MOCKED__?: boolean }).__FETCH_MOCKED__ = true;

  const originalFetch = window.fetch;

  window.fetch = async (
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> => {
    const url = typeof input === 'string' ? input : input.toString();
    const method = init?.method || 'GET';

    console.log('[Mocked fetch]', url, method);

    if (url.endsWith('/api/login') && method === 'POST') {
      const bodyText = init?.body?.toString() || '{}';
      const body = JSON.parse(bodyText) as { email: string; password: string };

      if (body.email === 'user@example.com' && body.password === 'password123') {
        return new Response(JSON.stringify({ token: 'fake-token' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return originalFetch(input, init);
  };
}
