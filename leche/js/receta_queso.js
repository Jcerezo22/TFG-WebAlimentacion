let tipoLeche = null;

if (document.addEventListener)
	window.addEventListener("load", inicio)
else if (document.attachEvent)
	window.attachEvent("onload", inicio);

function inicio(){
    let contenedor = document.querySelector(".contenedorOpciones");
    let barraPh = document.getElementById("phRango");
    let barraTemp = document.getElementById("tempRango");
    let barraTiem = document.getElementById("tiemRango");
    let botonSimular = document.getElementById("simularQueso");

    if (document.addEventListener) {
        contenedor.addEventListener("click", selecionarTipoLeche);
        barraPh.addEventListener("input", actualizarValorPh);
        barraTemp.addEventListener("input", actualizarValorPh);
        barraTiem.addEventListener("input", actualizarValorPh);
        botonSimular.addEventListener("click", simularQueso);
    } else if (document.attachEvent) {
        contenedor.attachEvent("onclick", selecionarTipoLeche);
        barraPh.attachEvent("oninput", actualizarValorPh);
        barraTemp.attachEvent("oninput", actualizarValorPh);
        barraTiem.attachEvent("oninput", actualizarValorPh);
        botonSimular.attachEvent("onclick", simularQueso);
    }

    barraPh.dispatchEvent(new Event('input'));
    barraTemp.dispatchEvent(new Event('input'));
    barraTiem.dispatchEvent(new Event('input'));
}


function selecionarTipoLeche(event){

    let opcionesLeche = document.querySelectorAll('.opcionLeche');
    tipoLeche = '';

    event = event || window.event;
    let target = event.target

    while (target && !target.classList.contains('opcionLeche')) {
        target = target.parentNode;
    }

    if (target) {
        opcionesLeche.forEach(opcion => opcion.classList.remove('selected'));

        target.classList.add('selected');
        tipoLeche = target.id;
        
        console.log(tipoLeche);
    }
}

function actualizarValorPh(event){
    let barra = event.target;

    let valor = parseFloat(barra.value);
    let min = parseFloat(barra.min);
    let max = parseFloat(barra.max);

    let porcentaje = ((valor - min) / (max - min)) * 100;

    if (barra.id === "phRango") {
        document.getElementById("phValorMov").textContent = valor.toFixed(1);
    } else if (barra.id === "tempRango") {
        document.getElementById("tempValorMov").textContent = valor;
    } else if (barra.id === "tiemRango"){
        document.getElementById("tiemValorMov").textContent = valor;
    }

    let colorIzquierda = "#77b4d8"; 
    let colorDerecha = "#ddd";      

    barra.style.background = `linear-gradient(to right, ${colorIzquierda} 0%, ${colorIzquierda} ${porcentaje}%, ${colorDerecha} ${porcentaje}%, ${colorDerecha} 100%)`;
}

