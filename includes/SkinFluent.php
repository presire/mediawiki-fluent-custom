<?php

namespace MediaWiki\Skin\Fluent;

use MediaWiki\MediaWikiServices;
use MediaWiki\Output\OutputPage;
use SkinTemplate;

/**
 * SkinTemplate class for the Fluent skin
 *
 * @ingroup Skins
 */
class SkinFluent extends SkinTemplate {
	/** User option storing the theme of logged-in users */
	public const THEME_OPTION = 'fluent-theme';

	/** Allowed values; also the suffix of the core "skin-theme-clientpref-*" class */
	private const THEMES = [ 'day', 'night', 'os' ];

	/** Header colors (--accent-color in variables.less) for the theme-color meta tag */
	private const THEME_COLOR_DAY = '#CF8B54';
	private const THEME_COLOR_NIGHT = '#8B5A3C';

	/**
	 * Add CSS/JS via ResourceLoader.
	 * The viewport meta tag is added by core because skin.json sets "responsive": true.
	 *
	 * @param OutputPage $out
	 */
	public function initPage( OutputPage $out ) {
		parent::initPage( $out );

		$out->addMeta(
			'theme-color',
			$this->getThemePreference() === 'night' ? self::THEME_COLOR_NIGHT : self::THEME_COLOR_DAY
		);

		$out->addModuleStyles( [
			'mediawiki.skinning.elements',
			'skins.fluent'
		] );
		$out->addModules( [
			'skins.fluent.js'
		] );
	}

	/**
	 * Add the core night mode class. For anonymous users the startup script
	 * replaces it with the value stored in the client preference cookie.
	 *
	 * @inheritDoc
	 */
	public function getHtmlElementAttributes() {
		$attrs = parent::getHtmlElementAttributes();
		$attrs['class'] .= ' skin-theme-clientpref-' . $this->getThemePreference();
		return $attrs;
	}

	/**
	 * @return string One of self::THEMES
	 */
	private function getThemePreference(): string {
		$theme = MediaWikiServices::getInstance()->getUserOptionsLookup()
			->getOption( $this->getUser(), self::THEME_OPTION );
		return in_array( $theme, self::THEMES, true ) ? $theme : 'os';
	}
}
