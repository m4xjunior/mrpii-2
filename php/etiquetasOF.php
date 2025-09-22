<?php


//setlocale(LC_CTYPE, 'en_US');
setlocale(LC_CTYPE, 'en_US');
//CONEXION
session_start();
$empresa = "IQSF".$_SESSION["empresaqs"]."/";
$dsn="AS400"; 
$usuario="conexion"; 
$password="conexion"; 
$cid=odbc_connect($dsn,$usuario,$password); 
if (!$cid){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
}     


$dsnqsw="qsweb"; 
$usuarioqsw="conexion"; 
$passwordqsw="conexion"; 
$cidqsw=odbc_connect($dsnqsw,$usuarioqsw,$passwordqsw); 
if (!$cidqsw){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
}     

/*

$codigo = "";
$desde = date("Ymd") - 14;
$hasta = date("Ymd");


//$hasta = today()-7;

	$cln1 = 0;
	$cln2 = 999999;
$prv1 = 0;
	$prv2 = 999999; */


//$pedido = $_GET["pedido"];

if ($_GET) $of =$_GET['of'];
if ($_GET) $desde =$_GET['desde'];
if ($_GET) $hasta =$_GET['hasta'];
if ($_GET) $articulo = strtoupper($_GET['articulo']);

if ($_GET) $maquina =$_GET['maquina'];

//session_start();
 $line = "QSWEB MRPII Etiquetas OF $of $articulo ".date('Y-m-d H:i:s')." - ".strtoupper($_SESSION["UserName"])." - ".$_SERVER["REMOTE_ADDR"];//." - ".$_SERVER['HTTP_HOST']." - ".$_SERVER['REMOTE_USER'];
		file_put_contents('../log/logQSWEB'.date("Ymd").'.log', $line.PHP_EOL, FILE_APPEND);

session_write_close();

 
$desde = date("Ymd");
$hasta = date("Ymd");


//	$prv1 = 0;
//	$prv2 = 999999;



/*if ($_GET) $codigo =$_GET['proveedor'];
if ($_GET) $desde =$_GET['desde'];
if ($_GET) $hasta =$_GET['hasta'];*/

/*

if ($codigo == '')   {
	$prv1 = 0;
	$prv2 = 999999;
} else
{
	$prv1 = $codigo;
	$prv2 = $codigo;
};*/

if ($_GET) $of =$_GET['of'];
if ($_GET) $desde =$_GET['desde'];
if ($_GET) $hasta =$_GET['hasta'];
if ($_GET) $articulo =strtoupper($_GET['articulo']);

if ($_GET) $maquina =$_GET['maquina'];
if ($_GET) $maquina =$_GET['maquina'];
if ($_GET) $eti_ini =$_GET['etiini'];
if ($_GET) $eti_fin =$_GET['etifin'];

$sqlcln="select mqpstcod , mqpstdsp   from pipeline/mstmqpst order by mqpstcod";

$resultcln = odbc_exec($cid,$sqlcln) or die(exit("Error en odbc_exec")); 
 
$finsql = "";
if (trim($of).trim($articulo)=="") $finsql = " fetch first 50 rows only ";


echo '<form  id="frmDatos" name="frmDatos" method="GET" action="etis_of()">';
echo '<label>OF:';
echo '</label>';
echo '<input type="button" value="Filtrar" onClick="etis_of()">';
echo '<select name="of" id="of" onChange="etis_of()">';

echo '<option value=""> TODOS LAS MAQUINAS</option>';


$lineas = odbc_num_rows($resultcln);

for ($i = 1; $i <= $lineas; $i++) {

odbc_fetch_row($resultcln);

$codigo = odbc_result($resultcln,"mqpstcod");
$nommaq = odbc_result($resultcln,"mqpstdsp");


echo '<option value='.$codigo.'>'.trim($codigo).' - '.trim($nommaq).'</option>';

}

echo '</select>';
echo "<br>";


$articulo = "";
if(isset($_GET['articulo'])) {
$articulo = strtoupper($_GET['articulo']);
/*$desde = 19970000;
$hasta = 20990000;*/
}

$almacen1 = 0;
$almacen2 = 999;

if(isset($_GET['almacen'])) {
$almacen = $_GET["almacen"];
$almacen1 = $almacen;
$almacen2 = $almacen;
}

echo 'Desde: <input type="number" name="desde" id="desde"  value = "'.$desde.'" onChange="etis_of()"/>';
echo "<br>";
echo 'Hasta: <input type="number" name="hasta" id="hasta" value = "'.$hasta.'" onChange="etis_of()"/>';



echo "<br>";
echo 'Articulo: <input type="text" name="articulo" id="articulo" value = "'.$articulo.'" onChange="etis_of()"/>';

echo 'OF: <input type="text" name="ofe" id="ofe" value = "'.$of.'" onChange="etis_of()"/>';


