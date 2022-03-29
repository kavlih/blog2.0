<?php

namespace application\Model;

use application\Model as AbstractModel;

/**
 * Post model class
 * 
 * @package application\Model
 */
final class Post extends AbstractModel {

     /**
      * Create post
      * 
      * @param  array $errors
      * @param  int $user_id
      * @return bool
      */
     function create(array &$errors, int $user_id) : bool {
          /** @var string $message */
          $message = filter_input(INPUT_POST, 'message');

          return $this->validateMessage($errors, $message)
               ? $this->DbHandler->postCreate($user_id, $message)
               : FALSE;
     }

     /**
      * Check Post
      * 
      * @param  array $errors
      * @param  int $post_id
      * @return bool
      */
     function checkPost(array &$errors, int $post_id) : bool {
          if(!$this->DbHandler->postGet($post_id)) $errors[] = 'Post does not exist';

          return empty($errors);
     }
     
     /**
      * Check User
      * 
      * @param  array $errors
      * @param  int $user_id
      * @return bool
      */
     function checkUser(array &$errors, $user_id) : bool {
          if(!$this->DbHandler->accountGet($user_id)) $errors[] = 'User does not exist';

          return empty($errors);
     }
     
     /**
      * Delete post
      * 
      * @param  array $errors
      * @param  int $post_id
      * @return bool
      */
     function delete(array &$errors, int $post_id) : bool {
          return $this->DbHandler->postDelete($post_id);
     }

     /**
      * Get feed posts
      * 
      * @param  array $errors
      * @param  array $result
      * @param  int $user_id
      * @return bool
      */
     function getAllFeed(array &$errors, array &$result, int $user_id) : bool {
          $getPosts = $this->DbHandler->postGetAllFeed($result, $user_id);

          if($getPosts) {
               foreach($result as &$post) {
                    $post["likes"] = $this->addLikes($post);
               }
          }
          
          return $getPosts;
     }

     /**
      * Get liked posts
      * 
      * @param  array $errors
      * @param  array $result
      * @param  int $user_id
      * @return bool
      */
      function getAllLiked(array &$errors, array &$result, int $user_id) : bool {
          $getPosts = $this->DbHandler->postGetAllLiked($result, $user_id);

          if($getPosts) {
               foreach($result as &$post) {
                    $post["likes"] = $this->addLikes($post);
               }
          }
          
          return $getPosts;
     }
     
     /**
      * Get user posts
      * 
      * @param  array $errors
      * @param  array $result
      * @param  int $user_id
      * @return bool
      */
     function getAllUser(array &$errors, array &$result, int $user_id) : bool {
          $getPosts = $this->DbHandler->postGetAllUser($result, $user_id);

          if($getPosts) {
               foreach($result as &$post) {
                    $post["likes"] = $this->addLikes($post);
               }
          }
          
          return $getPosts;
     }

     /**
      * Toggle like
      * 
      * @param  array $errors
      * @param  int $post_id
      * @return bool
      */
     function toggleLike(array &$errors, int $post_id) : bool {
          /** @var int $user_id */
          $user_id = filter_input(INPUT_POST, 'user_id');

          return $this->DbHandler->postLikeGet($user_id, $post_id)
               ? $this->DbHandler->postLikeRemove($user_id, $post_id)
               : $this->DbHandler->postLikeAdd($user_id, $post_id);
     }

     /**
      * Get post likes
      * 
      * @param  array $post
      * @return array
      */
     private function addLikes(array $post) : array {
          $result = [];

          if($this->DbHandler->postGetLikes($result, $post["id"])) {
               $flat = [];

               foreach ($result as $v) {
                    foreach ($v as $v2) {
                         $flat[] = $v2;
                    }
               }
               $result = $flat;
          }
          return $result;
     }

     /**
      * Validate message
      * Called in 'create_post' method
      * 
      * If message is empty
      * If message is too short
      * If message is too long
      *
      * @param  array       $errors
      * @param  string|NULL $message
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