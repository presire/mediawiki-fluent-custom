<div align="center">

<b><a href="README.md">English</a> | <a href="README_JP.md">日本語</a></b>

</div>

# Fluent Custom - A Customized Fluent Skin for MediaWiki

> **This project is a customized fork of [immewnity/mediawiki-fluent](https://github.com/immewnity/mediawiki-fluent).**  
> It is not the original skin, but an independently maintained, heavily modified version with additional features and enhancements.

A heavily customized version of [immewnity/mediawiki-fluent](https://github.com/immewnity/mediawiki-fluent),  
a [MediaWiki skin](https://www.mediawiki.org/wiki/Manual:Skins) based on [Microsoft's Fluent Design System](https://en.wikipedia.org/wiki/Fluent_Design_System).

This fork adds dark/light mode toggle, an enhanced table of contents with drag & drop, an image popup viewer,  
WikiEditor integration, and extensive theme customization.  

## Screenshots

| Dark Mode | Light Mode |
|:---------:|:----------:|
| ![Dark Mode](screenshots/DarkMode.png) | ![Light Mode](screenshots/LightMode.png) |

## Features

### Dark / Light Mode Toggle
- Manual toggle button in the header toolbar
- Automatic detection of system color scheme (`prefers-color-scheme`)
- User preference persisted in `localStorage`
- Smooth transition between themes
- Support for per-theme images via `.dark-mode-image` / `.light-mode-image` CSS classes

### Enhanced Table of Contents (TOC)
- **Drag & Drop** - Freely reposition the TOC anywhere on screen
- **Resize** - Drag left or bottom edge to resize (min 200px, max 50vw / 80vh)
- **Minimize / Restore** - Collapse the TOC to a compact bar
- **Persistent State** - Position, size, and minimized state saved in `localStorage`
- **Reset Button** - One-click reset to default position and size
- **Smart Scrolling** - Smooth scroll to sections with proper offset handling

### Image Popup Viewer
- Click any content image to open a full-screen overlay
- **Mouse wheel zoom** from 0.5x to 5x (0.1x increments)
- **Click & drag** to pan zoomed images
- Close via ESC key, overlay click, or close button
- Automatic full-size image URL resolution from thumbnails

### WikiEditor Integration
- **PageUp / PageDown** key handling in the source editor
- Auto-focus on editor textarea when editing
- Proper scroll management for long articles
- VisualEditor (VE) activation support

### Theme System
- 400+ CSS custom properties (`--variable-name`) for comprehensive theming
- Custom accent colors (Light: `#CF8B54` / Dark: `#8B5A3C`)
- Dedicated color schemes for search, navigation, content, editor, and tables
- Syntax highlighting color theme for code blocks

### Extension Integration
- **Echo** - Styled notification badges
- **VisualEditor** - Adapted editor surface and toolbar

### Other Enhancements
- Japanese localization (`ja.json`)
- Mobile responsive design (breakpoint: 750px)
- Gravatar user avatar support (configurable)
- Smart anchor navigation with browser history support
- Print stylesheet

## Installation

1. Download or clone this repository into the `skins/Fluent` directory of your MediaWiki installation:
   ```bash
   cd /path/to/mediawiki/skins
   git clone https://github.com/presire/mediawiki-fluent-custom.git Fluent
   ```

2. Add the following line to your `LocalSettings.php`:
   ```php
   wfLoadSkin( 'Fluent' );
   ```

3. (Optional) To disable Gravatar avatars:
   ```php
   $wgFluentDisableGravatar = true;
   ```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `$wgFluentDisableGravatar` | boolean | `false` | Disable Gravatar user avatars |

## Requirements

- MediaWiki >= 1.35

## Credits

- **Original skin**: [immewnity/mediawiki-fluent](https://github.com/immewnity/mediawiki-fluent) by [Matthew Verive (immewnity)](https://github.com/immewnity)
- **Customizations**: [presire](https://github.com/presire)

## License

[MIT License](LICENSE)
