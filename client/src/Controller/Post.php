<?php

namespace application\Controller;

use application\Controller as AbstractController;
use application\Model\Post as PostModel;

/**
 * post controller class
 * 
 * @package application\Controller
 */
final class Post extends AbstractController {
    
    function __construct() {
        $this->PostModel = new PostModel();    
    }

    /**
     * Create
     * @POST
     * 
     * @param int||NULL $user_id
     * @return void
     */
    function create(?int $user_id) : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_POST)
            && $this->PostModel->checkUser($errors, $user_id)) 
        {
            if ($this->PostModel->create($errors, $user_id)) {
                $this->responseCode(200);
                $this->printJSON(['success' => TRUE]);
            } 
            else {    
                $this->responseCode(409);
                $this->printJSON(['success' => FALSE, 'errors' => $errors]);
            }
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
    }
    
    /**
     * Delete
     * @POST
     * 
     * @param int||NULL $post_id
     * @return void
     */
    function delete(?int $post_id) : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_OPTIONS)) {
            $this->responseCode(200);
        }
        elseif($this->isMethod(self::METHOD_DELETE)
            && $this->PostModel->checkPost($errors, $post_id)
            && $this->PostModel->delete($errors, $post_id))
        {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
    }

    /**
     * Feed
     * @GET
     * 
     * @param int||NULL $user_id
     * @return void
     */
    function getAllFeed(?int $user_id) : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];
        
        if($this->isMethod(self::METHOD_GET)
            && $this->PostModel->checkUser($errors, $user_id)) 
        {
            if ($this->PostModel->getAllFeed($errors, $result, $user_id)) {
                $this->responseCode(200);
                $this->printJSON(['success' => TRUE, 'result' => $result]);
            }
            else {
                $this->responseCode(204);
                $this->printJSON(['success' => TRUE]);
            }
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
    }

    /**
     * Liked
     * @GET
     * 
     * @param int||NULL $user_id
     * @return void
     */
    function getAllLiked(?int $user_id) : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];

        if($this->isMethod(self::METHOD_GET)
            && $this->PostModel->checkUser($errors, $user_id)) 
        {
            if ($this->PostModel->getAllLiked($errors, $result, $user_id)) {
                $this->responseCode(200);
                $this->printJSON(['success' => TRUE, 'result' => $result]);
            }
            else {
                $this->responseCode(204);
                $this->printJSON(['success' => TRUE]);
            }
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
    }

    /**
     * User
     * @GET
     * 
     * @param int||NULL $user_id
     * @return void
     */
    function getAllUser(?int $user_id) : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];

        if($this->isMethod(self::METHOD_GET) 
            && $this->PostModel->checkUser($errors, $user_id)) 
        {
            if ($this->PostModel->getAllUser($errors, $result, $user_id)) {
                $this->responseCode(200);
                $this->printJSON(['success' => TRUE, 'result' => $result]);
            }
            else {
                $this->responseCode(204);
                $this->printJSON(['success' => TRUE]);
            }
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
    }

    /**
     * Likes
     * @GET
     * 
     * @param int||NULL $post_id
     * @return void
     */
    function getLikes(?int $post_id) : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];

        if($this->isMethod(self::METHOD_GET) 
            && $this->PostModel->checkPost($errors, $post_id)) 
        {
            if ($this->PostModel->getLikes($errors, $result, $post_id)) {
                $this->responseCode(200);
                $this->printJSON(['success' => TRUE, 'result' => $result]);
            }
            else {
                $this->responseCode(204);
                $this->printJSON(['success' => TRUE]);
            }
        } 
        else {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
    }
    
    /**
     * Like
     * @POST
     * 
     * @param int||NULL $post_id
     * @return void
     */
    function like(?int $post_id) : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_POST) 
            && $this->PostModel->checkPost($errors, $post_id)
            && $this->PostModel->toggleLike($errors, $post_id)) 
        {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        } 
        else {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
    }

}