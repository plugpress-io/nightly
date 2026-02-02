<?php

namespace Nightly;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/constants.php';
require_once __DIR__ . '/options.php';
require_once __DIR__ . '/permissions.php';
require_once __DIR__ . '/sanitize.php';
require_once __DIR__ . '/admin.php';
require_once __DIR__ . '/assets.php';
require_once __DIR__ . '/rest.php';
require_once __DIR__ . '/notices.php';
require_once __DIR__ . '/uninstall.php';

function boot() : void {
	$services = array(
		new Admin(),
		new Assets(),
		new Rest_Routes(),
		new Notices(),
	);

	foreach ( $services as $service ) {
		if ( method_exists( $service, 'register' ) ) {
			$service->register();
		}
	}
}
