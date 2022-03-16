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
     * 
     * @return void
     */
    function login() : void {
        /** @var array $errors */
        $errors = [];
        /** @var array||NULL $login */
        $login = $this->AccountModel->login($errors);

        if($this->isMethod(self::METHOD_POST)) {
            if (!is_null($login)) {
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
                $this->responseCode(409);
                $this->printJSON(['errors' => $errors]);
            }
        }
        else {
            $this->responseCode(400);
        }
    }

    /**
     * Register method
     * @POST
     * 
     * @return void
     */
    function register() : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_POST)) {
            if ($this->AccountModel->register($errors)) {
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
}