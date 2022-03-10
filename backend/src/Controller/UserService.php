<?php

namespace application\Controller;

use application\Controller as AbstractController;
use application\Model\UserService as UserServiceModel;
use application\Authorize;

/**
 * UserService controller class
 * 
 * @package application\Controller
 */
final class UserService extends AbstractController {
    
    function __construct() {
        $this->UserServiceModel = new UserServiceModel();    
    }

    /**
     * Login method
     *
     * @return void
     */
    function login() : void {
        $errors = [];
        $login = $this->UserServiceModel->login($errors);

        if(!is_null($login)) {
            $this->responseCode(200);
            $this->printJSON([
                'jwt'       => Authorize::createToken(),
                'user'      => [
                    'id'        => $login['id'],
                    'role'      => $login['role'],
                    'username'  => $login['username'],
                    'email'     => $login['email'],
                    'identicon' => $login['identicon'],
                ]
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

        //if($this->isMethod(self::METHOD_POST) && $this->UserServiceModel->register($errors)) {
        if($this->UserServiceModel->register($errors)) {
            $this->responseCode(200);
            $this->printJSON(['Success' => TRUE]);
        }
        // else if ($errors['username']['exists']) {
        
        // }
        else {
            $this->responseCode(400);
            $this->printJSON(['Error(s)' => $errors]);
        }
    }

}