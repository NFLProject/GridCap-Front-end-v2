// frontend/lib/auth.ts
export function getToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("gc_token") || "";
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("gc_token", token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("gc_token");
}
