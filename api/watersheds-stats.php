<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

    	include("watersheds.php");

	$data = new Watersheds();
	$data->get_data();

	# Fedora: setsebool -P httpd_can_network_connect_db on
?>
