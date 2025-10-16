// frontend/lib/api.ts
import { getToken } from "./auth";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"; // fallback for local dev

// All backend routes are under /api/...
export async function api<T = any>(
  path: string,
  opts: { method?: string; body?: unknown; auth?: boolean } = {}
): Promise<T> {
  const { method = "GET", body, auth = false } = opts;

  // ensure path starts with /api
  const apiPath = path.startsWith("/api") ? path : `/api${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${apiPath}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    mode: "cors",
  });

  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const j = await res.json();
      msg = (j && (j.detail || j.message)) || msg;
    } catch {}
    throw new Error(msg);
  }

  try {
    return (await res.json()) as T;
  } catch {
    return null as T;
  }
}
