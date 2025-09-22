<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//set_time_limit(3);


$posicion = $_GET["puesto"];




$dsn="SAGE"; 
$usuario="sa"; 
$password="admin000"; 
$cid=odbc_connect($dsn,$usuario,$password); 
if (!$cid){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
}     





$sqlins = "select descripcioncentro from centrostrabajo   where  centrotrabajo  = '".$posicion."' and codigoempresa = 1 ";
//echo $sqlins;
$resultins=odbc_exec($cid,$sqlins) or die(exit("Error en odbc")); 

$CentroTrabajo = odbc_result($resultins,"descripcioncentro");


echo $CentroTrabajo;


//$datos =  @file_get_contents("/var/www/MRPII/maquina/OF".$posicion.".txt");
/*
if(strpos($datos, "|")>0 ) {
	
$datos_file= explode("|",$datos);
$orden = $datos_file[0];

$contador = substr(@file_get_contents('/var/www/MRPII/maquina/'.$posicion.'.txt', true),10,10);

$subdatos=explode("|",$datos);
$contador1= $subdatos[1];





$datos2= $subdatos[0]."|".substr("0000000000".$contador, -10)."|".$subdatos[2]."|".$subdatos[3]."|".$subdatos[4]."|".$subdatos[5]."|".$subdatos[6]."|".$subdatos[7]."|".$subdatos[8]."|".$subdatos[9]."|".$subdatos[10]."|".$subdatos[11]."|".$subdatos[12]."|".$subdatos[13]."|".$subdatos[14]."|".$subdatos[15]."|".$subdatos[16];

 {


	
   // echo "VACIA";
   // echo $barra_fichero.$orden;
    $barra_fichero = $orden;
//echo $barra_fichero."/".$barra_pantalla;
   if ($barra_fichero==''){
    echo "VACIA";
    echo $barra_fichero.$orden; 
    
    
} else {
	
	
	$of =  substr(@file_get_contents('/var/www/MRPII/maquina/'.$posicion.'.txt', true),0,10);
	//$contador = substr(file_get_contents('http://10.0.2.50/maquina/of.txt', true),-10);

	
	
$contador = substr(@file_get_contents('/var/www/MRPII/maquina/'.$posicion.'.txt', true),10,10);
	
	
if ((trim(str_replace("%20"," ",$barra_fichero))!=trim(str_replace("%20"," ",$barra_pantalla))) || ($contador!=$contador1)) {





	  
   
//if ($posicion=="MAQ50") $contador = substr(file_get_contents('http://10.0.2.50/maquina/of.txt', true),-10);
//$contador = substr(file_get_contents('/var/www/MRPII/maquina/'.$posicion.'.txt', true),11,10);
//echo $posicion."|".$orden."|".$referencia."|".$descripcion."|".$cantidad."|".$entrada."|".$permanencia."|".$estado."|".$contador."|".$incidencia;

 echo $datos2;//file_get_contents('/var/www/MRPII/maquina/OF'.$posicion.'.txt', true);


//odbc_free_result($result);
file_put_contents('/var/www/MRPII/maquina/OF'.$posicion.'.txt', $datos2);
if ($contador>0 && $contador<1000000) file_put_contents('/var/www/MRPII/maquina/'.$posicion.'.txt',$subdatos[0].substr("0000000000".$contador, -10));



} else {
    //echo "SIN CAMBIOS"."|".$contador."|".$cantok."|".$cantnok."|".$incidencia."|".$cantok2."|".$cantnok2."|".$cantok3."|".$cantnok3."|".$referencia."|".$referencia2."|".$referencia3."|".$cavidad1."|".$cavidad2."|".$cavidad3;
    
    
    echo $datos2;// file_get_contents('/var/www/MRPII/maquina/OF'.$posicion.'.txt', true);
   // file_put_contents('/var/www/MRPII/maquina/OF'.$posicion.'.txt', $datos2);
//  if ($contador>0)  file_put_contents('/var/www/MRPII/maquina/'.$posicion.'.txt',$subdatos[0].substr("0000000000".$contador, -10));
}


}
 }
 

} else {
//	echo "SIN CAMBIOS";
	
}
*/