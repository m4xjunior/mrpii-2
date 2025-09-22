<?php

include('../pdf/class.ezpdf.php');
include('../pdf/class.backgroundpdf.php'); 
include('../phpqrcode/qrlib.php'); 
include_once '../phpbarcode/barcodes.php';
setlocale(LC_CTYPE, 'en_US');


//$salida = shell_exec('rm ../tmp/*.png');

//include_once 'phpbarcode/barcodes.php';
//include_once ('phpbarcode/qrcode.php';


$dsn3="ODBC_PIPELINE_400"; 
$usuario3="conexion"; 
$password3="conexion"; 
$cidpipeline=odbc_connect($dsn3,$usuario3,$password3); 

if (!$cidpipeline){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
}    

$orden = $_GET["orden"];
$etiquetas = 1;//$_GET["etiquetas"];
$cantidad = $_GET["cantidad"];

$pieza = $_GET["pieza"];
$articulo = $pieza;
$tipo = $_GET["tipo"];
$cajapalet = $_GET["tipo"];
if ($etiquetas=="") $etiquetas = 1;
$cambio_ref = "N";

$of = $orden;
$ok = $cantidad;
$nok = 0;

$udmcajas="";
$barra="000000";

$fecha = date("Ymd");
$hora = date("H:i:s");
$ofb = $orden;





//comprobar si se son de maquina beniparrell



$sql = "select ofopmaq , mqpstalm  from ordenfab, mstmqpst  where ofndef = '$orden'";//and opeffin = '00:00:00'

//echo $sqlope;
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 
$puesto = trim(odbc_result($result,1)) ;
$almacen = trim(odbc_result($result,2)) ;

echo "<script>alert($almacen +' ' + $orden );</script>";

