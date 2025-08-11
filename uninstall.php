<?php
/**
 * Uninstall Nightly Plugin
 *
 * This file is executed when the plugin is uninstalled via the WordPress admin.
 * It handles cleanup of all plugin data, options, and any other traces.
 *
 * @package Nightly
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

/**
 * Clean up plugin data on uninstall
 */
function nightly_uninstall_cleanup() {
    // Remove plugin options
    delete_option('nightly_settings');
    
    // Remove any transients
    delete_transient('nightly_cache');
    
    // Remove user meta (if we stored any user-specific preferences)
    delete_metadata('user', 0, 'nightly_user_preference', '', true);
    
    // Clean up any custom database tables (if we had any)
    // Note: This plugin doesn't create custom tables, but this is where you'd clean them up
    
    // Remove any uploaded files or directories (if any)
    // This plugin doesn't create files, but this is where you'd clean them up
    
    // Clear any cached data
    wp_cache_flush();
    
    // Remove any scheduled cron jobs (if any)
    wp_clear_scheduled_hook('nightly_cleanup_cron');
}

/**
 * Only run cleanup if this is a single site or if we're on the main site of a multisite
 */
if (!is_multisite()) {
    // Single site cleanup
    nightly_uninstall_cleanup();
} else {
    // Multisite cleanup - run for each site
    global $wpdb;
    
    $blog_ids = $wpdb->get_col("SELECT blog_id FROM $wpdb->blogs");
    $original_blog_id = get_current_blog_id();
    
    foreach ($blog_ids as $blog_id) {
        switch_to_blog($blog_id);
        nightly_uninstall_cleanup();
    }
    
    switch_to_blog($original_blog_id);
    
    // Clean up any network-wide options (if any)
    delete_site_option('nightly_network_settings');
}