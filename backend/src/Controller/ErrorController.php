<?php

namespace application\Controller;

use application\Controller as AbstractController;

/**
 * Error controller class
 * 
 * @package application\Controller
 */
final class ErrorController extends AbstractController {

    /**
     * Index method
     *
     * @return void
     */
    function index(int $status = 404) : void {
        $this->responseCode($status);
        $this->printJSON(['Error' => $status]);
    }
}
