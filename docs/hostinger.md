# Deploying Ketesa on Hostinger

Ketesa is a static single-page application built with [Vite](https://vitejs.dev/). There are
two ways to put it on Hostinger:

- **A. Static upload** — build it, upload `dist/` to `public_html`. Works on any Hostinger
  plan, no framework detection involved. **Most reliable.**
- **B. Node.js Web App** — let Hostinger build and serve it from your Git repo.

> **Why the "Unsupported framework or invalid project structure" error happens**
>
> Ketesa uses a non-standard Vite layout: its entry HTML lives in `src/entrypoints/` and the
> build is wired up explicitly in `vite.config.ts`. Hostinger's Web App detector expects the
> conventional Vite shape with an `index.html` at the project root, so detection failed.
>
> The repository now ships a root [`index.html`](../index.html) purely to satisfy that
> detection (the real build ignores it), plus a [`public/.htaccess`](../public/.htaccess) that
> Vite copies into `dist/` for SPA routing. With these in place, both methods below work.

---

## Method A — Static upload to `public_html` (recommended)

1. Build locally (or in CI):

   ```sh
   npm install
   npm run build      # produces ./dist
   ```

2. In hPanel open **Files → File Manager** (or use FTP/SFTP) and upload the **contents of
   `dist/`** into `public_html` — keep the folder structure intact (so `index.html`,
   `assets/`, `auth-callback/`, `config.json` and `.htaccess` all sit directly inside
   `public_html`).

   > Tip: zip the *contents* of `dist/` (not the `dist` folder itself), upload the zip into
   > `public_html`, and extract it there.

3. Open your domain. The bundled `.htaccess` handles client-side routing and the
   `/auth-callback` OIDC route, so deep links and refreshes resolve correctly.

That's the whole process — no Node.js runtime is involved; Hostinger's webserver
(LiteSpeed/Apache) serves the static files.

---

## Method B — Node.js Web App (build on Hostinger)

In hPanel go to **Websites → Node.js / Web Apps → Create application**, deploy from your Git
repository (or a `.zip` with `package.json` at its root), and set:

| Field | Value |
|-------|-------|
| Framework | **Vite** (or **Other** if Vite still isn't detected) |
| Node.js version | `20.x` (or newer; matches the `engines` field) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Root directory | the repository root (where `package.json` lives) |

Hostinger installs dependencies (including the dev dependencies needed to build), runs
`npm run build`, and serves `dist/`.

If you still hit **"Unsupported framework or invalid project structure"**:

- Select the framework **manually** as **Vite**, or use **Other** with output directory
  `dist` — that skips the framework-specific structure validation.
- Make sure `package.json` (and the root `index.html`) are at the **root** of the repo / zip,
  not inside a subfolder.
- Confirm the chosen Node.js version matches the `engines` field (`>=20`).

---

## Local verification

Reproduce the production build and preview it exactly as it will be served:

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

The base path is baked in at build time. To serve Ketesa under a subpath, build with
`npm run build -- --base=/my-prefix` and adjust the `.htaccess` `RewriteBase` / fallback paths
accordingly. See
[Serving Ketesa under a custom path](../README.md#%EF%B8%8F-serving-ketesa-under-a-custom-path).
