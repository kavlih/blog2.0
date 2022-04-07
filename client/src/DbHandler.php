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

    // Account ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    /** 
     * Create user
     * 
     * @param string $username
     * @param string $email
     * @param string $password
     * @param string $salt
     * @return bool
    */
    function accountCreate(string $username, string $email, string $password, string $salt) : bool {
        /** @var string $query */
        $query = 'INSERT INTO users(username, email, password, salt) VALUES (:username, :email, :password, :salt);';
        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':password', $password);
        $stmt->bindValue(':salt', $salt);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /** 
     * Create user additionals
     * 
     * @param string $username
     * @return bool
    */
    function accountCreateAdditionals(string $username) : bool {
        /** @var array||NULL $result */
        $result = $this->accountGet($username);

        /** @var string $query */
        $query = 'INSERT INTO identicon(user_id, identicon) VALUES (:user_id, :user_id);
            INSERT INTO followers(follower_id, receiver_id) VALUES (:user_id, :user_id);';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':user_id', $result['user_id']);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /** 
     * Delete user
     * 
     * @param int $user_id
     * @return bool
    */
    function accountDelete(int $user_id) : bool {
        /** @var string $query */
        $query = 'DELETE FROM users WHERE user_id = :user_id;
                  DELETE FROM posts WHERE user_id = :user_id;
                  DELETE FROM identicon WHERE user_id = :user_id;
                  DELETE FROM followers WHERE follower_id = :user_id OR receiver_id = :user_id;
                  DELETE l FROM likes AS l INNER JOIN posts AS p ON p.id = l.post_id WHERE l.user_id = :user_id OR p.user_id = :user_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /** 
     * Get user
     * 
     * @param $user_data
     * @return array||NULL
    */
    function accountGet($user_data) : ?array {
        /** @var string $query */
        $query = 'SELECT u.*, i.identicon FROM users AS u
            LEFT JOIN identicon AS i ON i.user_id = u.user_id 
            WHERE u.username = :user_data OR u.email = :user_data OR u.user_id = :user_data;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':user_data', $user_data);
        $stmt->execute();

        /** @var array||FALSE $result */
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);

        return !$result ? NULL : $result;
    }

    /** 
     * Get identicon
     * 
     * @param string $identicon
     * @return bool
    */
    function accountGetIdenticon(string $identicon) : bool {
        /** @var string $query */
        $query = 'SELECT * FROM identicon WHERE identicon = :identicon';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':identicon', $identicon);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /** 
     * Update email
     * 
     * @param string $email
     * @param int $user_id
     * @return bool
    */
    function accountUpdateEmail(string $email, int $user_id) : bool {
        /** @var string $query */
        $query = 'UPDATE users SET email = :email WHERE user_id = :user_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /** 
     * Update identicon
     * 
     * @param string $identicon
     * @param int $user_id
     * @return bool
    */
    function accountUpdateIdenticon(string $identicon, int $user_id) : bool {
        /** @var string $query */
        $query = 'UPDATE identicon SET identicon = :identicon WHERE user_id = :user_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':identicon', $identicon);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /** 
     * Update password
     * 
     * @param string $hashed_salt
     * @param string $hashed_password
     * @param int $user_id
     * @return bool
    */
    function accountUpdatePassword(string $hashed_salt, string $hashed_password, int $user_id) : bool {
        /** @var string $query */
        $query = 'UPDATE users SET password = :password, salt = :salt WHERE user_id = :user_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':salt', $hashed_salt);
        $stmt->bindValue(':password', $hashed_password);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /** 
     * Update username
     * 
     * @param string $username
     * @param int $user_id
     * @return bool
    */
    function accountUpdateUsername(string $username, int $user_id) : bool {
        /** @var string $query */
        $query = 'UPDATE users SET username = :username WHERE user_id = :user_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    // Post ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

    /**
     * Create post
     * 
     * @param int $user_id
     * @param string $message
     * @return bool
     */
    function postCreate(int $user_id, string $message) : bool {
        /** @var string $query */
        $query = 'INSERT INTO posts(user_id, message, timestamp) VALUES (:user_id, :message, :timestamp);';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->bindValue(':message', $message);
        $stmt->bindValue(':timestamp', $_SERVER['REQUEST_TIME']);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /** 
     * Delete post
     * 
     * @param int $post_id
     * @return bool
    */
    function postDelete(int $post_id) : bool {
        /** @var string $query */
        $query = 'DELETE FROM posts WHERE id = :post_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':post_id', $post_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /**
     * Get post
     * 
     * @param int $post_id
     * @return array||NULL
     */
    function postGet(int $post_id) : ?array {
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
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);

        return !$result ? NULL : $result;
    }

    /**
     * Get feed posts
     * 
     * @param array $result
     * @param int $user_id
     * @return bool
     */
    function postGetAllFeed(array &$result, int $user_id) : bool {
        /** @var string $query */
        $query = 'SELECT p.id, p.message, p.timestamp, u.user_id, u.username, i.identicon, u.role
            FROM followers AS f
            INNER JOIN posts AS p ON f.receiver_id = p.user_id 
            INNER JOIN users AS u ON p.user_id = u.user_id
            INNER JOIN identicon AS i ON u.user_id = i.user_id
            WHERE f.follower_id = :user_id
            ORDER BY p.id DESC;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        /** @var array||FALSE $result */
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return !empty($stmt->rowCount());
    }

    /**
     * Get user posts
     * 
     * @param array $result
     * @param int $user_id
     * @return bool
     */
    function postGetAllUser(array &$result, int $user_id) : bool {
        /** @var string $query */
        $query = 'SELECT p.id, p.message, p.timestamp, u.user_id, u.username, i.identicon, u.role
            FROM posts AS p
            INNER JOIN users AS u ON p.user_id = u.user_id
            INNER JOIN identicon AS i ON u.user_id = i.user_id
            WHERE p.user_id = :user_id
            ORDER BY p.id DESC;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        /** @var array||FALSE $result */
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return !empty($stmt->rowCount());
    }

    /**
     * Get liked posts
     * 
     * @param array $result
     * @param int $user_id
     * @return bool
     */
    function postGetAllLiked(array &$result, int $user_id) : bool {
        /** @var string $query */
        $query = 'SELECT p.id, p.message, p.timestamp, u.user_id, u.username, i.identicon, u.role
            FROM likes AS l
            INNER JOIN posts AS p ON p.id = l.post_id
            INNER JOIN users AS u ON u.user_id = p.user_id
            INNER JOIN identicon AS i ON i.user_id = u.user_id
            WHERE l.user_id = :user_id
            ORDER BY p.id DESC;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        /** @var array||FALSE $result */
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return !empty($stmt->rowCount());
    }

    /**
     * Get all likes
     * 
     * @param array $result
     * @param int $post_id
     * @return bool
     */
    function postGetLikes(array &$result, int $post_id) : bool {
        /** @var string $query */
        $query = 'SELECT l.user_id FROM likes AS l  WHERE post_id = :post_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':post_id', $post_id);
        $stmt->execute();

        /** @var array||FALSE $result */
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return !empty($stmt->rowCount());
    }

    /**
     * Get like
     * 
     * @param int $user_id
     * @param int $post_id
     * @return bool
     */
    function postLikeGet(int $user_id, int $post_id) : bool {
        /** @var string $query */
        $query = 'SELECT id FROM likes WHERE post_id = :post_id AND user_id = :user_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':post_id', $post_id);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /**
     * Add like
     * 
     * @param int $user_id
     * @param int $post_id
     * @return bool
     */
    function postLikeAdd(int $user_id, int $post_id) : bool {
        /** @var string $query */
        $query = 'INSERT INTO likes (post_id, user_id) VALUES (:post_id, :user_id);';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':post_id', $post_id);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /**
     * Remove like
     * 
     * @param int $user_id
     * @param int $post_id
     * @return bool
     */
    function postLikeRemove(int $user_id, int $post_id) : bool {
        /** @var string $query */
        $query = 'DELETE FROM likes WHERE post_id = :post_id AND user_id = :user_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->prepare($query);
        $stmt->bindValue(':post_id', $post_id);
        $stmt->bindValue(':user_id', $user_id);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

}
