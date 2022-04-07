<?php

namespace application\Controller;

use application\Controller as AbstractController;

/**
 * Error controller class
 * 
 * @package application\Controller
 */
final class Error extends AbstractController {

    /**
     * Index method
     *
     * @param int $status
     * @return void
     */
    function index(int $status = 404) : void {
        $this->responseCode($status);
        $this->printJSON(['Error' => $status]);
    }
}
