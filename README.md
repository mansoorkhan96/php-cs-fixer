# PHP CS Fixer (php-cs-fixer)

This extension adds support for running `php-cs-fixer fix` on PHP files in Visual Studio Code. This extension supports `PHP8`  and `PSR12` style to fix PHP files.

![demo](simple-demo.gif)

## Getting Started

As long as PHP 7+ is installed on your system and in your PATH, the extension should work out of the box.

I have included `php-cs-fixer` from [FriendsOfPHP/PHP-CS-Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer)

## Extension Settings

This extension contributes the following settings:

* `php-cs-fixer.toolPath`: The path to the php-cs-fixer tool (default: "")
* `php-cs-fixer.useCache`: Use a cache file when fixing files (--using-cache) (default: false)
* `php-cs-fixer.allowRisky`: Determines whether risky rules are allowed (--allow-risky) (default: false)
* `php-cs-fixer.config`: Path to a .php_cs file (--config) (default: "")
* `php-cs-fixer.rules`: Rules to use when fixing files (--rules) (default: "@PSR12,@PSR1,@PSR2,@Symfony,-yoda_style")
* `php-cs-fixer.fixOnSave`: Runs fix command on save (default: true)

### How to use custom `.php_cs` file?

You can add a custom `.php_cs` config file and the extension will use your custom settings to fix the PHP files.

Open `settings.json` file (Ctrl + Shift + p) and add following setting:

```JSON
    "php-cs-fixer.config": "/full/config/file/path"
```

I am on Windows, so in my case it is:

```JSON
    "php-cs-fixer.config": "C:\\Users\\Jawad\\.vscode\\.php_cs"
```

#### Config file .php_cs example:

```php
<?php

return PhpCsFixer\Config::create()
    ->setRules(array(
        '@PSR12' => true,
        'array_indentation' => true,
        'array_syntax' => array('syntax' => 'short'),
        'combine_consecutive_unsets' => true,
        'method_separation' => true,
        'no_multiline_whitespace_before_semicolons' => true,
        'single_quote' => true,

        'binary_operator_spaces' => array(
            'align_double_arrow' => false,
            'align_equals' => false,
        ),
        // 'blank_line_after_opening_tag' => true,
        'blank_line_before_return' => true,
        'braces' => array(
            'allow_single_line_closure' => true,
        ),
        // 'cast_spaces' => true,
        // 'class_definition' => array('singleLine' => true),
        'concat_space' => array('spacing' => 'one'),
        'declare_equal_normalize' => true,
        'function_typehint_space' => true,
        'hash_to_slash_comment' => true,
        'include' => true,
        'lowercase_cast' => true,
        // 'native_function_casing' => true,
        // 'new_with_braces' => true,
        // 'no_blank_lines_after_class_opening' => true,
        // 'no_blank_lines_after_phpdoc' => true,
        // 'no_empty_comment' => true,
        // 'no_empty_phpdoc' => true,
        // 'no_empty_statement' => true,
        'no_extra_consecutive_blank_lines' => array(
            'curly_brace_block',
            'extra',
            'parenthesis_brace_block',
            'square_brace_block',
            'throw',
            'use',
        ),
        // 'no_leading_import_slash' => true,
        // 'no_leading_namespace_whitespace' => true,
        // 'no_mixed_echo_print' => array('use' => 'echo'),
        'no_multiline_whitespace_around_double_arrow' => true,
        // 'no_short_bool_cast' => true,
        // 'no_singleline_whitespace_before_semicolons' => true,
        'no_spaces_around_offset' => true,
        // 'no_trailing_comma_in_list_call' => true,
        // 'no_trailing_comma_in_singleline_array' => true,
        // 'no_unneeded_control_parentheses' => true,
        'no_unused_imports' => true,
        'no_whitespace_before_comma_in_array' => true,
        'no_whitespace_in_blank_line' => true,
        // 'normalize_index_brace' => true,
        'object_operator_without_whitespace' => true,
        // 'php_unit_fqcn_annotation' => true,
        // 'phpdoc_align' => true,
        // 'phpdoc_annotation_without_dot' => true,
        // 'phpdoc_indent' => true,
        // 'phpdoc_inline_tag' => true,
        // 'phpdoc_no_access' => true,
        // 'phpdoc_no_alias_tag' => true,
        // 'phpdoc_no_empty_return' => true,
        // 'phpdoc_no_package' => true,
        // 'phpdoc_no_useless_inheritdoc' => true,
        // 'phpdoc_return_self_reference' => true,
        // 'phpdoc_scalar' => true,
        // 'phpdoc_separation' => true,
        // 'phpdoc_single_line_var_spacing' => true,
        // 'phpdoc_summary' => true,
        // 'phpdoc_to_comment' => true,
        // 'phpdoc_trim' => true,
        // 'phpdoc_types' => true,
        // 'phpdoc_var_without_name' => true,
        // 'pre_increment' => true,
        // 'return_type_declaration' => true,
        // 'self_accessor' => true,
        // 'short_scalar_cast' => true,
        'single_blank_line_before_namespace' => true,
        // 'single_class_element_per_statement' => true,
        // 'space_after_semicolon' => true,
        // 'standardize_not_equals' => true,
        'ternary_operator_spaces' => true,
        'trailing_comma_in_multiline_array' => true,
        'trim_array_spaces' => true,
        'unary_operator_spaces' => true,
        'whitespace_after_comma_in_array' => true,
    ))
    //->setIndent("\t")
    ->setLineEnding("\n")
;
```
