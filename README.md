

# Julio Sebastián De La Trinidad Rendón

Static personal academic website for GitHub Pages.

## Structure

- `index.html` contains the page content.
- `css/style.css` contains the site styling.
- `js/script.js` handles active navigation state.
- `images/` contains profile and project images.
- `assets/cv/JulioDeLatrinidad_CV.pdf` is the downloadable CV.

## Local Preview

Run a local static server from the repository root:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy

Push changes to `main`. The GitHub Actions workflow in `.github/workflows/pages.yml` uploads the repository root as a GitHub Pages artifact and deploys it.
