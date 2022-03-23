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
     * For getting feed posts of signed in user
     * 
     * @param string||NULL $user_id
     * @return void
     */
    function feed(?string $user_id = NULL) : void {
        /** @var array $result */
        $result = [];

        if($this->isMethod(self::METHOD_GET) && !is_null($user_id)) {
            if ($this->PostsModel->getFeedPosts($result, $user_id)) {
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
            $this->printJSON(['success' => FALSE]);
        }
    }
    
    /**
     * User method
     * @GET
     * 
     * For getting posts of a specific user
     * 
     * @param string||NULL $user_id
     * @return void
     */
    function user(?string $user_id = NULL) : void {
        /** @var array $result */
        $result = [];

        if($this->isMethod(self::METHOD_GET) && !is_null($user_id)) {
            if ($this->PostsModel->getUserPosts($result, $user_id)) {
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
            $this->printJSON(['success' => FALSE]);
        }
    }

    /**
     * Liked method
     * @GET
     * 
     * For getting liked posts of a specific user
     * 
     * @param string||NULL $user_id
     * @return void
     */
    function liked(?string $user_id = NULL) : void {
        /** @var array $result */
        $result = [];

        if($this->isMethod(self::METHOD_GET) && !is_null($user_id)) {
            if ($this->PostsModel->getUserLikes($result, $user_id)) {
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
            $this->printJSON(['success' => FALSE]);
        }
    }

    /**
     * Create method
     * @POST
     * 
     * For creating a post
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
                $this->printJSON(['success' => FALSE, 'errors' => $errors]);
            }
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE]);
        }
    }
    
    /**
     * Create method
     * @POST
     * 
     * For deleting a post
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
                $this->printJSON(['success' => FALSE, 'errors' => $errors]);
            }
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE]);
        }
    }

    /**
     * Likes method
     * @GET
     * 
     * For getting likes of a post
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
            $this->printJSON(['success' => FALSE]);
        }
    }
    
    /**
     * Like method
     * @POST
     * 
     * For liking a post
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
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
    }
    
}