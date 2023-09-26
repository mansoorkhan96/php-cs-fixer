<?php

use PhpCsFixer\Config;
use PhpCsFixer\Finder;

function configurePreset($rules)
{
    $finder = Finder::create()
        ->exclude([
            'bootstrap',
            'build',
            'node_modules',
            'storage',
            'vendor',
        ])
        ->name('*.php')
        ->notName([
            '_ide_helper_actions.php',
            '_ide_helper_models.php',
            '_ide_helper.php',
            '.phpstorm.meta.php',
            '*.blade.php',
        ])
        ->ignoreDotFiles(true)
        ->ignoreVCS(true);

    return (new Config)
        ->setFinder($finder)
        ->setRules($rules)
        ->setRiskyAllowed(true)
        ->setUsingCache(true);
}
