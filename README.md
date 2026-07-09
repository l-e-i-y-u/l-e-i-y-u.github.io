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

The homepage footer uses a lightweight external SVG counter, so it works on
GitHub Pages without a separate backend:

```text
Last edited: July 8, 2026. [Views counter]
```

This is a simple page-view counter, not a unique-visitor analytics system.

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
