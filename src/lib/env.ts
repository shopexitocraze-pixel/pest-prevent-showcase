// Server-only environment access.
//
// Priority:
//   1. process.env            — real process env (local `vite dev` when vars are
//                               exported, and Cloudflare Workers secrets/vars in prod)
//   2. .env file on disk      — local development convenience
//
// SMTP/credentials must NEVER be exposed through `import.meta.env` or a `VITE_`
// prefix: Vite inlines every VITE_* value into the public client bundle.
//
// This module is imported only by server functions — do not import it from
// client components.
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

let fileEnv: Record<string, string> | undefined;

function loadDotEnvFile(): Record<string, string> {
  if (fileEnv) return fileEnv;
  fileEnv = {};
  try {
    const path = resolve(process.cwd(), ".env");
    if (!existsSync(path)) return fileEnv;
    for (const rawLine of readFileSync(path, "utf8").split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      if (!key) continue;
      let value = line.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"') && value.length > 1) ||
        (value.startsWith("'") && value.endsWith("'") && value.length > 1)
      ) {
        value = value.slice(1, -1);
      }
      fileEnv[key] = value;
    }
  } catch {
    // Missing/unreadable .env is not fatal — process.env may still have the value.
  }
  return fileEnv;
}

export function serverEnv(key: string): string | undefined {
  try {
    const runtime = typeof process !== "undefined" && process.env ? process.env[key] : undefined;
    if (runtime && runtime.trim() !== "") return runtime;
  } catch {
    // process may be unavailable in some runtimes.
  }
  return loadDotEnvFile()[key];
}
