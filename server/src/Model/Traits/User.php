<?php

namespace application\Model\Traits;

/**
 * User Trait
 *
 * @package application\Model\Traits
 */
trait User {

  /**
   * Add followers to user array
   * 
   * @param  array $userData
   * @return void
   */
  function addFollowers(array &$userData) : void {
    /** @var array $followers */
    $result = [];

    if($this->getFollowers($result, $userData['id'])) {
      foreach($result as $user) {
        $userData['followers'][] = $user['id'];
      }
    }
    else {
      $userData['followers'] = [];
    }
  }
  
  /**
   * Get all users that the requested user follows
   * 
   * @param array $result
   * @param int $userId
   * @return bool
   */
  function getFollowers(array &$result, int $userId) : bool {
    /** @var string $query */
    $query = 'SELECT u.id, u.username, i.identicon
    FROM followers AS f
    INNER JOIN users AS u ON f.follower_id = u.id
    INNER JOIN identicon AS i ON u.id = i.user_id
    WHERE NOT f.receiver_id = f.follower_id AND f.receiver_id = :userId 
    ORDER BY u.username;';

    /** @var \PDOStatement $stmt */
    $stmt = $this->DbHandler->prepare($query);
    $stmt->bindValue(':userId', $userId);
    $stmt->execute();

    /** @var array||FALSE $result */
    $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

    return !empty($stmt->rowCount());
  }

  /**
   * Get user by username
   * 
   * @param  array $errors
   * @param  string $username
   * @return array||NULL
   */
  function getUserbyUsername(array &$errors, string $username) : ?array {

    /** @var string $query */
    $query = 'SELECT u.*, i.identicon FROM users AS u
      LEFT JOIN identicon AS i ON i.user_id = u.id 
      WHERE u.username = :username';

    /** @var \PDOStatement $stmt */
    $stmt = $this->DbHandler->prepare($query);
    $stmt->bindValue(':username', $username);
    $stmt->execute();

    /** @var array||FALSE $result */
    $result = $stmt->fetch(\PDO::FETCH_ASSOC);

    if($result) {
      $this->addFollowers($result);
      return $result;
    }
    else {
      $errors[] = 'User does not exist';
      return NULL;
    }
  }
  
  /**
   * Get user by id
   * 
   * @param  array $errors
   * @param  int $userId
   * @return array||NULL
   */
  function getUserbyId(array &$errors, int $userId) : ?array {

    /** @var string $query */
    $query = 'SELECT u.*, i.identicon FROM users AS u
      LEFT JOIN identicon AS i ON i.user_id = u.id 
      WHERE u.id = :userId';

    /** @var \PDOStatement $stmt */
    $stmt = $this->DbHandler->prepare($query);
    $stmt->bindValue(':userId', $userId);
    $stmt->execute();

    /** @var array||FALSE $result */
    $result = $stmt->fetch(\PDO::FETCH_ASSOC);

    if($result) {
      $this->addFollowers($result);
      return $result;
    }
    else {
      $errors[] = 'User does not exist';
      return NULL;
    }
  }
  
  /**
   * Get user by email
   * 
   * @param  array $errors
   * @param  string $email
   * @return array||NULL
   */
  function getUserbyEmail(array &$errors, string $email) : ?array {

    /** @var string $query */
    $query = 'SELECT u.*, i.identicon FROM users AS u
      LEFT JOIN identicon AS i ON i.user_id = u.id 
      WHERE u.email = :email';

    /** @var \PDOStatement $stmt */
    $stmt = $this->DbHandler->prepare($query);
    $stmt->bindValue(':email', $email);
    $stmt->execute();

    /** @var array||FALSE $result */
    $result = $stmt->fetch(\PDO::FETCH_ASSOC);

    if($result) {
      $this->addFollowers($result);
      return $result;
    }
    else {
      $errors[] = 'User does not exist';
      return NULL;
    }
  }

}