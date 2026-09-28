<?php

namespace MediaWiki\Skin\Fluent;

use MediaWiki\Preferences\Hook\GetPreferencesHook;

/**
 * Hook handlers for the Fluent skin
 */
class Hooks implements GetPreferencesHook {
	/**
	 * Register the API-only theme preference used by the theme toggle
	 * for logged-in users (anonymous users use the client preference cookie).
	 *
	 * @inheritDoc
	 */
	public function onGetPreferences( $user, &$preferences ) {
		$preferences[SkinFluent::THEME_OPTION] = [
			'type' => 'api',
		];
	}
}
