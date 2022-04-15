<?php

namespace application\Controller;

use application\Controller as AbstractController;
use application\Model\User as UserModel;

final class User extends AbstractController {

  function __construct() {
    $this->UserModel = new UserModel();
  }

  /**
   * @POST
   * 
   * @param int||NULL $userId
   * @return void
   */
  function getFollowers(?int $userId) : void {
    /** @var array $errors */
    $errors = [];
    /** @var array $result */
    $result = [];
            
    if(!$this->isMethod(self::METHOD_GET)
      || !$this->UserModel->getUserById($errors, $userId)) 
    {
      $this->responseCode(400);
      $this->printJSON(['success' => FALSE, 'errors' => $errors]);
    }
    elseif(!$this->UserModel->getFollowers($result, $userId)) {
      $this->responseCode(204);
      $this->printJSON(['success' => TRUE]);
    }
    else {
      $this->responseCode(200);
      $this->printJSON(['success' => TRUE, 'result' => $result]);
    }
  }
  
  /**
   * @POST
   * 
   * @param int||NULL $userId
   * @return void
   */
  function getFollowing(?int $userId) : void {
    /** @var array $errors */
    $errors = [];
    /** @var array $result */
    $result = [];
            
    if(!$this->isMethod(self::METHOD_GET)
      || !$this->UserModel->getUserById($errors, $userId)) 
    {
      $this->responseCode(400);
      $this->printJSON(['success' => FALSE, 'errors' => $errors]);
    }
    elseif(!$this->UserModel->getFollowing($result, $userId)) {
      $this->responseCode(204);
      $this->printJSON(['success' => TRUE]);
    }
    else {
      $this->responseCode(200);
      $this->printJSON(['success' => TRUE, 'result' => $result]);
    }
  }

  /**
   * @POST
   * 
   * @param int||NULL $receiverId
   * @return void
   */
  function follow(?int $receiverId) : void {
    /** @var array $errors */
    $errors = [];

    if(!$this->isMethod(self::METHOD_POST) 
      || !$this->UserModel->getUserById($errors, $receiverId)
      || !$this->UserModel->toggleFollow($errors, $receiverId)) 
    {
      $this->responseCode(400);
      $this->printJSON(['success' => FALSE, 'errors' => $errors]);
    }
    else {
      $this->responseCode(200);
      $this->printJSON(['success' => TRUE]);
    }
  }

}