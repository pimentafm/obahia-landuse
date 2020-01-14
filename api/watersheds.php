<?php
	include("connection.php");

	class Pols extends Connection {
    	public function showData(){
			$sql = "select ottocod, areaha, nome from vector.watersheds";

			$BFetch=$this->connect()->prepare($sql);
			$BFetch->execute();

			$J=[];
			$I=0;
		
			while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
				$J[$I]=[
					"ottocod"=>$Fetch['ottocod'],
					"areaha"=>$Fetch['areaha'],
					"nome"=>$Fetch['nome']
				];
				$I++;
			}
			
			#header("Access-Control-Allow-Origin:*");
			#header("Content-type: application/json");
			                        
			echo json_encode($J);
			}
	}

?>
