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
     * @POST
     * 
     * @param int||NULL $userId
     * @return void
     */
    function delete(?int $userId) : void {
        /** @var array $errors */
        $errors = [];
        /** @var array||NULL $userData */
        $userData = $this->AccountModel->getUserById($errors, $userId);

        if(!$this->isMethod(self::METHOD_POST) || !$userData) {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        elseif(!$this->AccountModel->delete($errors, $userData)) {
            $this->responseCode(409);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        else {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }  
    }

    /**
     * @POST
     * 
     * @return void
     */
    function login() : void {
        /** @var array $errors */
        $errors = [];
        /** @var array $result */
        $result = [];

        if(!$this->isMethod(self::METHOD_POST)) {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE]);
        }
        elseif(!$this->AccountModel->login($errors, $result)) {
            $this->responseCode(409);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        else {
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
    }

    /**
     * @POST
     * 
     * @return void
     */
    function signUp() : void {
        /** @var array $errors */
        $errors = [];

        if(!$this->isMethod(self::METHOD_POST)) {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE]);
        }
        elseif(!$this->AccountModel->signUp($errors)) {
            $this->responseCode(409);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        else {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }
    }
    
    /**
     * @PUT
     * 
     * @param int||NULL $userId
     * @return void
     */
    function resetIdenticon(?int $userId) : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_OPTIONS)) {
            $this->responseCode(200);
        }
        elseif(!$this->isMethod(self::METHOD_PUT) 
            || !$this->AccountModel->getUserById($errors, $userId)
            || !$this->PostModel->resetIdenticon($userId))
        {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        else {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }
    }
    
    /**
     * @POST
     * 
     * @param int||NULL $userId
     * @return void
     */
    function updateEmail(?int $userId) : void {
        /** @var array $errors */
        $errors = [];

        if(!$this->isMethod(self::METHOD_POST)
            || !$this->AccountModel->getUserById($errors, $userId))
        {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        elseif(!$this->AccountModel->updateEmail($errors, $userId)) {
            $this->responseCode(409);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        else {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }
    }
    
    /**
     * @PUT
     * 
     * @param int||NULL $userId
     * @return void
     */
    function updateIdenticon(?int $userId) : void {
        /** @var array $errors */
        $errors = [];

        if($this->isMethod(self::METHOD_OPTIONS)) {
            $this->responseCode(200);
        }
        if(!$this->isMethod(self::METHOD_PUT)
            || !$this->AccountModel->getUserById($errors, $userId)
            || !$this->AccountModel->updateIdenticon($userId))
        {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        else {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }
    }

    /**
     * @POST
     * 
     * @param int||NULL $userId
     * @return void
     */
    function updatePassword(?int $userId) : void {
        /** @var array $errors */
        $errors = [];

        if(!$this->isMethod(self::METHOD_POST)
            || !$this->AccountModel->getUserById($errors, $userId))
        {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        elseif(!$this->AccountModel->updatePassword($errors, $userId)) {
            $this->responseCode(409);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        else {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }
    }

    /**
     * @POST
     * 
     * @param int||NULL $userId
     * @return void
     */
    function updateUsername(?int $userId) : void {
        /** @var array $errors */
        $errors = [];

        if(!$this->isMethod(self::METHOD_POST)
            || !$this->AccountModel->getUserById($errors, $userId))
        {
            $this->responseCode(400);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        elseif(!$this->AccountModel->updateUsername($errors, $userId)) {
            $this->responseCode(409);
            $this->printJSON(['success' => FALSE, 'errors' => $errors]);
        }
        else {
            $this->responseCode(200);
            $this->printJSON(['success' => TRUE]);
        }
    }
}