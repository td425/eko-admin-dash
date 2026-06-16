# Deploying Ketesa on Hostinger (Node.js hosting)

Ketesa is a static single-page application built with Vite. To make it deployable on
managed **Node.js** hosting such as [Hostinger](https://www.hostinger.com/), the repository
includes a tiny production server, [`server.js`](../server.js), that serves the built
`dist/` directory.

The server:

- listens on the port Hostinger provides via the `PORT` environment variable
  (defaults to `3000` locally) and binds to `0.0.0.0`;
- serves hashed assets from `dist/assets` with long-lived immutable caching;
- serves the static runtime `config.json`, favicon, manifests, etc.;
- handles the `/auth-callback` route used for OIDC logins;
- falls back to `index.html` for all client-side routes (SPA routing);
- exposes a `/health` endpoint for uptime checks.

## Prerequisites

- A Hostinger plan that offers **Node.js** application hosting.
- Node.js **20+** (declared in `package.json` via the `engines` field).

## One-time build

Hostinger runs `npm install` with production dependencies only, which does **not** include
the Vite build toolchain. Build the static assets in one of these ways:

- **Build on the server:** open the SSH terminal (or hPanel → *Run JS script*) and run
  `npm install` (including dev dependencies) followed by `npm run build`; or
- **Build locally / in CI:** run `npm install && npm run build` on your machine and upload
  the resulting `dist/` folder next to `server.js` and `package.json`.

The build produces a `dist/` directory — `server.js` will refuse to start (with a clear
message) if it is missing.

## Configure the Hostinger Node.js application

In hPanel go to **Websites → (your site) → Node.js** and set:

| Field | Value |
|-------|-------|
| Node.js version | `20` or newer |
| Application root | the directory where you uploaded the project |
| Application startup file | `server.js` |
| Application URL | your domain / subdomain |

Then:

1. Click **NPM Install**.
2. Ensure `dist/` exists (build step above).
3. Start / restart the application.

Hostinger sets `PORT` automatically and proxies your domain to the Node process. Open your
domain in the browser, enter your homeserver URL, and log in.

## Local verification

You can run the production server locally exactly as Hostinger does:

```sh
npm install
npm run build
npm run serve          # equivalent to: node server.js
# PORT=8080 npm run serve   # to choose a port
```

Then open <http://localhost:3000> (or the port you set).

## Runtime configuration

Ketesa is configured at runtime through `public/config.json` (copied to `dist/config.json`
during the build) and/or your homeserver's `/.well-known/matrix/client` file. See the main
[README](../README.md#%EF%B8%8F-configuration) for details. No rebuild is required to change
`config.json` — edit the file in `dist/` and restart is not even necessary, since it is read
by the browser on each load.

## Custom base path

The base path is baked in at build time. If you serve Ketesa under a subpath, build with
`npm run build -- --base=/my-prefix` before deploying. See
[Serving Ketesa under a custom path](../README.md#%EF%B8%8F-serving-ketesa-under-a-custom-path).
