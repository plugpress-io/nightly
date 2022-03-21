<?php

/**
 * All Options
 */
function wp_nightly_options( $json = false ) {

    $prefix = 'wp_nightly_settings';

    $all_options = [

        'enabled'                 => get_option( $prefix . "_enabled" ),
        'os_aware'                => get_option( $prefix . "_os_aware" ),
        'schedule'                => get_option( $prefix . "_schedule" ),

        'enabled_switch'          => get_option( $prefix . "_switch" ),
        'switch_style'            => get_option( $prefix . "_switch_style" ),

        'enabled_theme'           => get_option( $prefix . "_theme" ),
        'theme_style'             => get_option( $prefix . "_theme_style" ),

        'enabled_admin_dashboard' => get_option( $prefix . "_admin_dashboard" ),
        'enabled_block_editor'    => get_option( $prefix . "_block_editor" ),

        'keyboard_shortcut'       => get_option( $prefix . "_keyboard_shortcut" ),
        'url_params'              => get_option( $prefix . "_url_params" ),

    ];

    if ( $json ) {
        return json_encode( $all_options );
    }

    return $all_options;

}

/**
 * Base64 SVG Nightly Icon
 */
function wp_nightly_base64_icon() {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MiA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMzLjI2NzIgNjkuNjMzMUMxNC45MzM3IDY5LjYzMzEgLTcuNjI5MzllLTA2IDU0LjcxMzggLTcuNjI5MzllLTA2IDM2LjM2NTlDLTcuNjI5MzllLTA2IDE4LjAxOCAxNC45MTkzIDMuMDk4NjMgMzMuMjY3MiAzLjA5ODYzQzM1LjQzMzQgMy4wOTg2MyAzNy41OTk2IDMuMzEzODIgMzkuNzIyNyAzLjcyOTg0TDQzLjk0MDMgNC41NjE4OEw0MC40NTQzIDcuMDg2NjlDMzUuOTIxMiAxMC4zNzE4IDMzLjIyNDIgMTUuNjY1MyAzMy4yMjQyIDIxLjI2MDFDMzMuMjI0MiAzMC45MTQ2IDQxLjA4NTUgMzguNzc1OSA1MC43NDAxIDM4Ljc3NTlDNTUuNTAyOCAzOC43NzU5IDU5Ljk0OTkgMzYuODk2NyA2My4yNjM3IDMzLjQ5NjhMNjYuMjc2MyAzMC4zOTgyTDY2LjQ3NzEgMzQuNzE2MUM2Ni41MDU4IDM1LjI0NjkgNjYuNTIwMSAzNS43OTIxIDY2LjUyMDEgMzYuMzUxNUM2Ni41MjAxIDU0LjcxMzggNTEuNjAwOCA2OS42MzMxIDMzLjI2NzIgNjkuNjMzMVpNMzMuMjY3MiA2Ljg1NzE2QzE2Ljk5OTQgNi44NTcxNiAzLjc1ODUyIDIwLjA5ODEgMy43NTg1MiAzNi4zNjU5QzMuNzU4NTIgNTIuNjMzNyAxNi45OTk0IDY1Ljg3NDYgMzMuMjY3MiA2NS44NzQ2QzQ4LjY4ODcgNjUuODc0NiA2MS4zODQ1IDUzLjk4MjIgNjIuNjc1NSAzOC44OTA3QzU5LjE4OTYgNDEuMjU3NyA1NS4wNzI0IDQyLjUzNDUgNTAuNzU0NCA0Mi41MzQ1QzM5LjAxOTggNDIuNTM0NSAyOS40OCAzMi45OTQ3IDI5LjQ4IDIxLjI2MDFDMjkuNDggMTUuOTA5MiAzMS41MTcxIDEwLjc4NzggMzUuMDc0OCA2LjkwMDJDMzQuNDU3OSA2Ljg3MTUgMzMuODU1NCA2Ljg1NzE2IDMzLjI2NzIgNi44NTcxNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zMy4yNjczIDU5LjgwNjVDMjAuMzQxOSA1OS44MDY1IDkuODI2NjggNDkuMjkxMiA5LjgyNjY4IDM2LjM2NTlDOS44MjY2OCAyNi42NTQgMTUuNzY1NyAxOC4zMDQ5IDI0LjIwMDkgMTQuNzQ3M0MyMy42ODQ1IDE2Ljg1NiAyMy40MTE5IDE5LjA1MDkgMjMuNDExOSAyMS4yNjAxQzIzLjQxMTkgMzYuMzM3MyAzNS42NzczIDQ4LjYwMjcgNTAuNzU0NCA0OC42MDI3QzUxLjYxNTIgNDguNjAyNyA1Mi40NzU5IDQ4LjU1OTYgNTMuMzIyMyA0OC40ODc5QzQ5LjIwNTEgNTUuMjczMyA0MS43NTk4IDU5LjgwNjUgMzMuMjY3MyA1OS44MDY1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTUwLjczOTkgNDIuNTQ4OEMzOS4wMDUzIDQyLjU0ODggMjkuNDY1NSAzMy4wMDkxIDI5LjQ2NTUgMjEuMjc0NEMyOS40NjU1IDE0LjQ4OSAzMi43NTA3IDguMDQ3ODYgMzguMjQ1IDQuMDU5ODFDNDEuODc0NCAxLjQwNTg5IDQ2LjE5MjQgMy4wNTE3NmUtMDUgNTAuNzI1NiAzLjA1MTc2ZS0wNUM2Mi40NjAyIDMuMDUxNzZlLTA1IDcyIDkuNTM5OCA3MiAyMS4yNzQ0QzcyIDI2Ljg2OTIgNjkuODQ4MiAzMi4xNDgzIDY1LjkzMTggMzYuMTM2NEM2MS45MTUxIDQwLjI2NzkgNTYuNTIxMiA0Mi41NDg4IDUwLjczOTkgNDIuNTQ4OFpNNTAuNzM5OSAzLjc1ODU1QzQ3LjAxMDEgMy43NTg1NSA0My40NTI0IDQuOTIwNTQgNDAuNDU0MiA3LjEwMTA2QzM1LjkyMSAxMC4zODYyIDMzLjIwOTcgMTUuNjk0IDMzLjIwOTcgMjEuMjc0NEMzMy4yMDk3IDMwLjkyOSA0MS4wNzExIDM4Ljc5MDMgNTAuNzI1NiAzOC43OTAzQzU1LjQ4ODMgMzguNzkwMyA1OS45MzU0IDM2LjkxMSA2My4yNDkyIDMzLjUxMTFDNjYuNDc3IDMwLjIyNiA2OC4yNDE1IDI1Ljg3OTMgNjguMjQxNSAyMS4yNjAxQzY4LjI3MDIgMTEuNjE5OSA2MC40MDg4IDMuNzU4NTUgNTAuNzM5OSAzLjc1ODU1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
}