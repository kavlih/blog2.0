<?php

namespace application\Controller;

use application\Controller as AbstractController;
use application\Model\Posts as PostsModel;

/**
 * post controller class
 * 
 * @package application\Controller
 */
final class Posts extends AbstractController {
    
    function __construct() {
        $this->PostsModel = new PostsModel();    
    }

    /**
     * index method
     */
    function index() : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];

        if($this->isMethod(self::METHOD_POST) && $this->PostsModel->getPosts($errors, $result)) {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE, 'result' => $result]);
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['errors' => $errors]);
        }
    }

    function create() : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_POST) && $this->PostsModel->createPost($errors)) {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        } 
        else {
            $this->responseCode(400);
            $this->printJSON(['errors' => $errors]);
        }
    }

}