echo "<br>";
echo 'Primera: <input type="text" name="etiini" id="etiini" value = "'.$eti_ini.'" onChange="etis_of()"/>';

echo 'Ultima: <input type="text" name="etifin" id="etifin" value = "'.$eti_fin.'" onChange="etis_of()"/>';

if (trim($eti_ini) == "") $eti_ini = 0;
if (trim($eti_fin) == "") $eti_fin = 999999;



$sqlped="select qrofe , qrart , qrofn , qrtpo , qrcan , qrnser , qrfch , qrhra , qrusr , arnbr , ARRDP , coalesce((select ofopmaq from pipeline/ordenfab where ofndef = qrofe) , 'DESCONOCIDO') as qrmaq from pipeline/qreti , pipeline/almar where qrart = arcdg and qrart like '%".trim($articulo)."%' and qrofe like '%".trim($of)."%' and qrfch >= $desde and qrfch <= $hasta and (qrofe like 'I%' or qrofe like 'M%' or qrofe like 'C%' or qrofe like 'P%' or qrofe like 'W%' or qrofe like 'R%' ) and qrofn >= $eti_ini and qrofn <= $eti_fin order by qrofe desc, qrart desc , qrofn desc , qrfch desc  ".$finsql;
$resultped=odbc_exec($cid , $sqlped) or die(exit("Error en odbc_exec")); 
 

//echo $sqlped;


echo "<table id='tabla' class='tabla'><tr>";
echo "<th>OF</th>";
//echo "<th>SERIE</th>";
echo "<th>REFERENCIA</th>";
echo "<th>DESCRIPCION</th>";
echo "<th>FECHA</th>";
echo "<th>HORA</th>";
echo "<th>NUMERO</th>";
echo "<th>TIPO</th>";
echo "<th>CANTIDAD</th>";

echo "<th>SERIE</th>";

echo "<th>MAQUINA/PUESTO</th>";
echo "<th>REFERENCIA</th>";
echo "<th>USUARIO</th>";
//echo "<th>FACTURA</th>";
echo "<th>IMPRIMIR UNA</th>";
echo "<th>IMPRIMIR<br>TODA LA OF</th>";
echo "<th>IMPRIMIR<br>TODA LA OF<br>NO LEIDAS</th>";
//echo "<th>BANCO</th></tr>";
//echo "<th>FACT. ADMON.</th>";

$par = 1;
while (odbc_fetch_row($resultped))
  {
  $ofe = trim(odbc_result($resultped,"qrofe"));
  $ofn = odbc_result($resultped,"qrofn");
  $fecha=odbc_result($resultped,"qrfch");
    $hora=odbc_result($resultped,"qrhra");
  //$linea =odbc_result($resultped,"hdnln");
  $articulo =trim(odbc_result($resultped,"qrart"));
  $descripcion =odbc_result($resultped,"arnbr");
  $referencia =odbc_result($resultped,"arrdp");
  $cantidad =odbc_result($resultped,"qrcan");
 $usuario =trim(odbc_result($resultped,"qrusr"));
  $qrmaq  =odbc_result($resultped,"qrmaq");
  $qrnser = odbc_result($resultped,"qrnser");
  $tipo = odbc_result($resultped,"qrtpo");
  
  
  $tipo2 = "CAJA";
  
  if ($tipo=="PALET") $tipo2 = "PA";
  
  $tipo=$tipo2;
	echo "<tr><td>$ofe</td>";

  echo "<td>$articulo</td>";
   echo "<td>$descripcion</td>";
  echo "<td>$fecha</td>";
    echo "<td>$hora</td>";
  echo "<td>$ofn</td>";
  echo "<td>$tipo</td>";

  echo "<td>$cantidad</td>";
  echo "<td>$qrnser</td>";
  echo "<td>$qrmaq</td>";
  echo "<td>$referencia</td>";
   echo "<td>$usuario</td>";
  
  //echo "<td>$pedido</td>";http://matrival.no-ip.org/QSweb/pdp001.php?pedido=31146
       echo "<td><a href='almacen/etiqueta_odette_reprint.php?of=$ofe&numero=$ofn&referencia=$articulo&tipo=$tipo&usr=$usuario&size=B6' target='_blank'>Etiqueta</a></td>";
  //referencia=600CLBE002&numero=198&of=I%20-%20094572&tipo=CAJA&usr=SJUAN&size=B6
  echo "<td><a href='almacen/etiqueta_odette_reprints.php?of=$ofe&referencia=$articulo&tipo=$tipo&usr=$usuario&size=B6&leidas' target='_blank'>Todas las<br>Etiquetas</a></td>";
  echo "<td><a href='almacen/etiqueta_odette_reprints.php?of=$ofe&referencia=$articulo&tipo=$tipo&usr=$usuario&size=B6&leidas=no' target='_blank'>Todas las<br>Etiquetas SIN LEER</a></td>";
  }
odbc_close($cid);
echo "</table>";




?>