if (($almacen==100) && (substr($orden , 0 ,1) =="I")) {
    
   
   echo "<br>No esta permitido sacar etiquetas de OFs de maquina de inyeccion de la planta de Beniparrell. Deben sacarse las etiquetas de la maquina.<br>"; 
    
    
} else {










$sql = "select    arnbr from  almar where arcdg =  '$pieza' ";
$resultmain=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 



 
$nombre =  odbc_result($resultmain, 1);


$posicion="";
$operarios = "";
$pdf = new Cezpdf('A5','landscape');

  $pdf->selectFont('../pdf/fonts/Helvetica-Bold.afm');



$cidcromo2 =  mysql_connect('localhost', 'root', 'mirzam');
if (!$cidcromo2) {
    die('No pudo conectarse: ' . mysql_error());
}
mysql_select_db('mrpii');


$tiposubp = "";


$sql="select  arrdp, arce1 from almar where arcdg = '$articulo'";
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 
$portugal = odbc_result($result,"arce1");

$farticulo = rtrim(odbc_result($result,"arrdp"));
if (substr($farticulo,0,3)=="CR6"){
    
    $farticulo = substr(rtrim(odbc_result($result,"arrdp")),2,13);
$cambio_ref = "S";

    
} else {
    
    $farticulo = $articulo;
}

$sql = "select count(*) from pipeline/ordenfab  where ofndef = '$of' and ofcart  = '$articulo'";
//echo $sql;
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

if (odbc_result($result,1) == 1) {
   $tiposubp = "PP";
}

$sql="select arcdg , arrdp , odtpiez,odrdc,odtcan,odtnums,odtpnet,odtpbru,odtprv,odtcja,odta1,odta2, odta3 , odtmu, arnbr,odtklt,odta1 , arce3 , ofinmdev , ofinmde , ofniving , arce1 from pipeline/etodt, pipeline/almar , pipeline/ordenfab
 where arcdg = odtcdg and (odtcdg = '".$articulo."'  or odtcdg = '".$farticulo."' )and ofndef = '$of' and ofcart  = '$articulo' and ofcart = arcdg";



//echo "<br>HOLA".$sqlped;


//update numerio de serie



//update contador caja/palet




$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 


$referencia_cli =  str_replace(",","",rtrim(odbc_result($result,"odtpiez")));

if (trim($referencia_cli)=="") $referencia_cli =  str_replace(",","",rtrim(odbc_result($result,"arrdp")));
$referencia =  str_replace(",","",rtrim(odbc_result($result,"arrdp")));
//if ($cantidad == 0) {
	$para = $cantidad; //odbc_result($result,"odtcan");
	
//	}
$serie =odbc_result($result,"odtnums");
$serie_ini = $serie;

$pneto =odbc_result($result,"odtpnet");
$pbruto =odbc_result($result,"odtpbru");
$proveedor =  str_replace(",","",rtrim(odbc_result($result,"odtprv")));
$caja =odbc_result($result,"odtcja");
$cliente = trim(odbc_result($result,"odta1"));
$cliented2 = trim(odbc_result($result,"odta2"));
$cliented3 = trim(odbc_result($result,"odta3"));
//if ($muelle == "") {
	$muelle =odbc_result($result,"odtmu");
//	}
$descripcion = rtrim(odbc_result($result,"arnbr"));
$embalaje = odbc_result($result,"odtklt");
//$cliente = "FAURECIA";
if ($embalaje == "") $embalaje = "FALTA EMBALAJE";
//$asn = "TEST1234";
$destino = odbc_result($result,"odta1");
$destinocod = '';
$numcliente = odbc_result($result,"arce3");
if (is_null($numcliente)) $numcliente =0;
if (($numcliente=="")) $numcliente = 0;
//echo "*".$numcliente."*";
$etiquetas = 1;//ceil($cantidad_total / $cantidad);

if (is_null($etiquetas)) $etiquetas =0;





$sql = "select ofopmaq , ofcont, ofnsub , ofalm ,  OFINMDE  ,   OFINMDEV ,ofnope , ofniving from ordenfab where ofndef = '$orden'";//and opeffin = '00:00:00'

//echo $sqlope;
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 
$puesto = trim(odbc_result($result,1)) ;
$posicion = trim(odbc_result($result,1)) ;
$ofcont = odbc_result($result,2) ;
$ofsub = odbc_result($result,3) ;
$almacen = odbc_result($result,4) ;
if ($almacen==1) $almacen=100;
$molde = odbc_result($result,5) ;
$version = odbc_result($result,6) ;
$operacion = odbc_result($result,7) ;
//$cara = $_GET["cara"];


$molde = trim(odbc_result($result,"ofinmde"));
$versionmde = trim(odbc_result($result,"ofinmdev"));
$nivel = trim(odbc_result($result,"ofniving"));

if ($nivel=="") { 
    if ($versionmde != "") $molde = $molde."/".$versionmde;
    $nivel = $molde;
}

if ($cambio_ref=="S") {
//echo "CAMBIO";
    $articulo_orig = $articulo;
    $articulo = $farticulo;

$sql="select arcdg , arrdp , odtpiez,odrdc,odtcan,odtnums,odtpnet,odtpbru,odtprv,odtcja,odta1,odta2, odta3 , odtmu, arnbr,odtklt,odta1 , arce3  from pipeline/etodt, pipeline/almar 
 where arcdg = odtcdg and (odtcdg = '".$articulo."' or odtcdg = '".$farticulo."')";

$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 


$referencia_cli =  str_replace(",","",rtrim(odbc_result($result,"odtpiez")));

if (trim($referencia_cli)=="") $referencia_cli =  str_replace(",","",rtrim(odbc_result($result,"arrdp")));
$referencia =  str_replace(",","",rtrim(odbc_result($result,"arrdp")));
//if ($cantidad == 0) {
	
//	}
$serie =odbc_result($result,"odtnums");
$serie_ini = $serie;
$pneto =odbc_result($result,"odtpnet");
$pbruto =odbc_result($result,"odtpbru");
$proveedor =  str_replace(",","",rtrim(odbc_result($result,"odtprv")));
$caja =odbc_result($result,"odtcja");
$cliente = trim(odbc_result($result,"odta1"));
$cliented2 = trim(odbc_result($result,"odta2"));
$cliented3 = trim(odbc_result($result,"odta3"));
if ($muelle == "") {
	$muelle =odbc_result($result,"odtmu");
	}
$descripcion = rtrim(odbc_result($result,"arnbr"));
$embalaje = odbc_result($result,"odtklt");
//$cliente = "FAURECIA";
if ($embalaje == "") $embalaje = "FALTA EMBALAJE";
//$asn = "TEST1234";
$destino = odbc_result($result,"odta1");
$destinocod = '';
$numcliente = odbc_result($result,"arce3");
//echo $serie;
}



//echo "*".$puesto."*<br>";
if ($orden == "I - 000666") {
	$posicion ="MAQ00";
		$puesto ="MAQ00";
}
if (trim($posicion)=="MAQ00") echo "*".$posicion."*<br>";
$sqlope = "select distinct logope.opecod , openbr  , opefini, opehini from logope , mstope where logope.opecod = mstope.opecod and opeffin = 0  and opepst = '$posicion'  order by opefini asc, opehini asc, logope.opecod";//and opeffin = '00:00:00'

//echo $sqlope;
$resultope=mysql_query($sqlope) or die(exit("Error en mysql_query")); 

//while ($row=mysql_fetch_row($resultope))
for ($i = mysql_num_rows($resultope) - 1; $i >= 0; $i--) {
//echo $i;
$row=mysql_fetch_row($resultope);
$operario = mysql_result($resultope,$i,0);
$operarios =$operarios." ".$operario;
//$nombre = strtoupper(mysql_result($resultope,$i,1));

//echo '<H1 class="ui-btn ui-input-btn ui-corner-all ui-shadow" style="font-size: 50% ; background:lightblue"><center>'.$operario.'<BR>'.$nombre.'<input type="button" class="ui-btn ui-input-btn ui-corner-all ui-shadow" style="size: 100%; height : 50px; background:lightblue ;font-size: 60%" data-inline="true" value="'.$operario.' '.$nombre.'" id="logout" onClick="user_logout('.$operario.');"></center></H1>';
//class="ui-btn ui-input-btn ui-corner-all ui-shadow"
}


/*$sql = "select count(*) from pipeline/ordenfab  where ofndef = '$orden' and ofcart  = '$pieza'";

$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

if (odbc_result($result,1) == 1) $tiposubp = "PP";

$sql = "select count(*) from pipeline/orfabsub  where ofsndef = '$orden' and ofscart  = '$pieza'";

$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

if (odbc_result($result,1) == 1) $tiposubp = "SP";*/



$datos =  @file_get_contents("/var/www/MRPII/maquina/OF".$posicion.".txt");

while (!strpos($datos,"|")) {
	$datos =  @file_get_contents("/var/www/MRPII/maquina/OF".$posicion.".txt");
}
//echo $datos;
$datos_file= explode("|",$datos);
$orden = $datos_file[0];

$contador = substr(@file_get_contents('/var/www/MRPII/maquina/'.$posicion.'.txt', true),10,10);
#$contador1= $subdatos[1];
$subdatos=explode("|",$datos);
$contador1= $subdatos[1];


$cavidades = 0;
$subpieza = "N"; 
    $subpiezas = "N";
if(strpos($datos, "|")>0 ) {

$datos2= $subdatos[0]."|".substr("0000000000".$contador, -10)."|".$subdatos[2]."|".$subdatos[3]."|".$subdatos[4]."|".$subdatos[5]."|".$subdatos[6]."|".$subdatos[7]."|".$subdatos[8]."|".$subdatos[9]."|".$subdatos[10]."|".$subdatos[11]."|".$subdatos[12]."|".$subdatos[13]."|".$subdatos[14]."|".$subdatos[15]."|".$subdatos[16];


if (trim($posicion)=="MAQ00") echo $datos."<br>";
    
    if (trim($posicion)=="MAQ00") echo "OF ".$subdatos[0]."<br>";
     if (trim($subdatos[9])==trim($articulo)) {
    if (trim($posicion)=="MAQ00") echo "PP ".$subdatos[9]." ".$subdatos[12]."<br>";
    
    $cavidades = $subdatos[12];
    $subpieza = "N"; 
    $subpiezas = "N";
    $tiposubp = "PP";
    }
    
    if (trim($subdatos[10])!="")  $subpiezas = "S";
    
    
    if (trim($subdatos[10])==trim($articulo)) {
    
    $cavidades = $subdatos[13];
    $subpieza = "S"; 
    $subpiezas = "S";
   $tiposubp = "SP";
   
    }
    if (trim($subdatos[11])==trim($articulo)) {
    if (trim($posicion)=="MAQ00") echo "SP2 ".$subdatos[11]." ".$subdatos[14]."<br>";
    
    $cavidades = $subdatos[14];
    $subpieza = "S"; 
    $subpiezas = "S";
    $tiposubp = "SP";
    
    }


}
$tiposubp = "PP";
if ($subpieza == "S") $tiposubp = "SP";

$serie  = 0 ;
//$etipq = 4;
//$etiquetas = 10;
$etipag = 1;//4;


$etiq = 1;



//while $etiq <= $etiquetas {


	$factorx = 842/297*210/297*2.0;
	$factory = 595.4/210*210/297*2.0;
	//$alto = 210;
	//$ancho = 297;
		$alto = 297;
	$ancho = 210*2;
	
	$tamañofuente = 0.7*2.5;
	
	
for ($etiq = 1; $etiq <= $etiquetas ; $etiq++)
{
	
	//$pdf->line(0,$alto/2*$factory,$ancho*$factorx,$alto/2*$factory);
	
	
	
	//$despx=5*$factorx + 500;//ET2
//$despy=5*$factory + 500;//+ $alto*$factory/2;//ET2

//separador
/*$pdf->line(0,$alto/2*$factory,$ancho*$factorx+$despx,$alto/2*$factory);
if ($tipo == 'A6') $pdf->line($ancho*$factorx/2,0,$ancho*$factorx/2,$alto*$factory);
*/

//echo $etiq."<BR>";

$serie = $serie + 1;

	//$etiq = 2;

$etip= $etiq % $etipag ;

	//echo "<BR> $etiq $etip<BR>";


$etip = 1;//3;
if (($etiq!=1) && ($etip==1)) {
	$pdf->ezNewPage();
	//echo "<BR> NEW PAGE <BR>";
	}
	
if ($etip == 1) {
$despx=5 * $factorx ;
$despy=8 * $factory + 240;//+ $alto * $factory / 4;
}

if ($etip == 2) {
$despx=5 * $factorx + $ancho * $factorx / 2;
$despy=5 * $factory + $alto * $factory / 2;
}

if ($etip == 3) {
$despx=5 * $factorx;
$despy=5 * $factory;//+ $alto*$factory/2;
}

if ($etip == 0) {
$despx=5 * $factorx + $ancho * $factorx / 2;
$despy=5 * $factory;//+ $alto*$factory/2;
}	

	
//$tipo="OK";
$contador = 1;

$ns=0;
//echo $ns;

//SS20180702
{
/*	$factorx = 616/210;//595.4/210;
	$factory = 842/297;//842/297/2;
	
	//$alto = 210;
	//$ancho = 297;
		$alto = 297;
	$ancho = 210;
	
	$tamanofuente = 0.7;
	
	$etipag = 1;*/
}

/*	$factorx = 842/297*210/297*2.0;
	$factory = 595.4/210*210/297*2.0;
	//$alto = 210;
	//$ancho = 297;
		$alto = 297;
	$ancho = 210*2;
	
	$tamanofuente = 0.7;
	
	
	
	$pdf->selectFont('../fonts/Helvetica.afm'); 
$tamanofont = 6;
*/
	
    	$factorx = 616/210;//595.4/210;
	$factory = 842/297;//842/297/2;
	
	//$alto = 210;
	//$ancho = 297;
		$alto = 297;
	$ancho = 210;
	
	$tamanofuente = 0.7;
	
	$etipag = 4;

	
	//$pdf->line(0,$alto/2*$factory,$ancho*$factorx,$alto/2*$factory);
	
	
		$factorx = 842/297*210/297*3.0;
	$factory = 595.4/210*210/297*3.0;
	//$alto = 210;
	//$ancho = 297;
		$alto = 105;
	$ancho = 210;
	
	
	
	
	//SS2018
		$alto = 105;
	$ancho = 210;
		$factorx = 3;
	$factory = 3;
	$despx=0;
$despy=130;
	
	$tamaÃ±ofuente = 0.8;
	$tamanofuente = $tamaÃ±ofuente;

//FORMATO
	
//Etiqueta 1,2,3 o 4 jugar con los desp	

$margen = 0;
$copiasimp = 1;
//$copias =1;
	
	
if ($tiposubp == "PP") {
    
   // echo "PP";
   
   
//echo $articulo."<br>";
//echo $articulo_orig."<br>";
//echo $of."<br>";
      
if ($tipo == "CAJA") {
$sql= "select ofnetic from pipeline/ordenfab where ofndef = '$orden' and ofcart = '$pieza'";
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);
/*
$sql = "update pipeline/ordenfab  set ofnetic = ofnetic + $etiquetas where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);*/
} else {
$sql= "select ofneti from pipeline/ordenfab where ofndef = '$orden' and ofcart = '$pieza'";
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    
 /*   
$sql = "update pipeline/ordenfab  set ofneti = ofneti + $etiquetas where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);   */
}    
}
if ($tiposubp == "SP")  {
if ($tipo == "CAJA") {
$sql= "select ofsnetic from pipeline/orfabsub where ofsndef = '$orden' and ofscart = '$pieza'";
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    
/*$sql = "update pipeline/orfabsub  set ofsnetic = ofsnetic + $etiquetas where ofsndef = '$of' and ofscart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);*/
} else {
    $sql= "select ofsneti from pipeline/orfabsub where ofsndef = '$orden' and ofscart = '$pieza'";
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    
/*$sql = "update pipeline/orfabsub  set ofsneti = ofsneti + $etiquetas where ofsndef = '$of' and ofscart = '$articulo'";  
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);  */
}       
  
}    
	
	

$of2 = substr($of , 1 , 1).substr($of,5,6).substr("0000".$etiq , -4);
  QRcode::png($of."|".substr($cajapalet , 0 ,1)."|".$articulo."|".($ns+$etiq)."|".$tiposubp."|".$fecha."|".$cantidad."|".$serie, '../tmp/'.$of2.'_'.$articulo.'_'.$serie.'.png'); 

    list($width, $height, $type, $attr) = getimagesize('../tmp/'.$of2.'_'.$articulo.'_'.$serie.'.png');
$imagefactor=$width/$height;
    
 //$pdf->addPngFromFile('../tmp/'.$of2.'.png', 182*$factorx+$despx,   0*$factory+$despy+1,15*$factorx*$imagefactor);
 
  //$pdf->addPngFromFile('../tmp/'.$of2.'.png', 175.5*$factorx+$despx,   18*$factory+$despy+1,24.5*$factorx*$imagefactor);

  $pdf->addPngFromFile('../tmp/'.$of2.'_'.$articulo.'_'.$serie.'.png', 174.5*$factorx+$despx,   0*$factory+$despy+1, 21*$factorx*$imagefactor);
  
 // $pdf->line(0*$factorx+$despx,0*$factory+$despy,0*$factorx+$despx,138*$factory+$despy);
  
  $pdf->line(0*$factorx+$despx,54*$factory+$despy,197*$factorx+$despx,54*$factory+$despy);
    $pdf->line(0*$factorx+$despx,41*$factory+$despy,197*$factorx+$despx,41*$factory+$despy);
      $pdf->line(0*$factorx+$despx,14*$factory+$despy,175*$factorx+$despx,14*$factory+$despy);
      $pdf->line(0*$factorx+$despx,27*$factory+$despy,110*$factorx+$despx,27*$factory+$despy);
      $pdf->line(110*$factorx+$despx,0*$factory+$despy,110*$factorx+$despx,41*$factory+$despy);
      $pdf->line(110*$factorx+$despx,21*$factory+$despy,197*$factorx+$despx,21*$factory+$despy);
      $pdf->line(110*$factorx+$despx,34*$factory+$despy,197*$factorx+$despx,34*$factory+$despy);
      
      $pdf->line(74*$factorx+$despx,70*$factory+$despy,74*$factorx+$despx,54*$factory+$despy);
      $pdf->line(145*$factorx+$despx,70*$factory+$despy,145*$factorx+$despx,54*$factory+$despy);
      
      $pdf->line(146*$factorx+$despx,14*$factory+$despy,146*$factorx+$despx,21*$factory+$despy);
    //$pdf->line(0*$factorx+$despx,70*$factory+$despy,197*$factorx+$despx,0*$factory+$despy);
//$pdf->line(0*$factorx+$despx,0*$factory+$despy,197*$factorx+$despx,0*$factory+$despy);  
//$pdf->line(0*$factorx+$despx,220*$factory+$despy,197*$factorx+$despx,220*$factory+$despy);  
//$pdf->line(0*$factorx+$despx,120*$factory+$despy,197*$factorx+$despx,120*$factory+$despy);  
//$pdf->line(0*$factorx+$despx,180*$factory+$despy,197*$factorx+$despx,180*$factory+$despy);  


  
//$pdf->line(0*$factorx+$despx,126*$factory+$despy,197*$factorx+$despx,126*$factory+$despy);
//$pdf->line(0*$factorx+$despx,100*$factory+$despy,197*$factorx+$despx,100*$factory+$despy);//$pdf->line(0*$factorx+$despx,21*$factory+$despy,197*$factorx+$despx,21*$factory+$despy);
//$pdf->line(0*$factorx+$despx,44*$factory+$despy,98.5*$factorx+$despx,44*$factory+$despy);
//$pdf->line(98.5*$factorx+$despx,59*$factory+$despy,197*$factorx+$despx,59*$factory+$despy);
//$pdf->line(137.5*$factorx+$despx,21*$factory+$despy,137.5*$factorx+$despx,34*$factory+$despy);


//$pdf->line(0*$factorx+$despx,69.5*$factory+$despy,197*$factorx+$despx,69.5*$factory+$despy);



//$pdf->line(98.5*$factorx+$despx,0*$factory+$despy,98.5*$factorx+$despx,69.5*$factory+$despy);
//$pdf->line(98.5*$factorx+$despx,100*$factory+$despy,98.5*$factorx+$despx,144*$factory+$despy);

//$pdf->line(98.5*$factorx+$despx,34*$factory+$despy,197*$factorx+$despx,34*$factory+$despy);


//$pdf->line(98.5*$factorx+$despx,112*$factory+$despy,197*$factorx+$despx,112*$factory+$despy);
//$pdf->line(139*$factorx+$despx,100*$factory+$despy,139*$factorx+$despx,112*$factory+$despy);
//$pdf->line(177.5*$factorx+$despx,100*$factory+$despy,177.5*$factorx+$despx,112*$factory+$despy);
 
  
  //HASTA AQUI OK
  
  
  /*
$pdf->line(0*$factorx+$despx,51.75*$factory+$despy,200*$factorx+$despx,51.75*$factory+$despy);
$pdf->line(0*$factorx+$despx,86.25*$factory+$despy,200*$factorx+$despx,86.25*$factory+$despy);
$pdf->line(0*$factorx+$despx,120.75*$factory+$despy,143*$factorx+$despx,120.75*$factory+$despy);
$pdf->line(0*$factorx+$despx,138*$factory+$despy,200*$factorx+$despx,138*$factory+$despy);

$pdf->line(113*$factorx+$despx,0*$factory+$despy,113*$factorx+$despx,34.5*$factory+$despy);
$pdf->line(100*$factorx+$despx,34.5*$factory+$despy,100*$factorx+$despx,51.75*$factory+$despy);
$pdf->line(75*$factorx+$despx,86.25*$factory+$despy,75*$factorx+$despx,120.75*$factory+$despy);

*/


//$posx=0+$despx;
//$pdf->ezSetY(64.5*factory+$despy);

//Etiqueta 1,2,3 o 4 jugar con los desp
//$despy = 3*$factory ;//+842/2;//ET2
//$despx = 5.50*$factorx;//ET2


/*
if ($etip == 1) {
$despx=5.5 * $factorx;
$despy=3.00 * $factory + $alto * $factory / 2;
}

if ($etip == 2) {
$despx=5.5 * $factorx + $ancho * $factory / 2;
$despy=3.0 * $factory + $alto * $factory / 2;
}

if ($etip == 3) {
$despx=5.5 * $factorx;
$despy=3.0 * $factory;//+ $alto*$factory/2;
}

if ($etip == 0) {
$despx=5.5 * $factorx + $ancho * $factory / 2;
$despy=3.00 * $factory;//+ $alto*$factory/2;
}
*/
/*
//Etiqueta de pico
if (($etiquetas == $etiq)) {

	$cantidad = $cantidad_total - $cantidad * ($etiquetas - 1);
	
}

$of2 = substr($of , 1 , 1).substr($of,5,6).substr("0000".$etiq , -4);
  QRcode::png($of."|".substr($cajapalet , 0 ,1)."|".$articulo."|".($ns+$etiq)."|".$tiposubp."|".$fecha."|".$cantidad."|".$serie, '../tmp/'.$of2.'.png'); 

    list($width, $height, $type, $attr) = getimagesize('../tmp/'.$of2.'.png');
$imagefactor=$width/$height;
    
 //$pdf->addPngFromFile('../tmp/'.$of2.'.png', 182*$factorx+$despx,   0*$factory+$despy+1,15*$factorx*$imagefactor);
 
  //$pdf->addPngFromFile('../tmp/'.$of2.'.png', 175.5*$factorx+$despx,   18*$factory+$despy+1,24.5*$factorx*$imagefactor);

  $pdf->addPngFromFile('../tmp/'.$of2.'.png', 174.5*$factorx+$despx,   0*$factory+$despy+1,22*$factorx*$imagefactor);
  */
//$pdf->addText( 0*$factorx+$despx, 25*$factory+$despy, 6 * $tamanofuente  , "SUPP (V)");

$pdf->addText( 02*$factorx+$despx, 67*$factory+$despy, 6 * $tamanofuente , "(1) DESTINATION");
$pdf->addText( 76*$factorx+$despx, 67*$factory+$despy, 6 * $tamanofuente , "(2) SHIP.ADR/STOCKLOC/APPLICATION CODE");
$pdf->addText( 146*$factorx+$despx, 67*$factory+$despy, 6 * $tamanofuente , "(3) PACKING SLIP NO.(N)");


$pdf->addText( 02*$factorx+$despx, 51*$factory+$despy, 6  * $tamanofuente , "(8) PART (P)");
$pdf->addText( 02*$factorx+$despx, 39*$factory+$despy, 6  * $tamanofuente , "(9) QUANTITY (Q)");
$pdf->addText( 111*$factorx+$despx, 39*$factory+$despy, 6  * $tamanofuente , "(10) DESCRIPTION, DELIVERY, PERFOMRC");
$pdf->addText( 111*$factorx+$despx, 32*$factory+$despy, 6  * $tamanofuente , "(11) SUPPLIERS PART NO.(3OS)");

//$pdf->addText( 0*$factorx+$despx, 62*$factory+$despy, 6  * $tamanofuente , "(P)");

//$pdf->addText( 100*$factorx+$despx, 140*$factory+$despy, 6  * $tamanofuente , "STR LOC 1(L)");

$pdf->addText( 02*$factorx+$despx, 25*$factory+$despy, 6 * $tamanofuente  , "(12) SUPPLIER NUMBER (F)");
$pdf->addText( 111*$factorx+$despx, 19*$factory+$despy, 6 * $tamanofuente  , "(13) DATE");
$pdf->addText( 147*$factorx+$despx, 19*$factory+$despy, 6 * $tamanofuente  , "(14) DESIGN MODIFIC. LEVEL");
$pdf->addText( 02*$factorx+$despx, 10*$factory+$despy, 6 * $tamanofuente  , "(15) CONTAINER NO. (S)");
$pdf->addText( 111*$factorx+$despx, 10*$factory+$despy, 6 * $tamanofuente  , "(16) BATCH NO. (H)");

//$pdf->addText( 0*$factorx+$despx, 10*$factory+$despy, 6 * $tamanofuente  , "SERIAL NO (S)");

//$pdf->addText( 178*$factorx+$despx, 108*$factory+$despy, 6  * $tamanofuente , "CONTAINER");

//$pdf->addText( 139*$factorx+$despx, 108*$factory+$despy, 6 * $tamanofuente  , "GROSS WGT");

//$pdf->addText( 100*$factorx+$despx, 108*$factory+$despy, 6 * $tamanofuente  , "NET WGT");

//$pdf->addText( 112*$factorx+$despx, 12*$factory+$despy, 6  * $tamanofuente , "BATCH NO. (H)");

//$pdf->addText( 100*$factorx+$despx, 30*$factory+$despy, 6  * $tamanofuente , "DATE (D)");

//$pdf->addText( 100*$factorx+$despx, 65*$factory+$despy, 6 * $tamanofuente, "DESCRIPTION");

//$pdf->addText( 100*$factorx+$despx, 55*$factory+$despy, 6  * $tamanofuente , "SUPP. PART. NO.");

//$pdf->addText( 143*$factorx+$despx, 97.75*$factory+$despy, 6 * $tamanofuente  , "W/C");

//$pdf->addText( 113*$factorx+$despx, 34.5*$factory+$despy, 6 * $tamanofuente  , "TO");



//$pdf->addText( 138*$factorx+$despx, 30*$factory+$despy, 6 * $tamanofuente  , "DESIGN MODIFIC. LEVEL");

//$pdf->addText( 183*$factorx+$despx, 34.5*$factory+$despy, 6 * $tamanofuente  , "DOC CODE (1L)");
//FIN FORMATO



//DATOS


//$pdf->addText( 12*$factorx+$despx, 137*$factory+$despy, 8 * $tamanofuente  , $cliente);
$pdf->addText( 18*$factorx+$despx, 36.5*$factory+$despy , 18 * $tamanofuente  , $cantidad);
$pdf->addText( 15*$factorx+$despx, 50 *$factory+$despy, 18 * $tamanofuente , $referencia_cli);
$pdf->addText( 22*$factorx+$despx, 23 *$factory+$despy, 18 * $tamanofuente , $proveedor);
$pdf->addText( 114*$factorx+$despx, 35 *$factory+$despy, 18 * $tamanofuente , $descripcion);
$pdf->addText( 140*$factorx+$despx, 30 *$factory+$despy, 18 * $tamanofuente , $articulo);

$preffix = "";
if ($numcliente == 568) $preffix= "Y";
$pdf->addText( 27*$factorx+$despx, 9 *$factory+$despy, 18 * $tamanofuente , $preffix.$serie);
$pdf->addText(114*$factorx+$despx, 15*$factory+$despy, 18 * $tamanofuente ,"P".$fecha);
$pdf->addText(148*$factorx+$despx, 15*$factory+$despy, 18 * $tamanofuente , $nivel);
$pdf->addText( 128*$factorx+$despx, 9 *$factory+$despy, 16 * $tamanofuente , $of."/".$cajapalet."/".($ns+$etiq));

$muelles = explode("/", $muelle);
$pdf->addText( 102*$factorx+$despx, 64 *$factory+$despy, 13 * $tamanofuente , $muelle);
//$pdf->addText( 130*$factorx+$despx, 20.25 *$factory+$despy, 36 * $tamanofuente ,$muelles[1]);
$pdf->addText( 2*$factorx+$despx, 64 *$factory+$despy, 13 * $tamanofuente , trim($cliente));
$pdf->addText( 2*$factorx+$despx, 60 *$factory+$despy, 13 * $tamanofuente , trim($cliented2));
$pdf->addText( 2*$factorx+$despx, 56*$factory+$despy, 13 * $tamanofuente , trim($cliented3));
/*
//$pdf->addText( 140*$factorx+$despx, 133*$factory+$despy , 22 * $tamanofuente  , $masterlabel);

//ver justificar derecha
//$descuento =  $pdf->getTextWidth(32,"6000") ;
$pdf->addText( 20*$factorx+$despx , 56*$factory+$despy , 36  * $tamanofuente , $cantidad  );//." / ".$etip."-".$etiquetas.":".$etipag);


$pdf->addText( 8*$factorx+$despx, 87 *$factory+$despy, 36 * $tamanofuente , $referencia_cli);

$pdf->addText( 104*$factorx+$despx, 48 *$factory+$despy, 24 * $tamanofuente , $articulo);
$pdf->addText( 104*$factorx+$despx, 60 *$factory+$despy, 12 * $tamanofuente , $descripcion);

$pdf->addText( 17*$factorx+$despx, 14 *$factory+$despy, 16 * $tamanofuente , $serie);


$pdf->addText(104*$factorx+$despx, 23 *$factory+$despy, 14 * $tamanofuente ,"D".$fecha);//.substr($fecha,0,4).substr($fecha,4,2).substr($fecha,6,2));

$pdf->addText( 104*$factorx+$despx, 102.25 *$factory+$despy, 14 * $tamanofuente ,$pneto." KG");
$pdf->addText( 142*$factorx+$despx, 102.25 *$factory+$despy, 14 * $tamanofuente ,$pbruto." KG");
$pdf->addText( 180*$factorx+$despx, 102.25 *$factory+$despy, 14 * $tamanofuente ,round($caja , 0));

//$pdf->addText( 77*$factorx+$despx, 115.25 *$factory+$despy, 14 * $tamanofuente ,$embalaje);

$pdf->addText( 8 *$factorx+$despx, 114 *$factory+$despy, 20 * $tamanofuente ,$asn);

$muelles = explode("/", $muelle);
$pdf->addText( 102*$factorx+$despx, 136 *$factory+$despy, 13 * $tamanofuente , $muelle);
//$pdf->addText( 130*$factorx+$despx, 20.25 *$factory+$despy, 36 * $tamanofuente ,$muelles[1]);
$pdf->addText( 2*$factorx+$despx, 136 *$factory+$despy, 13 * $tamanofuente , $cliente);
$pdf->addText( 2*$factorx+$despx, 131 *$factory+$despy, 13 * $tamanofuente , $cliented2);
$pdf->addText( 2*$factorx+$despx, 126 *$factory+$despy, 13 * $tamanofuente , $cliented3);
//$pdf->addText( 113*$factorx+$despx, 15.25 *$factory+$despy, 20 * $tamanofuente ,$muelles[0]);

//$pdf->addText( 1*$factorx+$despx, 42.25 *$factory+$despy, 24 * $tamanofuente ,$muelles[2]);
$pdf->addText( 110*$factorx+$despx, 13 *$factory+$despy, 16 * $tamanofuente , $of);
$pdf->addText( 150*$factorx+$despx, 13 *$factory+$despy, 10 * $tamanofuente , $cajapalet);
$pdf->addText( 170*$factorx+$despx, 13 *$factory+$despy, 10 * $tamanofuente , substr("0000".$etiq , -4));

//CODIGOS DE BARRAS

*/

//$pdf->selectFont('fonts/Courier-Bold.afm'); 
$salida = shell_exec("rm /var/www/MRPII/tmp/* \n");
//1D

$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo 
$d1->getBarcodePNGPath("Q".$cantidad, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."Q".$cantidad.'.png');
$imagefactor=$width;///$height;
$pdf->addPngFromFile('../tmp/'.'Q'.$cantidad.'.png',  5*$factorx+$despx, 28 *$factory+$despy, $imagefactor/3 , 20);


$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo $referencia_cli
 $d1->getBarcodePNGPath("P".str_replace("_"," 2",trim($referencia_cli)), 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."P".str_replace("_"," 2",trim($referencia_cli)).'.png');
//$imagefactor=$width/$height;
$imagefactor=$width;
//if ($width>500) $imagefactor = $imagefactor  * 0.75 ;//ss extra large
$pdf->addPngFromFile('../tmp/'.'P'.str_replace("_"," 2",trim($referencia_cli)).'.png',  5*$factorx+$despx, 42 *$factory+$despy,$imagefactor/3 , 20);

$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo
 $d1->getBarcodePNGPath("P".$proveedor, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."P".$proveedor.'.png');
//$imagefactor=$width/$height;
$imagefactor=$width;
$pdf->addPngFromFile('../tmp/'.'P'.$proveedor.'.png',  5*$factorx+$despx, 15 *$factory+$despy,$imagefactor/3, 20);//7*$factorx*$imagefactor*1


 $d1->getBarcodePNGPath('P'.trim($articulo), 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'.'P'.trim($articulo).'.png');
//$imagefactor=$width/$height;
$imagefactor=$width;
//$pdf->addText( 20*$factorx+$despx, 250 *$factory+$despy, 20,$imagefactor);
$pdf->addPngFromFile('../tmp/'.'P'.trim($articulo).'.png',  114*$factorx+$despx, 22 *$factory+$despy,$imagefactor/3, 20);
   

$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo $serie;
$d1->getBarcodePNGPath("S".$preffix.$serie, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."S".$preffix.$serie.'.png');
//if ($height==0) $height =1;
//$imagefactor=$width/$height;
$imagefactor=$width;
$pdf->addPngFromFile('../tmp/'.'S'.$preffix.$serie.'.png',  5*$factorx+$despx, 0 *$factory+$despy,$imagefactor/3 , 20);   
/*

$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo 
$d1->getBarcodePNGPath("V".$of, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."V".$of.'.png');
$imagefactor=$width;
$pdf->addPngFromFile('../tmp/'.'V'.$of.'.png',  114*$factorx+$despx, 0*$factory+$despy,$imagefactor/3 , 20);
//$pdf->addText( 20*$factorx+$despx, 250 *$factory+$despy, 20,'../tmp/'.$referencia.'.png');

*/


if ($tipo=="CAJA") $tipo2="CJ";
if ($tipo=="PALET") $tipo2="PA";

//$pdf->addText( 200*$factorx+$despx, 11*$factory+$despy , 135 * $tamaÃ±ofuente , $tipo2);

//$pdf->setColor(0,0 ,0);

}



//$content = $pdf->Output();

   
//file_put_contents("/var/www/etiquetas/".$orden.$tipo.$pieza."-".$contador.".pdf",$content);

















// DE MOMENTO NO IMPRIMO


if (trim($posicion)!="MAQ00x") $pdf->ezStream(); 

















if ($tiposubp == "PP") {
    	$subpieza="N";
    
    
    
    
    
    
if ($tipo == "CAJA") {
/*$sql= "select ofnetic from pipeline/ordenfab where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);*/

$sql = "update pipeline/ordenfab  set ofnetic = ofnetic + 1 where ofndef = '$orden' and ofcart = '$pieza'";
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cidpipeline);
} else {
/*$sql= "select ofneti from pipeline/ordenfab where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    */
    
$sql = "update pipeline/ordenfab  set ofneti = ofneti + 1 where ofndef = '$orden' and ofcart = '$pieza'";
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cidpipeline);   
}    
}
if ($tiposubp == "SP")  {
	$subpieza="S";
if ($tipo == "CAJA") {
/*$sql= "select ofsnetic from pipeline/orfabsub where ofsndef = '$of' and ofscart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    */
$sql = "update pipeline/orfabsub  set ofsnetic = ofsnetic + 1 where ofsndef = '$orden' and ofscart = '$pieza'";
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cidpipeline);
} else {
   /* $sql= "select ofsneti from pipeline/orfabsub where ofsndef = '$of' and ofscart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    */
$sql = "update pipeline/orfabsub  set ofsneti = ofsneti + 1 where ofsndef = '$orden' and ofscart = '$pieza'";  
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cidpipeline);  
}       
    
}


