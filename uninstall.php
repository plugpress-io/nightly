<?php
/**
 * Uninstall cleanup for Nightly.
 *
 * @package Nightly
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

require_once __DIR__ . '/includes/constants.php';
require_once __DIR__ . '/includes/uninstall.php';

Nightly\uninstall();
