






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
if ($_GET) $articulo =strtoupper($_GET['articulo']);

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


echo '<form  id="frmDatos" name="frmDatos" method="GET" action="imp_etis_of()">';
echo '<label>OF:';
echo '</label>';
echo '<input type="button" value="Filtrar" onClick="imp_etis_of()">';
echo '<select name="of" id="of" onChange="imp_etis_of()">';

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
$articulo = strtoupper($_GET["articulo"]);
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

echo 'Desde: <input type="number" name="desde" id="desde"  value = "'.$desde.'" onChange="imp_etis_of()"/>';
echo "<br>";
echo 'Hasta: <input type="number" name="hasta" id="hasta" value = "'.$hasta.'" onChange="imp_etis_of()"/>';



echo "<br>";
echo 'Articulo: <input type="text" name="articulo" id="articulo" value = "'.$articulo.'" onChange="imp_etis_of()"/>';

echo 'OF: <input type="text" name="ofe" id="ofe" value = "'.$of.'" onChange="imp_etis_of()"/>';


echo "<br>";
echo 'Primera: <input type="text" name="etiini" id="etiini" value = "'.$eti_ini.'" onChange="imp_etis_of()"/>';

echo 'Ultima: <input type="text" name="etifin" id="etifin" value = "'.$eti_fin.'" onChange="imp_etis_of()"/>';

if (trim($eti_ini) == "") $eti_ini = 0;
if (trim($eti_fin) == "") $eti_fin = 999999;



$sqlped="select ofndef as qrofe , ofcart as qrart , 0 as qrofn , '' as qrtpo , qrcan , qrnser , qrfch , qrhra , qrusr , arnbr , ARRDP , coalesce((select ofopmaq from pipeline/ordenfab where ofndef = qrofe) , 'DESCONOCIDO') as qrmaq from pipeline/qreti , pipeline/almar where qrart = arcdg and qrart like '%".trim($articulo)."%' and qrofe like '%".trim($of)."%' and qrfch >= $desde and qrfch <= $hasta and (qrofe like 'I%' or qrofe like 'M%' or qrofe like 'C%' or qrofe like 'P%' or qrofe like 'W%' or qrofe like 'R%' ) and qrofn >= $eti_ini and qrofn <= $eti_fin order by qrofe desc, qrart desc , qrofn desc , qrfch desc  ".$finsql;


$sqlped="select ofndef , ofcart , arnbr , arrdp , ofopmaq , offip , coalesce((select mofpara from pipeline/matorfab where mofndef = ofndef and mofeti = 2 fetch first row only) , 0)  as cantcaja , coalesce((select mofpara from pipeline/matorfab where mofndef = ofndef and mofeti = 1 fetch first row only) , 0) as cantpalet   from pipeline/ordenfab , pipeline/almar where arcdg = ofcart and  ofcart  like '%".trim($articulo)."%' and ofndef  like '%".trim($of)."%' and offip >= $desde and offip <= $hasta and (ofndef  like 'I%' or ofndef like 'M%' or ofndef like 'C%' or ofndef like 'P%' or ofndef like 'W%' or ofndef like 'R%' ) union
select ofndef , ofscart as ofcart , arnbr , arrdp , ofopmaq , offip , coalesce((select mofpara from pipeline/matorsub where mofndef = ofndef and mofeti = 2 fetch first row only) , 0)  as cantcaja , coalesce((select mofpara from pipeline/matorsub where mofndef = ofndef and mofeti = 1 fetch first row only) , 0) as cantpalet   from pipeline/ordenfab , pipeline/orfabsub,  pipeline/almar where ofndef = ofsndef and arcdg = ofcart and  ofcart  like '%".trim($articulo)."%' and ofndef  like '%".trim($of)."%' and offip >= $desde and offip <= $hasta and (ofndef  like 'I%' or ofndef like 'M%' or ofndef like 'C%' or ofndef like 'P%' or ofndef like 'W%' or ofndef like 'R%' )
order by offip desc, ofndef desc , ofcart  desc ".$finsql;
//and ( ofopmaq not in (select mqpstcod from pipeline/mstmqpst where mqpstalm in (100 , 710) and mqpstcod like 'MAQ%') )



$resultped=odbc_exec($cid , $sqlped) or die(exit("Error en odbc_exec")); 
 

//echo $sqlped;


