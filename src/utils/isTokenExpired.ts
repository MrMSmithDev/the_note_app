import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token: string): boolean {
  if (!token) return true;
  try {
    const { exp }: { exp: number } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (err) {
    return true;
  }
}