if ($tipo == "CAJA") {
	$tipoeti = "CA";
	
	//GRABAR PARTE DE LAS OK
		//SI NO EXISTE PARTE DE OF DE USUARIO LOGUEADO OK INSERTAR LINEA CON CANTIDAD CAJA
		
		//SI EXISTE, AMPLIAR CANTIDAD PARTE EXISTENTE EN CANTIDAD CAJA
	
	//HACER MOVIMIENTO ENTRADA PRODUCCION A ALM 610
		//SI EXISTE LINEA EN FECHA DE MOVIMIENTO ARTICULO AMPLIAR CANT ETI
		
		//SI NO EXISTE CREAR LINEA/MOVIMIENTO
		
/*	$sql = " SELECT SEGCONTA  FROM SEGOFS  ORDER BY SEGCONTA DESC";
$result = odbc_exec($cidpipeline, $sql) or die(exit("Error en odbc_exec"));
$row = odbc_fetch_row($result);
$conta = odbc_result($result, 1);
odbc_free_result($result);
if (is_null($conta)) {
    $conta = 0;
} else {
    $conta++;
}*/

//$operario = substr(trim($operarios),0,4)*1;
$articulo = $pieza;
$defecto=0;

if (substr($hora,0,2)*1<6) $turno = 3;
if (substr($hora,0,2)*1>=6) $turno = 1;
if (substr($hora,0,2)*1>=14) $turno = 2;
if (substr($hora,0,2)*1>=22) $turno = 3;


//existe parte OK del turno de ese operario en esa fecha?
/*$sqlparte = "select count(*) from pipeline/segofs where segndef = '$of' and segcart = '$articulo' and segfecha = $fecha and segturno = $turno and segcant >0 and segmaq = '$puesto'";
$resultparte=odbc_exec($cidpipeline,$sqlparte) or die(exit("Error en odbc_exec")); 

if ( odbc_result($resultparte, 1) <-666 ) {
	
	$sqlinsert = " update SEGOFS set segcant = segcant+$ok , seghrfin = '$hora' where segndef = '$of' and segcart = '$articulo' and segfecha = $fecha and segturno = $turno and segcant >0 and segmaq = '$puesto' " ;
if (trim($posicion)=="MAQ00") echo $sqlinsert."\n";
$resultinsert=odbc_exec($cidpipeline,$sqlinsert) or die(exit("Error en odbc_exec")); 

				odbc_commit($cidpipeline);
				
				odbc_free_result($resultinsert);	 
	
} else*/

{
	
	
	
	$fecha_ant = date("Ymd");
	$hora_ant = date("H:i:s");
	
		$sql = " SELECT SEGFCFIN , seghrfin  FROM SEGOFS  where segndef = '$of' and segcanz = 0 and segcart = '$articulo' and segtipo = 'P' and segmaq = '$puesto' order by SEGFCFIN desc, seghrfin desc fetch first row only ";
$result = odbc_exec($cidpipeline, $sql) or die(exit("Error en odbc_exec"));
$row = odbc_fetch_row($result);
$fecha_ant = odbc_result($result, 1);
$hora_ant = odbc_result($result, 2);

if (is_null($fecha_ant) || trim($fecha_ant) =="" ) {
	$fecha_ant = date("Ymd");
	$hora_ant = date("H:i:s");	
	
	// OFFIRAL      OFFFRAL
	 
	 $sql = " SELECT OFFiRAL , OFHRiRAL   FROM ORDENFAB  where ofndef = '$of'  and ofopmaq = '$puesto' fetch first row only ";//and ofcart = '$articulo' 
$result = odbc_exec($cidpipeline, $sql) or die(exit("Error en odbc_exec"));
$row = odbc_fetch_row($result);
$fecha_ant = odbc_result($result, 1);
$hora_ant = odbc_result($result, 2);
}
	
	$horas = "00:00:00"; //calcular
date_default_timezone_set("UTC"); 
	$horas =  date("H:i:s" , (strtotime($fecha." ".$hora) - strtotime($fecha_ant." ".$hora_ant)));
	date_default_timezone_set("Europe/Madrid"); 
	
if ($tiposubp == "PP") {
    	$subpieza="N";
    
    
    
    
    
    


/*$sql= "select ofneti from pipeline/ordenfab where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    */
    
$sql = "update pipeline/ordenfab  set ofcanral= ofcanral + $ok , ofcanpdt = ofcanpdt - $ok  where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cidpipeline);   

//if ($puesto=='MAQ00') {


$sql = "update pipeline/ordenfab  set  oftlr =  (( 1 / ofinvteo ) * (ofcanpdt ))/ofincavp + oftprep  , oftoper = (( 1 / ofinvteo ) * (ofcanpdt )  )/ofincavp where ofndef = '$of' and ofcart = '$articulo'"; //* ( 1 + ( ofopmerm / 100))         * ( 1 + ( ofopmerm / 100))
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cidpipeline); 

//}
$sql = "update pipeline/ordenfab  set  ofcanpdt = 0 , oftlr = 0 , oftoper = 0 where ofndef = '$of' and ofcart = '$articulo' and ofcanpdt <= 0";
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cidpipeline); 
   
}
if ($tiposubp == "SP")  {
	$subpieza="S";


/*$sql= "select ofsnetic from pipeline/orfabsub where ofsndef = '$of' and ofscart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    */
$sql = "update pipeline/orfabsub  set OFSCral = OFSCral  + $ok where ofsndef = '$of' and ofscart = '$articulo'";
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cidpipeline);

				
}				




