<?php

namespace application;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

/** @var string $configFile */
$configFile = __DIR__ . DIRECTORY_SEPARATOR . 'config.php';
/** @var string $autoloadFile */
$autoloadFile = __DIR__ . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

// Checks if config file exists
if(!file_exists($configFile))
{
    trigger_error(
        "template file ({$configFile}) doesn't exist", 
        E_USER_ERROR
    );
}

// Checks if autoload file exists
if(!file_exists($autoloadFile))
{
    trigger_error(
        "autoload file ({$autoloadFile}) doesn't exist", 
        E_USER_ERROR
    );
}

// Require config and autoload files
require_once $configFile;
require_once $autoloadFile;

// Error reporting (change status in config file)
if (DEBUG_MODE) {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}

// Create instance of API and call run method
(new API())->run();