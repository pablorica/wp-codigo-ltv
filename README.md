# Codigo Wordpress Project based in Laravel, TailwindCSs and Vue 3
A clean slate Wordpress application for wordpress.
Based in [sage](https://github.com/roots/sage?tab=readme-ov-file) and in [Nextly](https://github.com/web3templates/nextly-template)

[![version](https://img.shields.io/badge/version-0.1.0-yellow.svg)](https://semver.org)

## Installation

### Install Sage

[Read the docs to get started](https://roots.io/sage/docs/installation/)

---

## Set Up

### Fonts

The app includes an empty `resources/fonts/` directory for you to use for any custom fonts you'd like to include in your theme.

#### Step 1: Add Your Font File

The first step is to add your `.woff2` font file to the `resources/fonts/` directory. Since `.woff2` has excellent browser support, you likely won't need any other formats.

For this example, we’ll use **Public Sans**, downloaded via [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/), a handy tool for grabbing font files and CSS snippets from Google Fonts.

Project structure:

```
resources
├── css
│   ├── app.css
│   ├── fonts.css        # Create this file
│   └── editor.css
├── fonts
│   └── public-sans-v14-latin-regular.woff2
├── images
├── js
└── views
```

#### Step 2: Add the CSS

You can place the font CSS wherever you prefer, but we recommend creating a `css/fonts.css` file and importing it into both `app.css` and `editor.css`:

```css
/* In app.css and editor.css */
@import './fonts.css';
```

Then, define your `@font-face` in `fonts.css`:

```css
@font-face {
  font-display: swap;
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 400;
  src: url('@fonts/public-sans-v14-latin-regular.woff2') format('woff2');
}
```

#### Step 3: Add the Font to Tailwind

Finally, update your Tailwind theme by adding the font to your `app.css`:

```css
@theme {
  --font-sans: 'Public Sans', sans-serif;
}
```

For more details on customizing fonts with Tailwind, see the [Tailwind CSS documentation](https://tailwindcss.com/docs/font-family).

---

### SASS


#### 1. Install SASS:

```bash
npm install -D sass
```

#### 2. Add the SCSS files:

```
resources/scss/app.scss  
resources/scss/editor.scss
```

#### 3. Update `vite.config.js`:

```
 import { defineConfig } from 'vite'
 import tailwindcss from '@tailwindcss/vite';
 import laravel from 'laravel-vite-plugin'
 import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin';

 export default defineConfig({
   base: '/app/themes/sage/public/build/',
   plugins: [
     tailwindcss(),
     laravel({
       input: [
         'resources/css/app.css',
         'resources/scss/app.scss',
         'resources/js/app.js',
         'resources/css/editor.css',
         'resources/scss/editor.scss',
         'resources/js/editor.js',
       ],
     }),
     wordpressThemeJson({
       disableTailwindColors: false,
       disableTailwindFonts: false,
       disableTailwindFontSizes: false,
     }),
   ],
   resolve: {
    alias: {
      '@scripts': '/resources/js',
      '@styles': '/resources/css',
      '@scss': '/resources/scss',
      '@fonts': '/resources/fonts',
      '@images': '/resources/images',
    },
  },
 })
```


#### 4. Update Blade template directive (`resources/views/layouts/app.blade.php`):

```diff
- @vite(['resources/css/app.css', 'resources/js/app.js'])
+ @vite(['resources/css/app.css', 'resources/css/app.scss', 'resources/js/app.js'])
```


#### 5. Update `block_editor_settings_all` filter in `app/setup.php`:

```diff
add_filter('block_editor_settings_all', function ($settings) {
-    $style = Vite::asset('resources/css/editor.css');
+    $editorCss = Vite::asset('resources/css/editor.css');
+    $editorScss = Vite::asset('resources/scss/editor.scss'); 

    $settings['styles'][] = [
-        'css' => "@import url('{$style}')",
+        'css' => "@import url('{$editorCss}')",
    ];

+   $settings['styles'][] = [
+       'css' => "@import url('{$editorScss}')",
+   ];

    return $settings;
});
```


**NOTE:** If you want to replace Tailwind CSS totally with SASS follow these steps:

[SASS Setup (Replacing Tailwind CSS)](https://roots.io/sage/docs/sass/)


---


### VUE

#### 1. **Install Vue and the Vue plugin for Vite**

In your project root, run:

```bash
npm install vue
npm install -D @vitejs/plugin-vue
```


#### 2. **Update your `vite.config.js` to use the Vue plugin**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // ← Add this line

export default defineConfig({
  base: '/wp-content/themes/codigo/public/build/',
  plugins: [
    vue(), // ← Add this line
    tailwindcss(),
    ...
  ]
})
```


#### 3. **Create a Vue component and mount it**

Example: `resources/js/app.js` or wherever you're booting your JavaScript:

```js
import { createApp } from 'vue'
import Example from './vuecomponents/Example.vue';


if (document.getElementById("vueExample")) {
  const app = createApp(Example);
  app.mount('#vueExample');
}

```

Make sure you have a root element in your Blade or HTML file like:

```html
<div id="vueExample"></div>
```


#### 4. **Add a Vue component**

Create a file like `resources/js/vuecomponents/Example.vue`:

```vue
<template>
  <div>Hello from Vue!</div>
</template>

<script>
export default {
  name: 'Example'
}
</script>
```

#### 5. Run the dev server

Back in your theme folder:

```bash
npm run dev
```

You should see “Hello from Vue!” rendered in your theme!


---

## Local Setup: Importing Project Files and Database


### Get Plugins

Navigate to your `wp-content` directory and download the plugins archive:

```bash
cd /pennytunnell.localhost/wp-content
wget --user codigo --password sparemytime https://sparemytime.codigo.co.uk/plugins.tar.gz
mv plugins/ .plugins/
tar -xzvf plugins.tar.gz
rm -R .plugins/

```


### Get Media Files

Media files are stored here:

```bash
cd /pennytunnell.localhost/wp-content/themes/wp-codigo-ltv/_images
```

### Load Database

1. Navigate to the database folder:

```bash
cd /pennytunnell.localhost/wp-content/themes/wp-codigo-ltv/_database
```

2. Import the database using MySQL:

Database: wp-codigo-ltv.sql.gz


```bash
gunzip wp-codigo-ltv.sql.gz
mysql -u root -p sparemytime_penny < wp-codigo-ltv.sql
```

**Important!** Set the siteurl and homeurl to `pennytunnell.localhost` in the wp-config.php file:

```php
define('WP_HOME', 'http://pennytunnell.localhost');
define('WP_SITEURL', 'http://pennytunnell.localhost');
```


### Optional: Find & Replace the site URL with WP-CLI

1. Navigate to the project root:

```bash
cd pennytunnell.localhost/
```

2. Run a dry-run search and replace:

```bash
wp search-replace 'canvascareers.localhost' 'pennytunnell.localhost' --dry-run --allow-root --all-tables
```

3. If everything looks good, run it for real:

```bash
wp search-replace 'canvascareers.localhost' 'pennytunnell.localhost' --allow-root --all-tables
# ---> Success: Made 27 replacements..
```


###  Optional: Create a Database Backup

```bash
cd /pennytunnell.localhost/wp-content/themes/wp-codigo-ltv/_database

mysqldump -u root -proot pennytunnell | gzip > wp-codigo-ltv.sql.gz
```


---


## Plugins

### Installing ACF Composer

ACF Composer is the ultimate tool for creating fields, blocks, widgets, and option pages using ACF Builder alongside Sage 10.

See the [ACF Composer installation](https://github.com/Log1x/acf-composer?tab=readme-ov-file#installation).


#### Install via Composer:

```bash
composer require log1x/acf-composer
```

Start by publishing the `config/acf.php` configuration file using Acorn:

```bash
wp acorn vendor:publish --tag="acf-composer"
```


If you have this warning

```bash
INFO No publishable resources for tag [acf-composer].
```

try running this command first

```bash
$ wp acorn package:discover
INFO  Discovering packages.  
nesbot/carbon ......................................................... DONE
nunomaduro/termwind ................................................... DONE
roots/sage ............................................................ DONE
```

And try again:

```bash
$ wp acorn vendor:publish --tag="acf-composer"
INFO  Publishing [acf-composer] assets.
Copying file [vendor/log1x/acf-composer/config/acf.php] to [config/acf.php] ............. DONE
```

##### Generating a Field Group

To create your first field group, start by running the following generator command from your theme directory:   

```bash
wp acorn acf:field Example
```

This will create `app/Fields/Example.php` which is where you will create and manage your first field group.

##### Generating a Block

Generating a block is generally the same as generating a field as seen above.

Start by creating the block field using Acorn:

```bash
$ wp acorn acf:block Example
    
🎉 Example block successfully composed.
  ⮑  app/Blocks/Example.php
  ⮑  resources/views/blocks/example.blade.php
```

You may also pass --construct to the command above to generate a stub with the block properties set within an attributes method. This can be useful for localization, etc.

```bash
wp acorn acf:block Example --construct
```

When running the block generator, one difference to a generic field is an accompanied View is generated in the resources/views/blocks directory.

Like the field generator, the example block contains a simple list repeater and is working out of the box.

*Block Preview View*

While `$block->preview` is an option for conditionally modifying your block when shown in the editor, you may also render your block using a seperate view.

Simply duplicate your existing view prefixing it with `preview-` (e.g. `preview-example.blade.php`).



### Sage directives

[Sage Directives](https://log1x.github.io/sage-directives-docs/) adds a variety of useful Blade directives for use with Sage 10 including directives for WordPress, ACF, and various miscellaneous helpers.



#### Install Sage directives

```bash
composer require log1x/sage-directives
```

#### Sage directives Examples

[Wordpress](https://log1x.github.io/sage-directives-docs/usage/wordpress.html)

**`WP_Query`**

`@query` initializes a standard `WP_Query` as `$query` and accepts the usual `WP_Query` parameters as an array.

```blade
@query([
  'post_type' => 'post'
])

@posts
  <h2  class="entry-title">@title</h2>
  <div  class="entry-content">
    @content
  </div>
@endposts
```

[ACF](https://log1x.github.io/sage-directives-docs/usage/acf.html)

**`@field`**


`@field` echoes the specified field using `get_field()`.

```blade
@field('text')
```


**`@option`**


`@option` echoes the specified field using `get_option()`.

```blade
@option'text')
```


---


### Deploying 


1. **Build theme assets:**

   ```bash
   npm run build
   ```

2. **Install Composer dependencies (without dev packages):**

   ```bash
   composer install --no-dev --optimize-autoloader
   ```

3. **Upload your theme files:**

   Upload all files and folders in your theme directory **except** the `node_modules` folder to your host.


### Optimisation

Similar to deploying a Laravel app, Acorn supports an `optimize` command that caches your configuration and views. This command should be part of your deployment process:

```bash
wp acorn optimize
```

---

### Server Configuration


### Securing Blade Templates

By default, any file in the theme directory is publicly accessible in WordPress. This includes `*.blade.php` files, which — if accessed directly — can expose your view code as plain text. To avoid this, add a web server rule to block public access to `.blade.php` files.

#### Nginx

If you're using **Nginx**, add this to your site configuration **before the final `location` block**:

```nginx
location ~* \.(blade\.php)$ {
    deny all;
}
```

#### Apache

If you're using **Apache**, add this to your virtual host configuration or `.htaccess` file:

```apache
<FilesMatch ".+\.(blade\.php)$">
    # Apache 2.4
    <IfModule mod_authz_core.c>
        Require all denied
    </IfModule>

    # Apache 2.2
    <IfModule !mod_authz_core.c>
        Order deny,allow
        Deny from all
    </IfModule>
</FilesMatch>
```

**NOTE:** You can find more information about deploying a SAGE theme here

[Deployment](https://roots.io/sage/docs/deployment/)


---
