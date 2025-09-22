
<script language="JavaScript" type="text/javascript" >




function ReImprimir(){
	
	$("#print").html('<object data="http://localhost/reprint.php"/>');
	//	$("#print").html('<object data="http://10.0.2.43/reprint.php"/>');
}

function ImprimirEtiquetas( etof , etart , ettipo , etcant, etcopias , etnum) { 
	//alert("HOLA");
	document.getElementById("imprimir").disabled = 'true';

$("#imrpimir").attr("disabled","disabled");
//alert("Adios");
//alert ( etof +etart + ettipo  + etcant + etcopias ) ;
//alert("PDF");

//if (document.forms["frmDatos"].elements["cajas"].value > 0) {
//alert ($("#barra").val());



	etcant = document.getElementById("etcant").value;


//window.open("http://localhost/print.html");

	//etnum++;
file = "file=orden|"+etof+ "_tipo|" + ettipo+"_etiquetas|"+etcopias+"_cantidad|"+etcant + "_pieza|" +etart + "_puesto|" +posicion + "_serie|" + etnum ;
//alert(file);
//if (posicion =="DOBL8") {

	$.ajax({
                url: 	"php/Etiqueta.php?empresa=1&orden="+etof+ "&tipo=" + ettipo+"&etiquetas="+etcopias+"&cantidad="+etcant + "&pieza=" +etart + "&puesto=" +posicion  + "&serie=" +(etnum + 1),
                cache: false,
                async: false,
                success: function(html){ 
                  //  sleep(2);
                   // document.getElementById("LanzamientoEtiqueta").innerHTML = html; 
                }
                
 });
//	}
/*else {
	
var  puesto = posicion;		

var ip = 10;
//var	puesto= ""+<?php echo "'".$_GET["posicion"]."'";?>+"";
	if ( (puesto == "MAQ12") ||   (puesto == "MAQ21") || (puesto == "MAQ22") || (puesto == "MAQ26") || (puesto == "MAQ31") || (puesto == "MAQ32") || (puesto == "MAQ35") || (puesto == "MAQ33")  || (puesto == "MAQ24")  || (puesto == "MAQ52")   ) ip = 4;
	if ( (puesto == "XXMAQ50") ||   (puesto == "MAQ46")  ) ip = 3;
var ip2=puesto.substring(3,5);
if ( (puesto == "MAQ00")   ) ip2 = 42;

if ( (puesto == "MAQ01")   ) ip2 = 26;
if ( (puesto == "MAQ01")   ) ip3 = 4;

		//$("#print").html('<object data="http://localhost/print.php?file='+file+'"/>');
		$("#print").html('<object data="http://10.0.' + ip + '.' + ip2 + '/print.php?file='+file+'"/>');
	//	sleep(2);
	}
//$("#datos").html('<object style="width: 800 ; background-color: white" data="http://localhost/etiqueta.png"/>');

//$('#content').load("http://localhost/print.php?file=orden|"+etof+ "|tipo|" + ettipo+"|etiquetas|"+etcopias+"|cantidad|"+etcant + "|pieza|" +etart+"");


// $("#datos").empty();
//pi();*/
 
setTimeout(function(){
    etiquetas(  );
},10000);

//etiquetas(  );
}


function lanzamientoetiquetas(tipoet){
    //alert("HOLA");
    //alert(tipoet);
    //alert($( "#pieza" ).val());
    //alert (document.forms["frmDatos"].elements["pieza"].options[ document.forms["frmDatos"].elements["pieza"].selectedIndex].value);
    var modurl = "php/LanzamientoEtiquetaCaja.php" + "?tipo=" + tipoet +"&orden="+ <?php echo $_GET['orden'];?> + "&operario= " + posicion+"&articulo=" + $( "#pieza" ).val();  
/*
http.open("GET", url, false); 
// set up the callback function 
http.onreadystatechange = useHttpResponse; 
http.send(null);
document.getElementById("tabla2").innerHTML = ""; 

*/
//alert (modurl);
//alert (document.forms["frmDatos"].elements["pieza"].options[ document.forms["frmDatos"].elements["pieza"].selectedIndex].value);
$.ajax({
                url: modurl,
                cache: false,
                async: false,
                success: function(html){ 
                    
                    document.getElementById("LanzamientoEtiqueta").innerHTML = html; 
                }
                
 });
 }
</script>

<H1><center>IMPRESION ETIQUETAS</center></H1>



<?php

$barra = $_GET["orden"];
$articulo = "";
if (isset($_GET["referencia"])) $articulo = $_GET["referencia"];
if ($articulo =="undefined") $articulo = "";
$tipo = "";
if (isset($_GET["tipo"])) $tipo = $_GET["tipo"];
if ($tipo =="undefined") $tipo = "";





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




//echo "Impresion etiquetas ".$barra." articulo ".$articulo." tipo ".$tipo." <br>";


