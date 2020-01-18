<?php
	include("connection.php");

	class TotalLanduse extends Connection {
    	public function get_data(){
		$sql = 'select year, "Forest formations", "Savanna formations", "Grasslands", "Crop or pasture", "Rainfed crop", "Irrigated crop", "Pasturelands", "Water bodies", "Urban areas" from stats.landuse_19902018';

			$BFetch=$this->connect()->prepare($sql);
			$BFetch->execute();

			$J=[];
			$I=0;


			while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
				$J[$I]=[
					"year"=>$Fetch['year'],
					"forest"=>$Fetch['Forest formations'],
					"savanna"=>$Fetch['Savanna formations'],
					"grass"=>$Fetch['Grasslands'],
					"croppast"=>$Fetch['Crop or pasture'],
					"raincrop"=>$Fetch['Rainfed crop'],
					"irrcrop"=>$Fetch['Irrigated crop'],
					"past"=>$Fetch['Pasturelands'],
					"water"=>$Fetch['Water bodies'],
					"urban"=>$Fetch['Urban areas'],
				];
				$I++;
			}

			#header("Access-Control-Allow-Origin:*");
			#header("Content-type: application/json");
			                        
			echo json_encode($J);
			}
	}

?>
