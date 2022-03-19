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
     * Feed method
     * @GET
     * 
     * @param string||NULL $user_id
     * @return void
     */
    function feed(?string $user_id = NULL) : void {
        /** @var array $result */
        $result = [];

        if($this->isMethod(self::METHOD_GET) && !is_null($user_id)) {
            if ($this->PostsModel->getPosts($result, $user_id)) {
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
        }
    }

    /**
     * Create method
     * @POST
     * 
     * @param string||NULL $user_id
     * @return void
     */
    function create(?string $user_id = NULL) : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_POST)) {
            if ($this->PostsModel->createPost($errors, $user_id)) {
                $this->responseCode(200);
                $this->printJSON(['success' => TRUE]);
            } 
            else {    
                $this->responseCode(409);
                $this->printJSON(['errors' => $errors]);
            }
        }
        else {
            $this->responseCode(400);
        }
    }
    
    /**
     * Create method
     * @POST
     * 
     * @param string||NULL $post_id
     * @return void
     */
    function delete(?string $post_id = NULL) : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_POST)) {
            if ($this->PostsModel->deletePost($errors, $post_id)) {
                $this->responseCode(200);
                $this->printJSON(['success' => TRUE]);
            } 
            else {
                $this->responseCode(409);
                $this->printJSON(['errors' => $errors]);
            }
        }
        else {
            $this->responseCode(400);
        }
    }

    /**
     * Likes method
     * @GET
     * 
     * @param string||NULL $post_id
     * @return void
     */
    function likes(?string $post_id = NULL) : void {
        /** @var array $result */
        $result = [];

        if($this->isMethod(self::METHOD_GET) && !is_null($post_id)) {
            if ($this->PostsModel->getLikes($result, $post_id)) {
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
        }
    }
    
    /**
     * Like method
     * @POST
     * 
     * @param string||NULL $post_id
     * @return void
     */
    function like(?string $post_id = NULL) : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_POST) 
            && !is_null($post_id)
            && $this->PostsModel->toggleLike($errors, $post_id)) 
        {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        } 
        else {
            $this->responseCode(400);
            $this->printJSON(['errors' => $errors]);
        }
    }
    
}