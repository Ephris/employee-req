const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const authTokenKey = 'auth_token';

export const authStorage = {
  getToken: () => localStorage.getItem(authTokenKey),
  setToken: (token: string) => localStorage.setItem(authTokenKey, token),
  clearToken: () => localStorage.removeItem(authTokenKey),
};

const parseJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const payloadSegment = token.split('.')[1];
    if (!payloadSegment) return null;
    const payloadJson = atob(payloadSegment.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(payloadJson) as Record<string, unknown>;
  } catch (_error) {
    return null;
  }
};

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  const payload = parseJwtPayload(token);
  const exp = payload?.exp;
  if (typeof exp !== 'number') return false;
  return Date.now() >= exp * 1000;
};

export const getValidToken = (): string | null => {
  const token = authStorage.getToken();
  if (isTokenExpired(token)) {
    authStorage.clearToken();
    return null;
  }
  return token;
};

type RequestOptions = RequestInit & {
  auth?: boolean;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const getErrorMessage = (error: unknown, fallback = 'Something went wrong') => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export const apiFetch = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (options.auth) {
    const token = getValidToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = (payload as { message?: string }).message || 'Request failed';
    throw new ApiError(message, response.status);
  }

  return payload as T;
};

export const adminLogin = async (username: string, password: string) => {
  return apiFetch<{ token: string; user: { username: string; role: string } }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};

