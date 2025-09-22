<?php



        
$barra =$_GET['orden'];
$tipo = $_GET["tipo"];
$articuloet = $_GET["articulo"];

$dsn="CROMO"; 
$usuario="sa"; 
$password="ingenetSQL#2008"; 
$cidcromo=odbc_connect($dsn,$usuario,$password); 

if (!$cidcromo){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
}     


$cidcromo2 =  mysql_connect('localhost', 'root', 'mirzam');
if (!$cidcromo2) {
    die('No pudo conectarse: ' . mysql_error());
}
mysql_select_db('cromo');
$sqlart=" ";
if ($articuloet!="") $sqlart=" and segart = '".$articuloet."'";

$sql = "select segcod,  segart, segpen  from segbarra where  segcod = ".$barra." ".$sqlart;
//echo $sql;
$result=mysql_query($sql) or die(exit("Error en mysql_query")); 
$row =mysql_fetch_row($result);
$articulo = mysql_result($result,0,'segart');
$of = '';//mysql_result($result,'brndef');
$pendiente = mysql_result($result,0,'segpen');
$fecha=date("Ymd");



//$ultima =mysql_result($resultmax,0);

//if($pendiente > 0) 
    {

$hora=date("H:i:s");


	  $sqlart = "select arnbr from almar where arcdg = '".$articulo."' ";
          //echo $sqlart;
	  $resultart=mysql_query($sqlart) or die(exit("Error en odbc_exmysql_queryec")); 
	  $row = mysql_fetch_row($resultart);
	  $descripcion = mysql_result($resultart,0,'arnbr');
	  //odbc_free_result($resultart);
	  
	  
	  
	  /*$sqlart = "select arnbr from almar where arcdg = '".odbc_result($result,'brart')."' ";
	  $resultart=odbc_exec($cidpipeline,$sqlart) or die(exit("Error en odbc_exec")); 
	  $row = odbc_fetch_row($resultart);
	  $descripcion = odbc_result($resultart,1);
	  odbc_free_result($resultart);*/
          
          //echo $tipo." ".$articuloet;
          if ($tipo=="OK") $tipo_etiquetas = "PRODUCTO INSPECCIONADO OK";
          if ($tipo=="CU") $tipo_etiquetas = "PRODUCTO EN CUARENTENA";
          if (($tipo=="PI") || ($tipo=="PC")) $tipo_etiquetas = "CAJA DE PICO";
          if (($tipo=="PT") || ($tipo=="PD"))$tipo_etiquetas = "PRODUCTO PENDIENTE DE INSPECCIONAR";
          if ($tipo=="MU") $tipo_etiquetas = "PRODUCTO A MURO";
          if ($tipo=="MO") $tipo_etiquetas = "PRODUCTO A MONTAJE";
          
          
          echo "<H1>SE VAN A GENERAR ETIQUETAS DE TIPO ".$tipo_etiquetas."</H1>";
          
          
	  echo '<form  id="frmDatos" name="frmDatos" >';// method="GET" >';/*action="rellenatabla()"*/
          echo '<p>';
	    echo ' Barra: <input type="text" name="barra" id = "etbarra" value='.$barra.' disabled/> ARTICULO: ';


          
          $sqlart = "select count(*) from segbarra where segcod = $barra";
          //echo $sqlart;
	  $resultart=mysql_query($sqlart) or die(exit("Error en odbc_exmysql_queryec")); 
	  $row = mysql_fetch_row($resultart);
	  $piezas = mysql_result($resultart,0,0);
          
         /* if ($piezas == 1) {

echo '  <input type="text" name="pieza" id = "etpieza" value='.$articulo.' disabled/>  - <input type="text" name="descripcion" id = "etdescripcion" size="40" value="'.$descripcion.'"><BR><BR>';
          } else {*/
              echo '  <input type="text" name="pieza" id = "etpieza" value='.$articulo.' disabled/> - <input type="text" name="descripcion" id = "etdescripcion" size="40" value="'.$descripcion.'">';
            $sqlof="select distinct segcod, segart , arnbr from segbarra, almar where arcdg = segart and segcod = $barra";
            
		//echo $sqlof;
            echo '<select name="pieza" id="pieza" onchange="lanzamientoetiquetas(\''.$tipo.'\');">'; 
//echo '<option value="0"> TODOS</option>';

		
		$resultof=mysql_query($sqlof) or die(exit("Error en odbc_exec")); 

                


		$lineas = mysql_num_rows($resultof);

		for ($i = 1; $i <= $lineas; $i++) {

		mysql_fetch_row($resultof);

		
                 $spieza = mysql_result($resultof,$i - 1,"segart");	
			$sdescripcion = mysql_result($resultof,$i - 1,"arnbr");	
$seleccionado = "";
                            if ($spieza==$articulo) $seleccionado = " selected ";
		 echo '<option '.$seleccionado.' value='.$spieza.'>'.$spieza." - ".$sdescripcion.'</option>';   

		}

		echo '</select><BR><BR>';
        //  }
                
	    echo ' Cantidad Pte.: <input type="text" name="pendiente"  value="'.$pendiente.'" disabled/>';
            
            echo ' Operario:  <input type="text" name="operario"  value="'.$_GET["operario"].'" disabled/>';
            $fechaonoff = "";
            $fechaonoff = "disabled";
            echo '<BR><BR> Fecha: <input id="etfecha" type="text" name="fecha"  value="'.$fecha.'" '.$fechaonoff.' />';
            
            echo ' Hora: <input type="text" name="hora"  value="'.$hora.'" disabled />';

		echo "<BR><BR>";
		
		
		//casilla cantidad
		echo 'Cantidad Piezas: <input type="number" id="etcant" name="cantidad"  /> <br><br>';
		//boton OK
		echo 'Numero de Cajas: <input type="number" id="etcajas" name="cajas"  /> <br><br>';
                
                echo 'Cantidad por Caja: <input type="number" id="udmcajas" name="udmcajas"  /> ';	
		
                
                
                
		echo '<input type="button" id ="registrar" value="IMPRIMIR" onClick="ImprimirEtiquetas('.$tipo.');">';
                echo "                        ";
                
		echo '<input type="button" value="VOLVER" style="float:right" onClick="Volver();">';
                echo '</p>';
		echo '</form>';
		
		} 
?>