//CALCULO HORA INICIO 20180522
$fecha = date("Ymd");
$fechai = $fecha;
$hora = date("H:i:s");

if (trim($posicion)=="MAQ00") echo $hora."\n<br>";

/*
$sqlsp = "select   ofcart, 'N'  from pipeline/ordenfab , pipeline/mstmlde where  ofndef = '$of' and ofinmde = mldcod union select   ofscart, 'S' from ordenfab , orfabsub , mstmlde where ofsndef = '$of' and ofndef = ofsndef  and ofinmde = mldcod  order by 1";//

echo $sqlsp;
$resultmainsp=odbc_exec($cidpipeline,$sqlsp) or die(exit("Error en odbc_exec")); 


//echo odbc_num_rows($resultmain)."<br>";
$subpiezas = "N";
if ( odbc_num_rows($resultmainsp)>=2)  $subpiezas = "S";*/


$datos =  @file_get_contents("/var/www/MRPII/maquina/OF".$posicion.".txt");

while (!strpos($datos,"|")) {
	$datos =  @file_get_contents("/var/www/MRPII/maquina/OF".$posicion.".txt");
}
//echo $datos;
$datos_file= explode("|",$datos);
$orden = $datos_file[0];

$contador = substr(@file_get_contents('/var/www/MRPII/maquina/'.$posicion.'.txt', true),10,10);
#$contador1= $subdatos[1];
$subdatos=explode("|",$datos);
$contador1= $subdatos[1];



