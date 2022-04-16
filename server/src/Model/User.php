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

    $getFollow = $this->getFollow($userId, $receiverId);

    /** @var string $query */
    $query = $getFollow 
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
  private function getFollow(int $userId, int $receiverId) : bool {
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