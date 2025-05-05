<?php

/**
 * ACF fucntions for Codigo Theme
 * php version 8.0.0
 *
 * @package    Codigo
 * @author     Pablo Rica <pablo@codigo.co.uk>
 * @license    MIT
 * @since      Codigo 0.1.0
 */

 // Add custom colors to ACF color picker
add_action('acf/input/admin_enqueue_scripts', function () {
    wp_enqueue_script(
        'acf-custom-colors',
        get_template_directory_uri() . '/resources/js/acf-colors.js',
        'acf-input',
        '1.1',
        true
    );
    wp_enqueue_style(
        'acf-custom-colors',
        get_template_directory_uri() . '/resources/css/acf-custom.css',
        null,
        '1.1',
    );
});