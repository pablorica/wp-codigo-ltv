# Codigo Wordpress Project based in Laravel, TailwindCSs and Vue 3
A clean slate Wordpress application for wordpress.
Based in [sage](https://github.com/roots/sage?tab=readme-ov-file) and in [Nextly](https://github.com/web3templates/nextly-template)

[![version](https://img.shields.io/badge/version-0.0.8-yellow.svg)](https://semver.org)

## Installation


### Go to [root_folder] and clone the repository

    git clone https://github.com/pablorica/wp-codigo-ltv

### Compile files

    $ cd [root_folder]/wp-content/themes/codigo
    $ composer install --prefer-dist --optimize-autoloader
    $ yarn install
    
    	➤ YN0000: · Yarn 4.2.2
    	➤ YN0000: ┌ Resolution step
    	➤ YN0085: │ + @roots/bud-tailwindcss@npm:6.16.1, @roots/bud@npm:6.16.1, and 976 more.
    	➤ ...
    	➤ YN0000: · Done with warnings in 34s 39ms
    
    $ yarn build
    	
    	╭ sage [1a24dfc8407595fc] ./public
    	│
    	│ app
    	│ ◉ js/runtime.e97f88.js ✔ 1.22 kB
    	│ ◉ css/app.182da0.css ✔ 9.57 kB
    	│ ◉ js/app.c6fc6f.js ✔ 359 bytes
    	│
    	│ editor
    	│ ◉ js/runtime.e97f88.js ✔ 1.22 kB
    	│ ◉ css/editor.a5ebf3.css ✔ 2.94 kB
    	│ ◉ js/editor.7f4d85.js ✔ 1.67 kB
    	│
    	│ assets
    	│ ◉ fonts/Aeonik/Aeonik-Regular.c2876d.eot 98.41 kB
    	│ ◉ fonts/Aeonik/Aeonik-Bold.7fa62f.woff 48.8 kB
    	│ ◉ fonts/Aeonik/Aeonik-Regular.413ab3.woff 47.71 kB
    	│ ◉ fonts/Aeonik/Aeonik-Bold.f42057.woff2 36.44 kB
    	│ ◉ fonts/Aeonik/Aeonik-Regular.7ddd98.woff2 35.4 kB
    	│ … 11 additional assets not shown
    	│
    	╰ 3s 759ms 8 modules [0/8 modules cached]

#### *Error: React is not installed*

If you have this error when running `yarn`, it means that React is not installed as a devDependency.

	node:internal/process/esm_loader:42
	internalBinding('errors').triggerUncaughtException...
	Required package: react (via "react/package.json")
	...

To fix this we need both react and react-dom as devDependencies.

```$ npm install --save-dev react react-dom```

Once installed, try again:

```$ yarn install```


### Install required plugins (ACF)

Download the plugins folder from the staging server and copy it to the local installation.

[Plugins](https://wordpress.codigo.co.uk/plugins.tar.gz)

### Activate ACF and then the Codigo theme in the CMS

### Download the assets folder from the staging server and copy it to the local installation.

[Uploads](https://wordpress.codigo.co.uk/2024.tar.gz)

### Update the database

- Download the database from the test server and replace it in the local installation

	[Database](https://wordpress.codigo.co.uk/20240604.wordpress.STAGING.sql.gz)

	`mysql -u root -p wp_site < 20240603.wordpress.LOCAL.sql`
	
- Change db prefix using WP_CLI
	```
	wp package install iandunn/wp-cli-rename-db-prefix --allow-root
	wp rename-db-prefix 'wpsite_' --dry-run --allow-root
	## If the results are ok, remove the flag '--dry-run'
	wp rename-db-prefix 'wpsite_' --allow-root
	Warning: Use this at your own risk. If something goes wrong, it could break your site.
	Before running this, make sure to back up your `wp-config.php` file and run `wp db export`.
	Are you sure you want to rename wordpress.localhost's database prefix from `wp_` to `wpsite_`? [y/n]
	Success: Successfully renamed database prefix.
	```

- Find and replace using WP_CLI (wordpress.localhost is the local domain)

	```
	wp search-replace 'wordpress.localhost' 'wordpress.codigo.co.uk' --dry-run --allow-root --all-tables
	If the results are ok, remove the flag '--dry-run'
	wp search-replace 'wordpress.localhost' 'wordpress.codigo.co.uk' --allow-root --all-tables
	Success: Made 65 replacements.
	```



## Installation from scratch

### Installing Sage with Compose
See the [Sage installation documentation](https://roots.io/sage/docs/installation/).

Install Sage using Composer from your WordPress themes directory

    cd [root_folder]/wp-content/themes
    composer create-project roots/sage codigo

#### Build assets
You must build theme assets in order to access your site. 

**Run yarn from the theme directory to install dependencies**

    cd [root_folder]/wp-content/themes/codigo
    yarn

**Update bud.config.js with your local dev URL**

    app.setPublicPath('../');
    ...
    app
	    .setUrl('http://localhost:3000')
	    .setProxyUrl('https://wordpress.localhost')
	    .watch([
	    `resources/views`,
	    `resources/scripts`,
	    `resources/css`,
    ]);

**Compile assets**

    yarn build
    ...
    ╭ sage [776635f9d9aa3c07] ./public
    │
    │ app
    │ ◉ js/runtime.e97f88.js ✔ 1.22 kB
    │ ◉ css/app.194f0a.css ✔ 5.35 kB
    │ ◉ js/app.c6fc6f.js ✔ 359 bytes
    │
    │ editor
    │ ◉ js/runtime.e97f88.js ✔ 1.22 kB
    │ ◉ css/editor.ef46db.css ✔ ø
    │ ◉ js/editor.8c1474.js ✔ 1.67 kB
    │
    ╰ 2s 256ms 8 modules [0/8 modules cached]

    ✨ Done in 5.80s.

### Installing Acorn
See the [Acorn installation documentation](https://roots.io/acorn/docs/installation/).
 
Sage requires Acorn but doesn't ship with it included. This is to give you the flexibility to include it in a way that works best for your environment. There's a few different ways to install Acorn.

    cd [root_folder]/wp-content/themes/codigo
    composer require roots/acorn  

#### Add the autoload dump script

Acorn has a function that should be added to the scripts section of your composer.json file for the post-autoload-dump event. To automatically configure this script, run the following command:

    $ wp acorn acorn:init

  

### Go to CMS and select the Sage theme

Sage is ready to be used in your Wordpress installation. Go to the CMS and select the Sage theme.


## Quick Start

### Watch

```
clear
cd [root_folder]/wp-content/themes/codigo
yarn watch
```

Development URL:

http://localhost:3000/

Defined in `/bud.config.js`

```
...
  app
    .setUrl('http://localhost:3000')
    .setProxyUrl('https://wordpress.localhost')
    .watch([
        `resources/views`,
        `resources/scripts`,
        `resources/css`,
    ]);
...
```

### Build

```
clear
cd [root_folder]/wp-content/themes/codigo
yarn build
```

Localhost URL:

https://wordpress.localhost/

Defined in `/bud.config.js`

## Styling

### Tailwind Configuration File

    [root_folder]/wp-content/themes/codigo/tailwind.config.cjs

#### Compilation Errors

```
[sage] [@roots/bud-tailwindcss] › ✖  ReferenceError: require is not defined in ES module scope, you can use import instead 
This file is being treated as an ES module because it has a '.js' file extension and 'package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
```

  Solution: *Change file extension*

    [root_folder]/wp-content/themes/codigo/tailwind.config.js ---> [root_folder]/wp-content/themes/codigo/tailwind.config.cjs


### CSS Files

    [root_folder]/wp-content/themes/codigo/resources/styles/app.css
    [root_folder]/wp-content/themes/codigo/resources/styles/editor.css

### Set Up Fonts

Sage includes an empty `resources/fonts/` directory for you to use for any fonts you want to use in your theme.

The Sage extension in `jsconfig.json` also contains a @fonts alias that can be used to reference assets in the `fonts/` directory.

[Read more](https://roots.io/sage/docs/fonts-setup/) about setting up fonts in Sage.


## Plugins

### Installing ACF Composer

ACF Composer is the ultimate tool for creating fields, blocks, widgets, and option pages using ACF Builder alongside Sage 10.

See the [ACF Composer installation](https://github.com/Log1x/acf-composer?tab=readme-ov-file#installation).


#### Install via Composer:

    $ composer require log1x/acf-composer

Start by publishing the `config/acf.php` configuration file using Acorn:

    $ wp acorn vendor:publish --tag="acf-composer"

If you have this warning

    INFO No publishable resources for tag [acf-composer].
    
try running this command first

    $ wp acorn package:discover
      INFO  Discovering packages.  
      nesbot/carbon ......................................................... DONE
      nunomaduro/termwind ................................................... DONE
      roots/sage ............................................................ DONE

And try again:

    $ wp acorn vendor:publish --tag="acf-composer"
      INFO  Publishing [acf-composer] assets.
      Copying file [vendor/log1x/acf-composer/config/acf.php] to [config/acf.php] ............. DONE

##### Generating a Field Group

To create your first field group, start by running the following generator command from your theme directory:   

    $ wp acorn acf:field Example

This will create `src/Fields/Example.php` which is where you will create and manage your first field group.


### Sage directives

[Sage Directives](https://log1x.github.io/sage-directives-docs/) adds a variety of useful Blade directives for use with Sage 10 including directives for WordPress, ACF, and various miscellaneous helpers.



#### Install Sage directives

    $ composer require log1x/sage-directives


#### Sage directives Examples

[Wordpress](https://log1x.github.io/sage-directives-docs/usage/wordpress.html)

**`WP_Query`**

`@query` initializes a standard `WP_Query` as `$query` and accepts the usual `WP_Query` parameters as an array.

    @query([
	    'post_type' => 'post'
    ])
    
    @posts
	    <h2  class="entry-title">@title</h2>
	    <div  class="entry-content">
		    @content
	    </div>
    @endposts


[ACF](https://log1x.github.io/sage-directives-docs/usage/acf.html)

**`@field`**


`@field` echo's the specified field using `get_field()`.

    @field('text')




## Staging Folder

[root_folder]/wp-content/themes/codigo/public



## Required Plugins

* [Advanced Custom Fields](https://www.advancedcustomfields.com/pro/)


## Required libraries

* [SAGE](https://github.com/roots/sage?tab=readme-ov-file)
* [Acorn](https://roots.io/acorn/).
* [Nextly](https://github.com/web3templates/nextly-template)
* [ACF Composer](https://github.com/Log1x/acf-composer)
* [Sage Directives](https://log1x.github.io/sage-directives-docs/)


## Copyright and License

Copyright 2023 Codigo Wordpress Theme released under the [MIT](https://github.com/pablorica/wp-codigo-ltv/blob/main/LICENSE) license.

## Versioning

We use [SemVer](https://semver.org/) for versioning. For the versions available, [list of tags can be found in this page](https://github.com/pablorica/wordpress_codigo_theme/tags).

### Changelog

    0.0.8
        Update screenshot.png

    0.0.7
        Install Sage Directives for use with Sage 10.

    0.0.6
        Install ACF Composer to manage ACF 

    0.0.5
        Adding ACF functions

    0.0.4
        Adding Nextly Template files

    0.0.3
        Setting Up Tailwind
        Setting Up Bud

    0.0.2
        Installing Sage

    0.0.1
        Installing Wordpress
