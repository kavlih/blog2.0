<?php

namespace application\Model;

use application\Model as AbstractModel;

/**
 * Posts model class
 * 
 * @package application\Model
 */
final class Posts extends AbstractModel {
     function getPosts(array &$errors, array &$result) {
          /** @var string $user_id */
          $user_id = filter_input( INPUT_POST, 'user_id' );

          return $this->DbHandler->getAllPosts($errors, $result, $user_id);
     }
}