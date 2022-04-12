<?php

namespace application\Model;

use application\Model as AbstractModel;
use application\Model\Traits\User as UserTrait;

/**
 * Account model class
 * 
 * @package application\Model
 */
final class Account extends AbstractModel {

    use UserTrait;

    /**
     * Delete user
     * 
     * @param array $errors
     * @param array $userData
     * @return bool
     */
    function delete(array &$errors, array $userData) {
        /** @var string||NULL $inputPwd */
        $inputPwd = filter_input(INPUT_POST, 'password');

        if(!$this->validatePwdDb($errors, $userData, $inputPwd)) {
            return FALSE;
        }
        
        /** @var string $query */
        $query = 'DELETE FROM users WHERE user_id = :user_id;
                  DELETE FROM posts WHERE user_id = :user_id;
                  DELETE FROM identicon WHERE user_id = :user_id;
                  DELETE FROM followers WHERE follower_id = :user_id OR receiver_id = :user_id;
                  DELETE l FROM likes AS l INNER JOIN posts AS p ON p.id = l.post_id WHERE l.user_id = :user_id OR p.user_id = :user_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->DbHandler->prepare($query);
        $stmt->bindValue(':user_id', $userData['user_id']);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /**
     * Login
     * 
     * @param array $errors
     * @param array $result
     * @return bool
     */
    function login(array &$errors, array &$result) : bool {
        /** @var string||NULL $inputUser */
        $inputUser = strtolower(filter_input(INPUT_POST, 'user'));
        /** @var string||NULL $inputPwd */
        $inputPwd = filter_input(INPUT_POST, 'password');

        // If inputs are empty
        if(!$inputUser || !$inputPwd) {
            if(!$inputUser) {
                $errors[] = 'Please type in your username or email address';
            }
            if(!$inputPwd) {
                $errors[] = 'Please type in your password';
            }
            return FALSE;
        }

        /** @var array||NULL $getUsername */
        $getUsername = $this->getUserbyUsername($errors, $inputUser);
        /** @var array||NULL $getEmail */
        $getEmail = $this->getUserbyEmail($errors, $inputUser);

        // If user was found, set $result
        if($getUsername) {
            /** @var array $userData */
            $result = $getUsername;
        }
        elseif($getEmail) {
            /** @var array $userData */
            $result = $getEmail;
        }

        // Empty $errors
        $errors = [];

        // If user was not found OR password is wrong
        if(!($getUsername || $getEmail) 
            || !$this->comparePasswords($result, $inputPwd)) 
        {
            $errors[] = 'This combination does not exist';
        }

        return empty($errors);
    }

    /**
     * Sign Up
     * 
     * @param array $errors
     * @return bool
     */
    function signUp(array &$errors) : bool {
        /** @var ?string $inputUsername */
        $inputUsername = filter_input(INPUT_POST, 'username');
        /** @var ?string $inputEmail */
        $inputEmail = filter_input(INPUT_POST, 'email');
        /** @var ?string $inputPwd */
        $inputPwd = filter_input(INPUT_POST, 'password');

        $validations['username'] = $this->validateUsername($errors, $inputUsername);
        $validations['email'] = $this->validateEmail($errors, $inputEmail);
        $validations['password'] = $this->validatePwd($errors, $inputPwd);

        foreach ($validations as $validation) {
            if(!$validation) {
                return FALSE;
            }
        }

        // Hash password
        /** @var string $hashedSalt */
        $hashedSalt = $this->createHashedSalt();
        /** @var string $hashedPwd */
        $hashedPwd = $this->createHashedPwd($inputPwd, $hashedSalt);

        // Insert data into database
        /** @var bool $insertUser */
        $insertUser = $this->inserUser($inputUsername, $inputEmail, $hashedPwd, $hashedSalt);
        if($insertUser) {
            /** @var array||NULL $userData */
            $userData = $this->getUserbyEmail($errors, $inputEmail);
            /** @var bool $insertAdditionals */
            $insertAdditionals = $this->insertAdditionals($userData['user_id']);
        } 
        
        return $insertUser && $insertAdditionals;
    }

    /**
     * Reset identicon
     * 
     * @param int $userId
     * @return bool
     */
    function resetIdenticon(int $userId) : bool {
        return $this->insertIdenticon($userId, $userId);
    }

    /**
     * Update email
     * 
     * @param array $errors
     * @param int $userId
     * @return bool
     */
    function updateEmail(array &$errors, int $userId) : bool {
        /** @var ?string $email */
        $email = filter_input(INPUT_POST, 'email');

        if(!$this->validateEmail($errors, $email)) {
            return FALSE;
        }

        /** @var string $query */
        $query = 'UPDATE users SET email = :email WHERE user_id = :user_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->DbHandler->prepare($query);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':user_id', $userId);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /**
     * Update identicon
     * 
     * @param int $userId
     * @return bool
     */
    function updateIdenticon(int $userId) : bool {
        // repeat if identicon is already taken
        do {
            // getrandmax() => 2 147 483 647
            /** @var string $identiconNew */
            $identiconNew = 'i' . rand(0, getrandmax());
        } while ($this->getIdenticon($identiconNew));

        return $this->insertIdenticon($userId, $identiconNew);
    }

    /**
     * Update password
     * 
     * @param int $userId
     * @param array $errors
     * @return bool
     */
    function updatePassword(array &$errors, int $userId) : bool {
        /** @var ?string $passwordNew */
        $passwordNew = filter_input(INPUT_POST, 'passwordNew');
        /** @var ?string $passwordDb */
        $passwordDb = filter_input(INPUT_POST, 'password');

        // Return FALSE if passwords are the same
        if($passwordNew === $passwordDb) {
            $errors['password'][] = 'This is already your password';
            return FALSE;
        }

        /** @var array $userData */
        $userData = $this->getUserbyId($errors, $userId);
        
        /** @var bool $validatePwdDb */
        $validatePwdDb = $this->validatePwdDb($errors, $userData, $passwordDb);
        /** @var bool $validatePwd */
        $validatePwd = $this->validatePwd($errors, $passwordNew);

        // Return FALSE if validations were not successful
        if(!$validatePwdDb || !$validatePwd) {
            return FALSE;
        }

        // Hash salt & password
        /** @var string $hashedSalt */
        $hashedSalt = $this->createHashedSalt();;
        /** @var string $hashedPwd */
        $hashedPwd = $this->createHashedPwd($passwordNew, $hashedSalt);

        /** @var string $query */
        $query = 'UPDATE users SET password = :password, salt = :salt WHERE user_id = :user_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->DbHandler->prepare($query);
        $stmt->bindValue(':salt', $hashedSalt);
        $stmt->bindValue(':password', $hashedPwd);
        $stmt->bindValue(':user_id', $userId);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /**
     * Update username
     * 
     * @param int $userId
     * @param array $errors
     * @return bool
     */
    function updateUsername(array &$errors, int $userId) : bool {
        /** @var ?string $username */
        $username = filter_input(INPUT_POST, 'username');

        if($this->validateUsername($errors, $username)) {
            return FALSE;
        }
        
        /** @var string $query */
        $query = 'UPDATE users SET username = :username WHERE user_id = :user_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->DbHandler->prepare($query);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':user_id', $userId);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /**
     * Compare passwords
     *
     * @param   array   $userData
     * @param   string  $inputPwd
     * @return  boolean
     */
    private function comparePasswords(array $userData, string $inputPwd) : bool {
        /** @var string $hashedSalt */
        $hashedSalt = $userData['salt'];
        /** @var string $hashedPwd */
        $hashedPwd = $userData['password'];

        return $hashedPwd === $this->createHashedPwd($inputPwd, $hashedSalt);
    }

    /**
     * Create hashed password
     *
     * @param string $pwd
     * @param string $salt
     * @return string
     */    
    private function createHashedPwd(string $pwd, string $salt) : string {
        return hash('sha512', "{$pwd}{$salt}");
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
     * Get identicon
     * 
     * @param string $identicon
     * @return bool
    */
    private function getIdenticon(string $identicon) : bool {
        /** @var string $query */
        $query = 'SELECT * FROM identicon WHERE identicon = :identicon';

        /** @var \PDOStatement $stmt */
        $stmt = $this->DbHandler->prepare($query);
        $stmt->bindValue(':identicon', $identicon);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /** 
     * Insert additionals into db
     * 
     * @param int $userId
     * @return bool
    */
    private function insertAdditionals(int $userId) : bool {
        /** @var string $query */
        $query = 'INSERT INTO identicon(user_id, identicon) VALUES (:user_id, :user_id);
            INSERT INTO followers(follower_id, receiver_id) VALUES (:user_id, :user_id);';

        /** @var \PDOStatement $stmt */
        $stmt = $this->DbHandler->prepare($query);
        $stmt->bindValue(':user_id', $userId);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }

    /**
     * Insert identicon
     * 
     * @param int $userId
     * @param int $identicon
     * @return bool
     */
    private function insertIdenticon(int $userId, string $identicon) {
        /** @var string $query */
        $query = 'UPDATE identicon SET identicon = :identicon WHERE user_id = :user_id;';

        /** @var \PDOStatement $stmt */
        $stmt = $this->DbHnadler->prepare($query);
        $stmt->bindValue(':identicon', $identicon);
        $stmt->bindValue(':user_id', $userId);
        $stmt->execute();

        return !empty($stmt->rowCount());
    }
    
    /** 
     * Insert user into db
     * 
     * @param string $username
     * @param string $email
     * @param string $password
     * @param string $salt
     * @return bool
    */
    private function inserUser(string $username, string $email, string $password, string $salt) : bool {
        /** @var string $query */
        $query = 'INSERT INTO users(username, email, password, salt) VALUES (:username, :email, :password, :salt);';
        /** @var \PDOStatement $stmt */
        $stmt = $this->DbHandler->prepare($query);
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':password', $password);
        $stmt->bindValue(':salt', $salt);
        $stmt->execute();

        return !empty($stmt->rowCount());
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
            else if($this->getUserbyEmail($unset, $email)) {
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
    private function validatePwd(array &$errors, ?string $password) : bool {
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
    private function validatePwdDb(array &$errors, ?array $user_data, ?string $password) : bool {
        if(is_null($password) || empty($password)) {
            $errors['passwordDb'][] = 'Please type in your password';
        }
        elseif(!$this->comparePasswords($user_data, $password)) {
            $errors['passwordDb'][] = 'Password is wrong';
        }

        return !isset($errors['passwordDb']);
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
            if($this->getUserbyUsername($unset, $username)) {
                $errors['username'][] = 'Username already exists';
            }
        }
        return !isset($errors['username']); 
    }

}