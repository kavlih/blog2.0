<?php

namespace application\Model;

use application\Model as AbstractModel;
use application\Model\Traits\User as UserTrait;

/**
 * Post model class
 * 
 * @package application\Model
 */
final class Post extends AbstractModel {

     use UserTrait;

     /**
      * Create a post
      *      
      * @param array $errors
      * @param int $userId
      * @return bool
      */
     function create(array &$errors, int $userId) : bool {
          /** @var string||NULL $inputMsg */
          $inputMsg = filter_input(INPUT_POST, 'message');

          if(!$this->validateMessage($errors, $inputMsg)) {
               return FALSE;
          }

          /** @var string $query */
          $query = 'INSERT INTO posts(user_id, message, timestamp) VALUES (:userId, :message, :timestamp);';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':userId', $userId);
          $stmt->bindValue(':message', $inputMsg);
          $stmt->bindValue(':timestamp', $_SERVER['REQUEST_TIME']);
          $stmt->execute();

          return !empty($stmt->rowCount());
     }
     
     /**
     * Delete a post
      * 
      * @param int $postId
      * @return bool
      */
     function delete(int $postId) : bool {
          /** @var string $query */
          $query = 'DELETE FROM posts WHERE id = :postId;
                    DELETE FROM likes WHERE post_id = :postId;';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':postId', $postId);
          $stmt->execute();

          return !empty($stmt->rowCount());
     }

     /**
      * Toggle like of a post
      * 
      * @param array $errors
      * @param int $postId
      * @return bool
      */
     function toggleLike(array &$errors, int $postId) : bool {
          /** @var int $userId */
          $userId = filter_input(INPUT_POST, 'userId');

          if(!$this->getUserById($errors, $userId)) {
               return FALSE;
          }

          $getLike = $this->getLike($userId, $postId);

          /** @var string $query */
          $query = $getLike 
               ? 'DELETE FROM likes WHERE post_id = :postId AND user_id = :userId;'
               : 'INSERT INTO likes (post_id, user_id) VALUES (:postId, :userId);';
          
          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':postId', $postId);
          $stmt->bindValue(':userId', $userId);
          $stmt->execute();

          return !empty($stmt->rowCount());
     }

     /**
      * Get all posts in feed
      * 
      * @param array $result
      * @param int $userId
      * @return bool
      */
     function getAllFeed(array &$result, int $userId) : bool {
          /** @var string $query */
          $query = 'SELECT p.id, p.message, p.timestamp, p.user_id, u.username, i.identicon
          FROM followers AS f
          INNER JOIN posts AS p ON f.receiver_id = p.user_id 
          INNER JOIN users AS u ON p.user_id = u.id
          INNER JOIN identicon AS i ON u.id = i.user_id
          WHERE f.follower_id = :userId
          ORDER BY p.timestamp DESC;';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':userId', $userId);
          $stmt->execute();

          /** @var array||FALSE $result */
          $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

          if($result) {
               foreach($result as &$post) {
                    $this->getLikes($post);
               }
          }
          
          return !empty($stmt->rowCount());
     }

     /**
      * Get all liked posts
      * 
      * @param array $result
      * @param int $userId
      * @return bool
      */
      function getAllLiked(array &$result, int $userId) : bool {
          /** @var string $query */
          $query = 'SELECT p.id, p.message, p.timestamp, p.user_id, u.username, i.identicon
          FROM likes AS l
          INNER JOIN posts AS p ON p.id = l.post_id
          INNER JOIN users AS u ON u.id = p.user_id
          INNER JOIN identicon AS i ON i.user_id = u.id
          WHERE l.user_id = :userId
          ORDER BY p.timestamp DESC;';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':userId', $userId);
          $stmt->execute();

          /** @var array||FALSE $result */
          $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

          if($result) {
               foreach($result as &$post) {
                    $this->getLikes($post);
               }
          }
          
          return !empty($stmt->rowCount());
     }
     
     /**
      * Get all posts of a user
      * 
      * @param array $errors
      * @param array $result
      * @param int $userId
      * @return bool
      */
     function getAllUser(array &$errors, array &$result, int $userId) : bool {
          /** @var string $query */
          $query = 'SELECT p.id, p.message, p.timestamp, p.user_id, u.username, i.identicon
               FROM posts AS p
               INNER JOIN users AS u ON p.user_id = u.id
               INNER JOIN identicon AS i ON u.id = i.user_id
               WHERE p.user_id = :userId
               ORDER BY p.timestamp DESC;';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':userId', $userId);
          $stmt->execute();

          /** @var array||FALSE $result */
          $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

          if($result) {
               foreach($result as &$post) {
                    $this->getLikes($post);
               }
          }
          
          return !empty($stmt->rowCount());
     }

     /**
      * Get post by Id
      * 
      * @param array $errors
      * @param int||NULL $postId
      * @return array||NULL
     */
     function getPostById(array &$errors, ?int $postId) : ?array {
          /** @var string||NULL $query */
          $query = 'SELECT p.id, p.message, p.timestamp, p.user_id, u.username, i.identicon
          FROM posts AS p
          INNER JOIN users AS u ON p.user_id = u.id
          INNER JOIN identicon AS i ON u.id = i.user_id
          WHERE p.id = :postId;';

          /** @var \PDOStatement $pdo */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':postId', $postId);
          $stmt->execute();

          /** @var array||FALSE $result */
          $result = $stmt->fetch(\PDO::FETCH_ASSOC);

          if(!$result) {
               $errors[] = 'Post does not exist';
               return NULL;
          }

          return $result;
     }

     /**
      * If user liked a post
      * 
      * @param int $userId
      * @param int $postId
      * @return bool
     */
     private function getLike(int $userId, int $postId) : bool {
          /** @var string $query */
          $query = 'SELECT id FROM likes WHERE post_id = :postId AND user_id = :userId;';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':postId', $postId);
          $stmt->bindValue(':userId', $userId);
          $stmt->execute();

          return !empty($stmt->rowCount());
     }

     /**
      * Get all likes of a posts
      * 
      * @param array $postData
      * @return bool
      */
     private function getLikes(array &$postData) : bool {
          /** @var string $query */
          $query = 'SELECT user_id FROM likes WHERE post_id = :postId;';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':postId', $postData["id"]);
          $stmt->execute();

          $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

          if($result) {
               foreach($result as $user) {
                    $postData['likes'][] = $user['user_id'];
               }
          }
          else {
              $postData['likes'] = [];
          }

          return !empty($stmt->rowCount());
     }

     /**
      * Validate message
      * 
      * If message is empty
      * If message is too short
      * If message is too long
      *
      * @param array $errors
      * @param string|NULL $message
      * @return bool
      */
     private function validateMessage(array &$errors, ?string $message) : bool {
          if(is_null($message) || empty($message)) {
               $errors[] = 'Message is empty';            
          }
          elseif(strlen($message) < 15) {
               $errors[] = 'Message is too short';
          }
          elseif(strlen($message) > 400) {
               $errors[] = 'Message is too long';
          }

          return empty($errors);
     }

}