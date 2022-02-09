<div align="center"><img src="icon-thumb.png"/></div>

<div align="center"><h1>PHP CS Fixer (php-cs-fixer)</h1></div>

PHP CS Fixer (Prettier for PHP) extension for PHP developers. This extension requires almost zero configuration to format `.php` files. It uses `v3.6.0` of [cs.symfony.com](https://cs.symfony.com/) by default but that's easily replaceable.

![demo](simple-demo.gif)

## Getting Started

As long as PHP 7+ is installed on your system and in your PATH, the extension should work out of the box.

## Extension Optional Settings

This extension contributes the following settings:

* `php-cs-fixer.toolPath`: The path to the php-cs-fixer tool (default: "")
* `php-cs-fixer.useCache`: Use a cache file when fixing files (--using-cache) (default: false)
* `php-cs-fixer.allowRisky`: Determines whether risky rules are allowed (--allow-risky) (default: false)
* `php-cs-fixer.config`: Path to a .php-cs-fixer.php file (--config) (default: "")
* `php-cs-fixer.rules`: Rules to use when fixing files (--rules) (default: "@PSR12,@PSR1,@PSR2,@Symfony,-yoda_style")
* `php-cs-fixer.fixOnSave`: Runs fix command on save (default: true)

### Need to use a custom `php-cs-fixer.phar` file?

The extension uses `v3.6.0` of [cs.symfony.com](https://cs.symfony.com/) by default but you can easily override it with a new or old file. Download the required file version from above link and provide the file path to the extension.

Open `settings.json` file (Ctrl + Shift + P) and add the following setting:

```json
"php-cs-fixer.toolPath": "path\\php-cs-fixer.phar",
```

On Windows:

```json
"php-cs-fixer.toolPath": "C:\\Users\\username\\.vscode\\php-cs-fixer.phar",
```

### Need to use a custom `.php-cs-fixer.php` rules file?

PHP CS Fixer formats `.php` files using a set of rules defined in a file. The extension uses `PSR12` as defualt rule set. If you need to change this behavour, simply create a custom `.php-cs-fixer.php` config file and add rules of your choice. After creating the file you need to provide file path to the extension.

Open `settings.json` file (Ctrl + Shift + P) and add the following setting:

```json
"php-cs-fixer.config": "/full/config/file/path"
```

On Windows:

```json
"php-cs-fixer.config": "C:\\Users\\username\\.vscode\\.php-cs-fixer.php"
```

#### Not sure which rules to add?

Try out my `.php-cs-fixer.php` config file that I use in my projects. Try to remove a rule and observe the changes in file formatting.

```php
<?php

$config = new PhpCsFixer\Config();

return $config
    ->setRules([
        '@PSR12' => true,
        'new_with_braces' => false,
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
        'binary_operator_spaces' => true,
        'whitespace_after_comma_in_array' => true,
        'single_trait_insert_per_statement' => false,
    ])
    ->setLineEnding("\n");
```

Find complete rule set [here](https://github.com/FriendsOfPHP/PHP-CS-Fixer/blob/master/doc/ruleSets/index.rst)
