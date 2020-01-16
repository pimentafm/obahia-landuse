<?php
abstract class Connection {
    	protected function connect(){
        	try {
			$params = parse_ini_file('dbconfig.ini');
			if ($params === false) {
				throw new Exception("Error reading database configuration file.");
			}
			// connect to the postgresql database
			$connStr = sprintf("pgsql:host=%s;port=%d;dbname=%s;user=%s;password=%s", 
				$params['host'], 
				$params['port'], 
				$params['database'], 
				$params['user'], 
				$params['password']
			);

			$conn = new PDO($connStr);

        		return $conn;
    		} catch (PDOException $error){
    			return $error->getMessage();        		}
    	}
	}
?>