if(strpos($datos, "|")>0 ) {

$datos2= $subdatos[0]."|".substr("0000000000".$contador, -10)."|".$subdatos[2]."|".$subdatos[3]."|".$subdatos[4]."|".$subdatos[5]."|".$subdatos[6]."|".$subdatos[7]."|".$subdatos[8]."|".$subdatos[9]."|".$subdatos[10]."|".$subdatos[11]."|".$subdatos[12]."|".$subdatos[13]."|".$subdatos[14]."|".$subdatos[15]."|".$subdatos[16];


if (trim($posicion)=="MAQ00") echo $datos."<br>";
    
    if (trim($posicion)=="MAQ00") echo "OF ".$subdatos[0]."<br>";
     if (trim($subdatos[9])==trim($articulo)) {
    if (trim($posicion)=="MAQ00") echo "PP ".$subdatos[9]." ".$subdatos[12]."<br>";
    
    $cavidades = $subdatos[12];
    $subpieza = "N"; 
    $subpiezas = "N";
     }
    if (trim($subdatos[10])!="")  $subpiezas = "S";
    
    
    if (trim($subdatos[10])==trim($articulo)) {
    
    $cavidades = $subdatos[13];
    $subpieza = "S"; 
    $subpiezas = "S";
   
    }
    if (trim($subdatos[11])==trim($articulo)) {
    if (trim($posicion)=="MAQ00") echo "SP2 ".$subdatos[11]." ".$subdatos[14]."<br>";
    
    $cavidades = $subdatos[14];
    $subpieza = "S"; 
    $subpiezas = "S";
    
    }


}


