<?php

/*include('../pdf/class.ezpdf.php');
include('../pdf/class.backgroundpdf.php'); 
include('../phpqrcode/qrlib.php'); 
include_once '../phpbarcode/barcodes.php';
setlocale(LC_CTYPE, 'en_US');*/

$movimiento_en_qs = 0;

//set_time_limit(1000);

$hora_entrada = date("Ymd H:i:s");

include('../../libs/phpqrcode/qrlib.php'); 
include_once '../../libs/phpbarcode/barcodes.php';



setlocale(LC_CTYPE, 'en_US');

include('../../libs/pdf/fpdf.php');
//include('../../libs/pdf/class.backgroundpdf.php'); 



$fondo ="";



$dsn="SAGE"; 
$usuario="sa"; 
$password="admin000"; 
$cid=odbc_connect($dsn,$usuario,$password); 
if (!$cid){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
}     


$dsnw="WHALES"; 
$usuariow="sa"; 
$passwordw="87cc88bb89."; 
$cidw=odbc_connect($dsnw,$usuariow,$passwordw, SQL_CUR_USE_IF_NEEDED ); 
if (!$cidw){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
}     



$dsnm="MAPEX"; 
$usuariom="sa"; 
$passwordm="Mapexdd2017"; 
$cidm=odbc_connect($dsnm,$usuariom,$passwordm); 
if (!$cidm){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos MAPEX."); 
}     

$improving = 0;


$etis = 5;


$orden = $_GET["orden"];

$pedido = $_GET["pedido"];

if ($orden=="undefined") $orden = "";

