javascript:
var Unidades=['unit_input_spear','unit_input_sword','unit_input_axe','unit_input_spy','unit_input_light','unit_input_heavy','unit_input_ram','unit_input_catapult','unit_input_knight','unit_input_snob']; //Unidades del mundo por orden en la plaza de reuniones por columnas
var Activar=[false,false,false,false,true,false,false,false,false,false];    //Correspondiente a la lista de arriba de unidades: true activa la unidad para granjear, false para desactivarla. (obviamente hay unidades que jamas deberian activarse)
var Cuantos=[]; // No tocar
var Capacidad=[]; //No tocar
//Aqui si, colocar el maximo de capacidad para cada unidad segun el mundo
Capacidad['unit_input_spear']=[25];
Capacidad['unit_input_sword']=[15];
Capacidad['unit_input_axe']=[10];
Capacidad['unit_input_spy']=[0];
Capacidad['unit_input_light']=[80];
Capacidad['unit_input_heavy']=[50];
Capacidad['unit_input_ram']=[0];
Capacidad['unit_input_catapult']=[0];
Capacidad['unit_input_knight']=[100];
Capacidad['unit_input_snob']=[0];
var espiar=true; //Colocar true para enviar 1 espia con cada granjeo, false para no enviarlo
var doc=document;if(window.frames.length>0)doc=window.main.document;url=document.URL;
if(url.indexOf('screen=place')==-1)alert('Debes ejecutar el script en la Plaza de Reuniones');
else{
    var coord="476|445. 475|447"; //Coordenadas de los pueblos a saquear, separados por puntos XXX|YYY.XXX|YYY
    coords=coord.split(".");
    var tope="320.640";    //Cuanto saquear (capacidad) de <cada></cada> pueblo separado por puntos (.)
    topes=tope.split(".");
    var t=0;
    for(var i=0; i < coords.length; i++){
        $("table.vis > tbody > tr > td > span > a > span").each(function(){
            var existe=false;
            if($(this).html().indexOf(coords[i]) != -1){
                existe = true;
            }    
            if(!existe){
                selectAllUnits(true);
                var activos=0;
                for(var j=0;j<Unidades.length;j++){
                    if(Activar[j]){
                        if($("#"+Unidades[j]).val()==0 || Capacidad[Unidades[j]]==0){
                            Activar[j]=false;
                            Cuantos[j]=0;
                        }else{
                            Cuantos[j]=$("#"+Unidades[j]).val();
                        }
                    }else{
                        Cuantos[j]=0;
                    }
                }
                selectAllUnits(false);
                var aux=0;
                for(var k=0;k<Cuantos.length;k++){
                    if(aux==0){
                        var top=topes[i];
                    }else{
                        var top=aux;
                    }
                    var N=Math.ceil(top/Capacidad[Unidades[k]]);
                    if(N > Cuantos[k]){
                        N=Cuantos[k];
                        $("#"+Unidades[k]).val(N);
                        aux=top-N*Capacidad[Unidades[k]];
                        t+=Capacidad[Unidades[k]]*N;
                    }else{
                        aux=0;
                        $("#"+Unidades[k]).val(N);
                        var x=coords[i].split("|")[0];
                        var y=coords[i].split("|")[1];
                        $("#inputx").val(x);
                        $("#inputy").val(y);
                        t+=Capacidad[Unidades[k]]*N;
                        if(espiar) $("#unit_input_spy").val(1);
                        break;
                    }
                }
                if(t < topes[i]){
                    alert("No hay suficientes unidades activas para cubrir los "+topes[i]+" recursos");
                }
                return false;
            }
        });
        if(!existe){ break; }
    }
}  