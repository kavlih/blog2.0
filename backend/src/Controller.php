<?php

namespace application;

abstract class Controller {

    const METHOD_DELETE = 'DELETE';
    const METHOD_GET = 'GET';
    const METHOD_POST = 'POST';
    const METHOD_PUT = 'PUT';

    protected function isMethod(string $method) : bool {
        return $_SERVER['REQUEST_METHOD'] === $method;
    }

    protected function responseCode(int $status = 200) : void {
        http_response_code($status);
    }

    protected function printJSON(array $output) : void {
        echo json_encode($output, JSON_PRETTY_PRINT);
    }

}
