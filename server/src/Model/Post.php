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
          $query = 'INSERT INTO posts(user_id, message, timestamp) VALUES (:user_id, :message, :timestamp);';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':user_id', $userId);
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
          $query = 'DELETE FROM posts WHERE id = :post_id;';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':post_id', $postId);
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
               ? 'DELETE FROM likes WHERE post_id = :post_id AND user_id = :user_id;'
               : 'INSERT INTO likes (post_id, user_id) VALUES (:post_id, :user_id);';
          
          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':post_id', $postId);
          $stmt->bindValue(':user_id', $userId);
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
          $query = 'SELECT p.id, p.message, p.timestamp, u.user_id, u.username, i.identicon, u.role
          FROM followers AS f
          INNER JOIN posts AS p ON f.receiver_id = p.user_id 
          INNER JOIN users AS u ON p.user_id = u.user_id
          INNER JOIN identicon AS i ON u.user_id = i.user_id
          WHERE f.follower_id = :user_id
          ORDER BY p.id DESC;';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':user_id', $userId);
          $stmt->execute();

          /** @var array||FALSE $result */
          $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

          if($result) {
               foreach($result as &$post) {
                    $post["likes"] = $this->getLikes($post);
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
          $query = 'SELECT p.id, p.message, p.timestamp, u.user_id, u.username, i.identicon, u.role
          FROM likes AS l
          INNER JOIN posts AS p ON p.id = l.post_id
          INNER JOIN users AS u ON u.user_id = p.user_id
          INNER JOIN identicon AS i ON i.user_id = u.user_id
          WHERE l.user_id = :user_id
          ORDER BY p.id DESC;';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':user_id', $userId);
          $stmt->execute();

          /** @var array||FALSE $result */
          $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

          if($result) {
               foreach($result as &$post) {
                    $post["likes"] = $this->getLikes($post);
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
          $query = 'SELECT p.id, p.message, p.timestamp, u.user_id, u.username, i.identicon, u.role
               FROM posts AS p
               INNER JOIN users AS u ON p.user_id = u.user_id
               INNER JOIN identicon AS i ON u.user_id = i.user_id
               WHERE p.user_id = :user_id
               ORDER BY p.id DESC;';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':user_id', $userId);
          $stmt->execute();

          /** @var array||FALSE $result */
          $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

          if($result) {
               foreach($result as &$post) {
                    $post["likes"] = $this->getLikes($post);
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
          $query = 'SELECT p.id, p.message, p.timestamp, p.user_id, u.username, i.identicon, u.role
          FROM posts AS p
          INNER JOIN users AS u ON p.user_id = u.user_id
          INNER JOIN identicon AS i ON u.user_id = i.user_id
          WHERE p.id = :post_id;';

          /** @var \PDOStatement $pdo */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':post_id', $postId);
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
          $query = 'SELECT id FROM likes WHERE post_id = :post_id AND user_id = :user_id;';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':post_id', $postId);
          $stmt->bindValue(':user_id', $userId);
          $stmt->execute();

          return !empty($stmt->rowCount());
     }

     /**
      * Get all likes of a posts
      * 
      * @param array $postData
      * @return array
      */
     private function getLikes(array $postData) : array {
          /** @var string $query */
          $query = 'SELECT l.user_id FROM likes AS l  WHERE post_id = :post_id;';

          /** @var \PDOStatement $stmt */
          $stmt = $this->DbHandler->prepare($query);
          $stmt->bindValue(':post_id', $postData["id"]);
          $stmt->execute();

          /** @var array||FALSE $result */
          $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

          /** @var array $newResult */
          $newResult = [];

          if(!empty($stmt->rowCount())) {
               foreach ($result as $v) {
                    foreach ($v as $v2) {
                         $newResult[] = $v2;
                    }
               }
          }

          return $newResult;
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