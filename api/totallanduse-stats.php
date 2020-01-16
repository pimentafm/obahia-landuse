<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

    	include("totallanduse.php");

	$dd = new TotalLanduse();
	$dd->get_data();

	# Fedora: setsebool -P httpd_can_network_connect_db on
?>
