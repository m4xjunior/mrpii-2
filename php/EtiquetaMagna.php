<?php

/*include('../pdf/class.ezpdf.php');
include('../pdf/class.backgroundpdf.php'); 
include('../phpqrcode/qrlib.php'); 
include_once '../phpbarcode/barcodes.php';
setlocale(LC_CTYPE, 'en_US');*/

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





$orden = $_GET["orden"];
$puesto =  $_GET["posicion"];
$empresa  = $_GET["empresa"];
$articulo  =  $_GET["articulo"];
$codigocorto=$_GET["cc"];
$prefijo  =$_GET["prefijo"];
//111862179901PV4B-K61630-D
$cantidad = 1;


$ofb = $orden;
/*
$sql = "select    descripcionarticulo  from  articulos where codigoarticulo =  '$pieza' ";
$resultmain=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 



 
$nombre =  substr( odbc_result($resultmain, 1) , 0 , 42);
*/
//echo $nombre;

$operarios = "";
$operario="";

  
  $pdf = new fPDF('L' , 'pt' , 'A4' );//'A3', 'landscape', 'image',  array('img' => $fondo,'width' => 600,'height' => 850,'xpos' => -20,'ypos' => -20) );  
$pdf->SetFont('Helvetica' , 'B' , 16); 
$pdf->AddPage();
/* $sql= "select o.CodigoArticulo  as CodigoArticulo , o.formula , SerieFabricacion , FechaInicioPrevista , FechaFinalReal , UnidadesAFabricar , UnidadesFabricadas 
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

*/



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










	
	//ETIQUETA CLIENTE
	
//if(trim($posicion)=="MAQ01") echo "ETIQUETA FINAL";

$of = $orden;

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
$descripcion = "LUMBAR PROTECTOR MAP";// trim(odbc_result($result,"arnbr"));
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





//$sqlS = "update pipeline/etodt  set odtnums = $numserie_max  where odtcdg in( select arcdg from pipeline/almar where arce3 = $numcliente) or odtcdg = '$articulo'";
//echo $sql;
//$resultS=odbc_exec($cidpipeline,$sqlS) or die(exit("Error en odbc_exec")); 
	//file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." UPDATE NS $posicion $articulo SS \n", FILE_APPEND );	
//odbc_commit($cidpipeline);

//file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." ACVUALIZADO ODTNUMS \n", FILE_APPEND );


//if (is_null($etiquetas))
	$etiquetas =1;





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
  /*
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
   
*/
/*

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
$pdf->Text( 111*$factorx+$despx, $alto -10*$factory+$despy,  "(16) BATCH NO. (H)");*/

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


//$operarios = "2533 2532";
/*
$pdf->Text( 132*$factorx +$despx, $alto -4*$factory+$despy,  $operarios);
$pdf->Text( 111*$factorx +$despx, $alto -4*$factory+$despy,  date("H:i:s"));



$preffix = "";
if ($numcliente == 568) $preffix= "Y";
$pdf->Text( 27*$factorx+$despx, $alto -9 *$factory+$despy, 666);
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

*/


 $pdf->Image('../../images/Ford.png', 90*$factorx+$despx,  20*$factory, 170);






$of2 = "";
  QRcode::png($prefijo.$codigocorto, '../tmp/magna'.$prefijo.$codigocorto.'.png'); 

    list($width, $height, $type, $attr) = getimagesize('../tmp/magna'.$prefijo.$codigocorto.'.png');
	
$imagefactor=$width/$height;
    
 //$pdf->Image('../tmp/'.$of2.'.png', 182*$factorx+$despx,   0*$factory+$despy+1,15*$factorx*$imagefactor);
 
  //$pdf->Image('../tmp/'.$of2.'.png', 175.5*$factorx+$despx,   18*$factory+$despy+1,24.5*$factorx*$imagefactor);

  $pdf->Image('../tmp/magna'.$prefijo.$codigocorto.'.png', 150*$factorx+$despx, 20*$factory, 130*$factorx*$imagefactor);




$d2=new DNS2DBarcode();
$d2->save_path="../tmp/";

$etiqueta2d = "GRUPO KH $of $referencia $fecha $hora $operarios";

$d2->getBarcodePNGPath($etiqueta2d, 'datamatrix',5,5, 'black');
list($width, $height, $type, $attr) = getimagesize('../tmp/'.$etiqueta2d.'.png');
$imagefactor=$width/$height;
$pdf->Image('../tmp/'.$etiqueta2d.'.png',  10*$factorx, 10*$factory,50*$factorx*$imagefactor);







	//file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." UPDATES ordenfab  \n", FILE_APPEND );	




//DATOS

$pdf->SetFont('Helvetica' , 'B' , 40* $tamanofuente); 
$pdf->Text( 20*$factorx+$despx,80 *$factory, "FORD CX482");
$pdf->Text( 20*$factorx+$despx, 95 *$factory, "SUPPLIER CODE CKPAA");//."|".substr($cajapalet,0,1)."|".($ns+$etiq));

//$pdf->SetFont('Helvetica' , 'B' , 16* $tamanofuente); 
//$pdf->Text( 12*$factorx+$despx, 137*$factory+$despy, 8 * $tamanofuente  , $cliente);
$pdf->Text( 20*$factorx+$despx, 110*$factory  , $codigocorto);

$pdf->Text( 20*$factorx+$despx, 125 *$factory,   "LUMBAR PROTECTOR MAP");

$pdf->SetFont('Helvetica' , 'B' , 30* $tamanofuente); 
$pdf->Text( 155*$factorx+$despx, 20 *$factory,  "MADE IN SPAIN  ".date("d/m/y H:i"));








//IMPRIMO CUANDO ESTA TODO HECHO

$contenido_pdf = $pdf->output(); 
$pdf->ezStream(); 
	//file_put_contents('/var/www/MRPII/ofs/LOG_PRN_'.$posicion.$tipo.'.log', date("Ymd H:i:s")." STREAMING \n", FILE_APPEND );	
	   //file_put_contents('/var/www/MRPII/ofs/LOG_'.$posicion.'_'.$orden.'-'.$articulo.'.log',  date("Ymd H:i:s")." STREAM PDF ".substr($contenido_pdf , 0 , 10)."  \n", FILE_APPEND );


?>
