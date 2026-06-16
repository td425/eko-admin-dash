# Deploying Ketesa on Hostinger (Node.js Web App)

Ketesa is a static single-page application built with [Vite](https://vitejs.dev/).
Hostinger's **Node.js Web Apps** support Vite as a first-class frontend framework: it runs
the build command for you and serves the generated `dist/` directory as static files. No
custom server is required.

## Prerequisites

- A Hostinger plan that offers **Node.js / Web Apps** hosting.
- Node.js **20.x or newer** (Vite 8 requires it; declared via the `engines` field in
  `package.json`). Hostinger supports `18.x`, `20.x`, `22.x`, and `24.x` — pick `20.x` or
  newer.

## Create the application

In hPanel go to **Websites → (your site) → Node.js / Web Apps → Create application** and
deploy either from your Git repository or by uploading a `.zip` whose **`package.json` is at
the archive root** (not inside a subfolder).

Use these settings:

| Field | Value |
|-------|-------|
| Framework | **Vite** |
| Node.js version | `20.x` (or newer) |
| Build command | `npm run build` |
| Output / publish directory | `dist` |
| Root directory | the repository root (where `package.json` lives) |

That's it — Hostinger installs dependencies (including the dev dependencies needed to build),
runs `npm run build`, and serves `dist/`.

## Fixing "Unsupported framework or invalid project structure"

This error means Hostinger's auto-detector could not classify the project. To resolve it:

- **Select the framework manually as `Vite`** instead of relying on auto-detection.
- Make sure `package.json` is at the **root** of the repository / zip.
- Set the **Build command** to `npm run build` and the **Output directory** to `dist`.
- Ensure the chosen Node.js version matches the `engines` field (`>=20`).
- Keep the project a pure frontend app — do not add a long-running server framework (such as
  Express) to `dependencies`, or detection may treat it as an ambiguous frontend+backend app.

If auto-detection still fails, choose the **"Other"** type and set the output directory to
`dist`; Hostinger will then build and serve the static output.

## Local verification

Reproduce the production build and preview it locally exactly as Hostinger serves it:

```sh
npm install
npm run build      # produces ./dist
npm run preview    # serves ./dist via Vite's static preview server
```

## Runtime configuration

Ketesa is configured at runtime through `public/config.json` (copied to `dist/config.json`
during the build) and/or your homeserver's `/.well-known/matrix/client` file. See the main
[README](../README.md#%EF%B8%8F-configuration) for details. Changing `config.json` does not
require a rebuild — it is read by the browser on each load.

## Custom base path

The base path is baked in at build time. To serve Ketesa under a subpath, set the build
command to `npm run build -- --base=/my-prefix`. See
[Serving Ketesa under a custom path](../README.md#%EF%B8%8F-serving-ketesa-under-a-custom-path).
