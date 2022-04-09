<?php

namespace application;

/**
 * DbHandler class
 * 
 * Inherits from PDO (PHP Data Object) and uses it to create a connection to the database
 * 
 * @package application
 */
final class DbHandler extends \PDO {

    function __construct() {
        /** @var string $dsn */
        $dsn = sprintf(
            'mysql:host=%1$s;port=%2$s;dbname=%3$s;charset=%4$s',
            DB_HOST,
            DB_PORT,
            DB_NAME,
            DB_CHARSET
        );

        /** @var string $dbuser */
        $dbuser = DB_USER;

        /** @var string $dbpass */
        $dbpass = DB_PASS;
        
        /** @var array $options */
        $options = [
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC
        ];

        if (DEBUG_MODE) {
            $options[\PDO::ATTR_ERRMODE] = \PDO::ERRMODE_WARNING; // Default ERRMODE_EXCEPTION since PHP 8
        }
        
        parent::__construct($dsn, $dbuser, $dbpass, $options);
    }
}
