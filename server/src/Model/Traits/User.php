<?php

namespace application\Model\Traits;

/**
 * User Trait
 *
 * @package application\Model\Traits
 */
trait User {

  /**
   * Get all users that the requested user follows
   * 
   * @param array $userData
   * @return bool
   */
  function getFollowers(array &$userData) : bool {
      /** @var string $query */
      $query = 'SELECT f.follower_id FROM followers AS f 
      WHERE NOT f.receiver_id = f.follower_id AND f.receiver_id = :userId;';

      /** @var \PDOStatement $stmt */
      $stmt = $this->DbHandler->prepare($query);
      $stmt->bindValue(':userId', $userData['id']);
      $stmt->execute();

      $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

      if($result) {
           foreach($result as $user) {
                $userData['followers'][] = $user['follower_id'];
           }
      }
      else {
          $userData['followers'] = [];
      }

      return !empty($stmt->rowCount());
  }

  /**
   * Get all users who follow the requested user
   * 
   * @param array $userData
   * @return bool
   */
  function getFollowing(array &$userData) : bool {
      /** @var string $query */
      $query = 'SELECT f.receiver_id FROM followers AS f
      WHERE NOT f.receiver_id = f.follower_id AND f.follower_id = :userId;';
  
      /** @var \PDOStatement $stmt */
      $stmt = $this->DbHandler->prepare($query);
      $stmt->bindValue(':userId', $userData['id']);
      $stmt->execute();

      $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

      if($result) {
           foreach($result as $user) {
                $userData['following'][] = $user['receiver_id'];
           }
      }
      else {
          $userData['following'] = [];
      }

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

    if(!$result) {
      $errors[] = 'User does not exist';
      return NULL;
    }

    return $result;
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

    if(!$result) {
      $errors[] = 'User does not exist';
      return NULL;
    }

    return $result;
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

    if(!$result) {
      $errors[] = 'User does not exist';
      return NULL;
    }

    return $result;
  }

}