if ($orden == "") {
    
    exit();
    
} else {

$etiquetas = $_GET["etiquetas"];
$cantidad = $_GET["cantidad"];

$num_eti = $_GET["serie"];
$serie2= $num_eti;
$serie= $num_eti;
$empresa = $_GET["empresa"];
$pieza = trim($_GET["pieza"]);
$articulo = $pieza;
$tipo = $_GET["tipo"];
$cajapalet = $_GET["tipo"];
if ($etiquetas=="") $etiquetas = 5;
$cambio_ref = "N";

$borrar_prn = "";

if( $_GET["puesto"]) {
    $posicion =  $_GET["puesto"];
} else {
    $posicion = "MAQSS00";
    exit();
}


if ($tipo=="CAJA")     $tipo2="CJ";







if ($tipo=="CAJA") {
    $tipo2="CJ";
    


}
if ($tipo=="PALET") $tipo2="PA";
$operario = "";






$of = $orden;
$ok = $cantidad;
$nok = 0;

$udmcajas="";


$ofb = $orden;

$sql = "select    descripcionarticulo  from  articulos where codigoarticulo =  '$pieza' ";
$resultmain=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 



 
$nombre =  substr( odbc_result($resultmain, 1) , 0 , 42);

//echo $nombre;

$operarios = "";
$operario="";

  
  $pdf = new fPDF('L' , 'pt' , 'A5' );//'A3', 'landscape', 'image',  array('img' => $fondo,'width' => 600,'height' => 850,'xpos' => -20,'ypos' => -20) );  
$pdf->SetFont('Helvetica' , 'B' , 16); 
$pdf->AddPage();
 $sql= "select o.CodigoArticulo  as CodigoArticulo , o.formula , SerieFabricacion , FechaInicioPrevista , FechaFinalReal , UnidadesAFabricar , UnidadesFabricadas 
 , centrotrabajo ,   numerofabricacion , ejerciciofabricacion , horainicioprevista , estadoof , o.descripcionarticulo as descripcionarticulo 
from OrdenesFabricacion o ,  centrostrabajo c
where  centrotrabajo = '".$posicion."'  and o.codigoempresa = $empresa and c.codigoempresa = o.codigoempresa and o.formula = c.formula
and fechafinalreal is null
order by FechaInicioPrevista ";
 

//echo $sql;
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

$puesto=$posicion;
$npuesto = trim(odbc_result($result,"centrotrabajo")) ;
$nposicion = trim(odbc_result($result,"centrotrabajo")) ;





//$sql = "select mqpstalm from pipeline/mstmqpst where mqpstcod = '$puesto' ";
//$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

//echo $puesto;
$almacen = 1;///odbc_result($result,1)*1 ;
//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log', date("Ymd H:i:s")." ALMACEN ".$almacen." \n" , FILE_APPEND );

//if ($almacen==1) $almacen=100;
//echo $almacen;


$fecha = date("Ymd");
$hora = date("H:i:s");
//$sql = "select distinct o.operario , nombreoperario from operarios o , khitt_loginoperarios lo where o.operario = lo.operario and fechafin is null   and centrotrabajo = '$puesto' order by nombreoperario";//and opeffin = '00:00:00'


$sql = "SELECT [Id_prd_operario]
      
      ,[Id_operario]
  FROM [prd_operario] o  , [cfg_maquina] m 

  where o.id_maquina = m.id_maquina and cod_maquina = '$puesto' order by 2";//and opeffin = '00:00:00'

//echo $sqlope;


//echo $sqlope;
$result=odbc_exec($cidm,$sql)  or die(exit("Error en mysql_query")); 

//while ($row=mysql_fetch_row($resultope))
while (odbc_fetch_row($result)) {
//echo $i;
$operario = odbc_result($result,"Id_operario");
             //   $nombre = trim(odbc_result($result,"nombreoperario"));
$operarios =$operarios." ".$operario;

}


//$operarios = substr($operarios , 0 , 10 );









{
	
	//ETIQUETA CLIENTE
	
//if(trim($posicion)=="MAQ01") echo "ETIQUETA FINAL";

$of = $orden;
//$ok = $cantidad;
$nok = 0;

$udmcajas="";
$barra="000000";


$ofb = $orden;
/*
$sql = "select    arnbr from  almar where arcdg =  '$pieza' ";
$resultmain=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 



 
$nombre =  odbc_result($resultmain, 1);*/


//$posicion="";
//$operarios = "";
//$operario="";
//$pdf = new Cezpdf('A3','landscape');

 // $pdf->selectFont('../fonts/Courier-Bold.afm');
/*
$pdf = new fPDF('L' , 'pt' , 'A3' );//('A3', 'landscape', 'image',  array('img' => $fondo,'width' => 600,'height' => 850,'xpos' => -20,'ypos' => -20) );  
$pdf->SetFont('Helvetica' , 'B'); 
$pdf->AddPage();*/
/*


$sql = "select ofopmaq , ofcont, ofnsub , ofalm ,  OFINMDE  ,   OFINMDEV ,ofnope from ordenfab where  ofndef = '$orden'";//and opeffin = '00:00:00'

//$sql = "select ofopmaq , ofcont, ofnsub , ofalm ,  OFINMDE  ,   OFINMDEV ,ofnope from ordenfab where ofndef = '$of'";//and opeffin = '00:00:00'


//echo $sqlope;
$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 
$puesto = trim(odbc_result($result,1)) ;
$posicion = trim(odbc_result($result,1)) ;
$ofcont = odbc_result($result,2) ;
$ofsub = odbc_result($result,3) ;
//$almacen = odbc_result($result,4)*1 ;
//if ($almacen==1) $almacen=100;
$molde = odbc_result($result,5) ;
$version = odbc_result($result,6) ;
$operacion = odbc_result($result,7) ;
//$cara = $_GET["cara"];

*/


$fecha = date("Ymd");
$hora = date("H:i:s");
//echo $hora;
	
	//ETIQUETA DODETTE 
//	echo "ODETTE";

$of = $orden;
//$ok = $cantidad;
$nok = 0;

$udmcajas="";
$barra="000000";

$fecha = date("Ymd");
$hora = date("H:i:s");
$ofb = $orden;

//echo $nombre;

//$posicion="";
//$operarios = "";
//$pdf = new Cezpdf('A5','landscape');

//  $pdf->selectFont('../fonts/Courier-Bold.afm');
/*
 $pdf = new fPDF('L' , 'pt' , 'A5' );//$pdf = new fPDF('A5', 'landscape', 'image',  array('img' => $fondo,'width' => 600,'height' => 850,'xpos' => -20,'ypos' => -20) );  
$pdf->SetFont('Helvetica','B'); 
$pdf->AddPage();*/
$tiposubp = "";





/*$sql="select arcdg , arrdp , odtpiez,odrdc,odtcan,odtnums,odtpnet,odtpbru,odtprv,odtcja,odta1,odta2, odta3 , odtmu, arnbr,odtklt,odta1 , arce3 , ofinmdev , ofinmde , ofniving , arce1 from pipeline/etodt, pipeline/almar , pipeline/ordenfab
 where arcdg = odtcdg and (odtcdg = '".$articulo."'  or odtcdg = '".$farticulo."' )and ofndef = '$of' and ofcart  = '$articulo' and ofcart = arcdg";
*/


//echo "<br>HOLA".$sqlped;


//update numerio de serie



//update contador caja/palet


$sqlins = "select ar.codigoarticulo , ar.descripcionarticulo , ac.codigocliente , ac.codigodelcliente , cl.razonsocial , cl.domicilio , cl.viapublica, cl.numero1 , cl.numero2 , cl.codigopostal , cl.provincia , cl.nacion , ar.kh_pe_peso , ar.kh_pe_pesopal , ar.ReferenciaEdi_ , cl.referenciadelproveedor , ar.marcaproducto
from articulos ar , articulocliente ac , clientes cl 
where ar.codigoarticulo = '$articulo' and ar.codigoempresa = $empresa and ar.codigoempresa = ac.codigoempresa and ar.codigoarticulo = ac.codigoarticulo 
and ar.codigoempresa = cl.codigoempresa and ac.codigocliente = cl.codigocliente and ac.codigocliente <> '0471' and ac.codigodelcliente <> 'NR' ";
//echo $sqlins;
$result=odbc_exec($cid,$sqlins) or die(exit("Error en odbc")); 


/*
echo "|".odbc_result($result,"Rt_Cod_of")."|".odbc_result($result,"rt_Cod_producto")."|".odbc_result($result,"Rt_Desc_producto")."|".odbc_result($result,"Rt_Unidades_planning")."|".odbc_result($result,"Rt_Desc_actividad")."|".odbc_result($result,"Rt_Unidades_ok_of")."|".odbc_result($result,"Rt_Unidades_nok_of")."|".odbc_result($result,"Rt_Desc_operario")."|".odbc_result($result,"f_velocidad")."|".odbc_result($result,"Rt_Rendimientonominal1");
*/


//$result=odbc_exec($cidm,$sql) or die(exit("Error en odbc_exec")); 


$referencia_cli = str_replace(",","",rtrim(odbc_result($result,"codigodelcliente")));
//$referencia_cli = str_replace(",","",rtrim(odbc_result($result,"referenciaedi_")));

//if (trim($referencia_cli)=="") $referencia_cli =  str_replace(",","",rtrim(odbc_result($result,"arrdp")));
$referencia =  str_replace(",","",rtrim(odbc_result($result,"codigoarticulo")));
//if ($cantidad == 0) {
	$para = $cantidad; //odbc_result($result,"odtcan");
	
//	}
//$serie = 3;//odbc_result($result,"odtnums");
$serie_ini = $serie;

$pneto = odbc_result($result,"kh_pe_peso");
$pbruto = odbc_result($result,"kh_pe_pesopal");
$proveedor =  str_replace(",","",rtrim(odbc_result($result,"referenciadelproveedor")));
$caja = "6";//odbc_result($result,"odtcja");
$cliente =trim(odbc_result($result,"razonsocial"));
$cliented2 = trim(odbc_result($result,"domicilio"));
$cliented3 = trim(odbc_result($result,"viapublica"));
//if ($muelle == "") {
	$muelle ="";//odbc_result($result,"odtmu");
//	}
$descripcion = $nombre;// trim(odbc_result($result,"arnbr"));
$embalaje = "KLT";//odbc_result($result,"odtklt");
//$cliente = "FAURECIA";
if ($embalaje == "") $embalaje = "FALTA EMBALAJE";
//$asn = "TEST1234";
$destino = "DESTINO";//odbc_result($result,"odta1");
$destinocod = '';
$numcliente = odbc_result($result,"codigocliente");
if (is_null($numcliente)) $numcliente =0;
if (($numcliente=="")) $numcliente = 0;
//echo "*".$numcliente."*";
//$etiquetas = 1;//ceil($cantidad_total / $cantidad);

$nivel = trim(odbc_result($result,"marcaproducto"));
//update numerio de serie
//$numcliente = $numcliente;

$sqlS = "select max(odtnums) from pipeline/etodt where odtcdg in (select  arcdg from pipeline/almar where arce3 = $numcliente)"; 
//arcdg from pipeline/almar where arce3 = $numcliente)                      )


$resultS="666666";//odbc_exec($cidpipeline,$sqlS) or die(exit("Error en odbc_exec")); 


$numserie_max =  597233;//odbc_result($resultS,1);
$serie = $numserie_max + $serie;
$serie_ini = $numserie_max+ $serie;;
//$ns = $numserie_max;
if (is_null($numserie_max)) $numserie_max =0;
$numserie_max = $numserie_max + $etiquetas;

$sqlS = "update pipeline/etodt  set odtnums = $numserie_max  where odtcdg in( select arcdg from pipeline/almar where arce3 = $numcliente) or odtcdg = '$articulo'";
//echo $sql;
//$resultS=odbc_exec($cidpipeline,$sqlS) or die(exit("Error en odbc_exec")); 
	//file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." UPDATE NS $posicion $articulo SS \n", FILE_APPEND );	
//odbc_commit($cidpipeline);

//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." ACVUALIZADO ODTNUMS \n", FILE_APPEND );


if (is_null($etiquetas)) $etiquetas =1;





//$sql = "select ofopmaq , ofcont, ofnsub , ofalm ,  OFINMDE  ,   OFINMDEV ,ofnope , ofniving from ordenfab where ofndef = '$orden'";//and opeffin = '00:00:00'

$sql = "select ofopmaq , ofcont, ofnsub , mqpstalm as ofalm ,  OFINMDE  ,   OFINMDEV ,ofnope from ordenfab , mstmqpst  where mqpstcod = ofopmaq and ofndef = '$orden'";//and opeffin = '00:00:00'

//echo $sqlope;
//$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 
//$puesto = trim(odbc_result($result,1)) ;
//$posicion = trim(odbc_result($result,1)) ;
//$ofcont = odbc_result($result,2) ;
//$ofsub = odbc_result($result,3) ;
//$almacen = odbc_result($result,4) ;
//if ($almacen==1) $almacen=100;
//$molde = odbc_result($result,5) ;
//$version = odbc_result($result,6) ;
//$operacion = odbc_result($result,7) ;
//$cara = $_GET["cara"];
//$molde = trim(odbc_result($result,"ofinmde"));
//$versionmde = trim(odbc_result($result,"ofinmdev"));



/*
$sql="select arcdg , arrdp , odtpiez,odrdc,odtcan,odtnums,odtpnet,odtpbru,odtprv,odtcja,odta1,odta2, odta3 , odtmu, arnbr,odtklt,odta1 , arce3  from pipeline/etodt, pipeline/almar 
 where arcdg = odtcdg and (odtcdg = '".$articulo."' or odtcdg = '".$farticulo."')";

$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 


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
$descripcion = trim(odbc_result($result,"arnbr"));
$embalaje = odbc_result($result,"odtklt");
//$cliente = "FAURECIA";
if ($embalaje == "") $embalaje = "FALTA EMBALAJE";
//$asn = "TEST1234";
$destino = odbc_result($result,"odta1");
$destinocod = '';
$numcliente = odbc_result($result,"arce3");
//echo $serie;

}*/




$tiposubp = "PP";
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
	
	$tamaÃ±ofuente = 0.7*2.5;
	
	
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


$etip = 2;//3;
if (($etiq!=1) && ($etip==1)) {
	//$pdf->ezNewPage();
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
//$contador = 1;

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
$despy=120;//;
	
	$tamañofuente = 0.8;
	$tamanofuente = $tamañofuente;

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
//$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 
$ns = 1;//odbc_result($result,1);
/*
$sql = "update pipeline/ordenfab  set ofnetic = ofnetic + $etiquetas where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);*/
} else {
$sql= "select ofneti from pipeline/ordenfab where ofndef = '$orden' and ofcart = '$pieza'";
//$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 
$ns = 1;//odbc_result($result,1);    
 /*   
$sql = "update pipeline/ordenfab  set ofneti = ofneti + $etiquetas where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);   */
}    
}

	
	//file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO OFS 3 \n", FILE_APPEND );	
/*
$of2 = substr($of , 1 , 1).substr($of,5,6).substr("0000".$etiq , -4);
  QRcode::png($of."|".substr($cajapalet , 0 ,1)."|".trim($articulo)."|".($ns+$etiq)."|".$tiposubp."|".$fecha."|".$cantidad."|".$numserie_max, '../tmp/'.$of.'_'.$articulo.'_'.substr($cajapalet , 0 ,1).'_'.($ns+$etiq).'.png'); 

    list($width, $height, $type, $attr) = getimagesize('../tmp/'.$of.'_'.$articulo.'_'.substr($cajapalet , 0 ,1).'_'.($ns+$etiq).'.png');
$imagefactor=$width/$height;
    
 //$pdf->Image('../tmp/'.$of2.'.png', 182*$factorx+$despx,   0*$factory+$despy+1,15*$factorx*$imagefactor);
 
  //$pdf->Image('../tmp/'.$of2.'.png', 175.5*$factorx+$despx,   18*$factory+$despy+1,24.5*$factorx*$imagefactor);

  $pdf->Image('../tmp/'.$of.'_'.$articulo.'_'.substr($cajapalet , 0 ,1).'_'.($ns+$etiq).'.png', 174.5*$factorx+$despx, $alto - $height/2 -  0*$factory+$despy+1, 21*$factorx*$imagefactor);
  */
  //file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO  QR 1 \n", FILE_APPEND );	
  
    //QR PIEZA FAURECIA
 
 /*   QRcode::png('P'.trim($referencia_cli), '../tmp/QRcli'.$referencia_cli.'.png'); 
   list($width, $height, $type, $attr) = getimagesize('../tmp/QRcli'.$referencia_cli.'.png');
$imagefactor=$width/$height;
 $pdf->Image('../tmp/QRcli'.$referencia_cli.'.png', 0*$factorx+$despx,  65*$factory+$despy+1, 25*$factorx*$imagefactor);
 
 //file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO QR 2 \n", FILE_APPEND );	
 $referencia_cli = "DSFSADFGDSAFGD";
 $pdf->Text( 30*$factorx+$despx, 75 *$factory+$despy+1, 18 * $tamanofuente*2 , $referencia_cli);
  
  */
  
  
  
  
  
  
 // $pdf->line(0*$factorx+$despx,0*$factory+$despy,0*$factorx+$despx,138*$factory+$despy);
  
  $pdf->line(0*$factorx+$despx,$alto - 54*$factory+$despy,197*$factorx+$despx, $alto - 54*$factory+$despy);
    $pdf->line(0*$factorx+$despx,$alto -41*$factory+$despy,197*$factorx+$despx,$alto -41*$factory+$despy);
      $pdf->line(0*$factorx+$despx,$alto -14*$factory+$despy,175*$factorx+$despx,$alto -14*$factory+$despy);
      $pdf->line(0*$factorx+$despx,$alto -27*$factory+$despy,110*$factorx+$despx,$alto -27*$factory+$despy);
      $pdf->line(110*$factorx+$despx,$alto -0*$factory+$despy,110*$factorx+$despx,$alto -41*$factory+$despy);
      $pdf->line(110*$factorx+$despx,$alto -21*$factory+$despy,197*$factorx+$despx,$alto -21*$factory+$despy);
      $pdf->line(110*$factorx+$despx,$alto -34*$factory+$despy,197*$factorx+$despx,$alto -34*$factory+$despy);
      
      $pdf->line(74*$factorx+$despx,$alto -70*$factory+$despy,74*$factorx+$despx,$alto -54*$factory+$despy);
      $pdf->line(145*$factorx+$despx,$alto -70*$factory+$despy,145*$factorx+$despx,$alto -54*$factory+$despy);
      
      $pdf->line(146*$factorx+$despx,$alto -14*$factory+$despy,146*$factorx+$despx,$alto -21*$factory+$despy);
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
    
 //$pdf->Image('../tmp/'.$of2.'.png', 182*$factorx+$despx,   0*$factory+$despy+1,15*$factorx*$imagefactor);
 
  //$pdf->Image('../tmp/'.$of2.'.png', 175.5*$factorx+$despx,   18*$factory+$despy+1,24.5*$factorx*$imagefactor);

  $pdf->Image('../tmp/'.$of2.'.png', 174.5*$factorx+$despx,   0*$factory+$despy+1,22*$factorx*$imagefactor);
  */
//$pdf->Text( 0*$factorx+$despx, 25*$factory+$despy, 6 * $tamanofuente  , "SUPP (V)");



 //file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO lineas  \n", FILE_APPEND );	

$pdf->SetFont('Helvetica' , 'B' , 6* $tamanofuente); 
$pdf->Text( 02*$factorx+$despx, $alto -67*$factory+$despy, "(1) DESTINATION" );
$pdf->Text( 76*$factorx+$despx, $alto -67*$factory+$despy,  "(2) SHIP.ADR/STOCKLOC/APPLICATION CODE");
$pdf->Text( 146*$factorx+$despx, $alto -67*$factory+$despy,  "(3) PACKING SLIP NO.(N)");




$pdf->Text( 02*$factorx+$despx,$alto - 51*$factory+$despy,"(8) PART (P)");
$pdf->Text( 02*$factorx+$despx, $alto -39*$factory+$despy,  "(9) QUANTITY (Q)");
$pdf->Text( 111*$factorx+$despx,$alto - 39*$factory+$despy,  "(10) DESCRIPTION, DELIVERY, PERFOMRC");
$pdf->Text( 111*$factorx+$despx,$alto - 32*$factory+$despy,  "(11) SUPPLIERS PART NO.(3OS)");

//$pdf->Text( 0*$factorx+$despx, 62*$factory+$despy, 6  * $tamanofuente , "(P)");

//$pdf->Text( 100*$factorx+$despx, 140*$factory+$despy, 6  * $tamanofuente , "STR LOC 1(L)");

$pdf->Text( 02*$factorx+$despx, $alto -25*$factory+$despy,  "(12) SUPPLIER NUMBER (F)");
$pdf->Text( 111*$factorx+$despx,$alto -19*$factory+$despy, "(13) DATE");
$pdf->Text( 147*$factorx+$despx,$alto - 19*$factory+$despy, "(14) DESIGN MODIFIC. LEVEL");
$pdf->Text( 02*$factorx+$despx, $alto -10*$factory+$despy,  "(15) CONTAINER NO. (S)");
$pdf->Text( 111*$factorx+$despx, $alto -10*$factory+$despy,  "(16) BATCH NO. (H)");

//$pdf->Text( 0*$factorx+$despx, 10*$factory+$despy, 6 * $tamanofuente  , "SERIAL NO (S)");

//$pdf->Text( 178*$factorx+$despx, 108*$factory+$despy, 6  * $tamanofuente , "CONTAINER");

//$pdf->Text( 139*$factorx+$despx, 108*$factory+$despy, 6 * $tamanofuente  , "GROSS WGT");

//$pdf->Text( 100*$factorx+$despx, 108*$factory+$despy, 6 * $tamanofuente  , "NET WGT");

//$pdf->Text( 112*$factorx+$despx, 12*$factory+$despy, 6  * $tamanofuente , "BATCH NO. (H)");

//$pdf->Text( 100*$factorx+$despx, 30*$factory+$despy, 6  * $tamanofuente , "DATE (D)");

//$pdf->Text( 100*$factorx+$despx, 65*$factory+$despy, 6 * $tamanofuente, "DESCRIPTION");

//$pdf->Text( 100*$factorx+$despx, 55*$factory+$despy, 6  * $tamanofuente , "SUPP. PART. NO.");

//$pdf->Text( 143*$factorx+$despx, 97.75*$factory+$despy, 6 * $tamanofuente  , "W/C");

//$pdf->Text( 113*$factorx+$despx, 34.5*$factory+$despy, 6 * $tamanofuente  , "TO");



//$pdf->Text( 138*$factorx+$despx, 30*$factory+$despy, 6 * $tamanofuente  , "DESIGN MODIFIC. LEVEL");

//$pdf->Text( 183*$factorx+$despx, 34.5*$factory+$despy, 6 * $tamanofuente  , "DOC CODE (1L)");
//FIN FORMATO


 //file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO formato 1 \n", FILE_APPEND );	

//DATOS

$pdf->SetFont('Helvetica' , 'B' , 12* $tamanofuente); 
$pdf->Text( 114*$factorx+$despx,$alto - 35 *$factory+$despy, $descripcion);
$pdf->Text( 128*$factorx+$despx, $alto -9 *$factory+$despy, $of);//."|".substr($cajapalet,0,1)."|".($ns+$etiq));

$pdf->SetFont('Helvetica' , 'B' , 16* $tamanofuente); 
//$pdf->Text( 12*$factorx+$despx, 137*$factory+$despy, 8 * $tamanofuente  , $cliente);
$pdf->Text( 18*$factorx+$despx, $alto -36.5*$factory+$despy  , $cantidad);

$pdf->Text( 26*$factorx+$despx,$alto - 23 *$factory+$despy,   $proveedor);

$pdf->Text( 140*$factorx+$despx,$alto - 30 *$factory+$despy,  $articulo);

//$operarios = "2533 2532";
$pdf->Text( 132*$factorx +$despx, $alto -4*$factory+$despy,  $operarios);
$pdf->Text( 111*$factorx +$despx, $alto -4*$factory+$despy,  date("H:i:s") . " ".$pedido);



$preffix = "";
if ($numcliente == 568) $preffix= "Y";
$pdf->Text( 27*$factorx+$despx, $alto -9 *$factory+$despy, $preffix.$numserie_max+$serie2);
$pdf->Text(114*$factorx+$despx, $alto -15*$factory+$despy, "P".$fecha);
$pdf->Text(148*$factorx+$despx,$alto - 15*$factory+$despy,  $nivel);

$pdf->SetFont('Helvetica' , 'B' , 10* $tamanofuente); 
$muelles = explode("/", $muelle);
$pdf->Text( 102*$factorx+$despx, $alto -64 *$factory+$despy,  $muelle);
//$pdf->Text( 130*$factorx+$despx, 20.25 *$factory+$despy, 36 * $tamanofuente ,$muelles[1]);
$pdf->Text( 2*$factorx+$despx, $alto -64 *$factory+$despy,  trim($cliente));
$pdf->Text( 2*$factorx+$despx, $alto -60 *$factory+$despy,  trim($cliented2));
$pdf->Text( 2*$factorx+$despx, $alto -56*$factory+$despy,  trim($cliented3));


if (substr($referencia_cli , 0 , 5) == "P5100")  {

$pdf->SetFont('Helvetica' , 'B' , 20* $tamanofuente); 
$pdf->Text( 80*$factorx+$despx,$alto - 43*$factory+$despy,   "P5100");	
	$pdf->SetFont('Helvetica' , 'B' , 40* $tamanofuente); 
$pdf->Text( 100*$factorx+$despx,$alto - 43*$factory+$despy,   substr(  $referencia_cli , 5) );	
} else {
$pdf->SetFont('Helvetica' , 'B' , 40* $tamanofuente); 
$pdf->Text( 80*$factorx+$despx,$alto - 43*$factory+$despy,   $referencia_cli);
}
/*
//$pdf->Text( 140*$factorx+$despx, 133*$factory+$despy , 22 * $tamanofuente  , $masterlabel);

//ver justificar derecha
//$descuento =  $pdf->getTextWidth(32,"6000") ;
$pdf->Text( 20*$factorx+$despx , 56*$factory+$despy , 36  * $tamanofuente , $cantidad  );//." / ".$etip."-".$etiquetas.":".$etipag);


$pdf->Text( 8*$factorx+$despx, 87 *$factory+$despy, 36 * $tamanofuente , $referencia_cli);

$pdf->Text( 104*$factorx+$despx, 48 *$factory+$despy, 24 * $tamanofuente , $articulo);
$pdf->Text( 104*$factorx+$despx, 60 *$factory+$despy, 12 * $tamanofuente , $descripcion);

$pdf->Text( 17*$factorx+$despx, 14 *$factory+$despy, 16 * $tamanofuente , $serie);


$pdf->Text(104*$factorx+$despx, 23 *$factory+$despy, 14 * $tamanofuente ,"D".$fecha);//.substr($fecha,0,4).substr($fecha,4,2).substr($fecha,6,2));

$pdf->Text( 104*$factorx+$despx, 102.25 *$factory+$despy, 14 * $tamanofuente ,$pneto." KG");
$pdf->Text( 142*$factorx+$despx, 102.25 *$factory+$despy, 14 * $tamanofuente ,$pbruto." KG");
$pdf->Text( 180*$factorx+$despx, 102.25 *$factory+$despy, 14 * $tamanofuente ,round($caja , 0));

//$pdf->Text( 77*$factorx+$despx, 115.25 *$factory+$despy, 14 * $tamanofuente ,$embalaje);

$pdf->Text( 8 *$factorx+$despx, 114 *$factory+$despy, 20 * $tamanofuente ,$asn);

$muelles = explode("/", $muelle);
$pdf->Text( 102*$factorx+$despx, 136 *$factory+$despy, 13 * $tamanofuente , $muelle);
//$pdf->Text( 130*$factorx+$despx, 20.25 *$factory+$despy, 36 * $tamanofuente ,$muelles[1]);
$pdf->Text( 2*$factorx+$despx, 136 *$factory+$despy, 13 * $tamanofuente , $cliente);
$pdf->Text( 2*$factorx+$despx, 131 *$factory+$despy, 13 * $tamanofuente , $cliented2);
$pdf->Text( 2*$factorx+$despx, 126 *$factory+$despy, 13 * $tamanofuente , $cliented3);
//$pdf->Text( 113*$factorx+$despx, 15.25 *$factory+$despy, 20 * $tamanofuente ,$muelles[0]);

//$pdf->Text( 1*$factorx+$despx, 42.25 *$factory+$despy, 24 * $tamanofuente ,$muelles[2]);
$pdf->Text( 110*$factorx+$despx, 13 *$factory+$despy, 16 * $tamanofuente , $of);
$pdf->Text( 150*$factorx+$despx, 13 *$factory+$despy, 10 * $tamanofuente , $cajapalet);
$pdf->Text( 170*$factorx+$despx, 13 *$factory+$despy, 10 * $tamanofuente , substr("0000".$etiq , -4));

//CODIGOS DE BARRAS

*/

//$pdf->selectFont('fonts/Courier-Bold.afm'); 
//$salida = shell_exec("rm /var/www/MRPII/tmp/* \n");


// $salida = shell_exec('find /var/www/MRPII/tmp -name "*.png" -type f -mtime +2 -exec rm -f {} \; \n');
//1D

//file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO formato 2 \n", FILE_APPEND );	

$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo 
$d1->getBarcodePNGPath("Q".$cantidad, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."Q".$cantidad.'.png');
$imagefactor=$width;///$height;
$pdf->Image('../tmp/'.'Q'.$cantidad.'.png',  5*$factorx+$despx,$alto - $height/4 - 28 *$factory+$despy, $imagefactor/3 , 20);

 //file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO  barcode 1 \n", FILE_APPEND );	
$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo $referencia_cli
 $d1->getBarcodePNGPath("P".str_replace("_"," 2",trim($referencia_cli)), 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."P".str_replace("_"," 2",trim($referencia_cli)).'.png');
//$imagefactor=$width/$height;
$imagefactor=$width;
//if ($width>500) $imagefactor = $imagefactor  * 0.75 ;//ss extra large
$pdf->Image('../tmp/'.'P'.str_replace("_"," 2",trim($referencia_cli)).'.png',  5*$factorx+$despx, $alto - $height/4 -42 *$factory+$despy,$imagefactor/3 , 20);


 //file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO  barcode 2 \n", FILE_APPEND );

$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo
 $d1->getBarcodePNGPath("F".$proveedor, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."F".$proveedor.'.png');
//$imagefactor=$width/$height;
$imagefactor=$width;
$pdf->Image('../tmp/'.'F'.$proveedor.'.png',  5*$factorx+$despx,$alto - $height/4 - 15 *$factory+$despy,$imagefactor/3, 20);//7*$factorx*$imagefactor*1


 //file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO  barcode 3 \n", FILE_APPEND );
 $d1->getBarcodePNGPath('P'.trim($articulo), 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'.'P'.trim($articulo).'.png');
//$imagefactor=$width/$height;
$imagefactor=$width;
//$pdf->Text( 20*$factorx+$despx, 250 *$factory+$despy, 20,$imagefactor);
$pdf->Image('../tmp/'.'P'.trim($articulo).'.png',  114*$factorx+$despx,$alto - $height/4 - 22 *$factory+$despy,$imagefactor/3, 20);
   

 //file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO  barcode 4 \n", FILE_APPEND );
$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo $serie;
$d1->getBarcodePNGPath("S".$preffix.$numserie_max, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."S".$preffix.$numserie_max.'.png');
//if ($height==0) $height =1;
//$imagefactor=$width/$height;
$imagefactor=$width;
$pdf->Image('../tmp/'.'S'.$preffix.$numserie_max.'.png',  5*$factorx+$despx, $alto - $height/4 -0 *$factory+$despy,$imagefactor/3 , 20);   

/*
$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo
 $d1->getBarcodePNGPath("B".$of." ".substr($cajapalet , 0 ,1)." ".trim($articulo)."-".($ns+$etiq)." ".$cantidad." ".$numserie_max, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'.'B'.$of." ".substr($cajapalet , 0 ,1)." ".trim($articulo)."-".($ns+$etiq)." ".$cantidad." ".$numserie_max.'.png');
//$imagefactor=$width/$height;
$imagefactor=$width;
$pdf->Image('../tmp/'.'B'.$of." ".substr($cajapalet , 0 ,1)." ".trim($articulo)."-".($ns+$etiq)." ".$cantidad." ".$numserie_max.'.png',  114*$factorx+$despx,$alto - $height/4 - 0 *$factory+$despy,$imagefactor/3, 20);//7*$factorx*$imagefactor*1
*/

/*
$of2 = "";
  QRcode::png($of."|".substr($cajapalet , 0 ,1)."|".trim($articulo)."|".($ns+$etiq)."|".$cantidad."|".$numserie_max, '../tmp/BQR'.$of.'_'.$articulo.'_'.substr($cajapalet , 0 ,1).'_'.($ns+$etiq).'.png'); 

    list($width, $height, $type, $attr) = getimagesize('../tmp/BQR'.$of.'_'.$articulo.'_'.substr($cajapalet , 0 ,1).'_'.($ns+$etiq).'.png');
	
$imagefactor=$width/$height;
    
 //$pdf->Image('../tmp/'.$of2.'.png', 182*$factorx+$despx,   0*$factory+$despy+1,15*$factorx*$imagefactor);
 
  //$pdf->Image('../tmp/'.$of2.'.png', 175.5*$factorx+$despx,   18*$factory+$despy+1,24.5*$factorx*$imagefactor);

  $pdf->Image('../tmp/BQR'.$of.'_'.$articulo.'_'.substr($cajapalet , 0 ,1).'_'.($ns+$etiq).'.png', 178.5*$factorx+$despx, $alto - $height/2 -  0*$factory+$despy+1, 21*$factorx*$imagefactor);*/
//$pdf->Image('../tmp/B'.$of.'_'.$articulo.'_'.substr($cajapalet , 0 ,1).'_'.($ns+$etiq).'.png',   114*$factorx+$despx, $alto - $height/4 -0 *$factory+$despy,$imagefactor/3 , 20);   
 //file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO  barcode 5 \n", FILE_APPEND );
/*
$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo 
$d1->getBarcodePNGPath("V".$of, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."V".$of.'.png');
$imagefactor=$width;
$pdf->Image('../tmp/'.'V'.$of.'.png',  114*$factorx+$despx, 0*$factory+$despy,$imagefactor/3 , 20);
//$pdf->Text( 20*$factorx+$despx, 250 *$factory+$despy, 20,'../tmp/'.$referencia.'.png');


*/

if ($tipo=="CAJA") $tipo2="CJ";
if ($tipo=="PALET") $tipo2="PA";

//$pdf->Text( 200*$factorx+$despx, 11*$factory+$despy , 135 * $tamañofuente , $tipo2);

//$pdf->setColor(0,0 ,0);

}



//$content = $pdf->Output();

   
////file_put_contents("/var/www/etiquetas/".$orden.$tipo.$pieza."-".$contador.".pdf",$content);











//file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." IMPRESO OFS formato ".$orden."|".substr($tipo, 0 ,1)."|".trim($pieza)."|".($ns+$etis)."|".$tiposubp."|".$fecha."|".$cantidad."\n", FILE_APPEND );	





// DE MOMENTO NO IMPRIMO


//if ($_GET["cantidad"]!=0)
//SSif (trim($posicion)!="MAQ01a") $pdf->ezStream(); 

















if ($tiposubp == "PP") {
    	$subpieza="N";
    
    
    
    
    
    
if ($tipo == "CAJA") {
/*$sql= "select ofnetic from pipeline/ordenfab where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);*/

$sql = "update pipeline/ordenfab  set ofnetic = ofnetic + 1 where ofndef = '$orden' and ofcart = '$pieza'";
//echo $sql;
//$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

//odbc_commit($cidpipeline);

//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." ACVUALIZADO OFNETIC \n", FILE_APPEND );


} else {
/*$sql= "select ofneti from pipeline/ordenfab where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    */
    
$sql = "update pipeline/ordenfab  set ofneti = ofneti + 1 where ofndef = '$orden' and ofcart = '$pieza'";
//$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

//odbc_commit($cidpipeline);   
}    
}
if ($tiposubp == "SP")  {
	$subpieza="S";
if ($tipo == "CAJA") {
/*$sql= "select ofsnetic from pipeline/orfabsub where ofsndef = '$of' and ofscart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    */
$sql = "update pipeline/orfabsub  set ofsnetic = ofsnetic + 1 where ofsndef = '$orden' and ofscart = '$pieza'";
//$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

//odbc_commit($cidpipeline);

//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." ACVUALIZADO OFNETIC SUBP \n", FILE_APPEND );

} else {
   /* $sql= "select ofsneti from pipeline/orfabsub where ofsndef = '$of' and ofscart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    */
$sql = "update pipeline/orfabsub  set ofsneti = ofsneti + 1 where ofsndef = '$orden' and ofscart = '$pieza'";  
//$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

//odbc_commit($cidpipeline);  
}       
    
}
	//file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." UPDATES ordenfab  \n", FILE_APPEND );	

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



//file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO ORDENFAB  ".$orden."|".substr($tipo, 0 ,1)."|".trim($pieza)."|".($ns+$etis)."|".$tiposubp."|".$fecha."|".$cantidad."\n", FILE_APPEND );	

//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." ACTUALIZO ORDENFAB  \n", FILE_APPEND );


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
//$result = odbc_exec($cidpipeline, $sql) or die(exit("Error en odbc_exec"));
//$row = odbc_fetch_row($result);
//$fecha_ant = odbc_result($result, 1);
//$hora_ant = odbc_result($result, 2);

if (is_null($fecha_ant) || trim($fecha_ant) =="" ) {
	$fecha_ant = date("Ymd");
	$hora_ant = date("H:i:s");	
	
	// OFFIRAL      OFFFRAL
	 
	 $sql = " SELECT OFFiRAL , OFHRiRAL   FROM ORDENFAB  where ofndef = '$of'  and ofopmaq = '$puesto' fetch first row only ";//and ofcart = '$articulo' 
//$result = odbc_exec($cidpipeline, $sql) or die(exit("Error en odbc_exec"));
//$row = odbc_fetch_row($result);
//$fecha_ant = odbc_result($result, 1);
//$hora_ant = odbc_result($result, 2);
}
	
	$horas = "00:00:00"; //calcular
date_default_timezone_set("UTC"); 
	$horas =  date("H:i:s" , (strtotime($fecha." ".$hora) - strtotime($fecha_ant." ".$hora_ant)));

if ($tiposubp == "PP") {
    	$subpieza="N";
    
    
    
    
    
    


/*$sql= "select ofneti from pipeline/ordenfab where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    */
    
$sql = "update pipeline/ordenfab  set ofcanral= ofcanral + $ok , ofcanpdt = ofcanpdt - $ok  where ofndef = '$of' and ofcart = '$articulo'";
//$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

//odbc_commit($cidpipeline);   

//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." ACVUALIZADO OF CANTRAL \n", FILE_APPEND );


//if ($puesto=='MAQ00') {


$sql = "update pipeline/ordenfab  set  oftlr =  (( 1 / ofinvteo ) * (ofcanpdt ))/ofincavp + oftprep  , oftoper = (( 1 / ofinvteo ) * (ofcanpdt )  )/ofincavp where ofndef = '$of' and ofcart = '$articulo'"; //* ( 1 + ( ofopmerm / 100))         * ( 1 + ( ofopmerm / 100))
//$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

//odbc_commit($cidpipeline); 

//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." ACVUALIZADO TLR OF \n", FILE_APPEND );


//}
$sql = "update pipeline/ordenfab  set  ofcanpdt = 0 , oftlr = 0 , oftoper = 0 where ofndef = '$of' and ofcart = '$articulo' and ofcanpdt <= 0";
//$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

//odbc_commit($cidpipeline); 
   
   //file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." ACVUALIZADO CANT<0 \n", FILE_APPEND );

}
if ($tiposubp == "SP")  {
	$subpieza="S";


/*$sql= "select ofsnetic from pipeline/orfabsub where ofsndef = '$of' and ofscart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    */
$sql = "update pipeline/orfabsub  set OFSCral = OFSCral  + $ok where ofsndef = '$of' and ofscart = '$articulo'";
//$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 

//odbc_commit($cidpipeline);

				//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." ACVUALIZADO OFCANRAL SUBP \n", FILE_APPEND );

}				


//file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO ordenfab calculos ".$orden."|".substr($tipo, 0 ,1)."|".trim($pieza)."|".($ns+$etis)."|".$tiposubp."|".$fecha."|".$cantidad." \n", FILE_APPEND );	

//CALCULO HORA INICIO 20180522
$fecha = date("Ymd");
$fechai = $fecha;
$hora = date("H:i:s");

//if (trim($posicion)=="MAQ00") echo $hora."\n<br>";

/*
$sqlsp = "select   ofcart, 'N'  from pipeline/ordenfab , pipeline/mstmlde where  ofndef = '$of' and ofinmde = mldcod union select   ofscart, 'S' from ordenfab , orfabsub , mstmlde where ofsndef = '$of' and ofndef = ofsndef  and ofinmde = mldcod  order by 1";//

echo $sqlsp;
$resultmainsp=odbc_exec($cidpipeline,$sqlsp) or die(exit("Error en odbc_exec")); 


//echo odbc_num_rows($resultmain)."<br>";
$subpiezas = "N";
if ( odbc_num_rows($resultmainsp)>=2)  $subpiezas = "S";*/


//$datos =  @file_get_contents("/var/www/MRPII/maquina/OF".$posicion.".txt");
/*SS
while (!strpos($datos,"|")) {
	$datos =  @file_get_contents("/var/www/MRPII/maquina/OF".$posicion.".txt");
}
//echo $datos;
$datos_file= explode("|",$datos);
//$orden = $datos_file[0];
*/
//$contador = substr(@file_get_contents('/var/www/MRPII/maquina/'.$posicion.'.txt', true),10,10);
#$contador1= $subdatos[1];
//$subdatos=explode("|",$datos);
//$contador1= $subdatos[1];

/*

if(strpos($datos, "|")>0 ) {

$datos2= $subdatos[0]."|".substr("0000000000".$contador, -10)."|".$subdatos[2]."|".$subdatos[3]."|".$subdatos[4]."|".$subdatos[5]."|".$subdatos[6]."|".$subdatos[7]."|".$subdatos[8]."|".$subdatos[9]."|".$subdatos[10]."|".$subdatos[11]."|".$subdatos[12]."|".$subdatos[13]."|".$subdatos[14]."|".$subdatos[15]."|".$subdatos[16];


//if (trim($posicion)=="MAQ00") echo $datos."<br>";
    
  //  if (trim($posicion)=="MAQ00") echo "OF ".$subdatos[0]."<br>";
     if (trim($subdatos[9])==trim($articulo)) {
    //if (trim($posicion)=="MAQ00") echo "PP ".$subdatos[9]." ".$subdatos[12]."<br>";
    
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
   // if (trim($posicion)=="MAQ00") echo "SP2 ".$subdatos[11]." ".$subdatos[14]."<br>";
    
    $cavidades = $subdatos[14];
    $subpieza = "S"; 
    $subpiezas = "S";
    
    }

if ((trim($subdatos[11])!=trim($articulo))&&(trim($subdatos[10])!=trim($articulo))&&(trim($subdatos[9])!=trim($articulo))) {
   // if (trim($posicion)=="MAQ00") echo "SP2 ".$subdatos[11]." ".$subdatos[14]."<br>";
    
    $cavidades = $subdatos[12];
    $subpieza = "S"; 
    $subpiezas = "S";
    $tiposubp = "SP";
    
    }

}

*/
/*		
if (substr($hora,0,2)*1<6) $turno = 3;
if (substr($hora,0,2)*1>=6) $turno = 1;
if (substr($hora,0,2)*1>=14) $turno = 2;
if (substr($hora,0,2)*1>=22) $turno = 3;*/



	{	

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
	
}
	
	
	
//	if (trim($posicion)=="MAQ00") echo $horaf." ".$horai."\n<br>";
	//$horas =  date("H:i:s" , (strtotime($fecha." ".$horaf) - strtotime($fecha_ant." ".$hora_ant)));
	
		if (trim($posicion)=="MAQ00") echo $fecha_ant." ".$hora_ant." -- ".$fechai." ".$horai."\n<br>";
	
	if (strtotime($fecha_ant." ".$hora_ant) <strtotime($fechai." ".$horai)) {
		$fecha_ant =$fechai;
		$hora_ant = $horai;
	}
//	if (trim($posicion)=="MAQ00") echo $fecha_ant." ".$hora_ant." -- ".$fecha." ".$hora."\n<br>";
	date_default_timezone_set("UTC"); 
	$horas =  date("H:i:s" , (strtotime($fecha." ".$hora) - strtotime($fecha_ant." ".$hora_ant))) ;
//	if (trim($posicion)=="MAQ00") echo date("H:i:s" , ((strtotime($fecha." ".$hora) - strtotime($fecha_ant." ".$hora_ant))))."\n<br>";
	
if (($fecha_ant<$fecha)&&($horai=="23:59:59")) $horai = "00:00:00";

date_default_timezone_set("Europe/Lisbon"); 

$datos = $hora_entrada."-".date("Ymd H:i:s")." ".$tipo2." ".$fecha_ant." ".$hora_ant." a ".$fecha." ".$hora." ".($ns + $etiq - 1)."\n";
$conta_eti = ($ns + $etiq - 1);
//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log', $datos , FILE_APPEND );

	
//$sqlinsert = " INSERT INTO SEGOFS ( SEGCONTA, SEGCONT, SEGNSUB, SEGCART, SEGFECHA, SEGHORA, SEGTURNO, SEGCOPE, SEGTIPO, SEGMAQ, SEGMDE, SEGMDEV, SEGCAV, SEGUTL1, SEGUTL2, SEGNOPE, SEGCANT, SEGRCHZ, SEGCANZ, SEGFIN, SEGSUBP, SEGESPZ, SEGPARO, SEGOPAUX, SEGNDEF, SEGNPLA, SEGUSUR, SEGFREG, SEGFTRA, SEGHTRA, SEGHRMAQ, SEGHRHOM, SEGHRINI, SEGHRFIN, SEGFCINI, SEGFCFIN, SEGNVING, SEGCORR, SEGFEST, SEGEQUIP, SEGBARRA ) VALUES ( coalesce((select max(segconta)+1 from segofs) , 1) , $ofcont, $ofsub, '".$articulo."', $fechap, '".$hora."', $turno, '".$operario."', 'P', '$puesto', '$molde', '$version', $cavidades , '', '', 0, $ok, $defecto, $nok , 'N' , '$subpiezas', '$subpieza', 0, 'N', '$of', 0, '".$operario."', $fecha, $fechap, '".$hora."', '$horas', '$horas', '".$hora_ant."',  '".$hora."', $fecha_ant, $fecha, '', 'N', 'N', 'X', '0' ) " ;
//if (trim($posicion)=="MAQ00")  echo $sqlinsert."<br>\n";
//$resultinsert=odbc_exec($cidpipeline,$sqlinsert) or die(exit("Error en odbc_exec")); 

			//	odbc_commit($cidpipeline);
				
			//	odbc_free_result($resultinsert);	
				
		//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." INSERTO SEGOFS \n", FILE_APPEND );
	
	
}
	
        $referencia = $pieza;        
		$cantidad= $ok + $nok;
		//$orden = $barra;
		$fechaqs = $fecha;
		$anyo = substr($fechaqs,2,2);
		$sqlof="select arnbr from almar where arcdg = '".$referencia."'";
		
		$docum ="MSEP". substr($fechaqs, 2, 6);
		$tipomov = 30;
		
		//$resultof=odbc_exec($cidpipeline,$sqlof) or die(exit("Error en odbc_exec")); 

	//	odbc_fetch_row($resultof);
		//	$descripcion = odbc_result($resultof,"arnbr");		
		//odbc_free_result($resultof);

	//	$almacen = $barraalm;
		
		
		
		//file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO SEG OFS \n", FILE_APPEND );	
		
 
