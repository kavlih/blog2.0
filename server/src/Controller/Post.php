<?php

namespace application\Controller;

use application\Controller as AbstractController;
use application\Model\Post as PostModel;

/**
 * Post controller class
 * 
 * @package application\Controller
 */
final class Post extends AbstractController {
    
    function __construct() {
        $this->PostModel = new PostModel();    
    }

    /**
     * @POST
     * 
     * @param int||NULL $userId
     * @return void
     */
    function create(?int $userId) : void {

        /** @var array $errors */
        $errors = [];

        if(!$this->isMethod(self::METHOD_POST)
            || !$this->PostModel->getUserById($errors, $userId)) 
        {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        elseif(!$this->PostModel->create($errors, $userId)) {
            $this->responseCode(409);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        } 
        else {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }   
    }
    
    /**
     * @OPTIONS
     * @DELETE
     * 
     * @param int||NULL $postId
     * @return void
     */
    function delete(?int $postId) : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_OPTIONS)) {
            $this->responseCode(200);
        }
        elseif(!$this->isMethod(self::METHOD_DELETE) 
            || !$this->PostModel->getPostById($errors, $postId)
            || !$this->PostModel->delete($postId)) 
        {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        else {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }
    }
    
    /**
     * @POST
     * 
     * @param int||NULL $postId
     * @return void
     */
    function like(?int $postId) : void {
        /** @var array $errors */
        $errors = [];

        if(!$this->isMethod(self::METHOD_POST) 
            || !$this->PostModel->getPostById($errors, $postId)
            || !$this->PostModel->toggleLike($errors, $postId)) 
        {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        else {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }
    }

    /**
     * @GET
     * 
     * @param int||NULL $userId
     * @return void
     */
    function getAllFeed(?int $userId) : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];
        
        if(!$this->isMethod(self::METHOD_GET)
            || !$this->PostModel->getUserById($errors, $userId)) 
        {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        elseif(!$this->PostModel->getAllFeed($result, $userId)) {
            $this->responseCode(204);
            $this->printJSON(['success' => TRUE]);
        }
        else {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE, 'result' => $result]);
        }
    }

    /**
     * @GET
     * 
     * @param string||NULL $username
     * @return void
     */
    function getAllLiked(?string $username) : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];
        /** @var array $userData */
        $userData = $this->PostModel->getUserByUsername($errors, $username);

        if(!$this->isMethod(self::METHOD_GET) || !$userData) {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        elseif(!$this->PostModel->getAllLiked($result, $userData['user_id'])) {
            $this->responseCode(204);
            $this->printJSON(['success' => TRUE]);
        }
        else {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE, 'result' => $result]);
        }
    }

    /**
     * @GET
     * 
     * @param string||NULL $username
     * @return void
     */
    function getAllUser(?string $username) : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];
        /** @var array $userData */
        $userData = $this->PostModel->getUserByUsername($errors, $username);

        if(!$this->isMethod(self::METHOD_GET)) {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        elseif(!$this->PostModel->getAllUser($errors, $result, $userData['user_id'])) {
            $this->responseCode(204);
            $this->printJSON(['success' => TRUE]);
        }
        else {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE, 'result' => $result]);
        }
    }

}