// Production Node.js server for Hostinger (and any Node host).
//
// Ketesa is a static single-page app built by Vite into ./dist.
// Hostinger's Node.js hosting runs an "Application startup file" with Node and
// expects the app to listen on the port provided via the PORT environment
// variable. This server serves the pre-built ./dist directory, transparently
// handling the SPA fallback (index.html) and the /auth-callback route.
//
// Usage:
//   1. Build the static assets:  npm run build   (produces ./dist)
//   2. Start the server:         node server.js   (or: npm run serve)
//
// On Hostinger set the "Application startup file" to server.js. The platform
// sets PORT automatically; locally it defaults to 3000.

import express from "express";
import compression from "compression";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "dist");

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const host = process.env.HOST ?? "0.0.0.0";

const app = express();

// Trust the reverse proxy Hostinger places in front of the Node app so that
// secure cookies / protocol detection behave correctly.
app.set("trust proxy", true);

// Gzip/brotli-friendly compression for text assets.
app.use(compression());

if (!existsSync(distDir)) {
  // Fail loudly with an actionable message instead of serving 404s forever.
  console.error(
    `[ketesa] Build output not found at ${distDir}.\n` +
      `[ketesa] Run "npm run build" before starting the server.`
  );
  process.exit(1);
}

// Lightweight health check endpoint (mirrors the old static-web-server one).
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

// Serve hashed build assets with long-lived immutable caching, and everything
// else (index.html, config.json, favicon, ...) with default short caching.
app.use(
  express.static(distDir, {
    index: false,
    redirect: false,
    setHeaders: (res, filePath) => {
      if (filePath.includes(`${join("assets")}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    },
  })
);

// Dedicated OIDC auth callback entrypoint.
app.get(/^\/auth-callback\/?$/, (_req, res) => {
  res.sendFile(join(distDir, "auth-callback", "index.html"));
});

// SPA fallback: any non-asset route is handled client-side by index.html.
app.use((_req, res) => {
  res.sendFile(join(distDir, "index.html"));
});

app.listen(port, host, () => {
  console.log(`[ketesa] Serving ${distDir} on http://${host}:${port}`);
});
