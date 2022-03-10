<?php

namespace application;

/**
 * DbHandler class
 * 
 * Inherits from PDO (PHP Data Object) and uses it to create a connection to the database
 * Contains all methods that are used in connection with the database
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

    /** 
     * Delete user part method
     * 
     * Used at registration
     * Deletes part of the users data in the database. Used when additional data insert failed
     * 
     * @param string $username
     * @return bool
    */
    function deleteUserPart($username) : bool {
        /** @var string $query */
        $query = 'DELETE FROM users WHERE username = :username;';
        /** @var \PDOStatement $stmt */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':username', $username);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /** 
     * Get user method
     * 
     * Get user data from the database
     * $user_data can contain a username OR an email address
     * 
     * @param string $user_data
     * @return array||NULL
    */
    function getUser(string $user_data) : ?array {
        /** @var string $query */
        $query = 'SELECT u.*, i.identicon FROM users AS u
            LEFT JOIN identicon AS i ON i.user_id = u.id 
            WHERE u.username = :user_data OR u.email = :user_data;';

        /** @var \PDOStatement $stmt */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':user_data', $user_data);
        $stmt->execute();

        /** @var array||FALSE $result */
        $result = $stmt->fetch(\PDO::FETCH_ASSOC) ;
        
        // Return data or NULL
        return !$result ? NULL : $result;
    }

    /** 
     * Insert user method
     * 
     * Used at registration
     * Insert user data into the database
     * 
     * @param string $input_username
     * @param string $input_email
     * @param string $hashed_password
     * @param string $hashed_salt
     * @return bool
    */
    function insertUser(array &$errors, string $input_username, string $input_email, string $hashed_password, string $hashed_salt) : bool {
        /** @var string $query */
        $query = 'INSERT INTO users(username, email, password, salt) VALUES (:username, :email, :password, :salt);';
        /** @var \PDOStatement $stmt */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':username', $input_username);
        $stmt->bindValue(':email', $input_email);
        $stmt->bindValue(':password', $hashed_password);
        $stmt->bindValue(':salt', $hashed_salt);

        // ? PROBLEM catch doesn't return the error
        try {
            $stmt->execute();
        } 
        // ? QUESTION Difference between \PDOException and \Exception
        catch (\Exception $e) {
            $errors['insert_db'] = $e->getMessage();
        }

        return !empty($stmt->rowCount());
    }
    
    /** 
     * Insert user method
     * 
     * Used at registration
     * Insert additional user data into the database, where users id is needed
     * 
     * @param string $username
     * @return bool
    */
    function insertUserAdditionals(string $username) : bool {
        /** @var string||NULL $user_data */
        $user_data = $this->getUser($username);

        /** @var string $query */
        $query = 'INSERT INTO identicon(user_id, identicon) VALUES (:user_id, :user_id);
            INSERT INTO followers(follower_id, receiver_id) VALUES (:user_id, :user_id);';

        /** @var \PDOStatement $stmt */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':user_id', $user_data['id']);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

}