$factorstk = 1;

$anyo = substr($fechaqs, 2, 2);

//echo $docum;

if ($movimiento_en_qs!=0) {
$sigtecin = 0;
/*
$sqlmov = "select hccin from almhc where hcdoc = '" . $docum . "' and hcfch = " . $fechaqs . " and hcalm = " . $almacen . " ";
$resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));


odbc_fetch_row($resultmov);
$sigtecin = odbc_result($resultmov, 1);
odbc_free_result($resultmov);*/

$sqlmov = "select hccin , coalesce( (select max(hdnln) from almhd where hdcin = hccin) , 0 ) from almhc where hcdoc = '".$docum."' and hcfch = ".$fechaqs." and hcalm = ".$almacen." order by hccin desc";
		
                    //    if (trim($posicion)=="MAQ00") echo $sqlmov;
                        $resultmov=odbc_exec($cidpipeline,$sqlmov) or die(exit("Error en odbc_exec")); 

		
			//	odbc_fetch_row($resultmov);
			//	$sigtecin = odbc_result($resultmov,1);	
               //                 $lineas = odbc_result($resultmov,2);	

//echo "SS".$sigtecin;
//echo PHP_EOL  .$sigtecin;

if (($sigtecin == 0) || (is_null($sigtecin)) || ($lineas > 990)) {

    //ULTIMO NUMERO DE MOVIMIENTO y lo incremnto en 2, uno xa entrada y otro xa salida
    $sqlmov = "SELECT ALMCA.CANUM FROM ALMCA  WHERE CATIP = 10";
   // $resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
   // odbc_fetch_row($resultmov);
  //  $sigtecin = odbc_result($resultmov, 1) + 1;
    $ultcin = $sigtecin + 1;
  //  odbc_free_result($resultmov);



    //actualizo la tabla de control de movimientos
    $sqlmov = "UPDATE ALMCA   SET CANUM = " . $ultcin . ", CAALF = ''  WHERE CATIP = 10 ";
    
  //  $resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
   // odbc_commit($cidpipeline);
   // odbc_free_result($resultmov);
	
	//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." ACVUALIZADO ALMCA \n", FILE_APPEND );

    //echo PHP_EOL . $sigtecin. " ".$ultcin;
    //odbc_free_result($resultmov);
    //CREO CABECERA MOV ALMACEN
    //echo PHP_EOL . $sigtecin." ".$anyo." ".$docum;
    $sqlmov = "INSERT INTO ALMHC ( HCCIN, HCAÑO, HCDOC,HCFCH,HCTMV, HCALM,HCCCN,   HCBRU,  HCDT1 ,HCDT2 ,  HCZON, HCAG1,HCAG2 , HCPOR, HCTPO, HCMC1, HCMC2 ,HCGTS,  HCCIN2 , HCAÑO2 ,HCDPP,HCREC )  VALUES ( " . $sigtecin . " ,  " . $anyo . " , '" . $docum . "' ,  " . $fechaqs . " ,   " . $tipomov . " ,  " . $almacen . " ,   0 , 0 , 0 , 0 , 0 , 0 , 0 , 0, '0' , 0 , 0 , 0 , 0 , 0 , 0 , 0 )  ";
   // if (trim($posicion)=="MAQ00") echo $sqlmov;
    
  //  $resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
   // odbc_commit($cidpipeline);
   // odbc_free_result($resultmov);
    //fwrite($fp2, $sqlmov . "\n");
	//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." NUEVO MOVIMIENTO $docum \n", FILE_APPEND );

}
/*
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
$referencia_mov = $pieza;
if ($cstock == 0) {
    //Inserto
    $stock = ($cantidad * $factorstk);
    //echo "inserto linea stock ".$referencia." ".$almacen." ".$stock;
    $sqlmov = "INSERT INTO ALMST ( START , STALM ,  STMIN ,  STMAX , STPAS , STEST, STALT , STREA , STRES , STPTE , STREA2 , STRES2 , STPTE2 ,  STPMC)   VALUES ( '" . $referencia . "' , " . $almacen . " , 0  , 0 ,'','','', " . $stock . " , 0 , 0 , 0 , 0 , 0 , 0 ) ";
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
*/

//ULTIMA LINEA MOVIMIENTO
$sqlmov = "select max(hdnln) from almhd where hdcin = " . $sigtecin . " "; //and 'HDAÃÿÂÿO' = ".$anyo." ";
//$resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
//odbc_fetch_row($resultmov);
//$ultimalinea = odbc_result($resultmov, 1);

if (is_null($ultimalinea)) {
    $ultimalinea = 1;
} else {
    $ultimalinea = $ultimalinea + 1;
}

//inserto linea movimiento
$sqlmov = "INSERT INTO ALMHD " /*( HDCIN, HDAÃÿO, HDFCH, HDNLN,HDART, hdnbr , HDCAN, HDUDM,HDCAN2,HDUDM2,  HDPRE,HDPMC,  HDPREE,HDDTO, HDDTO2,HDDTO3, HDDTO4, HDDTO5,HDCM1, HDCM2,HDIVA,HDREQ, HDCE1, HDCE2,HDCE3, HDCE4, HDPTD, HDPTD2, HDPTC1,HDPTC2,  HDCMN1,   HDCMN2 , HDTMV , HDALM,HDSUF , HDFSTK)  */." VALUES ( " . $sigtecin . ",  " . $anyo . ",  " . $fechaqs . ", " . $ultimalinea . ", 0 , '" . $referencia . "', '" . $descripcion . "', " . $cantidad . ",  4,    0, 0,  0,  0,   0,   0,   0,  0,    0,  0,     0,   0,   0,   0,  0,  0,  0,  0, 0 , 0 , 0 , 0 , 0, 0,  0,    0,    0,  0,  0, 0,   0 , 0, 0,  0,  0,   0,   0,   0,  0,    0,  0, $factorstk , 0 , " . $almacen . ", $tipomov , 0 )  ";
//if (trim($posicion)=="MAQ00") echo "<br>".PHP_EOL . $sqlmov. PHP_EOL ;
//$resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
//odbc_commit($cidpipeline);
//odbc_free_result($resultmov);
//fwrite($fp2, $sqlmov . "\n");
//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." NUEVA LINEA MOVIMIENTO \n", FILE_APPEND );


//inserto la mochila
$sqlmov = "INSERT INTO ALMQA"./* (HDCIN, HDAÃÿÂÿO, HDNLN, HDART, QAMLD )*/" VALUES (" . $sigtecin . ",  " . $anyo . ",   " . $ultimalinea . ",  0 ,    '" . $referencia . "',  '" . $orden . "' ) ";
//if (trim($posicion)=="MAQ00") echo $sqlmov;
//$resultmov = odbc_exec($cidpipeline, $sqlmov) or die(exit("Error en odbc_exec"));
//odbc_commit($cidpipeline);
//odbc_free_result($resultmov);
//fwrite($fp2, $sqlmov . "\n");

//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." NUEVA LINEA MOCHILA \n", FILE_APPEND );









//file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." ACTUALIZADO MOVS 6 gen \n", FILE_APPEND );	






}
                    




















		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	
	
	
	
	
	
	
