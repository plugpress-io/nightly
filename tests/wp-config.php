<?php

/* Path to the WordPress codebase you'd like to test. Add a forward slash in the end. */
define( 'ABSPATH', dirname( dirname( __FILE__ ) ) . '/wordpress/' );

/*
 * Path to the theme to test with.
 *
 * The 'default' theme is symlinked from test/phpunit/data/themedir1/default into
 * the themes directory of the WordPress installation defined above.
 */
define( 'WP_DEFAULT_THEME', 'default' );

/*
 * Test with multisite enabled.
 * Alternatively, use the tests/phpunit/multisite.xml configuration file.
 */
// define( 'WP_TESTS_MULTISITE', true );

/* Force known bugs to be run.
 * Tests with an associated Trac ticket that is still open are normally skipped.
 */
// define( 'WP_TESTS_FORCE_KNOWN_BUGS', true );

// Test with WordPress debug mode (default).
define( 'WP_DEBUG', true );

// ** MySQL settings ** //

/*
 * This configuration file will be used by the copy of WordPress being tested.
 * wordpress/wp-config.php will be ignored.
 *
 * WARNING WARNING WARNING!
 * These tests will DROP ALL TABLES in the database with the prefix named below.
 * DO NOT use a production database or one that is shared with something else.
 */
define( 'DB_NAME', getenv( 'MYSQL_DATABASE' ) ? getenv( 'MYSQL_DATABASE' ) : 'wpnightly' );
define( 'DB_USER', getenv( 'MYSQL_USER' ) ? getenv( 'MYSQL_USER' ) : 'root' );
define( 'DB_PASSWORD', getenv( 'MYSQL_PASSWORD' ) ? getenv( 'MYSQL_PASSWORD' ) : '' );
define( 'DB_HOST', getenv( 'MYSQL_GITHUB_ACTION' ) ? '127.0.0.1:' . getenv( 'MYSQL_PORT' ) : 'localhost:/tmp/mysql.sock' );
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 */
define( 'AUTH_KEY', 's@2cbF%zY|ZOI@K)(ziPXA4mc,&W<,C+vfS+M7`ILj``n77_QnKcSzV0hchf#Fu2' );
define( 'SECURE_AUTH_KEY', 'vh}|?$=yN;mzo3H@vw~l6*kT)QF%iOuRKM!HE*mV*eUc+g_XtU5`H-4fB0l[T2iM' );
define( 'LOGGED_IN_KEY', 'YZ,w01;%Hlww,-|%PVK*w0JFmz,y<v{4I{JOw`LlTB3O1<>UK3Hp)[PWPz[aH_,g' );
define( 'NONCE_KEY', '5Dk.O`5?vqN*jUlcknYf=LXz7Bwu?Xlp=3{[DkI{HgB}Ydg% 8O-gn.9cD.X`W[u' );
define( 'AUTH_SALT', '/KH}?A>X:4MK(KOy[Fyo503q[{?c(~~%E!*`])H;|4H2=g@,8~K2tKbw&|eVaS*?' );
define( 'SECURE_AUTH_SALT', '$X#i2e:%-H,{2~(TY%/:M%%8J<?q)9$2PJ,!i|j{oBk==@PY^x)_;EHAisC$Zv.j' );
define( 'LOGGED_IN_SALT', 'Q#dz2Tpe> 00QB2*CP{6Mkj>Y=;9N9-2@=-b?|5!>Ea&JcC/v-4[8f^cqWV^CF+l' );
define( 'NONCE_SALT', 'a|=(EvZ:X*$p#!pL>gBn2-G@d?y3t{(8xTzH<`iRw47hXp~K}sv@h(}}Dj8jQwRs' );

$table_prefix = 'wptests_'; // Only numbers, letters, and underscores please!

define( 'WP_TESTS_DOMAIN', 'https://github.com/wppaw/wp-nightly' );
define( 'WP_TESTS_EMAIL', 'admin@wppaw.com' );
define( 'WP_TESTS_TITLE', 'WP Nightly Free Plugin Test' );
define( 'WP_PHP_BINARY', 'php' );
define( 'WPLANG', '' );