/*		
if (substr($hora,0,2)*1<6) $turno = 3;
if (substr($hora,0,2)*1>=6) $turno = 1;
if (substr($hora,0,2)*1>=14) $turno = 2;
if (substr($hora,0,2)*1>=22) $turno = 3;*/

$fechap = $fecha;

if (substr($hora,0,2)*1<6) {
	$horaf = '05:59:59';
	$horai = '22:00:00';
	$fechai = date("Ymd" ,  strtotime ( '-1 day' , strtotime ( $fecha ) ));
	$fechap = $fechai;
	$turno = 3;
	}
if (substr($hora,0,2)*1>=6) {
	$horaf = '13:59:59';
	$horai = '06:00:00';
	$fechai = $fecha;
	$turno = 1;
	}
if (substr($hora,0,2)*1>=14) {
	$horaf = '21:59:59';
	$horai = '14:00:00';
	$fechai = $fecha;
	$turno = 2;
	}
if (substr($hora,0,2)*1>=22) {
	$horaf = '05:59:59';
	$horai = '22:00:00';
	//$fechai = date("Ymd" ,  strtotime ( '-1 day' , strtotime ( $fecha ) ));
//	$fechap = 
	$turno = 3;
	}
	if (trim($posicion)=="MAQ00") echo $horaf." ".$horai."\n<br>";
	//$horas =  date("H:i:s" , (strtotime($fecha." ".$horaf) - strtotime($fecha_ant." ".$hora_ant)));
	
		if (trim($posicion)=="MAQ00") echo $fecha_ant." ".$hora_ant." -- ".$fechai." ".$horai."\n<br>";
	
	if (strtotime($fecha_ant." ".$hora_ant) <strtotime($fechai." ".$horai)) {
		$fecha_ant =$fechai;
		$hora_ant = $horai;
	}
	if (trim($posicion)=="MAQ00") echo $fecha_ant." ".$hora_ant." -- ".$fecha." ".$hora."\n<br>";
	date_default_timezone_set("UTC"); 
	$horas =  date("H:i:s" , (strtotime($fecha." ".$hora) - strtotime($fecha_ant." ".$hora_ant))) ;
	if (trim($posicion)=="MAQ00") echo date("H:i:s" , ((strtotime($fecha." ".$hora) - strtotime($fecha_ant." ".$hora_ant))))."\n<br>";
	date_default_timezone_set("Europe/Madrid"); 

	

	
