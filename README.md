# Lei Yu's Personal Homepage

A minimal static academic homepage for GitHub Pages.

## CV

The CV is kept in this repository:

- LaTeX source: `cv/lei_yu_cv_moderncv.tex`
- Public PDF used by the homepage: `assets/Lei-Yu-CV.pdf`

To update the CV, edit the LaTeX source and rebuild the PDF:

```sh
make cv
```

This requires `xelatex` to be installed, for example through MacTeX. The build output goes into
`cv/build/`, and the generated PDF is copied to `assets/Lei-Yu-CV.pdf` so the
homepage link stays stable.

## Local Preview

Open `index.html` directly in a browser, or run a small local server:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Visitor Counter

The homepage footer is prepared for a minimal view counter:

```text
Last edited: July 8, 2026. Views: 1,234.
```

The static page calls the endpoint configured in `index.html`:

```html
data-view-counter-endpoint="/api/views"
```

For a custom domain proxied through Cloudflare, route `/api/views` to the Worker
in `worker/visitor-counter.js`. For a plain GitHub Pages URL, deploy the Worker
to a `workers.dev` URL and replace `/api/views` with that full URL.

The Worker uses a Cloudflare KV binding named `VIEW_COUNTER`. To deploy it:

```sh
cd worker
cp wrangler.toml.example wrangler.toml
npx wrangler kv namespace create VIEW_COUNTER
```

Copy the generated namespace id into `wrangler.toml`, then deploy:

```sh
npx wrangler deploy
```

If the counter service is unavailable, the page silently keeps the original
minimal footer without showing a broken counter.

This is a lightweight page-view counter, not a unique-visitor analytics system.
Very close concurrent loads may be approximate when backed only by KV.

## GitHub Pages

For a user site, create a repository named:

```text
<username>.github.io
```

Push these files to the repository's `main` branch. GitHub Pages will publish the
site at:

```text
https://<username>.github.io
```

For a project site, push to any repository and enable GitHub Pages from
`Settings -> Pages`, using the `main` branch and root directory.
