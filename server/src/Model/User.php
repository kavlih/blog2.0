<?php

namespace application\Model;

use application\Model as AbstractModel;
use application\Model\Traits\User as UserTraits;

/**
 * User model class
 * 
 * @package application\Model
 */
final class User extends AbstractModel {

  use UserTraits;

  /**
   * Get all users who follow the requested user
   * 
   * @param array $result
   * @param int $userId
   * @return bool
   */
  function getFollowing(array &$result, int $userId) : bool {
    /** @var string $query */
    $query = 'SELECT u.id, u.username, i.identicon
    FROM followers AS f
    INNER JOIN users AS u ON f.receiver_id = u.id
    INNER JOIN identicon AS i ON u.id = i.user_id
    WHERE NOT f.receiver_id = f.follower_id AND f.follower_id = :userId 
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
   * Toggle follow of a user
   * 
   * @param array $errors
   * @param int $receiverId
   * @return bool
   */
  function toggleFollow(array &$errors, int $receiverId) : bool {
    /** @var int $userId */
    $userId = filter_input(INPUT_POST, 'userId');

    if(!$this->getUserById($errors, $userId)) {
      return FALSE;
    }

    $isFollow = $this->isFollow($userId, $receiverId);

    /** @var string $query */
    $query = $isFollow 
          ? 'DELETE FROM followers WHERE follower_id = :follower_id AND receiver_id = :receiver_id;'
          : 'INSERT INTO followers(follower_id, receiver_id) VALUES (:follower_id, :receiver_id);';
    
    /** @var \PDOStatement $stmt */
    $stmt = $this->DbHandler->prepare($query);
    $stmt->bindValue(':receiver_id', $receiverId);
    $stmt->bindValue(':follower_id', $userId);
    $stmt->execute();

    return !empty($stmt->rowCount());
  }

  /**
   * If user follows another user
   * 
   * @param int $userId
   * @param int $receiverId
   * @return bool
   */
  private function isFollow(int $userId, int $receiverId) : bool {
    /** @var string $query */
    $query = 'SELECT * FROM followers WHERE receiver_id = :receiver_id AND follower_id = :userId;';

    /** @var \PDOStatement $stmt */
    $stmt = $this->DbHandler->prepare($query);
    $stmt->bindValue(':receiver_id', $receiverId);
    $stmt->bindValue(':userId', $userId);
    $stmt->execute();

    return !empty($stmt->rowCount());
  }

}