echo "<table id='tablaof' class='tablaof'><tr>";
echo "<th>OF</th>";
//echo "<th>SERIE</th>";
echo "<th>REFERENCIA</th>";
echo "<th>DESCRIPCION</th>";
echo "<th>FECHA PLANIF</th>";
//echo "<th>HORA</th>";
//echo "<th>NUMERO</th>";
//echo "<th>TIPO</th>";
echo "<th>CANTIDAD<br>CAJA</th>";
echo "<th>CANTIDAD<br>PALET</th>";

//echo "<th>SERIE</th>";

echo "<th>MAQUINA/PUESTO</th>";
echo "<th>REFERENCIA</th>";
echo "<th>TIPO</th>";
echo "<th>FORMATO</th>";
echo "<th>CANT. PIEZAS</th>";
echo "<th>CANT. ETIQUETAS</th>";
echo "<th>ALBARAN</th>";
echo "<th>IMPRIMIR</th>";
//echo "<th>TEST</th>";
//echo "<th>IMPRIMIR<br>TODA LA OF</th>";
//echo "<th>IMPRIMIR<br>TODA LA OF<br>NO LEIDAS</th>";
//echo "<th>BANCO</th></tr>";
//echo "<th>FACT. ADMON.</th>";

$par = 1;
$aux=1;
while (odbc_fetch_row($resultped))
  {
  $ofe = trim(odbc_result($resultped,"ofndef"));
 // $ofn = odbc_result($resultped,"qrofn");
  $fecha=odbc_result($resultped,"offip");
  //  $hora=odbc_result($resultped,"qrhra");
  //$linea =odbc_result($resultped,"hdnln");
  $articulo =trim(odbc_result($resultped,"ofcart"));
  $descripcion =odbc_result($resultped,"arnbr");
  $referencia =odbc_result($resultped,"arrdp");
  $cantidad =odbc_result($resultped,"cantcaja");
  $cantidadpalet =odbc_result($resultped,"cantpalet");
 $usuario =trim(strtoupper($_SESSION["UserName"]));
  $qrmaq  =odbc_result($resultped,"ofopmaq");
  //$qrnser = odbc_result($resultped,"qrnser");
  //$tipo = odbc_result($resultped,"qrtpo");
  
  
  $tipo = "CAJA";
  $formato = "A5";
  //if ($tipo=="PALET") $tipo2 = "PA";
  $ofn = 0;
  //$tipo=$tipo2;
	echo "<tr><td>$ofe</td>";

  echo "<td>$articulo</td>";
   echo "<td>$descripcion</td>";
  echo "<td>$fecha</td>";
 //   echo "<td>$hora</td>";
  //echo "<td>$ofn</td>";
 // echo "<td>$tipo</td>";

  echo "<td>$cantidad</td>";
  echo "<td>$cantidadpalet</td>";
  //echo "<td>$qrnser</td>";
  echo "<td>$qrmaq</td>";
  echo "<td>$referencia</td>";
  echo '<td><select name="tipoeti" id="tipoeti" onChange=""><option value="">Caja/Palet</option>';

   
  echo '<option value="CAJA">CAJA</option>';
  echo '<option value="PALET">PALET</option>';
  
  
  echo '</select></td>';

  echo '<td><select name="formatoeti" id="formatoeti" onChange=""><option value="">Formato Eti</option>';

   
  echo '<option value="A5">A5</option>';
  echo '<option value="A6">A6</option>';
  echo '<option value="B6">B6</option>';
  
  echo '</select></td>';

  echo '<td><input type="text" name="piezas" id="piezas" value = "'.$eti_ini.'" onChange=""/></td>';
  echo '<td><input type="text" name="etiquetas" id="etiquetas" value = "'.$eti_ini.'" onChange="if(document.getElementById(\'tablaof\').rows['.$aux.'].cells[8].childNodes[0].options[document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[8].childNodes[0].selectedIndex].text==\'CAJA\') { document.getElementById(\'tablaof\').rows['.$aux.'].cells[10].childNodes[0].value = document.getElementById(\'tablaof\').rows['.$aux.'].cells[4].innerText * document.getElementById(\'tablaof\').rows['.$aux.'].cells[11].childNodes[0].value;} if(document.getElementById(\'tablaof\').rows['.$aux.'].cells[8].childNodes[0].options[document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[8].childNodes[0].selectedIndex].text==\'PALET\') { document.getElementById(\'tablaof\').rows['.$aux.'].cells[10].childNodes[0].value = document.getElementById(\'tablaof\').rows['.$aux.'].cells[5].innerText * document.getElementById(\'tablaof\').rows['.$aux.'].cells[11].childNodes[0].value;}"/></td>';
  echo '<td><input type="text" name="albaran" id="albaran" value = "'.$eti_ini.'" onChange=""/></td>';

  //echo "<td>$pedido</td>";http://matrival.no-ip.org/QSweb/pdp001.php?pedido=31146
      // echo "<td><a href='almacen/etiqueta_odette_reprint.php?of=$ofe&numero=$ofn&referencia=$articulo&tipo=$tipo&usr=$usuario&size=B6' target='_blank'>Etiqueta</a></td>";
  //referencia=600CLBE002&numero=198&of=I%20-%20094572&tipo=CAJA&usr=SJUAN&size=B6
  //echo "<td><a href='almacen/etiqueta_odette_reprints.php?of=$ofe&referencia=$articulo&tipo=$tipo&usr=$usuario&size=B6&leidas' target='_blank'>Todas las<br>Etiquetas</a></td>";


 // echo "<td><a href='almacen/etiqueta_odette.php?of=$ofe&referencia=$articulo&tipo=document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[8].childNodes[0].options[document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[8].childNodes[0].selectedIndex].text & usr=$usuario &size=document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[9].childNodes[0].options[document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[9].childNodes[0].selectedIndex].text&leidas=no' target='_blank'>Imprimir</a></td>";

  //echo  '<td><input type="button" name="test" id="test" value = "'.$aux.'" onClick="window.open(\'index.html\')"></td>';

  echo  '<td><input type="button" name="test" id="test" value = "IMPRIMIR" onClick="if(((document.getElementById(\'tablaof\').rows['.$aux.'].cells[8].childNodes[0].options[document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[8].childNodes[0].selectedIndex].text==\'CAJA\') || (document.getElementById(\'tablaof\').rows['.$aux.'].cells[8].childNodes[0].options[document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[8].childNodes[0].selectedIndex].text==\'PALET\')) && ((document.getElementById(\'tablaof\').rows['.$aux.'].cells[9].childNodes[0].options[document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[9].childNodes[0].selectedIndex].text==\'B6\') || (document.getElementById(\'tablaof\').rows['.$aux.'].cells[9].childNodes[0].options[document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[9].childNodes[0].selectedIndex].text==\'A6\')  || (document.getElementById(\'tablaof\').rows['.$aux.'].cells[9].childNodes[0].options[document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[9].childNodes[0].selectedIndex].text==\'A5\'))) { printEtiquetasOF( '.$aux.' ) } else { alert(\'Seleccion Tipo y Formato\')}" ></td>'; 

  //echo  '<td><input type="button" name="test" id="test" value = "'.$aux.'" onClick="window.open(\'almacen/etiqueta_odette.php?of=$ofe&referencia=$articulo&tipo=document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[8].childNodes[0].options[document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[8].childNodes[0].selectedIndex].text & usr=$usuario &size=document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[9].childNodes[0].options[document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[9].childNodes[0].selectedIndex].text&leidas=no\', \'_blank\' )" ></td>'; 
 //echo  '<td><input type="button" name="test" id="test" value = "'.$aux.'" onClick="alert(document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[8].innerText  + \' <br>**<br>  \' +  document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[8].childNodes[0].options[document.getElementById(\'tablaof\').rows[ '.$aux.'].cells[8].childNodes[0].selectedIndex].text)"/></td>';

$aux++;
  }
