<?php

namespace application\Controller;

use application\Controller as AbstractController;
use application\Model\Feed as FeedModel;

/**
 * Feed controller class
 * 
 * @package application\Controller
 */
final class UserService extends AbstractController {
    
    function __construct() {
        $this->FeedModel = new FeedModel();    
    }

    /**
     * Get posts method
     */
    function getPosts() {
      
    }
}