//echo "<br>*".$tipo."*"."<br>";
if ((trim($articulo)!="")) {
	if( ($tipo=="")) {

echo '    <div class="ui-block-b" id="CAJA" onclick="etiquetas(\''.$articulo.'\' , \'CAJA\')" style="width: 50% ;  height: 300px; backgroundcolor: red; font-size: 250%; position: blocked; border:1px solid #CCC; background:#DDD; box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);cursor:pointer; vertical-align:middle;  padding: 5px;  text-align: center;">CAJA</div>'; 
echo '    <div class="ui-block-b" id="PALET" onclick="etiquetas(\''.$articulo.'\' , \'PALET\')" style="width: 50% ;  height: 300px; backgroundcolor: red; font-size: 250%; position: blocked; border:1px solid #CCC; background:#DDD; box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);cursor:pointer; vertical-align:middle;  padding: 5px;  text-align: center;">PALET</div>';     
            } else {
echo '<div id="LanzamientoEtiqueta" style="width: 98% ;">';

  echo "<center><H1>SE VAN A GENERAR ETIQUETAS DE TIPO ".$tipo."</H1></center>";
          
          
	  //echo '<form  id="frmDatos" name="frmDatos" >';// method="GET" >';/*action="rellenatabla()"*/
          echo '<p>';
	   // echo ' Barra: <input type="text" name="barra" id = "etbarra" value='.$barra.' disabled/> ARTICULO: '.$articulo;

		if ($tipo=="CAJA") $tipo_eti = 2;
        if ($tipo=="PALET") $tipo_eti = 1;  
        
        
		$subordenes = explode("-",$barra);
		
		//echo $barra;
		
          $sqlart = "select mofpara , mofcant , ofcanral as ral , ofcanteo as cteo , ofcanrch as rch from pipeline/matorfab, pipeline/ordenfab where ofndef = mofndef and mofndef  = '$barra' and ofcart = '$articulo'  and mofeti = $tipo_eti union select mofpara , mofcant  , ofscral as ral, ofscteo as teo , ofscrch as rch from pipeline/matorsub , pipeline/orfabsub where ofsndef = mofndef and mofsubp = ofscart and mofndef  ='$barra' and mofsubp = '$articulo' and mofeti = $tipo_eti";
		  
		  $sqlart = "select mo_unidadescaja , o.codigoarticulo , o.formula
		  from ordenesfabricacion o , articulos a 
		  
		  where o.codigoempresa = 1 and a.codigoempresa = 1 and
			  o.ejerciciofabricacion = ".$subordenes[0]." and o.seriefabricacion = '".$subordenes[1]."' and o.numerofabricacion = ".$subordenes[2]." and 
			  a.codigoarticulo = o.codigoarticulo
		  ";
        //  echo $sqlart;
	  $resultart=odbc_exec($cid,$sqlart) or die(exit("Error en odbc_exec")); 
	  
	  $cantidad = intval(odbc_result($resultart,1));
          $copias = 1;
          
         /* $cteo = odbc_result($resultart,"cteo");
          $cok = odbc_result($resultart,"cok");
          $cnok = odbc_result($resultart,"cnok");*/
          
         // echo "<br>".$copias." ".$cantidad."<br>";
          
        
		
		//casilla cantidad
		echo '<center>Cantidad Piezas: <input type="number" id="etcant" name="cantidad" value="'.$cantidad.'" min ="1" max="'.$cantidad.'"/> <br><br>';
		//boton OK
		echo "<script>$(function () {
   $( \"#etcant\" ).change(function() {
      var max = parseInt($(this).attr('max'));
      var min = parseInt($(this).attr('min'));
      if ($(this).val() > max)
      {
          $(this).val(max);
      }
      else if ($(this).val() < min)
      {
          $(this).val(min);
      }       
    }); 
});</script>";
	//	echo 'Numero de Etiquetas por '.$tipo.' <input type="number" id="etcajas" name="cajas"  disabled value="'.$copias.'"/> <br><br>';
                
          //      echo 'Cantidad por Caja: <input type="number" id="udmcajas" name="udmcajas"  /> ';	
          
          
          if ($tipo=="CAJA") {
          	$tipoult = " ofnetic ";
          	$tipoults = " ofsnetic ";
          }
        if ($tipo=="PALET")  {
        	$tipoult = " ofneti ";
        	$tipoults = " ofsneti ";
        	}	
        
        
           $sqlart = "select $tipoult  from pipeline/ordenfab where ofndef =    '$barra' and ofcart = '$articulo' union select $tipoults  from pipeline/orfabsub where ofsndef =    '$barra' and ofscart = '$articulo'";
         
		 $splitOF = explode('-' , $barra );
		 
		 $sqlart = "select coalesce(max(numeroetiqueta),0) from khitt_etiquetasOF where ordenfabricacion = '".$splitOF[0]."-".$splitOF[1]."-".$splitOF[2]."' and referencia = '".$articulo."' ";
		 
		 // echo $sqlart;
	  $resultart=odbc_exec($cid,$sqlart) or die(exit("Error en odbc_exec")); 
	  
	  $ulteti = odbc_result($resultart,1);
		
                echo 'Ultima Etiqueta: <input type="number" id="ultcaja"  min ="1" max="9999" name="ultcaja" value="'.$ulteti.'" disabled  /> <br> <br>';
        
   
$posicion = $_GET["posicion"];


		echo '<input type="button" id ="imprimir" value="IMPRIMIR" onClick="ImprimirEtiquetas(\''.$barra.'\' , \''.$articulo.'\' , \''.$tipo.'\' , \''.$cantidad.'\' , \''.$copias.'\',  \''.($ulteti + 1).'\');"></center>';
                echo "                        ";
            
               
	
                echo '</p>';
		//echo '</form>';
		}
		echo '<div id="qprint" style="height:400px;" name ="qprint">
		</div>';
		echo '<div id="reprint"  name ="reprint">';
		echo "<br><br>";
                echo '<center><input  style="vertical-align : bottom;"type="button" id ="reimprimir" value="REIMPRIMIR ULTIMA ETIQUETA" onClick="ReImprimir();"></center>';
		echo '</div>';
		
	
		
		
		echo '<div id="print" name ="print">
		</div>';
}


?>

