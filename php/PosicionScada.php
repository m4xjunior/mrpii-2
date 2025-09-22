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



$dsnm="MAPEX"; 
$usuariom="sa"; 
$passwordm="Mapexdd2017"; 
$cidm=odbc_connect($dsnm,$usuariom,$passwordm); 
if (!$cidm){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos MAPEX."); 
}     


$sqlins = "select descripcioncentro from centrostrabajo   where  centrotrabajo  = '".$posicion."' and codigoempresa = 1 ";
//echo $sqlins;
$resultins=odbc_exec($cid,$sqlins) or die(exit("Error en odbc")); 

$CentroTrabajo = odbc_result($resultins,"descripcioncentro");


echo $CentroTrabajo;



$sqlins = "select Cod_maquina , desc_maquina , Rt_Cod_of , coalesce((select cod_producto from cfg_producto cp where cp.id_producto = rt_id_producto) , 'N/A') as rt_Cod_producto , Rt_Desc_producto , Rt_Unidades_planning , Rt_Desc_actividad , Rt_Desc_operario , Rt_Unidades_ok_of , Rt_Unidades_nok_of , f_velocidad , Rt_Rendimientonominal1

from cfg_maquina

where activo = 1 and Cod_maquina = '$posicion' ";
//echo $sqlins;
$result=odbc_exec($cidm,$sqlins) or die(exit("Error en odbc")); 



echo "|".odbc_result($result,"Rt_Cod_of")."|".odbc_result($result,"rt_Cod_producto")."|".odbc_result($result,"Rt_Desc_producto")."|".odbc_result($result,"Rt_Unidades_planning")."|".odbc_result($result,"Rt_Desc_actividad")."|".odbc_result($result,"Rt_Unidades_ok_of")."|".odbc_result($result,"Rt_Unidades_nok_of")."|".odbc_result($result,"Rt_Desc_operario")."|".odbc_result($result,"f_velocidad")."|".odbc_result($result,"Rt_Rendimientonominal1");


