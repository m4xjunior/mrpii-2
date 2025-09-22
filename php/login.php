<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

{

$dsn="SAGE"; 
$usuario="sa"; 
$password="admin000"; 
$cid=odbc_connect($dsn,$usuario,$password); 
if (!$cid){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
}     


$of = "";
$barra = 0;

$operario = $_GET["operario"];
$puesto = $_GET["puesto"];
//$cara = $_GET["cara"];


/*

$dsn2="odbc_pipeline_400"; 
$usuario2="conexion"; 
$password2="conexion"; 
$cid=odbc_connect($dsn2,$usuario2,$password2); 
if (!$cid){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
    
    
}     
*/



$sql= "select * from operarios where operario ='".trim($operario)."' order by 1";

 $result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
	 
	 while (odbc_fetch_row($result)) {

		$operario = odbc_result($result,"operario");
                $nombre = trim(odbc_result($result,"nombreoperario"));
                $equipo = odbc_result($result,"khcoddepartamento");
                $obsoleto = odbc_result($result,"fechabaja");
                
              
                $sql= "select count(*) from operarios where operario = '".trim($operario)."'";
              
                $result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
                
                $existe = odbc_result($result,1);
                
         }
         


 $sql= "select count(*) from operarios where operario = '".trim($operario)."'";
$existe = 1;

$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec est")); 







$existe =  odbc_result($result,1);


$cara = "";
$equipo = "";
$fecha = date("m-d-Y H:i:s");
//$hora = date("H:i:s");
if (isset($_GET['of'])) $of = $_GET['of'];
if (isset($_GET['barra'])) $of = $_GET['barra'];

if ($existe>=1){
$sqlins = "insert into KHITT_LoginOperarios values ( 1 , $operario , '$fecha' , NULL  , '$puesto' , 0 , '".$of."' )";
echo $sqlins;
$resultins=odbc_exec($cid,$sqlins) or die(exit("Error en odbc")); 
odbc_commit($cid);
} else {
	echo "NO EXISTE OPERARIO.";
	
}


}