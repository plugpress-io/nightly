<?php

namespace Nightly;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const VERSION = '1.0.2';
const PLUGIN_SLUG = 'nightly';
const TEXT_DOMAIN = 'nightly';
const OPTION_KEY = 'nightly_options';
const OPTION_REVIEW_DISMISSED = 'nightly_review_dismissed';
const OPTION_REVIEW_VISIBLE = 'nightly_review_visible';
const REST_NAMESPACE = 'nightly/v1';

function plugin_file() : string {
	return dirname( __DIR__ ) . '/nightly.php';
}

function plugin_dir() : string {
	return dirname( __DIR__ ) . '/';
}

function plugin_url() : string {
	return plugin_dir_url( plugin_file() );
}
