<?php

namespace application;

abstract class Session {

    static function start() : void {
        session_start();
    }
}
