# Local Development Guide

## Viewing the website locally

### Using Python's built-in HTTP server:

If Python is installed, start a simple static server from the repository root:

```powershell
cd C:\Users\Julio_2\GoogleFellowship\Webpage\JulesDeLaT-ITESM.github.io
python -m http.server 8000
```

Open `http://localhost:8000`.

### Using VS Code Live Server (recommended):

1. Install Visual Studio Code if you haven't already
2. Open VS Code and install the "Live Server" extension:
   - Click on the Extensions icon in the sidebar or press `Ctrl+Shift+X`
   - Search for `Live Server`
   - Install the extension by Ritwick Dey

3. Open your project folder in VS Code:
   - File > Open Folder...
   - Select this repository folder

4. Start the Live Server:
   - Right-click on `index.html` in the Explorer panel
   - Select `Open with Live Server`
   - Your website will open in your default browser at `http://127.0.0.1:5500/` or a similar port

Benefits of Live Server:
- Auto-refreshes when you save changes to your files
- Simulates a real server environment
- Provides a local development URL

### Using Node.js http-server:

If you prefer Node.js:

1. Install http-server globally (if not already installed):
   ```
   npm install -g http-server
   ```
2. Navigate to your project directory in the terminal
3. Run:
   ```
   http-server
   ```
4. Open your browser and go to the URL shown in the terminal, usually `http://localhost:8080`

## Testing before pushing to GitHub

1. Test the site on different browsers.
2. Check responsiveness using browser dev tools.
3. Validate your HTML at https://validator.w3.org/
4. Test page load performance with Lighthouse in Chrome DevTools.

After confirming everything works locally, push changes to `main` to deploy.