function calcularQueso(leche, ph, cuajo, temperatura, tiempo) {
    let descripcion = '';
    let textura = '';
    let puntajeTextura = 0;

    // Leche
    if (leche === 'oveja') {
        descripcion += '&#x1f411 La leche de oveja → Rica en grasa y proteína, produce un queso más cremoso y untuoso.<br />';
        puntajeTextura += 1;
    } else if (leche === 'cabra') {
        descripcion += '&#x1f410 La leche de cabra → Más digestiva y blanca, tiende a dar un queso más suave y con menos grasa.<br />';
        puntajeTextura += 0;
    } else if (leche === 'vaca') {
        descripcion += ' &#x1f404 La leche de vaca → Es común y equilibrada, da como resultado un queso de textura media.<br />';
        puntajeTextura += 0;
    }

    // pH
    if (ph < 4.6) {
        descripcion += '&#x26a0;&#xfe0f; El pH es demasiado bajo → Lo que genera una coagulación excesiva: el queso queda seco y quebradizo.<br />';
        puntajeTextura -= 2;
    } else if (ph > 5.0) {
        descripcion += '&#x26a0;&#xfe0f; El pH es demasiado alto → Fuera del rango ideal de 4.6-5.0,  por lo que la leche no coagula bien. El queso será blando o no se formará.<br />';
        puntajeTextura -= 1;
    } else {
        descripcion += ' &#x2705 El pH está en el rango óptimo → Lo que da un queso bien formado.<br />';
        puntajeTextura += 2;
    }

    // Cuajo
    if (cuajo === 'animal') {
        descripcion += '&#x1f9ea El cuajo animal → Es rápido y efectivo, ideal para una coagulación firme.<br />';
        puntajeTextura += 2;
    } else if (cuajo === 'vegetal') {
        descripcion += '&#x1f33f El cuajo vegetal → Actúa más lento y puede dejar sabores amargos si no se controla bien.<br />';
        puntajeTextura += 0;
    } else if (cuajo === 'microbiano') {
        descripcion += '&#x1f52c El cuajo microbiano → Es más lento y suave, ideal para opciones vegetarianas pero menos firme.<br />';
        puntajeTextura -= 1;
    }
  
    // Temperatura
    if (temperatura < 30) {
        descripcion += "&#x2744;&#xfe0f; La temperatura es demasiado baja → Esto retrasa la coagulación y produce un queso suelto.<br />";
        puntajeTextura -= 2;
    } else if (temperatura > 35) {
        descripcion += "&#x1f525 La temperatura es demasiado alta → Lo que puede hacer que el queso quede seco o grumoso.<br />";
        puntajeTextura -= 1;
    } else {
        descripcion += "&#x1f321;&#xfe0f; La temperatura está en el rango ideal (30-35°C) → Para activar el cuajo y formar un buen gel.<br />";
        puntajeTextura += 2;
    }
  
    // Tiempo
    if (tiempo < 30) {
        descripcion += "El tiempo fue insuficiente → La coagulación no se completó, y el queso quedó incompleto o líquido.<br />";
        puntajeTextura -= 2;
    } else if (tiempo > 60) {
        descripcion += "El tiempo fue excesivo → Esto puede endurecer demasiado el queso o separarlo en suero y masa.<br />";
        puntajeTextura -= 1;
    } else {
        descripcion += "El tiempo fue adecuado → Para que el queso coagulara correctamente.<br />";
        puntajeTextura += 2;
    }


    if (puntajeTextura >= 6) {
        textura = 'cremosa';
    } else if (puntajeTextura >= 3) {
        textura = 'media';
    } else if (puntajeTextura >= 0) {
        textura = 'blanda';
    } else if (puntajeTextura >= -2) {
        textura = 'quebradiza';
    } else {
        textura = 'liquida';
    }
  
    return { textura, descripcion };
}

function simularQueso() {
    let resultadoDiv = document.getElementById('resultadoQueso');
    resultadoDiv.style.display = 'block';
    
    if (!tipoLeche) {
        document.getElementById('descripcion').textContent = "¡Selecciona un tipo de leche!";
    }
    else{
        let ph = parseFloat(document.getElementById('phRango').value);
        let cuajoInput  = document.querySelector('input[name="tipoCuajo"]:checked');
        let temp = parseInt(document.getElementById('tempRango').value);
        let time = parseInt(document.getElementById('tiemRango').value);

        if(!cuajoInput){
            document.getElementById('descripcion').textContent = "¡Selecciona un tipo de cuajo!";
        }
        else{
            let cuajo = cuajoInput.value 
            let resultado = calcularQueso(tipoLeche,ph,cuajo,temp,time);

            document.getElementById('descripcion').innerHTML = resultado.descripcion;

            let quesoVisual = '';

            if (resultado.textura === 'media') {
                quesoVisual = '🧀';
            } else if (resultado.textura === 'quebradiza') {
                quesoVisual = '🧀🧀';
            } else {
                quesoVisual = '🧀🧀🧀';
            }

            document.getElementById('quesoVisual').textContent = quesoVisual; 
        }
    }
}