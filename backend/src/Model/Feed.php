<?php

namespace application\Model;

use application\Model as AbstractModel;

/**
 * Feed model class
 * 
 * @package application\Model
 */
final class Feed extends AbstractModel {
     function getPosts(array &$errors, array &$result) {
          /** @var string $user_id */
          $user_id = filter_input( INPUT_POST, 'user_id' );

          return $this->DbHandler->getFeedPosts($errors, $result, $user_id);
     }
}