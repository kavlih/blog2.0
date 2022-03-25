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
     * Delete
     * @POST
     * 
     * @param int $user_id
     * @return void
     */
    function delete(int $user_id) : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_POST)) {
            if ($this->AccountModel->delete($errors, $user_id)) {
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
     * Login
     * @POST
     * 
     * @return void
     */
    function login() : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];

        if($this->isMethod(self::METHOD_POST)) {
            if ($this->AccountModel->login($errors, $result) && !empty($result)) {
                $this->responseCode(200);
                $this->printJSON([
                    'success'   => TRUE,
                    'user'      => [
                        'id'        => $result['user_id'],
                        'role'      => $result['role'],
                        'username'  => $result['username'],
                        'email'     => $result['email'],
                        'identicon' => $result['identicon'],
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
     * Register
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
    
    /**
     * Reset identicon
     * @PUT
     * 
     * @param int||NULL $user_id
     * @return void
     */
    function resetIdenticon(?int $user_id) : void {
        if($this->isMethod(self::METHOD_PUT)
            && !is_null($user_id)
            && $this->AccountModel->resetIdenticon($user_id)) 
        {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }
        else {
            $this->responseCode(400);
        }
    }
    
    /**
     * Update email
     * @POST
     * 
     * @return void
     */
    function updateEmail() : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_POST)) {
            if ($this->AccountModel->updateEmail($errors)) {
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
     * Update identicon
     * @PUT
     * 
     * @param int||NULL $user_id
     * @return void
     */
    function updateIdenticon(?int $user_id) : void {
        if($this->isMethod(self::METHOD_PUT)
            && !is_null($user_id)
            && $this->AccountModel->updateIdenticon($user_id)) 
        {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }
        else {
            $this->responseCode(400);
        }
    }

    /**
     * Update password
     * @POST
     * 
     * @return void
     */
    function updatePassword() : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_POST)) {
            if ($this->AccountModel->updatePassword($errors)) {
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
     * Update username
     * @POST
     * 
     * @return void
     */
    function updateUsername() : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_POST)) {
            if ($this->AccountModel->updateUsername($errors)) {
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