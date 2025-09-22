 <style type="text/css">
    .tabla{
		
                overflow: auto;
		height:auto;
		  width: 100%;
		  border-collapse: collapse;
                    table-layout: auto;
		}
		td {
			text-align: center;
			width: auto;
			padding: 2px 0;
			border-bottom: 1px black solid;
		}
		th {
			background: black;
			color: white;
                        font: 20px Verdana, Arial, Helvetica, sans-serif;
		}
                	tr  {
		font: 14px Verdana, Arial, Helvetica, sans-serif;
		text-align : left;
		color : #586885;
		
	}
	td  {
		font: 14px Verdana, Arial, Helvetica, sans-serif;
		text-align : left;
		color : #586885;
		
	}
		.evenRow {
		background-color: #EEEEEE;
		}
		
		
                .cabecera {
                    overflow: auto;
                }
                 </style>


<?php


$dsn="SAGE"; 
$usuario="sa"; 
$password="admin000"; 
$cid=odbc_connect($dsn,$usuario,$password); 
if (!$cid){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
}     

/*
$barra =$_GET['orden'];
$posicion =$_GET['posicion'];*/
//echo $barra;

if (isset($_GET['estado'])) $estado = $_GET['estado'];
if (isset($_GET['tipo'])) $tipo = $_GET['tipo'];
if (isset($_GET['ubicacion'])) $ubicacion = $_GET['ubicacion'];

$hoy = date("m-d-Y 00:00:00");

 $sql= "select o.CodigoArticulo  as CodigoArticulo , o.formula , SerieFabricacion , FechaInicioPrevista , FechaFinalReal , UnidadesAFabricar , UnidadesFabricadas 
 , centrotrabajo ,   numerofabricacion , ejerciciofabricacion , horainicioprevista , estadoof , o.descripcionarticulo as descripcionarticulo
from OrdenesFabricacion o ,  centrostrabajo c
where  o.codigoempresa = 1 and c.codigoempresa = o.codigoempresa and o.formula = c.formula
and fechafinalreal is null
order by FechaInicioPrevista ";
 //centrotrabajo = '".$posicion."'  and 

//echo $sql;
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

		
$descripcion="SS";
//$fecha=20130215;


		

ECHO "<BR>";
//echo $lineas;

echo "<table id='tabla' class='tabla'  ><thead><tr>";
echo "<th>MAQUINA</th>";
echo "<th>OF</th>";
echo "<th>FECHA</th>";
echo "<th>HORA</th>";
echo "<th>ESTADO</th>";
echo "<th>PIEZA</th>";
echo "<th>DESCRIPCION</th>";
echo "<th>CANT. PLA</th>";
echo "<th>CANT. REAL</th></tr></thead><tbody>";


$par = 1;

//for ($i = 1; $i <= $lineas; $i++) {
 while ($row = odbc_fetch_row($result)) //odbc_fetch_array($result)) 
   {
//odbc_fetch_row($result);
     
     
      if ($par==1) {
	$par = 0;
	echo "<tr class='evenRow' ><td  >".odbc_result($result,'centrotrabajo')."</td><td>".odbc_result($result,'ejerciciofabricacion').odbc_result($result,'seriefabricacion').odbc_result($result,'numerofabricacion')."</td><td>".substr(odbc_result($result,'fechainicioprevista'),0,10)."</td><td>".substr(odbc_result($result,'horainicioprevista'),0,5)."</td><td>".odbc_result($result,'estadoof')."</td><td>".odbc_result($result,'CodigoArticulo')."</td><td>".odbc_result($result,'descripcionarticulo')."</td><td>".number_format(odbc_result($result,'UnidadesAFabricar'),0,",",".")."</td><td>".number_format(odbc_result($result,'UnidadesFabricadas'),0,",",".")."</td>";
	} else {
	$par = 1;
	echo "<tr ><td  >".odbc_result($result,'centrotrabajo')."</td><td>".odbc_result($result,'ejerciciofabricacion').odbc_result($result,'seriefabricacion').odbc_result($result,'numerofabricacion')."</td><td>".substr(odbc_result($result,'fechainicioprevista'),0,10)."</td><td>".substr(odbc_result($result,'horainicioprevista'),0,5)."</td><td>".odbc_result($result,'estadoof')."</td><td>".odbc_result($result,'CodigoArticulo')."</td><td>".odbc_result($result,'descripcionarticulo')."</td><td>".number_format(odbc_result($result,'UnidadesAFabricar'),0,",",".")."</td><td>".number_format(odbc_result($result,'UnidadesFabricadas'),0,",",".")."</td>";
	
	}
    
	/*
	<input type='button'  id='activar_of' value='ACTIVAR' onClick='activar_of(\"".odbc_result($result,'ejerciciofabricacion').odbc_result($result,'seriefabricacion').odbc_result($result,'numerofabricacion')."\");'>
	
	
                   <div id="activar_of" onclick='activar_of(\"".odbc_result($result,'ejerciciofabricacion').odbc_result($result,'seriefabricacion').odbc_result($result,'numerofabricacion')."\");' ><center><a class="ui-shadow ui-btn ui-corner-all"style="width: 80% ;  height: 20px; backgroundcolor: red; font-size: 40%; position: blocked; border:1px solid #CCC; background:#ADD; box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);cursor:pointer; vertical-align:middle;  padding: 5px;  text-align: center;">ACTIVAR</a></center></div>
				   
				   */
}

echo "</tbody></table>";

echo "<BR>";


//if ($posicion=="MAQ00xx") 
{
//	echo "<input type='button' value='CAMBIO EMBALAJE' onClick='generar_of(\"".$posicion."\");'>"."<br>";
echo '    <div id="generar_of" onclick="generar_of(\''.$posicion.'\')" ><center><a class="ui-shadow ui-btn ui-corner-all"style="width: 80% ;  height: 50px; backgroundcolor: red; font-size: 150%; position: blocked; border:1px solid #CCC; background:#ADD; box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);cursor:pointer; vertical-align:middle;  padding: 5px;  text-align: center;">CAMBIO EMBALAJE</a></center></div>'; 
}

?>