odbc_close($cid);
echo "</table>";




?>

<script>

     function etis_of(){	
//window.location.href = window.location.href.split('?')[0]+"?estructura="+ document.getElementById('referencia').value +"&desde="+ document.getElementById('desde').value +"&hasta="+ document.getElementById('hasta').value;


	 var desde = new Date().toISOString().slice(0,10).replace(/-/g,"");
    if (document.getElementById('desde')!=null) desde = document.getElementById('desde').value;
    var hasta = new Date().toISOString().slice(0,10).replace(/-/g,"");
     if (document.getElementById('hasta')!=null) hasta = document.getElementById('hasta').value;
    var ofe = '';
     if (document.getElementById('ofe')!=null) ofe = document.getElementById('ofe').value;
    var articulo = '';
     if (document.getElementById('articulo')!=null) articulo = document.getElementById('articulo').value;
       var maquina = '';
     if (document.getElementById('maquina')!=null) articulo = document.getElementById('maquina').value;
       var etiini = '';
     if (document.getElementById('etiini')!=null) etiini = document.getElementById('etiini').value;
    
      var etifin = '';
     if (document.getElementById('etifin')!=null) etifin = document.getElementById('etifin').value;
    
    
    
    $.ajax({
  url: "MRPII/etiquetasOF.php"+"?of="+ ofe +"&desde="+ (desde - 1) +"&hasta="+ hasta+"&maquina="+ maquina+"&articulo="+ articulo+"&etiini="+ etiini+"&etifin="+ etifin,
  cache: false,
  async: true,
  beforeSend: function()
    {
         $("#tabla").empty();
	 $("#tabla").append("<c><img style='height: 100%; width: 100%; object-fit: contain' src='images/rolling.gif' /></c>");
    },
   success: function(html){
    
      $("#tabla").empty();
    $("#tabla").append(html);
    $('#tablad').DataTable( {
    	 paging: false,
    	 fixedHeader: {
        header: true,
        footer: true
    },
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
    } );
  }
});
    
    
    
    
/*    
$.ajax({
  //url: "MRPII/ListadoOFs.php?articulo=%&desde=" + <?php echo date('Y-m-d', strtotime("-7 days", strtotime( date('Y/m/d')))); ?> + "&hasta=" + <?php echo $hasta = date('Y-m-d', strtotime(date('Y/m/d'))); ?> + "&estado=%&tipo=%&almacen=201",
  
   url: "MRPII/explosion_referencias.php"+"?estructura="+ referencia +"&desde="+ desde +"&hasta="+ hasta,
  cache: false,
  async: false,
   success: function(html){
   $("#tabla").empty();
    $("#tabla").append(html);
  }
});    */
}
    

