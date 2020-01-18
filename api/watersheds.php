<?php
	include("connection.php");

	class Watersheds extends Connection {
    	public function get_data(){
		$sql = "
			select ws.ottocod as ottocod, lu.class as class, lu.classname as classname 
			from vector.watersheds as ws, stats.landuse_19902018_watersheds as lu 
			where ws.ottocod = lu.code and lu.code = 76564 and lu.class = 4
			";

			$BFetch=$this->connect()->prepare($sql);
			$BFetch->execute();

			$J=[];
			$I=0;


			while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
				$J[$I]=[
					"ottocod"=>$Fetch['ottocod'],
					"class"=>$Fetch['class'],
				];
				$I++;
			}

			header("Access-Control-Allow-Origin:*");
			header("Content-type: application/json");
			                        
			echo json_encode($J);
			}
	}

?>
