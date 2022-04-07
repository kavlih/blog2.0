<?php

namespace application\Model;

use application\Model as AbstractModel;

/**
 * Account model class
 * 
 * @package application\Model
 */
final class Account extends AbstractModel {

    function delete(array &$errors, int $user_id) {
        $input_password = filter_input(INPUT_POST, 'password');

        if(empty($input_password)) {
            $errors['password'] = 'Please type in your password';
            return FALSE;
        }

        /** @var array $user_data */
        $user_data = $this->DbHandler->accountGet($user_id);
        $validate_db_password = $this->validatePasswordDb($errors, $user_data, $input_password);
        
        if(is_null($user_data) || !$validate_db_password) return FALSE;
        
        return $this->DbHandler->accountDelete($user_id);
    }

    /**
     * Login
     *
     * Processes POST data from the login form
     * Compares input data with the database
     * Returns TRUE if data machtes or FALSE if not
     * 
     * @param array $errors
     * @param array $result
     * @return bool
     */
    function login(array &$errors, array &$result) : bool {
        /** @var ?string $input_username */
        $input_user = strtolower(filter_input(INPUT_POST, 'user'));
        /** @var ?string $input_password */
        $input_password = filter_input(INPUT_POST, 'password');

        // Validate user inputs
        $validations['user'] = !empty($input_user);
        $validations['password'] = !empty($input_password);

        // Exit method and return FALSE if a input was empty
        foreach ($validations as $validation) {
            if(!$validation) {
                if(!$validations['user']) {
                    $errors['username'][] = 'Please type in your username or email address';
                }
                if(!$$validations['password']) {
                    $errors['password'][] = 'Please type in your password';
                }
                return FALSE;
            }
        }

        // Get user data from database
        /** @var array $result */
        $result = $this->DbHandler->accountGet($input_user);
        
        // If a matching user was found, compare passwords
        if(!is_null($result)) $compare_passwords = $this->comparePasswords($result, $input_password);

        // If no matching user was found or passwords don't match
        if(is_null($result) || !$compare_passwords) $errors['compare'] = 'This combination doesn\'t exist';

        return empty($errors); 
    }

    /**
     * Register
     *
     * Processes POST data from the registration form
     * Inserts data into database or returns FALSE if data was invalid
     * 
     * @param array $errors
     * @return bool
     */
    function register(array &$errors) : bool {
        // Get user data
        /** @var ?string $input_username */
        $input_username = filter_input(INPUT_POST, 'username');
        /** @var ?string $input_email */
        $input_email = filter_input(INPUT_POST, 'email');
        /** @var ?string $input_password */
        $input_password = filter_input(INPUT_POST, 'password');

        // Validate user inputs, methods storing TRUE on valid or FALSE on invalid input data
        $validations['username'] = $this->validateUsername($errors, $input_username);
        $validations['email'] = $this->validateEmail($errors, $input_email);
        $validations['password'] = $this->validatePassword($errors, $input_password);

        // Exit method and return FALSE if a input was invalid
        foreach ($validations as $validation) {
            if(!$validation) return FALSE;
        }

        // Hash password
        /** @var string $hashed_salt */
        $hashed_salt = $this->createHashedSalt();
        /** @var string $hashed_password */
        $hashed_password = $this->createHashedPassword($input_password, $hashed_salt);

        // Insert data into database
        /** @var bool $insert_user */
        $insert_user = $this->DbHandler->accountCreate($input_username, $input_email, $hashed_password, $hashed_salt);
        /** @var bool $insert_additionals */
        if($insert_user) {}$insert_additionals = $this->DbHandler->accountCreateAdditionals($input_username);
        
        return $insert_user && $insert_additionals;
    }

    /**
     * Reset identicon
     * 
     * @param int $user_id
     * @return bool
     */
    function resetIdenticon(int $user_id) : bool {
        return $this->DbHandler->accountUpdateIdenticon($user_id, $user_id);
    }

    /**
     * Update email
     * 
     * @param array $errors
     * @return bool
     */
    function updateEmail(array &$errors) : bool {
        /** @var ?string $email */
        $email = filter_input(INPUT_POST, 'email');
        /** @var int $user_id */
        $user_id = filter_input(INPUT_POST, 'user_id');

        /** @var bool $validate */
        $validate = $this->validateEmail($errors, $email);

        return $validate && $this->DbHandler->accountUpdateEmail($email, $user_id);
    }

    /**
     * Update identicon
     * 
     * @param int $user_id
     * @return bool
     */
    function updateIdenticon(int $user_id) : bool {
        do {
            // getrandmax() => 2 147 483 647
            /** @var string $identicon_new */
            $identicon_new = 'i' . rand(0, getrandmax());
        } while ($this->DbHandler->accountGetIdenticon($identicon_new));

        return $this->DbHandler->accountUpdateIdenticon($identicon_new, $user_id);
    }

