<?php


$usuario = strtoupper(trim( $_GET["usr"]));

if ($usuario=="QSWEB") {

session_start();

$usuario = trim(strtoupper($_SESSION["valid_user"]));

session_write_close();
}
/*if (!isset($_SESSION["valid_user"]))
        {
        // User not logged in, redirect to login page
        
        $_SESSION["preloginurl"] = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        //echo $_SESSION["preloginurl"];
        //echo '<script>alert("NO LOGUEADO");</script>';
        //echo '<script>alert('.$_SESSION["preloginurl"].');</script>';
        //include("login.php");
        Header("Location:index.html");
        //echo '<script>alert("NO LOGUEADO");</script>';
        //Header("Location: index.html");
        }*/



//CONEXION
//session_start();
$dsn="odbc_pipeline_400"; 
$usuario2="conexion"; 
$password="conexion"; 
$cid=odbc_connect($dsn,$usuario2,$password); 
if (!$cid){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
}     


$improving = 0;
/*$dsn="IMPROVING"; 
$usuario2="matrival"; 
$password="m2.2019!"; 
try {
    $cidimp=odbc_connect($dsn,$usuario2,$password); 
} 

catch (Exception $e){
   
  //   echo 'ExcepciÃ³n capturada: ',  $e->getMessage(), "\n";
}
if (!$cidimp){ 
   // exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
  // echo "ERROR!!!";
   $improving = 0;
}     else {

  //  echo "CONECTADO!!!";
    $improving = 1;
}



  $fp = @fSockOpen( '85.214.64.146' , 51433 , $errno, $errstr, 2); 
  
  if ($fp==true){
    //  echo "ON!!!";
$cidimp=odbc_connect($dsn,$usuario2,$password); 
if (!$cidimp){ 
   // exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
 //  echo "ERROR!!!";
   $improving = 0;
}     else {

  //  echo "CONECTADO!!!";
    $improving = 1;
}
}else {
   // echo "OFF!!!";
}

*/




$preffix = "";

include_once '../phpbarcode/barcodes.php';
include('../pdf/class.ezpdf.php');
//include('../pdf/class.backgroundpdf.php'); 
include('../phpqrcode/qrlib.php'); 

$para = 0;

$articulo = $_GET["referencia"];
$articulo_orig = $articulo;
$farticulo = $articulo;
$asn = $_GET["asn"];
$cantidad_total = $_GET["cantidad"];
$tipo = $_GET["size"];
$muelle = $_GET["muelle"];
$fecha =  $_GET["fecha"];
if (isset( $_GET["para"])) $para =  $_GET["para"];
if (isset( $_GET["cpara"])) $para =  $_GET["cpara"];
$of = $_GET["of"];
$cajapalet = trim(str_replace("%20","",$_GET["tipo"]));
if ($cajapalet == "PALET") {
	$masterlabel = "MASTER LABEL";
	} else {
	$masterlabel = "";
}
$copias= $_GET["copias"];

//if ($para=="" ||$para = 0) $para = 1;




if ($copias ==0) $copias=1;

$copias = 1;

//comprobar si se son de maquina beniparrell



$sql = "select ofopmaq , mqpstalm , mqpstobs , mqpstpro from ordenfab, mstmqpst  where ofndef = '$of' and ofopmaq = mqpstcod";//and opeffin = '00:00:00'

//echo $sqlope;
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$puesto = trim(odbc_result($result,1)) ;
$almacen = trim(odbc_result($result,2)) ;
$obsoleta = trim(odbc_result($result,3)) ;
$proceso = trim(odbc_result($result,4)) ;

//echo "<script>alert($almacen +' ' + $orden );</script>";

