<?php

namespace application\Controller;

use application\Controller as AbstractController;
use application\Model\Feed as FeedModel;

/**
 * Feed controller class
 * 
 * @package application\Controller
 */
final class Feed extends AbstractController {
    
    function __construct() {
        $this->FeedModel = new FeedModel();    
    }

    /**
     * index method
     */
    public function index() : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];

        if ($this->isMethod(self::METHOD_POST) && $this->FeedModel->getPosts($errors, $result)) {
            $this->responseCode(200);
            $this->printJSON(['Success' => TRUE, 'result' => $result]);
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['Errors' => $errors]);
        }
    }
}