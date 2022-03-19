<?php

namespace application\Model;

use application\Model as AbstractModel;

/**
 * Posts model class
 * 
 * @package application\Model
 */
final class Posts extends AbstractModel {

     /**
     * Create post
     * 
     * @param  array $errors
     * @param  int $user_id
     * @return bool
     */
     function createPost(array &$errors, int $user_id) : bool {
          /** @var string $message */
          $message = filter_input( INPUT_POST, 'message' );

          return $this->validate_message($errors, $message)
               ? $this->DbHandler->createPostHandler($user_id, $message)
               : FALSE;
     }
     
     /**
     * Delete post
     * 
     * @param  array $errors
     * @param  int $post_id
     * @return bool
     */
     function deletePost(array &$errors, int $post_id) : bool {
          /** @var bool $result */
          $deletePost = $this->DbHandler->deletePostHandler($$post_id);

          if(!$deletePost) $errors[] = "Post could not be deleted"; 

          return $deletePost;
     }

     /**
     * Get likes
     * 
     * @param  array $result
     * @param  int $post_id
     * @return bool
     */
     function getlikes(array &$result, int $post_id) : bool {
          return $this->DbHandler->getLikesHandler($result, $post_id);
     }
     
     /**
     * Toggle like
     * 
     * @param  array $errors
     * @param  array $result
     * @param  int $post_id
     * @return bool
     */
     function toggleLike(array &$errors, int $post_id) : bool {
          /** @var string $user_id */
          $user_id = filter_input( INPUT_POST, 'user_id' );

          /** @var bool $toggleLike */
          $toggleLike = $this->DbHandler->toggleLikeHandler($user_id, $post_id);

          if(!$toggleLike) $errors[] = "Could not toggle like"; 

          return $toggleLike;
     }

     /**
     * Get posts
     * 
     * @param  array $result
     * @return bool
     */
     function getPosts(array &$result, string $user_id) : bool {
          return $this->DbHandler->getPostsHandler($result, $user_id);
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
     private function validate_message(array &$errors, ?string $message) : bool {
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