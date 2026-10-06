/*jshint node:true */
/**
 * Stylelint configuration.
 *
 * Extends the Wikimedia standard. The rules switched off below are those the
 * existing stylesheets (inherited from the upstream Fluent skin: 2-space
 * indentation, compact blocks, !important, ID selectors, etc.) already violate.
 * Everything else is enforced, so new syntax errors and regressions in the
 * remaining rules still fail `npm test`. Re-enable a rule after cleaning up
 * the stylesheets.
 */
module.exports = {
	extends: 'stylelint-config-wikimedia',
	rules: {
		'at-rule-empty-line-before': null,
		'block-closing-brace-empty-line-before': null,
		'block-closing-brace-newline-before': null,
		'block-closing-brace-space-after': null,
		'block-closing-brace-space-before': null,
		'block-opening-brace-newline-after': null,
		'block-opening-brace-newline-before': null,
		'block-opening-brace-space-after': null,
		'block-opening-brace-space-before': null,
		'color-hex-case': null,
		'color-hex-length': null,
		'color-named': null,
		'declaration-block-no-shorthand-property-overrides': null,
		'declaration-block-semicolon-newline-after': null,
		'declaration-block-single-line-max-declarations': null,
		'declaration-colon-space-after': null,
		'declaration-empty-line-before': null,
		'declaration-no-important': null,
		'declaration-property-value-disallowed-list': null,
		'font-family-name-quotes': null,
		'font-family-no-missing-generic-family-keyword': null,
		'font-weight-notation': null,
		'function-comma-newline-after': null,
		'function-comma-space-after': null,
		'function-disallowed-list': null,
		'function-parentheses-space-inside': null,
		'function-url-quotes': null,
		'indentation': null,
		'length-zero-no-unit': null,
		'max-empty-lines': null,
		'media-feature-colon-space-after': null,
		'media-feature-parentheses-space-inside': null,
		'no-descending-specificity': null,
		'no-duplicate-selectors': null,
		'no-missing-end-of-source-newline': null,
		'number-leading-zero': null,
		'number-no-trailing-zeros': null,
		'rule-empty-line-before': null,
		'selector-attribute-brackets-space-inside': null,
		'selector-attribute-quotes': null,
		'selector-list-comma-newline-after': null,
		'selector-max-empty-lines': null,
		'selector-max-id': null,
		'selector-pseudo-class-parentheses-space-inside': null,
		'selector-pseudo-element-colon-notation': null,
		'selector-type-case': null,
		'string-quotes': null,
		'value-list-comma-newline-after': null,
		'value-list-comma-space-after': null
	}
};
