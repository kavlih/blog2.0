<?php

namespace application\Controller;

use application\Controller as AbstractController;
use application\Model\Account as AccountModel;

/**
 * Account controller class
 * 
 * @package application\Controller
 */
final class Account extends AbstractController {

    function __construct() {
        $this->AccountModel = new AccountModel();    
    }

    /**
     * Login method
     * @POST
     */
    function login() : void {
        $errors = [];
        $login = $this->AccountModel->login($errors);

        if($this->isMethod(self::METHOD_POST) && !is_null($login)) {
            $this->responseCode(200);
            $this->printJSON([
                'success'   => TRUE,
                'user'      => [
                    'id'        => $login['user_id'],
                    'role'      => $login['role'],
                    'username'  => $login['username'],
                    'email'     => $login['email'],
                    'identicon' => $login['identicon'],
                ]
            ]);
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['errors' => $errors]);
        }
    }

    /**
     * Register method
     * @POST
     */
    function register() : void {
        $errors = [];

        if($this->isMethod(self::METHOD_POST) && $this->AccountModel->register($errors)) {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }
        else {
            $this->responseCode(400);
            $this->printJSON(['errors' => $errors]);
        }
    }

}