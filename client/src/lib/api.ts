const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

type ApiEnvelope<T> = {
  response?: T;
  message?: string;
  error?: string;
};

type ApiResult<T extends object> = ApiEnvelope<T> & Partial<T>;

type User = {
  id?: number;
  name: string;
  email: string;
};

type AuthResponse = {
  user: User;
};

export const queryKeys = {
  videoToken: (callToken: string) => ["video-token", callToken] as const,
};

async function parseResponse<T extends object>(
  response: Response,
  fallbackError: string,
) {
  const data = (await response.json().catch(() => null)) as ApiResult<T> | null;

  if (!response.ok) {
    const envelope = data as ApiEnvelope<T> | null;
    const errorMsg =
      envelope?.message ||
      envelope?.error ||
      `${fallbackError} with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

function requireApiResponse<T extends object>(
  data: ApiResult<T> | null,
  fallbackError: string,
) {
  if (!data?.response) {
    throw new Error(fallbackError);
  }
  return data.response;
}

export async function fetchWithAuth<T extends object = Record<string, unknown>>(
  endpoint: string,
  options: RequestInit = {},
) {
  const headers = new Headers(options.headers);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });
  return parseResponse<T>(response, "API request failed");
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await parseResponse<AuthResponse>(response, "Login failed");

  return requireApiResponse(data, "Login failed");
}

export async function signupUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await parseResponse<AuthResponse>(response, "Sign up failed");

  return requireApiResponse(data, "Sign up failed");
}

export async function getVideoToken(callToken: string) {
  const data = await fetchWithAuth<{ token?: string }>(
    `/video/token/${encodeURIComponent(callToken)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
  );
  return data?.response?.token || data?.token;
}

export async function getUsers(search?: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const data = await fetchWithAuth<{ users?: unknown[] }>(
    `/calls/get-users${query}`,
  );
  return data?.response || [];
}

export async function createCall(
  title: string,
  recipients?: Array<{ id?: string; email?: string }>,
) {
  const data = await fetchWithAuth<{
    call?: {
      id?: number;
      roomName?: string;
      title?: string | null;
      token?: string;
    };
    token?: string;
    roomUrl?: string;
    invites?: unknown[];
  }>("/calls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title || undefined, recipients }),
  });

  return data?.response || data;
}
