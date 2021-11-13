<?php

namespace application\Controller;

use application\Controller as AbstractController;
use application\Model\UserModel;

/**
 * User controller class
 * 
 * @package application\Controller
 */
final class UserController extends AbstractController {
    
    function __construct() {
        $this->UserModel = new UserModel();    
    }

    /**
     * Register method
     *
     * @return void
     */
    function register() : void {
        $errors = [];

        //if($this->isMethod(self::METHOD_POST) && $this->UserModel->register($errors)) {
        if($this->UserModel->register($errors)) {
            $this->responseCode(200);
            $this->printJSON(['Success' => TRUE]);
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['Error(s)' => $errors]);
        }
    }

}