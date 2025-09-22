<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$dsn="SAGE"; 
$usuario="sa"; 
$password="admin000"; 
$cid=odbc_connect($dsn,$usuario,$password); 
if (!$cid){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
}     


$puesto = $_GET["puesto"];
//$cara = $_GET["cara"];
$cara = "";
$equipo = "";
$fecha = date("m-d-Y H:i:s");
$fechacalc = date("Y-m-d H:i:s");
$hora = date("H:i:s");
$operario = $_GET["operario"];



$sqlins = "select fechaIni from KHITT_LoginOperarios   where  fechafin is null  and centroTrabajo = '$puesto' and operario = $operario";
//echo $sqlins;
$resultins=odbc_exec($cid,$sqlins) or die(exit("Error en odbc")); 

$fechaIni = odbc_result($resultins,"fechaIni");

//echo $fechaIni." ".$fecha." ".$horas."<br>";
$horas = ( strtotime($fechacalc) - strtotime($fechaIni) )/ 3600;

//echo $fechaIni." ".$fechacalc." ".$horas."<br>";

$sqlins = "update KHITT_LoginOperarios set fechafin  = '$fecha' , horas = $horas  where  fechafin is null  and centroTrabajo = '$puesto' and operario = $operario";

//, horas = ((datediff((minute , fechaini, '$fecha'  ))) ) 


//echo $sqlins;
$resultins=odbc_exec($cid,$sqlins) or die(exit("Error en odbc")); 




/*
$sqlins = "update KHITT_LoginOperarios set horas = ((datediff((hour , fechaini, fechafin  ))) + (datediff((hour , fechaini, fechafin  ))/*100/60) )  where  fechafin is null  and centroTrabajo = '$puesto' and operario = $operario and horas = 0";

//, horas = ((datediff((minute , fechaini, '$fecha'  ))) ) 


echo $sqlins;
$resultins=odbc_exec($cid,$sqlins) or die(exit("Error en odbc")); 
odbc_commit($cid);*/

//$sqlins = "update logope set opeffin = $fecha, opehfin = '$hora'   where opecod = $operario and opeffin = 0 and opeffin = '00:00:00' and opealm = 207";
//echo $sqlins;
//$resultins=mysql_query($sqlins) or die(exit("Error en mysql_query")); 


/*
$sqlins = "insert into logope values ($operario , $fecha ,  '$hora' , $puesto , '$cara' , '$equipo' , 0 , '00:00' , 207 ,  '' )";
//echo $sqlins;
$resultins=mysql_query($sqlins) or die(exit("Error en mysql_query")); 
 * 
 * */
