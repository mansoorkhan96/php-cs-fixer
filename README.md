# PHP CS Fixer (php-cs-fixer)

This extension adds support for running `php-cs-fixer fix` on PHP files in Visual Studio Code. This extension supports `PHP8`  and `PSR12` style to fix PHP files.

![demo](simple-demo.gif)

## Getting Started

As long as PHP 7+ is installed on your system and in your PATH, the extension should work out of the box.

I have included v3 of `php-cs-fixer` file from [cs.symfony.com](https://cs.symfony.com/). You can download and override this file using this option: `php-cs-fixer.toolPath": "path\\php-cs-fixer.phar`

## Extension Settings

This extension contributes the following settings:

* `php-cs-fixer.toolPath`: The path to the php-cs-fixer tool (default: "")
* `php-cs-fixer.useCache`: Use a cache file when fixing files (--using-cache) (default: false)
* `php-cs-fixer.allowRisky`: Determines whether risky rules are allowed (--allow-risky) (default: false)
* `php-cs-fixer.config`: Path to a .php-cs-fixer.php file (--config) (default: "")
* `php-cs-fixer.rules`: Rules to use when fixing files (--rules) (default: "@PSR12,@PSR1,@PSR2,@Symfony,-yoda_style")
* `php-cs-fixer.fixOnSave`: Runs fix command on save (default: true)

### How to use custom `php-cs-fixer.phar` file?

You can easily override the default `php-cs-fixer` file.

```json
"php-cs-fixer.toolPath": "path\\php-cs-fixer.phar",
```

I am on Windows OS; this is how I am doing it.

```json
"php-cs-fixer.toolPath": "C:\\Users\\Jawad\\.vscode\\php-cs-fixer-v3.phar",
```

### How to use custom `.php-cs-fixer.php` file?

You can add a custom `.php-cs-fixer.php` config file and the extension will use your custom settings to fix the PHP files.

Open `settings.json` file (Ctrl + Shift + p) and add following setting:

```JSON
    "php-cs-fixer.config": "/full/config/file/path"
```

I am on Windows, so in my case it is:

```JSON
    "php-cs-fixer.config": "C:\\Users\\Jawad\\.vscode\\.php-cs-fixer.php"
```

#### Config file .php-cs-fixer.php example:

```php
<?php

$config = new PhpCsFixer\Config();

return $config
    ->setRules([
        '@PSR12' => true,
        'array_indentation' => true,
        'array_syntax' => ['syntax' => 'short'],
        'combine_consecutive_unsets' => true,
        'multiline_whitespace_before_semicolons' => true,
        'single_quote' => true,

        'blank_line_before_statement' => true,
        'braces' => [
            'allow_single_line_closure' => true,
        ],
        'concat_space' => ['spacing' => 'one'],
        'declare_equal_normalize' => true,
        'function_typehint_space' => true,
        'include' => true,
        'lowercase_cast' => true,
        'no_multiline_whitespace_around_double_arrow' => true,
        'no_spaces_around_offset' => true,
        'no_unused_imports' => true,
        'no_whitespace_before_comma_in_array' => true,
        'no_whitespace_in_blank_line' => true,
        'object_operator_without_whitespace' => true,
        'single_blank_line_before_namespace' => true,
        'ternary_operator_spaces' => true,
        'trailing_comma_in_multiline' => true,
        'trim_array_spaces' => true,
        'unary_operator_spaces' => true,
        'whitespace_after_comma_in_array' => true,
    ])
    ->setIndent("\t")
    ->setLineEnding("\r\n");
```

Learn more about `.php-cs-fixer.php` [config file](https://github.com/FriendsOfPHP/PHP-CS-Fixer/blob/3.0/doc/config.rst) and [adding custom rules](https://github.com/FriendsOfPHP/PHP-CS-Fixer/blob/3.0/doc/ruleSets/index.rst) for config file.
