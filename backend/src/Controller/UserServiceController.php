<?php

namespace application\Controller;

use application\Controller as AbstractController;
use application\Model\UserServiceModel;
use application\Authorize;

/**
 * UserService controller class
 * 
 * @package application\Controller
 */
final class UserServiceController extends AbstractController {
    
    function __construct() {
        $this->UserModel = new UserServiceModel();    
    }

    /**
     * Login method
     *
     * @return void
     */
    function login() : void {
        $errors = [];

        //if($this->isMethod(self::METHOD_POST) && $this->UserModel->login($errors)) {
        if($this->UserModel->login($errors)) {
            $this->responseCode(200);
            $this->printJSON([
                'Success'   => TRUE,
                'jwt'       => Authorize::createToken()
            ]);
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['Error(s)' => $errors]);
        }
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