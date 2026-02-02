<?php

namespace Nightly;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function uninstall() : void {
	delete_option( OPTION_KEY );
	delete_option( OPTION_REVIEW_DISMISSED );
	delete_option( OPTION_REVIEW_VISIBLE );
}