$sqlinsert = " INSERT INTO SEGOFS ( SEGCONTA, SEGCONT, SEGNSUB, SEGCART, SEGFECHA, SEGHORA, SEGTURNO, SEGCOPE, SEGTIPO, SEGMAQ, SEGMDE, SEGMDEV, SEGCAV, SEGUTL1, SEGUTL2, SEGNOPE, SEGCANT, SEGRCHZ, SEGCANZ, SEGFIN, SEGSUBP, SEGESPZ, SEGPARO, SEGOPAUX, SEGNDEF, SEGNPLA, SEGUSUR, SEGFREG, SEGFTRA, SEGHTRA, SEGHRMAQ, SEGHRHOM, SEGHRINI, SEGHRFIN, SEGFCINI, SEGFCFIN, SEGNVING, SEGCORR, SEGFEST, SEGEQUIP, SEGBARRA ) VALUES ( coalesce((select max(segconta)+1 from segofs) , 1) , $ofcont, $ofsub, '".$articulo."', $fechap, '".$hora."', $turno, $operario, 'P', '$puesto', '$molde', '$version', $cavidades , '', '', 0, $ok, $defecto, $nok , 'N' , '$subpiezas', '$subpieza', 0, 'N', '$of', 0, '".$operario."', $fecha, $fechap, '".$hora."', '$horas', '$horas', '".$hora_ant."',  '".$hora."', $fecha_ant, $fecha, '', 'N', 'N', 'X', '0' ) " ;
if (trim($posicion)=="MAQ00")  echo $sqlinsert."<br>\n";
$resultinsert=odbc_exec($cidpipeline,$sqlinsert) or die(exit("Error en odbc_exec")); 

				odbc_commit($cidpipeline);
				
				odbc_free_result($resultinsert);	
				
			
	
}
	
        $referencia = $pieza;        
		$cantidad= $ok + $nok;
		$orden = $barra;
		$fechaqs = $fecha;
		$anyo = substr($fechaqs,2,2);
		$sqlof="select arnbr from almar where arcdg = '".$referencia."'";
		
		$docum ="MSEP". substr($fechaqs, 2, 6);
		$tipomov = 30;
		
		$resultof=odbc_exec($cidpipeline,$sqlof) or die(exit("Error en odbc_exec")); 

		odbc_fetch_row($resultof);
			$descripcion = odbc_result($resultof,"arnbr");		
		odbc_free_result($resultof);

	//	$almacen = $barraalm;
		
		
		
		
		
 
$factorstk = 1;

$anyo = substr($fechaqs, 2, 2);

//echo $docum;

$sigtecin = 0;
/*
$sqlmov = "select hccin from almhc where hcdoc = '" . $docum . "' and hcfch = " . $fechaqs . " and hcalm = " . $almacen . " ";
$resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));


odbc_fetch_row($resultmov);
$sigtecin = odbc_result($resultmov, 1);
odbc_free_result($resultmov);*/

$sqlmov = "select hccin , coalesce( (select max(hdnln) from almhd where hdcin = hccin) , 0 ) from almhc where hcdoc = '".$docum."' and hcfch = ".$fechaqs." and hcalm = ".$almacen." order by hccin desc";
		
                        if (trim($posicion)=="MAQ00") echo $sqlmov;
                        $resultmov=odbc_exec($cidpipeline,$sqlmov) or die(exit("Error en odbc_exec")); 

		
				odbc_fetch_row($resultmov);
				$sigtecin = odbc_result($resultmov,1);	
                                $lineas = odbc_result($resultmov,2);	

//echo "SS".$sigtecin;
//echo PHP_EOL  .$sigtecin;

if (($sigtecin == 0) || (is_null($sigtecin)) || ($lineas > 990)) {

    //ULTIMO NUMERO DE MOVIMIENTO y lo incremnto en 2, uno xa entrada y otro xa salida
    $sqlmov = "SELECT ALMCA.CANUM FROM ALMCA  WHERE ALMCA.CATIP = 10";
    $resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
    odbc_fetch_row($resultmov);
    $sigtecin = odbc_result($resultmov, 1) + 1;
    $ultcin = $sigtecin + 1;
    odbc_free_result($resultmov);



    //actualizo la tabla de control de movimientos
    $sqlmov = "UPDATE ALMCA   SET CANUM = " . $ultcin . ", CAALF = ''  WHERE ALMCA.CATIP = 10 ";
    
    $resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
    odbc_commit($cidpipeline);
    odbc_free_result($resultmov);
    //echo PHP_EOL . $sigtecin. " ".$ultcin;
    //odbc_free_result($resultmov);
    //CREO CABECERA MOV ALMACEN
    //echo PHP_EOL . $sigtecin." ".$anyo." ".$docum;
    $sqlmov = "INSERT INTO ALMHC ( HCCIN, HCAÑO, HCDOC,HCFCH,HCTMV, HCALM,HCCCN,   HCBRU,  HCDT1 ,HCDT2 ,  HCZON, HCAG1,HCAG2 , HCPOR, HCTPO, HCMC1, HCMC2 ,HCGTS,  HCCIN2 , HCAÑO2 ,HCDPP,HCREC )  VALUES ( " . $sigtecin . " ,  " . $anyo . " , '" . $docum . "' ,  " . $fechaqs . " ,   " . $tipomov . " ,  " . $almacen . " ,   0 , 0 , 0 , 0 , 0 , 0 , 0 , 0, '0' , 0 , 0 , 0 , 0 , 0 , 0 , 0 )  ";
    if (trim($posicion)=="MAQ00") echo $sqlmov;
    
    $resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
    odbc_commit($cidpipeline);
    odbc_free_result($resultmov);
    //fwrite($fp2, $sqlmov . "\n");
}

$stock = "";
//actualizo el stock del articulo en el almacen de entrada y en el de salida
$sqlmov = "SELECT ALMST.STREA  FROM ALMST WHERE ( ALMST.START = '" . $referencia . "'  ) AND ( ALMST.STALM = " . $almacen . " )   ";
$resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
odbc_fetch_row($resultmov);
$stock = odbc_result($resultmov, 1);

$sqlmov = "SELECT count(*)  FROM ALMST WHERE ( ALMST.START = '" . $referencia . "'  ) AND ( ALMST.STALM = " . $almacen . " )   ";
$resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
odbc_fetch_row($resultmov);
$cstock = odbc_result($resultmov, 1);

//echo "STOCK".$stock."SS";
//nulo?
if ($cstock == 0) {
    //Inserto
    $stock = ($cantidad * $factorstk);
    //echo "inserto linea stock ".$referencia." ".$almacen." ".$stock;
    $sqlmov = "INSERT INTO ALMST ( START , STALM ,  STMIN ,  STMAX , STPAS , STEST, STALT , STREA , STRES , STPTE , STREA2 , STRES2 , STPTE2 ,  STPMC)   VALUES ( '" . $referencia_mov . "' , " . $almacen . " , 0  , 0 ,'','','', " . $stock . " , 0 , 0 , 0 , 0 , 0 , 0 ) ";
    //fwrite($fp2, $sqlmov . "\n");
    $resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
    odbc_commit($cidpipeline);
    odbc_free_result($resultmov);
} else {
    //actualizo
    $stocknuevo = $stock + ($cantidad * $factorstk);
    //echo "actualizo linea stock ".$referencia." ".$almacen." ".$stock." ".$stocknuevo;
    //echo PHP_EOL . $stock." - ".$stocknuevo;
    $sqlmov = "UPDATE ALMST SET STREA  = " . $stocknuevo . " , STPMC  = 0 WHERE ( ALMST.START = '" . $referencia . "' ) AND ( ALMST.STALM = " . $almacen . " ) ";
    //fwrite($fp2, $sqlmov . "\n");
    $resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
    odbc_commit($cidpipeline);
    odbc_free_result($resultmov);
}


