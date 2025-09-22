<?php


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



$sqlins = "select Cod_maquina , desc_maquina , Rt_Cod_of , rt_Cod_producto , Rt_Desc_producto , Rt_Unidades_planning , Rt_Desc_actividad , Rt_Desc_operario , Rt_Unidades_ok , Rt_Unidades_nok , f_velocidad , Rt_Rendimientonominal1

from cfg_maquina

where activo = 1 and Cod_maquina <> '--'";
//echo $sqlins;
$result=odbc_exec($cidm,$sqlins) or die(exit("Error en odbc")); 


$aux = 0;
 while ($row = odbc_fetch_row($result))
   {
//odbc_fetch_row($result);
     
    $aux++; 
    /*
	echo "<tr class='evenRow' ><td  >".odbc_result($result,'ejerciciofabricacion').odbc_result($result,'seriefabricacion').odbc_result($result,'numerofabricacion')."</td><td>".substr(odbc_result($result,'fechainicioprevista'),0,10)."</td><td>".substr(odbc_result($result,'horainicioprevista'),0,5)."</td><td>".odbc_result($result,'estadoof')."</td><td>".odbc_result($result,'CodigoArticulo')."</td><td>".odbc_result($result,'descripcionarticulo')."</td><td>".number_format(odbc_result($result,'UnidadesAFabricar'),0,",",".")."</td><td>".number_format(odbc_result($result,'UnidadesFabricadas'),0,",",".")."</td><td>"."<div id='activar_of' onclick='activar_of(\"".odbc_result($result,'ejerciciofabricacion').odbc_result($result,'seriefabricacion').odbc_result($result,'numerofabricacion')."\");' ><center><a class='ui-shadow ui-btn ui-corner-all'style='width: 80% ;  height: 20px; backgroundcolor: red; font-size: 100%; position: blocked; border:1px solid #CCC; background:#ADD; box-shadow: 0 0 5px -1px rgba(0,0,0,0.2); vertical-align:middle;  padding: 5px;  text-align: center;'>ACTIVAR</a></center></div>"."</td>";
*/

 if ($aux == 1) echo "<div id='fila1' class='ui-block-a' style='width:100% ; height: 150px ; display:block;'>";
if ($aux == 7) echo "<div id='fila2' class='ui-block-a' style='width:100% ; height: 150px ; display:block;'>";
if ($aux == 13) echo "<div id='fila3' class='ui-block-a' style='width:100% ; height: 150px ; display:block;'>";
if ($aux == 19) echo "<div id='fila4' class='ui-block-a' style='width:100% ; height: 150px ; display:block;'>";
	echo "<div id='MAQ50' class='ui-block-e'style='width:16% ; height: 100%' >";

			echo odbc_result($result,'desc_maquina')."<br>";
			echo odbc_result($result,'rt_Cod_producto')."<br>";
echo odbc_result($result,'Rt_Desc_producto');
		echo "</div>";

   }
   
   echo "</div>";

?>