# @hikasami/api-ui

Dark API Reference UI for OpenAPI 3.x — Layout with sidebar navigation, documentation panel and live **Try It** panel.

## Features

- Dark theme with customisable accent colour
- 3-column layout: sidebar / docs / Try It
- JWT Bearer token manager (saved to `localStorage`)
- Resizable response panel (drag-to-resize, height persisted)
- Syntax-highlighted JSON responses with Copy button
- Live search across all endpoints
- Zero dependencies — pure vanilla JS + CSS

## Quick start

### Via unpkg CDN

```html
<link rel="stylesheet"
  href="https://unpkg.com/@hikasami/api-ui/dist/api-ui.min.css" />
<script
  src="https://unpkg.com/@hikasami/api-ui/dist/api-ui.min.js"></script>

<div id="hau-root"></div>
<script>
  HikasamiApiUI.init({
    specUrl:     '/openapi.json',
    appName:     'My API',
    accentColor: '#0B8AFC',
  });
</script>
```

### Local (copy `dist/` folder)

```html
<link rel="stylesheet" href="dist/api-ui.min.css" />
<script src="dist/api-ui.min.js"></script>

<div id="hau-root"></div>
<script>
  HikasamiApiUI.init({ specUrl: '/openapi.json' });
</script>
```

## Configuration

| Option        | Type     | Default                  | Description                                  |
|---------------|----------|--------------------------|----------------------------------------------|
| `specUrl`     | `string` | `'/openapi.json'`        | URL to your OpenAPI 3.x JSON spec            |
| `appName`     | `string` | `'API Reference'`        | Name shown in the header                     |
| `logoSvg`     | `string` | built-in layers icon     | Inline SVG for the logo icon                 |
| `logoImgUrl`  | `string` | `null`                   | URL to a logo image (overrides `logoSvg`)    |
| `faviconUrl`  | `string` | `null`                   | URL to a custom favicon (default: `dist/favicon.ico` auto-detected) |
| `accentColor` | `string` | `'#0B8AFC'`              | CSS colour for buttons, active states, etc.  |
| `tokenKey`    | `string` | `'hau_jwt'`              | `localStorage` key used to persist JWT token |
| `mountId`     | `string` | `'hau-root'`             | ID of the DOM element to mount into          |

## Theming

Override any CSS custom property **before** loading the stylesheet:

```css
:root {
  --hau-accent:  #7c3aed;   /* purple accent */
  --hau-bg:      #090909;   /* main background */
  --hau-sb:      300px;     /* sidebar width */
}
```

## File structure

```
├── dist/
│   ├── api-ui.css      ← styles (source)
│   ├── api-ui.min.css  ← minified styles
│   ├── api-ui.js       ← runtime (source)
│   ├── api-ui.min.js   ← minified runtime
│   └── favicon.ico      ← default favicon
├── index.html                ← demo / usage example
├── package.json
└── README.md
```

## Fonts

The UI uses **Inter** and **JetBrains Mono** from Google Fonts.  
Add the following to your `<head>` (or self-host):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

## License

MIT
