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
     * Login method
     *
     * @return void
     */
    function login() : void {
        $validation_errors = [];

        //if($this->isMethod(self::METHOD_POST) && $this->UserModel->register($errors)) {
        if($this->UserModel->login($validation_errors)) {
            $this->responseCode(200);
            $this->printJSON(['Success' => TRUE]);
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['Validation error(s)' => $validation_errors]);
        }
    }

    /**
     * Register method
     *
     * @return void
     */
    function register() : void {
        $validation_errors = [];
        $sql_response = [];

        //if($this->isMethod(self::METHOD_POST) && $this->UserModel->register($errors)) {
        if($this->UserModel->register($sql_response, $validation_errors)) {
            $this->responseCode(200);
            $this->printJSON(['Success' => TRUE]);
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['Validation error(s)' => $validation_errors]);
        }

        $this->printJSON(['SQL response' => $sql_response]);
    }

}