if (((strtoupper( $usuario)!="VHERNANDEZ") && (strtoupper( $usuario)!="SJUAN") && (strtoupper( $usuario)!="SANTOS")  && (strtoupper( $usuario)!="DANIELIN")   && (strtoupper( $usuario)!="DLLUESMA")  ) && ((($almacen==100)  || ($obsoleta=='S') || ($proceso!=2)) && (substr($of , 0 ,1) =="I"))) {
    echo ((strtoupper( $usuario)!="VHERNANDEZ") || (($almacen==100) && (substr($of , 0 ,1) =="I")))."<br>" ;
    echo "*".strtoupper( $usuario)."* ".$almacen." ".substr($of , 0 ,1)."<br>";
   echo "Almacen: ".$almacen."<br>";
   echo "<br>No esta permitido sacar etiquetas de OFs de maquina de inyeccion de la planta de Beniparrell ni de Maquinas Obsoletas/Ficticias. Deben sacarse las etiquetas de la maquina y/o corregir las estructuras.<br>"; 
    
    
} else {



	
$cambio_ref = "N";
/*
$hash = explode( "&ref=" , "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);

//echo "<BR>".$hash[0];
$ref = 0; 

for ($aux = 0; $aux < strlen(trim($hash[0]));$aux++) {
    
    $ref = $ref + ord( substr($hash[0],$aux,1 ));
    //echo "<BR>". substr($hash[0],$aux,1).".". ord( substr($hash[0],$aux,1 ))." ".$ref;
}
//echo "<BR>".$hash[1]." ". strlen($hash[0]);
//echo "<BR>".$ref;
*/

$hash = explode( "&ref=" , "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
$strcadena = "";
//echo "<BR>".$hash[0];
$ref = 0; 
for ($aux = 0; $aux < strlen(trim($hash[0]));$aux++) {
    
    $ref = $ref + ord( substr($hash[0],$aux,1 ));
    //echo "<BR>".$aux." - ". substr($hash[0],$aux,1).".". ord( substr($hash[0],$aux,1 ))." ".$ref;
    
  //  $strcadena = $strcadena." ".ord( substr($hash[0],$aux,1 ));
}
//echo "<BR>".$hash[1]." ". strlen($hash[0]);
//echo "<BR>".$ref;
//echo "<BR>";

$ref_hash = intval($ref / 100) + ($ref - intval($ref / 100) * 100) + $ref + ($ref - intval($ref / 100) * 10000);


//echo "<br>".intval($ref / 100) ." ".($ref - intval($ref / 100) * 100)." ".$ref." ".($ref - intval($ref / 100) * 10000)."<br>";
$refer_hash = $_GET["ref"];

if ( ($refer_hash == $ref_hash) || (strtoupper( $usuario)=="xSJUAN")  || (strtoupper( $usuario)=="xSANTOS") || $refer_hash = -1 ) {


//Borro temporales etiquetas

$files = array();
$index = array();
//$yesterday = strtotime('yesterday');
/*
if ($handle = opendir('/var/www/QSweb/tmp/')) {

   clearstatcache();
    while (false !== ($file = readdir($handle))) {

        if ($file != "." && $file != "..") {
		//$encoding = mb_detect_encoding($file, 'ISO-8859-1, UTF-8, ASCII');
		//echo $encoding;
            $files[] = $file;
            //$index[] = filemtime( utf8_decode('/var/www/MRPII/tmp'.$file ));
			//echo date("H, d M",strtotime(filemtime('/var/www/MRPII/tmp' . '/' . $file)));
			@unlink('/var/www/QSweb/tmp/'.$file);
        }
    }
    closedir($handle);
}	*/
	
	
	
	

//ETIQUETA A5 o A6
//$tipo = ;



//$almacen = 100;

$tiposubp = "";

if (($para==0) ||($para=="")) {
if ($cajapalet=="CAJA") {
$sql="select mofpara from pipeline/matorfab where mofndef = '$of' and mofeti = 2";
} else {
    $sql="select mofpara from pipeline/matorfab where mofndef = '$of'  and mofeti = 1";
}
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$para = odbc_result($result,"mofpara");
$cantidad = $para;
}

if ((strtoupper( $usuario)=="SJUAN")) echo $cantidad;
$sql="select  arrdp, arce1 from almar where arcdg = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
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
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

if (odbc_result($result,1) == 1) {
   $tiposubp = "PP";


//echo "PP";
//$articulo = "610BRRA037";

//echo $articulo." ".$farticulo;

//echo "select odtpiez,odtcan,odtnums,odtpnet,odtpbru,odtprv,odtcja,odta1,odtmu,odtklt from pipeline\etodt where odtcdg = '".$articulo."'";
//if(trim( ordenfab_ofinmdev )<>"",ordenfab_ofinmde + "/"+ ordenfab_ofinmdev + if(trim( ordenfab_ofniving )="","","/"+ trim(ordenfab_ofniving )),trim(ordenfab_ofinmde) + if(trim( ordenfab_ofniving )="","","/"+ trim(ordenfab_ofniving )))
$sql="select arcdg , arrdp , odtpiez,odrdc,odtcan,odtnums,odtpnet,odtpbru,odtprv,odtcja,odta1,odta2, odta3 , odtmu, arnbr,odtklt,odta1 , arce3 , ofinmdev , ofinmde , ofniving , arce1 , ofalm from pipeline/etodt, pipeline/almar , pipeline/ordenfab
 where arcdg = odtcdg and (odtcdg = '".$articulo."'  or odtcdg = '".$farticulo."' )and ofndef = '$of' and (ofcart  = '$articulo' or ofcart = '".$farticulo."') and (arcdg = '$articulo' or arcdg = '".$farticulo."')";



//echo "<br>HOLA".$sqlped;


//update numerio de serie



//update contador caja/palet




$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 


$referencia_cli =  str_replace(",","",rtrim(odbc_result($result,"odtpiez")));


if (trim($referencia_cli)=="") $referencia_cli =  str_replace(",","",rtrim(odbc_result($result,"arrdp")));



if (trim($referencia_cli)==trim($articulo)."MT2") $referencia_cli = $articulo;



$referencia =  str_replace(",","",rtrim(odbc_result($result,"arrdp")));
//if ($cantidad == 0) {
	$cantidad = $para; //odbc_result($result,"odtcan");
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
if (is_null($numcliente)) $numcliente =0;
if (($numcliente=="")) $numcliente = 0;
//echo "*".$numcliente."*";
$etiquetas = ceil($cantidad_total / $cantidad);
//$almacen = odbc_result($result,"ofalm");
if (is_null($etiquetas)) $etiquetas =0;


//NUMERO DE SERIE ODETTE 20170919

//$articulo = $_GET["referencia"];

/*
//update numerio de serie
$numcliente = $numcliente*1;

$sqlS = "select max(odtnums) from pipeline/etodt where odtcdg in (select  arcdg from pipeline/almar where arce3 = $numcliente)"; 
//arcdg from pipeline/almar where arce3 = $numcliente)                      )


$resultS=odbc_exec($cid,$sqlS) or die(exit("Error en odbc_exec")); 


$numserie_max =  odbc_result($resultS,1);
$serie = $numserie_max;
$serie_ini = $numserie_max;

if (is_null($numserie_max)) $numserie_max =0;
$numserie_max = $numserie_max + $etiquetas;

$sqlS = "update pipeline/etodt  set odtnums = $numserie_max  where odtcdg in( select arcdg from pipeline/almar where arce3 = $numcliente) or odtcdg = '$articulo'";
//echo $sql;
$resultS=odbc_exec($cid,$sqlS) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);

*/

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

if (trim($referencia_cli)==trim($articulo)."MT2") $referencia_cli = $articulo;

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

}
$sql = "select count(*) from pipeline/orfabsub  where ofsndef = '$of' and ofscart  = '$articulo'";

$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

//echo $sql;




if (odbc_result($result,1) == 1) {
        
$tiposubp = "SP";

//echo "SP";
//$articulo = "610BRRA037";

//echo "select odtpiez,odtcan,odtnums,odtpnet,odtpbru,odtprv,odtcja,odta1,odtmu,odtklt from pipeline\etodt where odtcdg = '".$articulo."'";
//if(trim( ordenfab_ofinmdev )<>"",ordenfab_ofinmde + "/"+ ordenfab_ofinmdev + if(trim( ordenfab_ofniving )="","","/"+ trim(ordenfab_ofniving )),trim(ordenfab_ofinmde) + if(trim( ordenfab_ofniving )="","","/"+ trim(ordenfab_ofniving )))
$sql="select arcdg , arrdp , odtpiez,odrdc,odtcan,odtnums,odtpnet,odtpbru,odtprv,odtcja,odta1,odta2, odta3 , odtmu, arnbr,odtklt,odta1 , arce3 , coalesce (( select ofinmdev from ordenfab where ofndef = ofsndef) , ''),  coalesce (( select ofinmde from ordenfab where ofndef = ofsndef) , ''),  coalesce (( select ofniving from ordenfab where ofndef = ofsndef) , '') , coalesce (( select ofalm from ordenfab where ofndef = ofsndef) , 100 ) as ofalm from pipeline/etodt, pipeline/almar , pipeline/orfabsub
 where arcdg = odtcdg and odtcdg = '".$articulo."' and ofsndef = '$of' and ofscart  = '$articulo' and ofscart = arcdg";



//echo "<br>HOLA".$sqlped;


//update numerio de serie



//update contador caja/palet








$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 



$referencia_cli =  str_replace(",","",rtrim(odbc_result($result,"odtpiez")));


if (trim($referencia_cli)=="") $referencia_cli =  str_replace(",","",rtrim(odbc_result($result,"arrdp")));



if (trim($referencia_cli)==trim($articulo)."MT2") $referencia_cli = $articulo;



$referencia =  str_replace(",","",rtrim(odbc_result($result,"arrdp")));




//$referencia_cli =  str_replace(",","",rtrim(odbc_result($result,"arrdp")));
//if (trim($referencia_cli)==trim($articulo)."MT2") $referencia_cli = $articulo;

//$referencia =  str_replace(",","",rtrim(odbc_result($result,"arrdp")));
//if ($cantidad == 0) {
	$cantidad = $para; //odbc_result($result,"odtcan");
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
	//$almacen = odbc_result($result,"ofalm");
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
$etiquetas = ceil($cantidad_total / $cantidad);

if (is_null($etiquetas)) $etiquetas =0;

$molde = trim(odbc_result($result,20));
$versionmde = trim(odbc_result($result,19));
$nivel = trim(odbc_result($result,21));

if ($nivel=="") { 
    if ($versionmde != "") $molde = $molde."/".$versionmde;
    $nivel = $molde;
}
}



//update numerio de serie
$numcliente = $numcliente*1;

$sqlS = "select max(odtnums) from pipeline/etodt where odtcdg in (select  arcdg from pipeline/almar where arce3 = $numcliente)"; 
//arcdg from pipeline/almar where arce3 = $numcliente)                      )


$resultS=odbc_exec($cid,$sqlS) or die(exit("Error en odbc_exec")); 


$numserie_max =  odbc_result($resultS,1);
$serie = $numserie_max;
$serie_ini = $numserie_max;

if (is_null($numserie_max)) $numserie_max =0;
$numserie_max = $numserie_max + $etiquetas;

$sqlS = "update pipeline/etodt  set odtnums = $numserie_max  where odtcdg in( select arcdg from pipeline/almar where arce3 = $numcliente) or odtcdg = '$articulo'";
//echo $sql;
$resultS=odbc_exec($cid,$sqlS) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);




//update numerio de serie
/*
$sql = "update pipeline/etodt  set odtnums = odtnums + $etiquetas where (odtcdg in( select arcdg from pipeline/almar where arce3 = $numcliente)) or odtcdg = '$articulo'";
//echo $sql;
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);*/
//update contador caja/palet



$ns=0;
//echo $ns;


if ($tiposubp == "PP") {
    
   // echo "PP";
   
   
//echo $articulo."<br>";
//echo $articulo_orig."<br>";
//echo $of."<br>";
      
if ($cajapalet == "CAJA") {
$sql= "select ofnetic from pipeline/ordenfab where ofndef = '$of' and (ofcart like '".trim($articulo)."%' OR ofcart like '".trim($farticulo)."%' OR ofcart like '".trim($articulo_orig)."%' )";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);
//echo $sql;
/*
$sql = "update pipeline/ordenfab  set ofnetic = ofnetic + $etiquetas where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);*/
} else {
$sql= "select ofneti from pipeline/ordenfab where ofndef = '$of'  and (ofcart like '".trim($articulo)."%' OR ofcart like  '".trim($farticulo)."%' OR ofcart like '".trim($articulo_orig)."%' )";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    
 /*   
$sql = "update pipeline/ordenfab  set ofneti = ofneti + $etiquetas where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);   */
}    
}
if ($tiposubp == "SP")  {
if ($cajapalet == "CAJA") {
$sql= "select ofsnetic from pipeline/orfabsub where ofsndef = '$of' and (ofscart like '".trim($articulo)."%' OR ofscart like  '".trim($farticulo)."%' OR ofscart like '".trim($articulo_orig)."%' )";
//echo $sql;
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    
/*$sql = "update pipeline/orfabsub  set ofsnetic = ofsnetic + $etiquetas where ofsndef = '$of' and ofscart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);*/
} else {
    $sql= "select ofsneti from pipeline/orfabsub where ofsndef = '$of'  and (ofscart like '".trim($articulo)."%' OR ofscart like  '".trim($farticulo)."%' OR ofscart like '".trim($articulo_orig)."%' )";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    
/*$sql = "update pipeline/orfabsub  set ofsneti = ofsneti + $etiquetas where ofsndef = '$of' and ofscart = '$articulo'";  
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);  */
}       
  
}    





//echo $ns."<br>";

//echo $etiquetas."<br>";
if (is_null($serie)) $serie = 1;
//echo $serie."<br>";
//$cantidad = $cantidad / $etiquetas;

//if ($cliente=="FAURECIA") $cliente = "FAURECIA AUTOMOTIVE EXTERIORS SPAIN";
/*
echo "<br>";
echo "$referencia";
echo "<br>";
echo "$cantidad";
echo "<br>";
echo "$serie";
echo "<br>";
echo "$pneto";
echo "<br>";
echo "$pbruto";
echo "<br>";
echo "$proveedor";
echo "<br>";
echo "$caja";
echo "<br>";
echo "$cliente";
echo "<br>";
echo "$muelle";
echo "<br>";
echo "$descripcion";
echo "<br>";

*/









//GENERO PDF

if ($tipo == 'A5') $pdf = new Cezpdf('A4','portrait');
if ($tipo == 'A6') $pdf = new Cezpdf('A4','landscape');
if ($tipo == 'B6') $pdf = new Cezpdf('A4','portrait');
//$pdf->selectFont('fonts/Courier.afm'); 



//$pdf->selectFont('fonts/Courier-Bold.afm'); 

//$pdf->selectFont('fonts/Helvetica.afm');
$pdf->selectFont('../fonts/Helvetica.afm'); 
$tamanofont = 6;

if ($tipo == 'A5') {
    	$factorx = 616/210;//595.4/210;
	$factory = 842/297;//842/297/2;
	$alto = 297;
	$ancho = 210;
	$tamanofuente = 1;
	$etipag = 2;
	}
if ($tipo == 'A6') {
	$factorx =  876/297*210/297;//842/297*210/297;
	$factory = 590.4/210*210/297;//595.4/210*210/297;
	//$alto = 210;
	//$ancho = 297;
		$alto = 297;
	$ancho = 210*2;
	
	$tamanofuente = 0.7;
	
	$etipag = 4;

	};
if ($tipo == 'B6') {
	
    	$factorx = 616/210;//595.4/210;
	$factory = 842/297;//842/297/2;
	
	//$alto = 210;
	//$ancho = 297;
		$alto = 297;
	$ancho = 210;
	
	$tamanofuente = 0.7;
	
	$etipag = 4;

	
	//$pdf->line(0,$alto/2*$factory,$ancho*$factorx,$alto/2*$factory);
	
	
	
	};        
	


//FORMATO
	
//Etiqueta 1,2,3 o 4 jugar con los desp	

$margen = 2;
$copiasimp = 1;
//$copias =1;

for ($copias_imp = 1; $copias_imp<=$copias; $copias_imp++){
$serie = $serie_ini;

$cantidad = $para;

if ( $copias_imp > 1) $pdf->ezNewPage();
//echo $etiquetas;
for ($etiq = 1; $etiq <= $etiquetas ; $etiq++) {



$despx=$margen*$factorx;//ET2 5
$despy=$margen*$factory;//+ $alto*$factory/2;//ET2 5

//separador
//$pdf->line(0,$alto/2*$factory,$ancho*$factorx+$despx,$alto/2*$factory);
//if ($tipo == 'A6') $pdf->line($ancho*$factorx/2,0,$ancho*$factorx/2,$alto*$factory);



$serie = $serie + 1;

$etip= $etiq % $etipag ;

if (($etiq!=1) && ($etip==1)) {
	$pdf->ezNewPage();
	//echo "<BR> NEW PAGE <BR>";
	}

if ($tipo=="B6") {
    
    
 
if ($etip == 1) {
$despx=$margen * $factorx ;
$despy=$margen * $factory + 842/4*3;
}

if ($etip == 2) {
$despx=$margen * $factorx ;
$despy=$margen * $factory + 842/4*2;
}

if ($etip == 3) {
$despx=$margen * $factorx;
$despy=$margen * $factory+ 842/4;
}

if ($etip == 0) {
$despx=$margen * $factorx ;
$despy=$margen * $factory;
}


//MARCO
//$pdf->line(0*$factorx+$despx,0*$factory+$despy,0*$factorx+$despx,144*$factory+$despy);
//$pdf->line(197*$factorx+$despx,0*$factory+$despy,197*$factorx+$despx,144*$factory+$despy);
//$pdf->line(0*$factorx+$despx,144*$factory+$despy,197*$factorx+$despx,144*$factory+$despy);
//$pdf->line(0*$factorx+$despx,0*$factory+$despy,197*$factorx+$despx,0*$factory+$despy);


//$pdf->line(0*$factorx,297*.5*$factory,210*$factorx,297*.5*$factory);

//Etiqueta de pico

if (($etiquetas == $etiq)) {

	$cantidad = $cantidad_total - $cantidad * ($etiquetas - 1);
	
}

$serie = $serie_ini+$etiq;


$of2 = substr($of , 1 , 1).substr($of,5,6).substr("0000".$etiq , -4);
  QRcode::png($of."|".substr($cajapalet , 0 ,1)."|".$articulo."|".($ns+$etiq)."|".$tiposubp."|".$fecha."|".$cantidad."|".$serie, '../tmp/'.$of2.'.png'); 
  //if (trim($almacen)=="") 
  $almacen=$almacen+0;
    $fecha = date("Ymd");
    if ($of=="I - 091252") $fecha = 20191204;
$hora = date("H:i:s");

$sql = "INSERT INTO pipeline/QRETI values ( '$of' , '".substr($cajapalet , 0 ,1)."A"."', ".($ns+$etiq)."  , '' , 0 , '$articulo' , $cantidad , 4 , 'S' , '', $almacen , $fecha , '$hora' , '$usuario' , '' , ''  , '".$preffix.($serie)."' ,   0 , 0 , '', '' )";
//echo $sql;
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);    


if ($improving==1) {
    
    $qr = $of."|".substr($cajapalet , 0 ,1)."|".trim($articulo)."|".($ns+$etiq)."||".$fecha."|".$cantidad."|".$preffix.($serie); 
    if ($almacen == 0) $almacen = 100;
    $sqlins = "INSERT INTO [dbo].[gwEntradasQRMatrival] ( [QR] , [estado] , [albaran] , [almacen] ) VALUES ( '$qr' , '' , '' ,  $almacen ) ";
//$sqlins = "INSERT INTO 'dbo'.'gwEntradasQRMatrival'  VALUES ( '$qr' , '' , '$cin' ,  $almacen ) ";
//$sqlins = "INSERT INTO gwEntradasQRMatrival  VALUES ('$qr' , '' , '$cin' ,  $almacen ) ";

//echo $sqlins."<br>";
if ($improving == 1) $resultins=odbc_exec($cidimp,$sqlins) or die(exit('Error en odbc_exec')); 
}
    list($width, $height, $type, $attr) = getimagesize('../tmp/'.$of2.'.png');
$imagefactor=$width/$height;
    
 //$pdf->addPngFromFile('../tmp/'.$of2.'.png', 182*$factorx+$despx,   0*$factory+$despy+1,15*$factorx*$imagefactor);
 
  //$pdf->addPngFromFile('../tmp/'.$of2.'.png', 175.5*$factorx+$despx,   18*$factory+$despy+1,24.5*$factorx*$imagefactor);

  $pdf->addPngFromFile('../tmp/'.$of2.'.png', 174.5*$factorx+$despx,   0*$factory+$despy+1, 21*$factorx*$imagefactor);
  
  


 // if (trim($articulo)=='600CEST001') {

  QRcode::png('P'.trim($referencia_cli)."|S".($preffix.($serie))."|Q".$cantidad, '../tmp/Fau'.$referencia_cli.'.png'); 
 list($width, $height, $type, $attr) = getimagesize('../tmp/Fau'.$referencia_cli.'.png');
$imagefactor=$width/$height;
$pdf->addPngFromFile('../tmp/Fau'.$referencia_cli.'.png', 120*$factorx+$despx,   52*$factory+$despy+1, 18*$factorx*$imagefactor);


//}



  
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
$pdf->addText( 15*$factorx+$despx, 36.5*$factory+$despy , 18 * $tamanofuente  , $cantidad);
$pdf->addText( 15*$factorx+$despx, 50 *$factory+$despy, 18 * $tamanofuente , $referencia_cli);
$pdf->addText( 22*$factorx+$despx, 23 *$factory+$despy, 18 * $tamanofuente , $proveedor);
$pdf->addText( 114*$factorx+$despx, 35 *$factory+$despy, 18 * $tamanofuente , $descripcion);
$pdf->addText( 134*$factorx+$despx, 30 *$factory+$despy, 18 * $tamanofuente , $articulo);

$preffix = "";
if ($numcliente == 568) $preffix= "Y";
$pdf->addText( 27*$factorx+$despx, 9 *$factory+$despy, 18 * $tamanofuente , $preffix.($serie));
$pdf->addText(114*$factorx+$despx, 15*$factory+$despy, 18 * $tamanofuente ,"P".$fecha);
$pdf->addText(148*$factorx+$despx, 15*$factory+$despy, 18 * $tamanofuente , $nivel);
$pdf->addText( 126*$factorx+$despx, 9 *$factory+$despy, 18 * $tamanofuente , $of." / ".$cajapalet." / ".($ns+$etiq));

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

//1D

$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo 
$d1->getBarcodePNGPath("Q".$cantidad, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."Q".$cantidad.'.png');
$imagefactor=$width/$height;
$pdf->addPngFromFile('../tmp/'.'Q'.$cantidad.'.png',  5*$factorx+$despx, 28 *$factory+$despy, 7*$factorx*$imagefactor);


$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo $referencia_cli
 $d1->getBarcodePNGPath("P".str_replace("_"," 2",$referencia_cli), 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."P".str_replace("_"," 2",$referencia_cli).'.png');
$imagefactor=$width/$height;
if ($width>500) $imagefactor = $imagefactor  * 0.75 ;//ss extra large
$pdf->addPngFromFile('../tmp/'.'P'.str_replace("_"," 2",$referencia_cli).'.png',  5*$factorx+$despx, 42 *$factory+$despy,7*$factorx*$imagefactor);

$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo
 $d1->getBarcodePNGPath("P".$proveedor, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."P".$proveedor.'.png');
$imagefactor=$width/$height;
$pdf->addPngFromFile('../tmp/'.'P'.$proveedor.'.png',  5*$factorx+$despx, 15 *$factory+$despy,7*$factorx*$imagefactor);


 $d1->getBarcodePNGPath('P'.$articulo, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'.'P'.$articulo.'.png');
$imagefactor=$width/$height;
//$pdf->addText( 20*$factorx+$despx, 250 *$factory+$despy, 20,$imagefactor);
$pdf->addPngFromFile('../tmp/'.'P'.$articulo.'.png',  114*$factorx+$despx, 22 *$factory+$despy,7*$factorx*$imagefactor);
   

$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo $serie;
$d1->getBarcodePNGPath("S".$preffix.$serie, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."S".$preffix.$serie.'.png');
//if ($height==0) $height =1;
$imagefactor=$width/$height;
$pdf->addPngFromFile('../tmp/'.'S'.$preffix.$serie.'.png',  5*$factorx+$despx, 0 *$factory+$despy,7*$factorx*$imagefactor);    


$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo 
$d1->getBarcodePNGPath("V".$of, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."V".$of.'.png');
$imagefactor=$width/$height;
$pdf->addPngFromFile('../tmp/'.'V'.$of.'.png',  114*$factorx+$despx, 0*$factory+$despy,7*$factorx*$imagefactor);
//$pdf->addText( 20*$factorx+$despx, 250 *$factory+$despy, 20,'../tmp/'.$referencia.'.png');



/*
$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo 
$d1->getBarcodePNGPath("V".$proveedor, 'C39');
list($width, $height, $type, $attr) = getimagesize('../tmp/'."V".$proveedor.'.png');
$imagefactor=$width/$height;
$pdf->addPngFromFile('../tmp/'.'V'.$proveedor.'.png',  12*$factorx+$despx, 22 *$factory+$despy,9*$factorx*$imagefactor);
//$pdf->addText( 20*$factorx+$despx, 250 *$factory+$despy, 20,'../tmp/'.$referencia.'.png');






$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo
 $d1->getBarcodePNGPath("N".$asn, 'C39');
list($width, $height, $type, $attr) = getimagesize('../tmp/'.'N'.$asn.'.png');
$imagefactor=$width/$height;
//$pdf->addText( 20*$factorx+$despx, 250 *$factory+$despy, 20,$imagefactor);
$pdf->addPngFromFile('../tmp/'.'N'.$asn.'.png',  10*$factorx+$despx, 103 *$factory+$despy,10*$factorx*$imagefactor);

$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo

$of2 = substr($of , 1 , 1).substr($of,5,6).substr("0000".$etiq , -4);
 $d1->getBarcodePNGPath("I".$of2, 'C39');
list($width, $height, $type, $attr) = getimagesize('../tmp/'.'I'.$of2.'.png');
$imagefactor=$width/$height;
//$pdf->addText( 20*$factorx+$despx, 250 *$factory+$despy, 20,$imagefactor);
$pdf->addPngFromFile('../tmp/'.'I'.$of2.'.png',  104*$factorx+$despx, 2 *$factory+$despy,10*$factorx*$imagefactor);


    */
    
    
    
    
    
} else {    
        
/*
 * 
 * 

echo "<BR> Total ". $cantidad  ;
echo "<BR> Etiapag ". $etipag  ;
echo "<BR> Etis ".$cantidad   ;
echo "<BR> N Eti ". $etip  ;
echo "<BR> Tipo Eti ". $tipo  ;
echo "<BR> Num ".$etiq   ;
echo "<BR> <BR>" ;*/
if (($tipo=='A5') && ($etip==0)) $etip = 3;

//if (($tipo=='B6') && ($etip==0)) $etip = 3;

if ($etip == 1) {
$despx=$margen * $factorx;
$despy=$margen * $factory + $alto * $factory/ 2;
}

if ($etip == 2) {
$despx=$margen * $factorx + $ancho * $factory / 2;
$despy=$margen * $factory + $alto * $factory / 2;
}

if ($etip == 3) {
$despx=$margen * $factorx;
$despy=$margen * $factory;//+ $alto*$factory/2;
}

if ($etip == 0) {
$despx=$margen * $factorx + $ancho * $factory/2;
$despy=$margen * $factory;//+ $alto*$factory/2;
}

//echo "AQUI";
//MARCO
//$pdf->line(0*$factorx+$despx,0*$factory+$despy,0*$factorx+$despx,144*$factory+$despy);
//$pdf->line(197*$factorx+$despx,0*$factory+$despy,197*$factorx+$despx,144*$factory+$despy);
//$pdf->line(0*$factorx+$despx,144*$factory+$despy,197*$factorx+$despx,144*$factory+$despy);
//$pdf->line(0*$factorx+$despx,0*$factory+$despy,197*$factorx+$despx,0*$factory+$despy);


//$pdf->line(0*$factorx,297*.5*$factory,210*$factorx,297*.5*$factory);
//Etiqueta de pico

if (($etiquetas == $etiq)) {

	$cantidad = $cantidad_total - $cantidad * ($etiquetas - 1);
	
}
$of2 = substr($of , 1 , 1).substr($of,5,6).substr("0000".$etiq , -4);

    QRcode::png($of."|".substr($cajapalet , 0 ,1)."|".$articulo."|".($ns+$etiq)."|".$tiposubp."|".$fecha."|".$cantidad."|".$preffix.$serie, '../tmp/'.$of2.'.png'); 

    list($width, $height, $type, $attr) = getimagesize('../tmp/'.$of2.'.png');
$imagefactor=$width/$height;
    
 //$pdf->addPngFromFile('../tmp/'.$of2.'.png', 182*$factorx+$despx,   0*$factory+$despy+1,15*$factorx*$imagefactor);
 
  $pdf->addPngFromFile('../tmp/'.$of2.'.png', 159*$factorx+$despx,   66*$factory+$despy+1,35*$factorx*$imagefactor);
  
  $fecha = date("Ymd");
    if ($of=="I - 091252") $fecha = 20191204;
$hora = date("H:i:s");
$usuario = strtoupper(trim(  $usuario));
//if ($almacen=="") 
$almacen = $almacen + 0;
$sql = "INSERT INTO pipeline/QRETI values ( '$of' , '".substr($cajapalet , 0 ,1)."A"."', ".($ns+$etiq)."  , '' , 0 , '$articulo' , $cantidad , 4 , 'S' , '', $almacen , $fecha , '$hora' , '$usuario' , '' , ''  , '".$preffix.($serie)."' ,   0 , 0 , '', '' )";
//echo $sql;
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
//echo $sql;
odbc_commit($cid);    


if ($improving==1) {
    
    $qr = $of."|".substr($cajapalet , 0 ,1)."|".trim($articulo)."|".($ns+$etiq)."||".$fecha."|".$cantidad."|".$preffix.($serie); 
    if ($almacen == 0) $almacen = 100;
    $sqlins = "INSERT INTO [dbo].[gwEntradasQRMatrival] ( [QR] , [estado] , [albaran] , [almacen] ) VALUES ( '$qr' , '' , '' ,  $almacen ) ";
//$sqlins = "INSERT INTO 'dbo'.'gwEntradasQRMatrival'  VALUES ( '$qr' , '' , '$cin' ,  $almacen ) ";
//$sqlins = "INSERT INTO gwEntradasQRMatrival  VALUES ('$qr' , '' , '$cin' ,  $almacen ) ";

//echo $sqlins."<br>";
if ($improving == 1) $resultins=odbc_exec($cidimp,$sqlins) or die(exit('Error en odbc_exec')); 
}

$pdf->line(0*$factorx+$despx,21*$factory+$despy,197*$factorx+$despx,21*$factory+$despy);
$pdf->line(0*$factorx+$despx,44*$factory+$despy,98.5*$factorx+$despx,44*$factory+$despy);
$pdf->line(0*$factorx+$despx,69.5*$factory+$despy,197*$factorx+$despx,69.5*$factory+$despy);
$pdf->line(0*$factorx+$despx,100*$factory+$despy,197*$factorx+$despx,100*$factory+$despy);
$pdf->line(0*$factorx+$despx,126*$factory+$despy,197*$factorx+$despx,126*$factory+$despy);

$pdf->line(98.5*$factorx+$despx,0*$factory+$despy,98.5*$factorx+$despx,69.5*$factory+$despy);
$pdf->line(98.5*$factorx+$despx,100*$factory+$despy,98.5*$factorx+$despx,144*$factory+$despy);

$pdf->line(98.5*$factorx+$despx,34*$factory+$despy,197*$factorx+$despx,34*$factory+$despy);
$pdf->line(98.5*$factorx+$despx,59*$factory+$despy,197*$factorx+$despx,59*$factory+$despy);
$pdf->line(137.5*$factorx+$despx,21*$factory+$despy,137.5*$factorx+$despx,34*$factory+$despy);

$pdf->line(98.5*$factorx+$despx,112*$factory+$despy,197*$factorx+$despx,112*$factory+$despy);
$pdf->line(139*$factorx+$despx,100*$factory+$despy,139*$factorx+$despx,112*$factory+$despy);
$pdf->line(177.5*$factorx+$despx,100*$factory+$despy,177.5*$factorx+$despx,112*$factory+$despy);
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
 
  $pdf->addPngFromFile('../tmp/'.$of2.'.png', 159*$factorx+$despx,   65*$factory+$despy+1,35*$factorx*$imagefactor);
  */
  

$pdf->addText( 0*$factorx+$despx, 40*$factory+$despy, 6 * $tamanofuente  , "SUPP (V)");

$pdf->addText( 0*$factorx+$despx, 140*$factory+$despy, 6 * $tamanofuente , "DESTINATION");

$pdf->addText( 0*$factorx+$despx, 65*$factory+$despy, 6  * $tamanofuente , "QTY (Q)");

$pdf->addText( 0*$factorx+$despx, 96*$factory+$despy, 6  * $tamanofuente , "PART (P)");
//$pdf->addText( 0*$factorx+$despx, 62*$factory+$despy, 6  * $tamanofuente , "(P)");

$pdf->addText( 100*$factorx+$despx, 140*$factory+$despy, 6  * $tamanofuente , "STR LOC 1(L)");

$pdf->addText( 100*$factorx+$despx, 121*$factory+$despy, 6 * $tamanofuente  , "SUPPLIER NUMBER (F)");

$pdf->addText( 0*$factorx+$despx, 121*$factory+$despy, 6 * $tamanofuente  , "DELIVERY DOC/ASN NUMBER (N)");

$pdf->addText( 0*$factorx+$despx, 17*$factory+$despy, 6 * $tamanofuente  , "SERIAL NO (M)");

$pdf->addText( 178*$factorx+$despx, 108*$factory+$despy, 6  * $tamanofuente , "CONTAINER");

$pdf->addText( 139*$factorx+$despx, 108*$factory+$despy, 6 * $tamanofuente  , "GROSS WGT");

$pdf->addText( 100*$factorx+$despx, 108*$factory+$despy, 6 * $tamanofuente  , "NET WGT");

$pdf->addText( 100*$factorx+$despx, 17*$factory+$despy, 6  * $tamanofuente , "BATCH NO. (H)");

$pdf->addText( 100*$factorx+$despx, 30*$factory+$despy, 6  * $tamanofuente , "DATE (D)");

$pdf->addText( 100*$factorx+$despx, 65*$factory+$despy, 6 * $tamanofuente, "DESCRIPTION");

$pdf->addText( 100*$factorx+$despx, 55*$factory+$despy, 6  * $tamanofuente , "SUPP. PART. NO.");

//$pdf->addText( 143*$factorx+$despx, 97.75*$factory+$despy, 6 * $tamanofuente  , "W/C");

//$pdf->addText( 113*$factorx+$despx, 34.5*$factory+$despy, 6 * $tamanofuente  , "TO");



$pdf->addText( 138*$factorx+$despx, 30*$factory+$despy, 6 * $tamanofuente  , "DESIGN MODIFIC. LEVEL");

//$pdf->addText( 183*$factorx+$despx, 34.5*$factory+$despy, 6 * $tamanofuente  , "DOC CODE (1L)");
//FIN FORMATO



//DATOS

if ($portugal == '607'){
	$pdf->addText( 104*$factorx+$despx, 112*$factory+$despy, 24 * $tamanofuente  , "MATRIDOS PG");
} else {
$pdf->addText( 104*$factorx+$despx, 112*$factory+$despy, 24 * $tamanofuente  , "ILI");
}
$pdf->addText( 12*$factorx+$despx, 33*$factory+$despy , 18 * $tamanofuente  , $proveedor);

//$pdf->addText( 140*$factorx+$despx, 133*$factory+$despy , 22 * $tamanofuente  , $masterlabel);

//ver justificar derecha
//$descuento =  $pdf->getTextWidth(32,"6000") ;
$pdf->addText( 20*$factorx+$despx /*- ($pdf->getTextWidth(36,$cantidad))*$factorx*/, 56*$factory+$despy , 36  * $tamanofuente , $cantidad  );//." / ".$etip."-".$etiquetas.":".$etipag);


$pdf->addText( 8*$factorx+$despx, 87 *$factory+$despy, 36 * $tamanofuente , $referencia_cli);

$pdf->addText( 104*$factorx+$despx, 48 *$factory+$despy, 24 * $tamanofuente , $articulo);
$pdf->addText( 104*$factorx+$despx, 60 *$factory+$despy, 12 * $tamanofuente , $descripcion);

$preffix="";
if ($numcliente==568) $preffix="Y";
$pdf->addText( 17*$factorx+$despx, 14 *$factory+$despy, 16 * $tamanofuente , $preffix.$serie);


$pdf->addText(104*$factorx+$despx, 23 *$factory+$despy, 14 * $tamanofuente ,"P".$fecha);//.substr($fecha,0,4).substr($fecha,4,2).substr($fecha,6,2));
$pdf->addText(142*$factorx+$despx, 23*$factory+$despy, 14 * $tamanofuente , $nivel);
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
//$pdf->addText( 110*$factorx+$despx, 13 *$factory+$despy, 16 * $tamanofuente , $of);
//$pdf->addText( 150*$factorx+$despx, 13 *$factory+$despy, 10 * $tamanofuente , $cajapalet);
$pdf->addText( 120*$factorx+$despx, 14 *$factory+$despy, 16 * $tamanofuente , $of." / ".$cajapalet." / ".($ns+$etiq));//substr("0000".$etiq , -4));

//CODIGOS DE BARRAS

/*reset ($d2);
reset ($d1);
unset($d2);
unset($d1);*/

//$pdf->selectFont('fonts/Courier-Bold.afm'); 
/*
//2D
$d2[$etiq]=new DNS2DBarcode();
$d2[$etiq]->save_path="../tmp/";
//echo 
$d2[$etiq]->getBarcodePNGPath( "P".$referencia." Q".$cantidad." V".$proveedor." D".date("dmY"), 'pdf417',5,5, 'black');
list($width, $height, $type, $attr) = getimagesize('../tmp/'."P".$referencia." Q".$cantidad." V".$proveedor." D".date("dmY").'.png');
$imagefactor=$width/$height;
$pdf->addPngFromFile('../tmp/'."P".$referencia." Q".$cantidad." V".$proveedor." D".date("dmY").'.png',  145*$factorx+$despx, 110.25 *$factory+$despy,22*$factorx*$imagefactor);
*/
//1D

$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo 
$d1->getBarcodePNGPath("V".$proveedor, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'."V".$proveedor.'.png');
$imagefactor=$width/$height;
$pdf->addPngFromFile('../tmp/'.'V'.$proveedor.'.png',  12*$factorx+$despx, 22 *$factory+$despy,9*$factorx*$imagefactor);
//$pdf->addText( 20*$factorx+$despx, 250 *$factory+$despy, 20,'../tmp/'.$referencia.'.png');



$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";

//echo 
$d1->getBarcodePNGPath("Q".$cantidad, 'C39');
list($width, $height, $type, $attr) = getimagesize('../tmp/'."Q".$cantidad.'.png');
$imagefactor=$width/$height;
$pdf->addPngFromFile('../tmp/'.'Q'.$cantidad.'.png',  10*$factorx+$despx, 44 *$factory+$despy, 10*$factorx*$imagefactor);


$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";

//echo
$d1->getBarcodePNGPath("P".str_replace("_"," 2",$referencia_cli), 'C39');
list($width, $height, $type, $attr) = getimagesize('../tmp/'."P".str_replace("_"," 2",$referencia_cli).'.png');
$imagefactor=$width/$height;
if ($width>500) $imagefactor = $imagefactor  * 0.75 ;//ss extra large
$pdf->addPngFromFile('../tmp/'.'P'.str_replace("_"," 2",$referencia_cli).'.png',  10*$factorx+$despx, 70 *$factory+$despy,15*$factorx*$imagefactor);


$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";

//echo $serie;
$d1->getBarcodePNGPath("S".$preffix.$serie, 'C39');
list($width, $height, $type, $attr) = getimagesize('../tmp/'."S".$preffix.$serie.'.png');
//if ($height==0) $height =1;
$imagefactor=$width/$height;
$pdf->addPngFromFile('../tmp/'.'S'.$preffix.$serie.'.png',  16*$factorx+$despx, 2 *$factory+$despy,10*$factorx*$imagefactor);

/*
$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";
//echo
 $d1->getBarcodePNGPath("N".$asn, 'C39');
list($width, $height, $type, $attr) = getimagesize('../tmp/'.'N'.$asn.'.png');
$imagefactor=$width/$height;
//$pdf->addText( 20*$factorx+$despx, 250 *$factory+$despy, 20,$imagefactor);
$pdf->addPngFromFile('../tmp/'.'N'.$asn.'.png',  10*$factorx+$despx, 103 *$factory+$despy,10*$factorx*$imagefactor);
*/

$d1=new DNS1DBarcode();
$d1->save_path="../tmp/";

//echo

$of2 = substr($of , 1 , 1).substr($of,5,6).substr("0000".$etiq , -4);

    $d1->getBarcodePNGPath("I".$of2, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'.'I'.$of2.'.png');
$imagefactor=$width/$height;
//$pdf->addText( 20*$factorx+$despx, 250 *$factory+$despy, 20,$imagefactor);
$pdf->addPngFromFile('../tmp/'.'I'.$of2.'.png',  104*$factorx+$despx, 2 *$factory+$despy,10*$factorx*$imagefactor);


    $d1->getBarcodePNGPath('P'.$articulo, 'C39');

list($width, $height, $type, $attr) = getimagesize('../tmp/'.'P'.$articulo.'.png');
$imagefactor=$width/$height;
//$pdf->addText( 20*$factorx+$despx, 250 *$factory+$despy, 20,$imagefactor);
$pdf->addPngFromFile('../tmp/'.'P'.$articulo.'.png',  104*$factorx+$despx, 35 *$factory+$despy,10*$factorx*$imagefactor);

}

}

}

/*   
$stream_options = array( 
        'Content-Disposition' => "OF ".$of." ".$articulo." ".substr($cajapalet , 0 ,1).".pdf");
$content = $pdf->Output();
file_put_contents(str_replace(" ","","/var/www/QSweb/Almacen/Etiquetas/OF ".$of."_".$articulo."_s".$ns."_e".$etiquetas."_".substr($cajapalet , 0 ,1).".pdf"),$content);

$pdf->ezStream($stream_options);
*/



$articulo = $_GET["referencia"];

/*
//update numerio de serie
$numcliente = $numcliente*1;

$sql = "select max(odtnums) from pipeline/etodt where odtcdg in (select  arcdg from pipeline/almar where arce3 = $numcliente)"; 
//arcdg from pipeline/almar where arce3 = $numcliente)                      )


$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 


$numserie_max =  odbc_result($result,1);

if (is_null($numserie_max)) $numserie_max =0;
$numserie_max = $numserie_max + $etiquetas;

$sql = "update pipeline/etodt  set odtnums = $numserie_max  where odtcdg in( select arcdg from pipeline/almar where arce3 = $numcliente) or odtcdg = '$articulo'";
//echo $sql;
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);*/
//update contador caja/palet



//$ns=0;
//echo $ns;
if ($tiposubp == "PP") {
    
    
    
    
    
    
    
if ($cajapalet == "CAJA") {
/*$sql= "select ofnetic from pipeline/ordenfab where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);*/

$sql = "update pipeline/ordenfab  set ofnetic = ofnetic + $etiquetas where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);
} else {
/*$sql= "select ofneti from pipeline/ordenfab where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    */
    
$sql = "update pipeline/ordenfab  set ofneti = ofneti + $etiquetas where ofndef = '$of' and ofcart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);   
}    
}
if ($tiposubp == "SP")  {
if ($cajapalet == "CAJA") {
/*$sql= "select ofsnetic from pipeline/orfabsub where ofsndef = '$of' and ofscart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    */
$sql = "update pipeline/orfabsub  set ofsnetic = ofsnetic + $etiquetas where ofsndef = '$of' and ofscart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);
} else {
   /* $sql= "select ofsneti from pipeline/orfabsub where ofsndef = '$of' and ofscart = '$articulo'";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 
$ns = odbc_result($result,1);    */
$sql = "update pipeline/orfabsub  set ofsneti = ofsneti + $etiquetas where ofsndef = '$of' and ofscart = '$articulo'";  
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);  
}       
    
}


if ($cajapalet == "CAJA") $tipoeti = "CA";
if ($cajapalet == "PALET") $tipoeti = "PA";
/*
$aux = 0;
for ($etiq = 1; $etiq <= $etiquetas ; $etiq++) {
    $aux++;

$cantidad = $para;    
if (($etiquetas == $etiq)) {

	$cantidad = $cantidad_total - $cantidad * ($etiquetas - 1);
	
}

    
$fecha = date("Ymd");
$hora = date("H:i:s");
$usuario = strtoupper(trim( $_GET["usr"]));
$sql = "INSERT INTO pipeline/QRETI values ( '$of' , '$tipoeti', ".($ns+$etiq)."  , '' , 0 , '$articulo' , $cantidad , 4 , 'S' , '', $almacen , $fecha , '$hora' , '$usuario' , '' , ''  , '".$preffix.($serie_ini+$aux)."' ,   0 , 0 , '', '' )";
$result=odbc_exec($cid,$sql) or die(exit("Error en odbc_exec")); 

odbc_commit($cid);    


if ($improving==1) {
    
    $qr = $of."|".substr($tipoeti , 0 ,1)."|".$articulo."|".($ns+$etiq)."||".$fecha."|".$cantidad."|".$preffix.($serie_ini+$aux); 
    
    $sqlins = "INSERT INTO [dbo].[gwEntradasQRMatrival] ( [QR] , [estado] , [albaran] , [almacen] ) VALUES ( '$qr' , '' , '' ,  $almacen ) ";
//$sqlins = "INSERT INTO 'dbo'.'gwEntradasQRMatrival'  VALUES ( '$qr' , '' , '$cin' ,  $almacen ) ";
//$sqlins = "INSERT INTO gwEntradasQRMatrival  VALUES ('$qr' , '' , '$cin' ,  $almacen ) ";

//echo $sqlins."<br>";
if ($improving == 1) $resultins=odbc_exec($cidimp,$sqlins) or die(exit('Error en odbc_exec')); 
    
    
}



    
}
*/

$articulo= trim($articulo);
//if (((strtoupper(trim( $_GET["usr"]))!="SJUAN")) )
header("Content-type:application/pdf");



//if (((strtoupper(trim( $_GET["usr"]))!="SJUAN")) ) 
header("Content-Disposition:attachment;filename=OF_".str_replace(" ","",$of)."_".$articulo."_s".$ns."_e".$etiquetas."_".substr($cajapalet , 0 ,1).".pdf");
   
$stream_options = array( 
        'Content-Disposition' => "OF_".str_replace(" ","",$of)."_".$articulo."_s".$ns."_e".$etiquetas."_".substr($cajapalet , 0 ,1).".pdf");
   

$content = $pdf->Output();

   
file_put_contents(str_replace(" ","","/var/www/QSweb/Almacen/Etiquetas/OF_".str_replace(" ","",$of)."_".$articulo."_s".$ns."_e".$etiquetas."_".substr($cajapalet , 0 ,1).".pdf"),$content);

 if (((strtoupper(trim(  $usuario))=="SJUAN")) ) $pdf->stream();
if (((strtoupper(trim(  $usuario))=="JECOQUILLAT")) && ((strtoupper(trim( $_GET["print"])) == "SI" ))) {


$salida = shell_exec("lp -d  ETIS3 ".str_replace(" ","","/var/www/QSweb/Almacen/Etiquetas/OF_".str_replace(" ","",$of)."_".$articulo."_s".$ns."_e".$etiquetas."_".substr($cajapalet , 0 ,1).".pdf")."\n");

}
//echo $salida;
//echo "lp -d  RICOH_Aficio_MP_4002 ".str_replace(" ","","/var/www/QSweb/Almacen/Etiquetas/OF ".$of." ".$articulo." ".substr($cajapalet , 0 ,1).".pdf")."\n";
//if ((strtoupper($_GET["usr"])!="SJUANXX")) 
//$pdf->ezStream($stream_options);



//header("Content-type:application/pdf");



//header('Content-Disposition:attachment;filename="/var/www/QSweb/Almacen/Etiquetas/OF ".$of."_".$articulo."_s".$ns."_e".$etiquetas."_".substr($cajapalet , 0 ,1).".pdf"');

//readfile("/var/www/QSweb/Almacen/Etiquetas/OF ".$of."_".$articulo."_s".$ns."_e".$etiquetas."_".substr($cajapalet , 0 ,1).".pdf");
/*
file_put_contents(str_replace(" ","","/var/www/QSweb/Almacen/Etiquetas/OF ".$of."_".$articulo."_s".$ns."_e".$etiquetas."_".substr($cajapalet , 0 ,1).".pdf"),$content);
header("Content-type:application/pdf");
header("Content-Disposition:attachment;filename= 'OF ".$of." ".$articulo." ".substr($cajapalet , 0 ,1).".pdf'");

 $stream_options = array( 
        'Content-Disposition' =>  "OF ".$of." ".$articulo." ".substr($cajapalet , 0 ,1).".pdf");

 
$pdf->ezStream($stream_options);
 */
//consumos teoricos improving
//if ((strtoupper($_GET["usr"])=="SANTOS"))
{
/*CREATE TABLE [dbo].[gwConsumoEstructurasMatrival](

       [id] [int] IDENTITY(1,1) NOT NULL,

       [NumBarra] [nvarchar](50) NULL,

       [OrdenFabricacion] [nvarchar](50) NULL,

       [Referencia] [nvarchar](50) NULL,

       [cantidad] [numeric](14, 3) NULL,

       [PuntoConsumo] [nvarchar](50) NULL,

       [fecha] [datetime] NULL,

       [componente] [nvarchar](50) NULL,

       [cantidadComponente] [numeric](14, 3) NULL,

       [almacenQS] [nvarchar](50) NULL,

       [fechaInsert] [datetime] NULL,

       [BarraFisica] [nvarchar](50) NULL,

       [valorEntero] [bit] NULL,
       */

if ($improving==10) {
    
   // $qr = $of."|".substr($cajapalet , 0 ,1)."|".trim($articulo)."|".($ns+$etiq)."||".$fecha."|".$cantidad."|".$preffix.($serie); 
    
   	$filenameIMP = '/var/www/Improving/log/EST'.date("Ymd").'.log';
  

  
  
  $sqlimp = "select count(*) from [dbo].[gwConsumoEstructurasMatrival] where OrdenFabricacion = '".trim($of)."' and Referencia = '".trim($articulo)."' ";
  if ($improving == 1) $resultimp=odbc_exec($cidimp,$sqlimp) or die(exit('Error en odbc_exec')); 
  
  
		if ( (odbc_result($resultimp,1)==0)) {
        
		//OK

/*
 select '' , ofndef, ofcart , 1 , ofalm , 20191003 , 
 mofcomp , mofcanu , ofalm , 20191003 , ''  , 0      
  from pipeline/ordenfab , pipeline/matorfab         
 where ofndef = 'I - 080001'                         
 and ofndef = mofndef                                
 union                                               
 select '' , ofsndef , ofscart , 1 , 0  , 20191003 , 
  mofcomp , mofcanu , 0 , 20191003 , '' , 0          
  from pipeline/orfabsub , pipeline/matorsub         
 where ofsndef = 'I - 080001'                        
  and ofsndef = mofndef  and ofscart =  MOFSUBP      
  */
  
  
  $sqlqs= "select  ofndef, ofcart ,  ofalm , 
 mofcomp , mofcanu ,    coalesce(( 
select arun1 from pipeline/almar where arcdg = mofcomp) , 0 )   as mofudm 
  from pipeline/ordenfab , pipeline/matorfab 
 where ofndef = '".trim($of)."'   and ofcart = '".trim($articulo)."' 
 and ofndef = mofndef 
 union 
 select  ofsndef , ofscart ,  coalesce((select ofalm from 
 pipeline/ordenfab where ofndef = ofsndef ) , 0 )    as ofalm    , 
  mofcomp , mofcanu ,    coalesce(( 
select arun1 from pipeline/almar where arcdg = mofcomp) , 0 )   as mofudm 
  from pipeline/orfabsub , pipeline/matorsub 
 where ofsndef = '".trim($of)."'     and ofscart = '".trim($articulo)."' 
  and ofsndef = mofndef  and ofscart =  MOFSUBP  
  union
select  ofndef, ofscart ,  ofalm ,
 mofcomp , coalesce((select estpspza from pipeline/estart
 where estart = ofscart and estnum = ofnest) , 0 ) as
mofcanu ,    coalesce((
select arun1 from pipeline/almar where arcdg = mofcomp) , 0 )
   as mofudm
  from pipeline/ordenfab , pipeline/matorfab  , pipeline/orfabsub  
 where ofndef = '".trim($of)."'    and ofscart = '".trim($articulo)."'         
 and ofndef = mofndef                                              
  and ofndef = ofsndef                                             
               and ( mofcomp like '2%' or mofcomp like '7%')       ";
//echo $sqlqs."<br>";
$resultqs=odbc_exec($cid,$sqlqs) or die(exit("Error en odbc_exec")); 

while (odbc_fetch_row($resultqs)){
$ofalm = odbc_result($resultqs,"ofalm");    
$ofcomp =odbc_result($resultqs,"mofcomp");   
$ofcanu = odbc_result($resultqs,"mofcanu");   
$ofudm = odbc_result($resultqs,"mofudm");   

$entero = 0;
if ($ofudm == 4) $entero = 1;

$puntoconsumo = "";
if ($ofalm==100) $puntoconsumo = "INYECCION BE";
if ($ofalm==19) $puntoconsumo = "MONTAJES BE";
if ($ofalm==219) $puntoconsumo = "MONTAJES BO";
if ($ofalm==319) $puntoconsumo = "MONTAJES ME";
if ($ofalm==619) $puntoconsumo = "MONTAJES MA";
if ($ofalm==719) $puntoconsumo = "MONTAJES CA";
if ($ofalm==710) $puntoconsumo = "INYECCION CA";
if ($ofalm==74) $puntoconsumo = "REPROCESOS";
if ($ofalm==290) $puntoconsumo = "MUROS BO";
if ($ofalm==390) $puntoconsumo = "MUROS ME";

		file_put_contents( $filenameIMP , " , '".trim($of)."'  , '".trim($articulo)."'  , 1 , $puntoconsumo , ".date("Ymd")." , '".trim($ofcomp)."' , $ofcanu , 301 , ''     ".date("Ymd H:i:s")." , $entero ".PHP_EOL, FILE_APPEND);


// $sqlins = "INSERT INTO [dbo].[gwEntradasQRMatrival] ( [QR] , [estado] , [albaran] , [almacen] ) VALUES ( '$qr' , '' , '' ,  $almacen ) ";
	$sqlinsimp = "INSERT INTO [dbo].[gwConsumoEstructurasMatrival] ([NumBarra] ,[OrdenFabricacion] ,[Referencia] ,[cantidad] ,[PuntoConsumo] ,[fecha] ,[componente] ,[cantidadComponente] ,[almacenQS] , [BarraFisica] , [valorEntero]  ) VALUES ( ''  , '".trim($of)."' , '".trim($articulo)."' , 1 , '$puntoconsumo' , '".date("Y-m-d H:i:s")."' , '".trim($ofcomp)."' , $ofcanu , $ofalm   ,  '' , $entero ) ";

//echo $sqlinsimp."<br>";


if ($improving == 10) $resultins=odbc_exec($cidimp,$sqlinsimp) or die(exit('Error en odbc_exec')); 

}

}


}

}








} else {
    
    echo " No est� permitido modificar los parametros de las etiquetas una vez generadas.";//.$ref_hash." ".$refer_hash." ". "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    
   // echo "<br>". strlen(trim($hash[0]))." --> ".intval($ref / 100) ." ".($ref - intval($ref / 100) * 100)." ".$ref." ".($ref - intval($ref / 100) * 10000)."<br>";
    
   // echo trim($hash[0])."<br>";
    
   //  echo trim($strcadena)."<br>";
}



 $salida = shell_exec('find /var/www/QSweb/tmp -name "*" -type f -mtime +2 -exec rm -f {} \; \n');


 $salida = shell_exec('find /var/www/QSweb/tmp -name "*" -type f  -mmin +30 -exec rm -f {} \; \n');
 
 
 
 
if (strtoupper(trim( $usuario ))!="SJUAN" ||  $usuario !="QSWEB" ) {

 header('Location: '."Etiquetas/OF_".str_replace(" ","",$of)."_".$articulo."_s".$ns."_e".$etiquetas."_".substr($cajapalet , 0 ,1).".pdf");  
 
}else {
  $stream_options = array( 
    'Content-Disposition' => "OF ".$of." ".$articulo." ".substr($cajapalet , 0 ,1).".pdf");
$content = $pdf->Output();
file_put_contents(str_replace(" ","","/var/www/QSweb/Almacen/Etiquetas/OF ".$of."_".$articulo."_s".$ns."_e".$etiquetas."_".substr($cajapalet , 0 ,1).".pdf"),$content);

//$pdf->ezStream($stream_options);
}


}
?>