//ULTIMA LINEA MOVIMIENTO
$sqlmov = "select max(hdnln) from almhd where hdcin = " . $sigtecin . " "; //and 'HDAÃ‘O' = ".$anyo." ";
$resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
odbc_fetch_row($resultmov);
$ultimalinea = odbc_result($resultmov, 1);

if (is_null($ultimalinea)) {
    $ultimalinea = 1;
} else {
    $ultimalinea = $ultimalinea + 1;
}

//inserto linea movimiento
$sqlmov = "INSERT INTO ALMHD " /*( HDCIN, HDAÑO, HDFCH, HDNLN,HDART, hdnbr , HDCAN, HDUDM,HDCAN2,HDUDM2,  HDPRE,HDPMC,  HDPREE,HDDTO, HDDTO2,HDDTO3, HDDTO4, HDDTO5,HDCM1, HDCM2,HDIVA,HDREQ, HDCE1, HDCE2,HDCE3, HDCE4, HDPTD, HDPTD2, HDPTC1,HDPTC2,  HDCMN1,   HDCMN2 , HDTMV , HDALM,HDSUF , HDFSTK)  */." VALUES ( " . $sigtecin . ",  " . $anyo . ",  " . $fechaqs . ", " . $ultimalinea . ", 0 , '" . $referencia . "', '" . $descripcion . "', " . $cantidad . ",  4,    0, 0,  0,  0,   0,   0,   0,  0,    0,  0,     0,   0,   0,   0,  0,  0,  0,  0, 0 , 0 , 0 , 0 , 0, 0,  0,    0,    0,  0,  0, 0,   0 , 0, 0,  0,  0,   0,   0,   0,  0,    0,  0, $factorstk , 0 , " . $almacen . ", $tipomov , 0 )  ";
if (trim($posicion)=="MAQ00") echo "<br>".PHP_EOL . $sqlmov. PHP_EOL ;
$resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
odbc_commit($cidpipeline);
odbc_free_result($resultmov);
//fwrite($fp2, $sqlmov . "\n");

//inserto la mochila
$sqlmov = "INSERT INTO ALMQA"./* (HDCIN, HDAÃ‘O, HDNLN, HDART, QAMLD )*/" VALUES (" . $sigtecin . ",  " . $anyo . ",   " . $ultimalinea . ",  0 ,    '" . $referencia . "',  '" . $orden . "' ) ";
if (trim($posicion)=="MAQ00") echo $sqlmov;
$resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
odbc_commit($cidpipeline);
odbc_free_result($resultmov);
//fwrite($fp2, $sqlmov . "\n");



                    
                    
                    
    echo "<br><br>$posicion<br><br>";                
                    
                
                
                //falta actualizar la orden (PIPELINE)
              //  if ($ofok!="S")
                {
                    
                    if (trim($posicion)=="MAQ00") echo "\nOF\n";
                    
 /*                   
$sql = " SELECT brcont,brsub,brndef,brart  FROM segbarra  where brcod = ".$barra."  and brart = '".$articulo."'" ;
	  $result=odbc_exec($cidqsweb,$sql) or die(exit("Error en odbc_exec")); 
	  $row = odbc_fetch_row($result);
	  $ofcont = odbc_result($result,1);
	  $ofsub = odbc_result($result,2);
	  $articulo = odbc_result($result,4);
	  $of = odbc_result($result,3);
	  odbc_free_result($result);
*/
/*$sql = " SELECT SEGCONTA  FROM SEGOFS  ORDER BY SEGCONTA DESC"  ;
	  $result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 
	  $row = odbc_fetch_row($result);
	  $conta = odbc_result($result,1);
	  odbc_free_result($result);
	if (is_null($conta)) { 
		$conta = 0;
	}else{
		$conta++;
	}*/

	//echo $conta;
	
	//$operario = 666;
	$turno = 1;
	$hora=date("H:i:s");
	//echo "*".$hora."*";
	
	//echo "*".$of."*";
	
	$sql  = " select ofcanral , ofcanrch , ofcanpdt from ordenfab where ofndef = '".$of."'  " ;
	$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 
	  $row = odbc_fetch_row($result);
	  $real = odbc_result($result,1) + $ok * 1;
	  $rchz = odbc_result($result,2) + $nok * 1;
	  $pdte = odbc_result($result,3) - $ok * 1;
	
	
/*$sqlinsert = " update ordenfab set ofcanral = $real , ofcanrch = $rchz , ofcanpdt = $pdte where ofndef = '".$of."'  " ;
		
//echo $sqlinsert;

		$resultinsert=odbc_exec($cidpipeline,$sqlinsert) or die(exit("Error en odbc_exec")); 

				odbc_commit($cidpipeline);
				
				odbc_free_result($resultinsert);*/
				
				
					$datos =  file_get_contents("/var/www/MRPII/maquina/OF".$puesto.".txt");
//echo $datos;
//$datos_file
$subdatos= explode('|',$datos);

while (!strpos($datos,"|")) {
	$datos =  file_get_contents("/var/www/MRPII/maquina/OF".$puesto.".txt");
}

$orden = $subdatos[0];//$datos_file[0];

//echo $datos."<br>";
$contador = substr(file_get_contents('/var/www/MRPII/maquina/'.$puesto.'.txt', true),11,10);
//$subdatos=explode("|",$datos);

if (trim($pieza) == trim($subdatos[9])) $subdatos[2] = $subdatos[2]+ $ok * 1;
if (trim($pieza) == trim($subdatos[10])) $subdatos[5] = $subdatos[5]+$ok * 1;
if (trim($pieza) == trim($subdatos[11])) $subdatos[7] = $subdatos[7]+$ok * 1;
//echo "*".trim($articulo)."*"."<br>";
//echo "*".trim($subdatos[9])."*"."<br>";
//echo "*".trim($subdatos[10])."*"."<br>";
//echo "*".trim($subdatos[11])."*"."<br>";
$datos2= $subdatos[0]."|".substr("0000000000".$contador, -10)."|".$subdatos[2]."|".($subdatos[3])."|".$subdatos[4]."|".$subdatos[5]."|".$subdatos[6]."|".$subdatos[7]."|".$subdatos[8]."|".$subdatos[9]."|".$subdatos[10]."|".$subdatos[11]."|".$subdatos[12]."|".$subdatos[13]."|".$subdatos[14]."|".$subdatos[15]."|".$subdatos[16];	
//echo $datos2;

//if ($posicion=="MAQ001")
file_put_contents('/var/www/MRPII/maquina/OF'.$puesto.'.txt', $datos2);
// if ($posicion=="MAQ001")   
 file_put_contents('/var/www/MRPII/maquina/'.$puesto.'.txt',$subdatos[0].substr("0000000000".$contador, -10));
		
		
                }	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	
	
	
	
	
	
	
if ($tipo == "PALET") $tipoeti = "PA";

for ($etiq = 1; $etiq <= $etiquetas ; $etiq++) {
    

/*$cantidad = $para;    
if (($etiquetas == $etiq)) {

	$cantidad = $cantidad_total - $cantidad * ($etiquetas - 1);
	
}
*/
    
$fecha = date("Ymd");
$hora = date("H:i:s");
//$usuario = strtoupper(trim( $_GET["usr"]));
$sql = "INSERT INTO pipeline/QRETI values ( '$orden' , '$tipoeti', ".($ns + 1)."  , '' , 0 , '$pieza' , $cantidad , 4 , 'S' , '', 0 , $fecha , '$hora' , '$operarios' , '' , '' ,'' , 0 , 0 , '', '' )";
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

//odbc_commit($cidpipeline);    
    
}

}


}

// if ($puesto==10) $posicion = 0;   

/*
$salida = shell_exec("ssh administrador@10.0.1.2".$posicion." mount /home/descarga/etiquetas\n");
$salida = shell_exec("ssh administrador@10.0.1.2".$posicion." chmod a+rwx /home/descarga/etiquetas/ -R\n");
$salida = shell_exec("ssh administrador@10.0.1.2".$posicion." lp -d CAJA /home/descarga/etiquetas/cj".$orden.".pdf\n");*/



?>
