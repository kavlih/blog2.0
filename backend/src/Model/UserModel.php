<?php

namespace application\Model;

use application\Model as AbstractModel;

/**
 * User model class
 * 
 * @package application\Model
 */
final class UserModel extends AbstractModel {
    
    /**
     * Register method
     *
     * Processes POST data from the registration form
     * Inserts data into database or returns FALSE if data was invalid
     * 
     * @param   array   $errors
     * @return  bool
     */
    function register(array &$errors = []) : bool {
        // Get user data
        /** @var string $input_username */
        $input_username         = filter_input(INPUT_POST, 'username');
        /** @var string $input_email */
        $input_email            = filter_input(INPUT_POST, 'email');
        /** @var string $input_password */
        $input_password         = filter_input(INPUT_POST, 'password');
        /** @var string $input_password_repeat */
        $input_password_repeat  = filter_input(INPUT_POST, 'password_repeat');

        // Validate user data, methods storing TRUE on valid or FALSE on invalid input data
        $validations['username']    = $this->validateUsername($errors, $input_username);
        $validations['email']       = $this->validateEmail($errors, $input_email);
        $validations['password']    = $this->validatePassword($errors, $input_password, $input_password_repeat, $input_username);

        // Exit method and return FALSE if a input was invalid
        foreach ($validations as $validation)
        {
            if(!$validation) return FALSE;
        }

        // ? more unsecure if database inserts not wrapped by a "if validations are TRUE" statement and only return FALSE are "excluded" from the rest?

        // Hash password
        /** @var string $hashed_salt */
        $hashed_salt        = $this->createHashedSalt();
        /** @var string $hashed_password */
        $hashed_password    = $this->createHashedPassword($input_password, $hashed_salt);

        // Insert data into database
        /** @var bool $insert_user */
        $insert_user_db = $this->DbHandler->insertUser($input_username, $input_email, $hashed_password, $hashed_salt);
        /** @var bool $insert_additionals */
        $insert_additionals_db = $this->DbHandler->insertUserAdditionals($input_username);
        
        // Initialize error controller, if sql execution failed
        if(!$insert_user_db || !$insert_additionals_db) {
            // ? alternative to avoid inserting and deleting on failure?
            // Delete already inserted data if only additional inserts failed
            if(!$insert_additionals_db) {
                $this->DbHandler->deleteUser($input_username);
            }

            // TODO return error, not bool
            return FALSE;
        }

        return TRUE;
    }

    /**
     * Create hashed password
     *
     * @return string
     */    
    private function createHashedPassword(?string $password, ?string $salt) : string {
        return hash('sha512', "{$password}{$salt}");
    }

    /**
     * Create hashed salt
     *
     * @return string
     */
    private function createHashedSalt() : string {
        /** @var int $rand */
        $rand = rand(1111, 9999);
        /** @var int $time */
        $time = time();

        return hash('sha512', "{$time}-{$rand}");
    }

    /**
     * Validate username
     *
     * Checks if username is not empty
     * Checks if username is minimum 3 characters long
     * Checks if username is maximum 16 characters long
     * Checks if username contains only letters or numbers
     * Checks if username already exists
     * 
     * Returns TRUE if validation was successful or FALSE if $errors was set
     *
     * @param   array       $errors
     * @param   string|NULL $username
     * @return  bool
     */
    private function validateUsername(array &$errors, ?string $username) : bool {
        // If user entered data
        if(is_null($username) || empty($username)) {
            $errors['username'][] = 'Please type in a username';
        }
        else {
            // If username is too short
            if(strlen($username) < 3) {
                $errors['username'][] = 'Username should be minimum 3 characters long';
            }
            // If username is too long
            if(strlen($username) > 16) {
                $errors['username'][] = 'Username should be maximum 16 characters long';
            }
            // If username contains only letters or numbers
            if(preg_match('/[^a-z0-9äüöß]/i', $username)) {
                $errors['username'][] = 'Use only letters or numbers';
            }
            // If username already exists 
            if($this->DbHandler->getUser($username)) {
                $errors['username'][] = 'Username already exists';
            }
        }

        return !isset($errors['username']); 
    }

    /**
     * Validate email
     *
     * Checks if email is not empty
     * Checks if email is valid
     * Checks if username already exists
     * 
     * Returns TRUE if validation was successful and FALSE if $error was set
     *
     * @param   array       $errors
     * @param   string|NULL $email
     * @return  bool
     */
    private function validateEmail(array &$errors, ?string $email) : bool
    {
        // If user entered data
        if(is_null($email) || empty($email)) {
            $errors['email'][] = 'Please type in an email address';
        }
        else {
            // If email is valid
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors['email'][] = 'Email is not valid';
            }
            // If email already exists
            if($this->DbHandler->getUser($email)) {
                $errors['email'][] = 'Email is already registered';
            }
        }

        return !isset($errors['email']); 
    }

    /**
     * Validate password
     *
     * Checks if password is not empty
     * Checks if password is not the same as username
     * Checks if password is minimum 8 characters long
     * Checks if password is maximum 64 characters long
     * Checks if password contains whitespaces
     * Checks if password contains lowercase characters
     * Checks if password contains uppercase characters
     * Checks if password contains digits
     * Checks if password contains special characters
     * 
     * Checks if password_reapeat is not empty
     * Checks if password_reapeat is the same as password
     * 
     * Returns TRUE if validation was successful and FALSE if $error was set
     *
     * @param   array       $errors
     * @param   string|NULL $password
     * @param   string|NULL $password_repeat
     * @param   string|NULL $username
     * @return  bool
     */
    private function validatePassword(array &$errors, ?string $password, ?string $password_repeat, ?string $username) : bool {
        // If user entered data
        if(is_null($password) || empty($password)) {
            $errors['password'][] = 'Please type in a password';
        }
        else {
            // If username matches password
            if(strtolower($username) === strtolower($password)) {
                $errors['password'][] = 'Password should not be the same as username';
            }
            // If password too short
            if(strlen($password) < 8) {
                $errors['password'][] = 'Password has to be at least 8 characters long';
            }
            // If password too long
            if(strlen($password) > 64) {
                $errors['password'][] = 'Password is too long. Use maximum 64 characters';
            }
            // If password contains whitespaces
            if(preg_match('/\s/', $password)) {
                $errors['password'][] = 'Password should not contain any whitespace.';
            }
            // If password contains lowercase characters
            if(!preg_match('/[a-z]/', $password)) {
                $errors['password'][] = 'Password should contain minimum one lowercase letter.';
            }
            // If password contains uppercase characters
            if(!preg_match('/[A-Z]/', $password)) {
                $errors['password'][] = 'Password should contain minimum one uppercase letter.';
            }
            // If password contains digits
            if(!preg_match('/\d/', $password)) {
                $errors['password' ][] = 'Password should contain minimum one digit.';
            }
            // If password contains special characters
            if(!preg_match( '/\W/', $password)) {
                $errors['password'][] = 'Password should contain minimum one special character.';
            }
        }

        // If user entered data
        if(is_null($password_repeat) || empty($password_repeat))
        {
            $errors['password_repeat'][] = 'Please repeat your Password';
        }
        // If password and password_repeat are the same
        elseif($password !== $password_repeat )
        {
            $errors['password_repeat'][] = 'Passwords do not match';
        }

        return (!isset($errors['password'])) && (!isset($errors['password_repeat'])); 
    }

}