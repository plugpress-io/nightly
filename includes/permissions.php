<?php

namespace Nightly;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Permissions {
	public static function can_manage() : bool {
		return current_user_can( 'manage_options' );
	}
}