function printEtiquetasOF(fila){

//alert(document.getElementById('tablaof').rows[fila].cells[10].childNodes[0].value);
window.open('almacen/etiqueta_odette.php?of='+document.getElementById('tablaof').rows[fila].cells[0].innerText+'&referencia='+document.getElementById('tablaof').rows[fila].cells[1].innerText+'&tipo='+document.getElementById('tablaof').rows[fila].cells[8].childNodes[0].options[document.getElementById('tablaof').rows[ fila].cells[8].childNodes[0].selectedIndex].text+' &usr=QSWEB&size=' +document.getElementById('tablaof').rows[ fila].cells[9].childNodes[0].options[document.getElementById('tablaof').rows[ fila].cells[9].childNodes[0].selectedIndex].text + '&copias=1&cantidad='+document.getElementById('tablaof').rows[fila].cells[10].childNodes[0].value+'&fecha=&muelle=&ref=-1&asn=', '_blank' );

}

function imp_etis_of(){	
//window.location.href = window.location.href.split('?')[0]+"?estructura="+ document.getElementById('referencia').value +"&desde="+ document.getElementById('desde').value +"&hasta="+ document.getElementById('hasta').value;


	 var desde = new Date().toISOString().slice(0,10).replace(/-/g,"");
    if (document.getElementById('desde')!=null) desde = document.getElementById('desde').value;
    var hasta = new Date().toISOString().slice(0,10).replace(/-/g,"");
     if (document.getElementById('hasta')!=null) hasta = document.getElementById('hasta').value;
    var ofe = '';
     if (document.getElementById('ofe')!=null) ofe = document.getElementById('ofe').value;
    var articulo = '';
     if (document.getElementById('articulo')!=null) articulo = document.getElementById('articulo').value;
       var maquina = '';
     if (document.getElementById('maquina')!=null) articulo = document.getElementById('maquina').value;
       var etiini = '';
     if (document.getElementById('etiini')!=null) etiini = document.getElementById('etiini').value;
    
      var etifin = '';
     if (document.getElementById('etifin')!=null) etifin = document.getElementById('etifin').value;
    
    
    
    $.ajax({
  url: "MRPII/imprimirEtiquetasOF.php"+"?of="+ ofe +"&desde="+ (desde - 1) +"&hasta="+ hasta+"&maquina="+ maquina+"&articulo="+ articulo+"&etiini="+ etiini+"&etifin="+ etifin,
  cache: false,
  async: true,
  beforeSend: function()
    {
         $("#tabla").empty();
	 $("#tabla").append("<c><img style='height: 100%; width: 100%; object-fit: contain' src='images/rolling.gif' /></c>");
    },
   success: function(html){
    
      $("#tabla").empty();
    $("#tabla").append(html);
    $('#tablad').DataTable( {
    	 paging: false,
    	 fixedHeader: {
        header: true,
        footer: true
    },
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
    } );
  }
});
    
</script>