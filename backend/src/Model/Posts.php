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
     * @param   array $errors
     * @return  boolean
     */
     function createPost(array &$errors) : bool {
          /** @var string $user_id */
          $user_id = filter_input( INPUT_POST, 'user_id' );
          /** @var string $message */
          $message = filter_input( INPUT_POST, 'message' );

          return $this->validate_message($errors, $message)
               ? $this->DbHandler->createPostHandler($errors, $user_id, $message)
               : FALSE;
     }

     /**
     * Get likes
     * 
     * @param   array $errors
     * @param   array $result
     * @param   int $post_id
     */
     function getlikes(array &$errors, array &$result, int $post_id) {
          return $this->DbHandler->getLikesHandler($errors, $result, $post_id);
     }
     
     /**
     * Toggle like
     * 
     * @param   array $errors
     * @param   array $result
     * @param   int $post_id
     */
     function toggleLike(array &$errors, int $post_id) {
          /** @var string $user_id */
          $user_id = filter_input( INPUT_POST, 'user_id' );

          return $this->DbHandler->toggleLikeHandler($errors, $user_id, $post_id);
     }

     /**
     * Get posts
     * 
     * @param   array $errors
     * @param   array $result
     */
     function getPosts(array &$errors, array &$result) {
          /** @var string $user_id */
          $user_id = filter_input( INPUT_POST, 'user_id' );

          return $this->DbHandler->getPostsHandler($errors, $result, $user_id);
     }

    /**
     * Validate message
     * 
     * Called in 'create_post' method
     *
     * @param   array       $errors
     * @param   string|NULL $message
     * @return  boolean
     */
     private function validate_message(array &$errors, ?string $message) : bool {
          // If message is empty
          if(is_null($message) || empty($message)) {
               $errors[] = 'Message is empty';            
          }
          // If message is too short
          elseif(strlen($message) < 15) {
               $errors[] = 'Message is too short';
          }
          // If message is too long
          elseif(strlen($message) > 400) {
               $errors[] = 'Message is too long';
          }

          return !isset($errors);
     }

}