    /**
     * Update password
     * 
     * @param array $errors
     * @return bool
     */
    function updatePassword(array &$errors) : bool {
        /** @var ?string $password_new */
        $password_new = filter_input(INPUT_POST, 'password_new');
        /** @var ?string $password_old */
        $password_old = filter_input(INPUT_POST, 'password_old');
        /** @var int $user_id */
        $user_id = filter_input(INPUT_POST, 'user_id');

        // Return FALSE if passwords are the same
        if($password_new === $password_old) {
            $errors['password'][] = 'This is already your password';
            return FALSE;
        }

        // Get user data from database
        /** @var array $result */
        $user_data = $this->DbHandler->accountGet($user_id);
        
        // Validate input data and set $errors if a input is invalid
        /** @var bool $validate_db_password */
        $validate_password_db = $this->validatePasswordDb($errors, $user_data, $password_old);
        /** @var bool $validate_password */
        $validate_password = $this->validatePassword($errors, $password_new);

        // Return FALSE if validations were not successful
        if(!$validate_password_db || !$validate_password) {
            return FALSE;
        }
        else {
            // Hash salt & password
            /** @var string $hashed_salt */
            $hashed_salt = $this->createHashedSalt();;
            /** @var string $hashed_password */
            $hashed_password = $this->createHashedPassword($password_new, $hashed_salt);

            return $this->DbHandler->accountUpdatePassword($hashed_salt, $hashed_password, $user_id);
        }
    }

    /**
     * Update username
     * 
     * @param array $errors
     * @return bool
     */
    function updateUsername(array &$errors) : bool {
        /** @var ?string $username */
        $username = filter_input(INPUT_POST, 'username');
        /** @var int $user_id */
        $user_id = filter_input(INPUT_POST, 'user_id');

        /** @var bool $validate */
        $validate = $this->validateUsername($errors, $username);
        
        return $validate && $this->DbHandler->accountUpdateUsername($username, $user_id);
    }

    /**
     * Compare passwords
     * 
     * Compares the input password with the users password in the database
     * Returns TRUE if the passwords are matching or FALSE if not
     *
     * @param   array   $user_data
     * @param   string  $input_password
     * @return  boolean
     */
    private function comparePasswords(array $user_data, string $input_password) : bool {
        /** @var string $hashed_salt */
        $hashed_salt = $user_data['salt'];
        /** @var string $hashed_password */
        $hashed_password = $user_data['password'];

        return $hashed_password === $this->createHashedPassword($input_password, $hashed_salt);
    }

    /**
     * Create hashed password
     *
     * @param string|NULL $password
     * @param string|NULL $salt
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
     * Validate email
     *
     * Checks if email is not empty
     * Checks if email is valid
     * Checks if username already exists
     * 
     * Returns TRUE if validation was successful and FALSE if $error was set
     *
     * @param array $errors
     * @param string|NULL $email
     * @return bool
     */
    private function validateEmail(array &$errors, ?string $email) : bool
    {
        if(is_null($email) || empty($email)) {
            $errors['email'][] = 'Please type in an email address';
        }
        else {
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors['email'][] = 'Email is not valid';
            }
            else if($this->DbHandler->accountGet($email)) {
                $errors['email'][] = 'Email is already registered';
            }
        }
        return !isset($errors['email']); 
    }

    /**
     * Validate password
     *
     * Checks if password is not empty
     * Checks if password is minimum 8 characters long
     * Checks if password contains whitespaces
     * Checks if password contains lowercase characters
     * Checks if password contains uppercase characters
     * Checks if password contains digits
     * Checks if password contains special characters
     * 
     * Returns TRUE if validation was successful and FALSE if $error was set
     *
     * @param array $errors
     * @param string|NULL $password
     * @return bool
     */
    private function validatePassword(array &$errors, ?string $password) : bool {
        if(is_null($password) || empty($password)) {
            $errors['password'][] = 'Please type in a password';
        }
        else {
            if(strlen($password) < 8) {
                $errors['password'][] = 'Password has to be at least 8 characters long';
            }
            if(preg_match('/\s/', $password)) {
                $errors['password'][] = 'Password should not contain any whitespace.';
            }
            if(!preg_match('/[a-z]/', $password)) {
                $errors['password'][] = 'Password should contain minimum one lowercase letter.';
            }
            if(!preg_match('/[A-Z]/', $password)) {
                $errors['password'][] = 'Password should contain minimum one uppercase letter.';
            }
            if(!preg_match('/\d/', $password)) {
                $errors['password'][] = 'Password should contain minimum one number.';
            }
            if(!preg_match( '/\W/', $password)) {
                $errors['password'][] = 'Password should contain minimum one special character.';
            }
        }
        return (!isset($errors['password'])); 
    }

    /**
     * Validate old password
     *
     * Checks if password is not empty
     * Checks if password is correct
     * 
     * Returns TRUE if validation was successful and FALSE if $error was set
     *
     * @param   array       $errors
     * @param   array|NULL  $user_data
     * @param   string|NULL $password
     * @return  bool
     */
    private function validatePasswordDb(array &$errors, ?array $user_data, ?string $password) : bool {
        if(is_null($password) || empty($password)) {
            $errors['password_old'][] = 'Please type in your password';
        }
        elseif(!$this->comparePasswords($user_data, $password)) {
            $errors['password_old'][] = 'Password is wrong';
        }

        return !isset($errors['password_old']);
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
     * @param array $errors
     * @param string|NULL $username
     * @return bool
     */
    private function validateUsername(array &$errors, ?string $username) : bool {
        if(is_null($username) || empty($username)) {
            $errors['username'][] = 'Please type in a username';
        }
        else {
            if(strlen($username) < 3) {
                $errors['username'][] = 'Username should be minimum 3 characters long';
            }
            if(strlen($username) > 16) {
                $errors['username'][] = 'Username should be maximum 16 characters long';
            }
            if(preg_match('/[^a-z0-9äüöß]/i', $username)) {
                $errors['username'][] = 'Use only letters or numbers';
            }
            if($this->DbHandler->accountGet($username)) {
                $errors['username'][] = 'Username already exists';
            }
        }
        return !isset($errors['username']); 
    }

}