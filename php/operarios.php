<?php


$dsn="SAGE"; 
$usuario="sa"; 
$password="admin000"; 
$cid=odbc_connect($dsn,$usuario,$password); 
if (!$cid){ 
    exit("Ya ocurrido un error tratando de conectarse con el origen de datos."); 
}     

$puesto = $_GET["puesto"];
$referencia = $_GET["referencia"];
//$cara = $_GET["cara"];
$cara = "";
$equipo = "";
$fecha = date("Ymd");
$hora = date("H:i:s");


$sql = "select distinct o.operario , nombreoperario from operarios o , khitt_loginoperarios lo where o.operario = lo.operario and fechafin is null   and centrotrabajo = '$puesto' order by nombreoperario";//and opeffin = '00:00:00'

//echo $sqlope;
$result=odbc_exec($cid,$sql)  or die(exit("Error en mysql_query")); 

//while ($row=mysql_fetch_row($resultope))
 while (odbc_fetch_row($result)) {
//echo $i;
$operario = odbc_result($result,"operario");
                $nombre = trim(odbc_result($result,"nombreoperario"));

$horas = 0;
/*
if ($referencia!="undefined") {

$sqlhoras = "SELECT (sum(hour(seghrhom)+minute(seghrhom)/60+
second(seghrhom)/3600))                     
FROM pipeline/segofs WHERE segcope ='$operario' and segcart = '".trim($referencia)."' ";

$resultof=odbc_exec($cidpipeline,$sqlhoras) or die(exit("Error en odbc_exec")); 


$horas =  odbc_result($resultof,1);

}*/
$color = "lightblue";

if ($horas<16) $color = "yellow";
if ($horas<8) $color = "red";

if ($horas>24) $color = "green";

echo '<H1 class="ui-btn ui-input-btn ui-corner-all ui-shadow" onClick="user_logout('.$operario.');" style="font-size: 50% ; background:'.$color.'"><center>'.$operario.' '.number_format($horas,2).'<BR>'.$nombre.'<input type="button" class="ui-btn ui-input-btn ui-corner-all ui-shadow" style="size: 100%; height : 50px; background:'.$color.' ;font-size: 60%" data-inline="true" value="'.$operario.' '.$nombre.'" id="logout"></center></H1>'; //onClick="user_logout('.$operario.');"
//class="ui-btn ui-input-btn ui-corner-all ui-shadow"




}

?>


	