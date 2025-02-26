# Local Development Guide

## Viewing the website locally

### Using VS Code Live Server (recommended):

1. Install Visual Studio Code if you haven't already
2. Open VS Code and install the "Live Server" extension:
   - Click on the Extensions icon in the sidebar (or press Ctrl+Shift+X)
   - Search for "Live Server"
   - Install the extension by Ritwick Dey

3. Open your project folder in VS Code:
   - File > Open Folder... > Select your repository folder

4. Start the Live Server:
   - Right-click on `index.html` in the Explorer panel
   - Select "Open with Live Server"
   - Your website will open in your default browser at http://127.0.0.1:5500/ (or similar port)

Benefits of Live Server:
- Auto-refreshes when you save changes to your files
- Simulates a real server environment
- Provides a local development URL

### Using Python's built-in HTTP server:

If you have Python installed, you can start a simple HTTP server:

1. Open a command prompt or terminal
2. Navigate to your project directory:
   ```
   cd d:\JulesDeLaT-ITESM.github.io
   ```
3. Start the server:
   - Python 3.x: `python -m http.server`
   - Python 2.x: `python -m SimpleHTTPServer`
4. Open your browser and go to http://localhost:8000

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
4. Open your browser and go to the URL shown in the terminal (usually http://localhost:8080)

## Testing before pushing to GitHub

1. Test your website on different browsers (Chrome, Firefox, Edge, etc.)
2. Check responsiveness using your browser's dev tools (F12 > Toggle device toolbar)
3. Validate your HTML at https://validator.w3.org/
4. Test page load performance with Lighthouse (in Chrome DevTools)

After confirming everything works correctly locally, you can push your changes to GitHub.