if ($tipo == "PALET") $tipoeti = "PA";

{
    

    
	
//GENERO ETIQUETA KH U UBICO EN ALMACEN MAQ	
$fecha = date("Ymd");
$hora = date("H:i:s");
//$usuario = strtoupper(trim( $_GET["usr"]));
$pieza = trim($pieza);
$sql = "INSERT INTO pipeline/QRETI values ( '$orden' , '$tipoeti', ".($ns + 1)."  , '' , 0 , '$pieza' , $cantidad , 4 , 'S' , '', $almacen , $fecha , '$hora' , '$operarios' , '' , '' ,  ".($numserie_max)."  , 0 , 0 , '', '' )";
//$result=odbc_exec($cidpipeline,$sql) or die(exit("Error en odbc_exec")); 


if ($improving==1) {
    
	if ($almacen == 0) $almacen = 100;
	
    $qr = $orden."|".substr($tipoeti , 0 ,1)."|".trim($pieza)."|".($ns + 1)."||".$fecha."|".$cantidad."|".($numserie_max); 
    
    $sqlins = "INSERT INTO [dbo].[gwEntradasQRMatrival] ( [QR] , [estado] , [albaran] , [almacen] ) VALUES ( '$qr' , '' , '' ,  $almacen ) ";

//if ($improving == 1) $resultins=odbc_exec($cidimp,$sqlins) or die(exit('Error en odbc_exec')); 
    
      
    
}
    
}

}


	
	
	
	
}




}








//IMPRIMO CUANDO ESTA TODO HECHO

$contenido_pdf = $pdf->output(); 
$pdf->ezStream(); 
	//file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." STREAMING \n", FILE_APPEND );	
	   //file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." STREAM PDF ".substr($contenido_pdf , 0 , 10)."  \n", FILE_APPEND );


?>
