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
     * Create post method
     * 
     * @param int $user_id
     * @param string $message
     * @return bool
     */
    function createPostHandler(int $user_id, string $message) : bool {
        /** @var string||NULL $query */
        $query = 'INSERT INTO posts(user_id, message, timestamp) VALUES (:user_id, :message, :timestamp);';

        /** @var \PDOStatement $stmt */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->bindValue(':message', $message);
        $stmt->bindValue(':timestamp', $_SERVER['REQUEST_TIME']);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /**
     * Get feed posts method
     *
     * Used in feed
     * Get all posts from users that the logged in user follows
     * 
     * @param array $result
     * @param int $user_id
     * @return bool
     */
    function getFeedPostsHandler(array &$result, int $user_id) : bool {
        /** @var string||NULL $query */
        $query = 'SELECT p.id, p.message, p.timestamp, u.user_id, u.username, i.identicon, u.role
            FROM followers AS f
            INNER JOIN posts AS p ON f.receiver_id = p.user_id 
            INNER JOIN users AS u ON p.user_id = u.user_id
            INNER JOIN identicon AS i ON u.user_id = i.user_id
            WHERE f.follower_id = :user_id
            ORDER BY p.id DESC;';

        /** @var \PDOStatement $pdo */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        /** @var array||FALSE $result */
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC) ;
        
        return !empty($stmt->rowCount());
    }

    /**
     * Get user posts method
     * 
     * @param array $result
     * @param int $user_id
     * @return bool
     */
    function getUserPostsHandler(array &$result, int $user_id) : bool {
        /** @var string||NULL $query */
        $query = 'SELECT p.id, p.message, p.timestamp, u.user_id, u.username, i.identicon, u.role
            FROM posts AS p
            INNER JOIN users AS u ON p.user_id = u.user_id
            INNER JOIN identicon AS i ON u.user_id = i.user_id
            WHERE p.user_id = :user_id
            ORDER BY p.id DESC;';

        /** @var \PDOStatement $pdo */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        /** @var array||FALSE $result */
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC) ;
        
        return !empty($stmt->rowCount());
    }

    /**
     * Get user likes method
     * 
     * @param array $result
     * @param int $user_id
     * @return bool
     */
    function getUserLikesHandler(array &$result, int $user_id) : bool {
        /** @var string||NULL $query */
        $query = 'SELECT p.id, p.message, p.timestamp, u.user_id, u.username, i.identicon, u.role
            FROM likes AS l
            INNER JOIN posts AS p ON p.id = l.post_id
            INNER JOIN users AS u ON u.user_id = p.user_id
            INNER JOIN identicon AS i ON i.user_id = u.user_id
            WHERE l.user_id = :user_id
            ORDER BY p.id DESC;';

        /** @var \PDOStatement $pdo */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        /** @var array||FALSE $result */
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC) ;
        
        return !empty($stmt->rowCount());
    }

    /**
     * Get post method
     * 
     * @param array $result
     * @param int $post_id
     * @return bool
     */
    function getPostHandler(array &$result, int $post_id) : bool {
        /** @var string||NULL $query */
        $query = 'SELECT p.id, p.message, p.timestamp, p.user_id, u.username, i.identicon, u.role
            FROM posts AS p
            INNER JOIN users AS u ON p.user_id = u.user_id
            INNER JOIN identicon AS i ON u.user_id = i.user_id
            WHERE p.id = :post_id;';

        /** @var \PDOStatement $pdo */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':post_id', $post_id);
        $stmt->execute();

        /** @var array||FALSE $result */
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC) ;
        
        return !empty($stmt->rowCount());
    }

    /**
     * Get likes method
     *
     * Used in post component
     * Gets user ids of accounts which liked the posts
     * 
     * @param array $result
     * @param int $post_id
     * @return bool
     */
    function getLikesHandler(array &$result, int $post_id) : bool {
        /** @var string||NULL $query */
        $query = 'SELECT l.user_id FROM likes AS l  WHERE post_id = :post_id;';

        /** @var \PDOStatement $pdo */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':post_id', $post_id);
        $stmt->execute();

        /** @var array||FALSE $result */
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC) ;
        
        return !empty($stmt->rowCount());
    }
    
    /**
     * Get like method
     * 
     * @param int $user_id
     * @param int $post_id
     * @return bool
     */
    function getLike(int $user_id, int $post_id) : bool {
        /** @var string||NULL $query */
        $query = 'SELECT id FROM likes WHERE post_id = :post_id AND user_id = :user_id;';

        /** @var \PDOStatement $pdo */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':post_id', $post_id);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }
    
    /**
     * toggle like method
     * 
     * @param int $user_id
     * @param int $post_id
     * @return bool
     */
    function toggleLikeHandler(int $user_id, int $post_id) : bool {
        /** @var bool $getLike */
        $getLike = $this->getLike($user_id, $post_id);

        $getLike 
            ? $query = 'DELETE FROM likes WHERE post_id = :post_id AND user_id = :user_id;'
            : $query = 'INSERT INTO likes (post_id, user_id) VALUES (:post_id, :user_id);';

        /** @var \PDOStatement $pdo */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':post_id', $post_id);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
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
    function deleteUserPart(string $username) : bool {
        /** @var string $query */
        $query = 'DELETE FROM users WHERE username = :username;';
        /** @var \PDOStatement $stmt */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':username', $username);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }
    
    /** 
     * Delete post method
     * 
     * @param int $post_id
     * @return bool
    */
    function deletePostHandler(int $post_id) : bool {
        /** @var string $query */
        $query = 'DELETE FROM posts WHERE id = :post_id;';
        /** @var \PDOStatement $stmt */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':post_id', $post_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /** 
     * Get user method
     * 
     * Get user data from the database
     * $user_data can contain a username, an email address or an user id
     * 
     * @param string $user_data
     * @return array||NULL
    */
    function getUser(string $user_data) : ?array {
        /** @var string $query */
        $query = 'SELECT u.*, i.identicon FROM users AS u
            LEFT JOIN identicon AS i ON i.user_id = u.user_id 
            WHERE u.username = :user_data OR u.email = :user_data OR u.user_id = :user_data;';

        /** @var \PDOStatement $stmt */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':user_data', $user_data);
        $stmt->execute();

        /** @var array||FALSE $result */
        $result = $stmt->fetch(\PDO::FETCH_ASSOC) ;
        
        return !$result ? NULL : $result;
    }

    /** 
     * Insert user method
     * 
     * Used at registration
     * Insert user data into the database
     * 
     * @param string $username
     * @param string $email
     * @param string $password
     * @param string $salt
     * @return bool
    */
    function insertUser(string $username, string $email, string $password, string $salt) : bool {
        /** @var string $query */
        $query = 'INSERT INTO users(username, email, password, salt) VALUES (:username, :email, :password, :salt);';
        /** @var \PDOStatement $stmt */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':password', $password);
        $stmt->bindValue(':salt', $salt);
        $stmt->execute();

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
        $stmt->bindValue(':user_id', $user_data['user_id']);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }
 
    /** 
     * Update password method
     * 
     * @param string $hashed_salt
     * @param string $hashed_password
     * @param int $user_id
     * @return bool
    */
    function updatePasswordHandler(string $hashed_salt, string $hashed_password, int $user_id) : bool {
        /** @var string $query */
        $query = 'UPDATE users SET password = :password, salt = :salt WHERE user_id = :user_id;';

        /** @var \PDOStatement $pdo */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':salt', $hashed_salt);
        $stmt->bindValue(':password', $hashed_password);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /** 
     * Update email method
     * 
     * @param string $email
     * @param int $user_id
     * @return bool
    */
    function updateEmailHandler(string $email, int $user_id) : bool {
        /** @var string $query */
        $query = 'UPDATE users SET email = :email WHERE user_id = :user_id;';

        /** @var \PDOStatement $pdo */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /** 
     * Update username method
     * 
     * @param string $username
     * @param int $user_id
     * @return bool
    */
    function updateUsernameHandler(string $username, int $user_id) : bool {
        /** @var string $query */
        $query = 'UPDATE users SET username = :username WHERE user_id = :user_id;';

        /** @var \PDOStatement $pdo */
        $stmt = \PDO::prepare($query);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }
}
