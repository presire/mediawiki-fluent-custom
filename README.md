## <div align="center"><b><a href="README.md">English</a> | <a href="README-ja.md">日本語</a></b></div>

<div align="center">

[![download](https://img.shields.io/github/downloads/immewnity/mediawiki-fluent/total.svg?color=green)](https://github.com/immewnity/mediawiki-fluent/releases)
[![Open issue](https://img.shields.io/github/issues/immewnity/mediawiki-fluent?color=red)](https://github.com/immewnity/mediawiki-fluent/issues)
[![Closed issue](https://img.shields.io/github/issues-closed/immewnity/mediawiki-fluent?color=blue)](https://github.com/immewnity/mediawiki-fluent/issues)

</div>

# Fluent skin for MediaWiki

This is a [MediaWiki skin](https://www.mediawiki.org/wiki/Manual:Skins) based on [Microsoft's Fluent design system](https://en.wikipedia.org/wiki/Fluent_Design_System).

To install, place the skin in a "Fluent" folder in \skins and add `wfLoadSkin( 'Fluent' );` to LocalSettings.

## Recent Updates

### Code Improvements
* **`common-styles.less`** - Comprehensive light/dark mode styling system supporting three modes (light, dark, auto). Includes responsive design based on screen height (FHD, WQHD), enhanced syntax highlighting for code blocks with proper color schemes, modernized table styling with gradient headers and hover effects, redesigned table of contents with gradient backgrounds, and improved mathematical formula rendering with proper dark mode inversion filters.

* **`theme-toggle.less`** - Complete theme switching UI with SVG icons (sun for light, moon for dark, monitor for auto mode). Fully integrated WikiEditor toolbar styling that adapts to all three theme modes, including proper icon color inversion, background adjustments, and special character palette dark mode support. Features smooth transitions and hover effects for better user experience.

* **`main.js`** - Enhanced JavaScript functionality for improved user interactions, including better focus management for edit mode, smooth scrolling to content areas, dropdown menu toggles, sidebar expansion controls, and Visual Editor surface adjustments. Added automatic image display switching between light and dark modes.

* **`screen-common.less`** - Improved responsive design support with better mobile/tablet layouts and adaptive spacing.

* **`variables.less`** - Refined theme color variables and consistent design tokens for easier customization and maintenance.

## Known issues

* Have only tested in 1.35, known issue in 1.39 - needs to be migrated to [SkinMustache](https://www.mediawiki.org/wiki/Manual:How_to_make_a_MediaWiki_skin/Migrating_SkinTemplate_based_skins_to_SkinMustache)
* Theme colors are hardcoded, should give a way to set this via LocalSettings
* Special:Preferences, Special:RecentChanges, and similar special pages are missing proper font and dark mode styles

## Desired improvements

* Some shadows and animations could be useful to better fit the Fluent design language
* Font and dark mode styles for SemanticMediaWiki

## License

This project is licensed under the MIT License - see the LICENSE file for details.
