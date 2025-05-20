let tipoLeche = null;

if (document.addEventListener)
	window.addEventListener("load", inicio)
else if (document.attachEvent)
	window.attachEvent("onload", inicio);

function inicio(){
    let contenedor = document.querySelector(".contenedorOpciones");
    let barraTemp = document.getElementById("tempRango");
    let barraTiem = document.getElementById("tiemRango");
    let botonSimular = document.getElementById("simularYogur");

    if (document.addEventListener) {
        contenedor.addEventListener("click", selecionarTipoLeche);
        barraTemp.addEventListener("input", actualizarValorRangos);
        barraTiem.addEventListener("input", actualizarValorRangos);
        botonSimular.addEventListener("click", simularYogur);
    } else if (document.attachEvent) {
        contenedor.attachEvent("onclick", selecionarTipoLeche);
        barraTemp.attachEvent("oninput", actualizarValorRangos);
        barraTiem.attachEvent("oninput", actualizarValorRangos);
        botonSimular.attachEvent("onclick", simularYogur);
    }

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

function actualizarValorRangos(event){
    let barra = event.target;

    let valor = parseFloat(barra.value);
    let min = parseFloat(barra.min);
    let max = parseFloat(barra.max);

    let porcentaje = ((valor - min) / (max - min)) * 100;

    if (barra.id === "tempRango") {
        document.getElementById("tempValorMov").textContent = valor;
    } else if (barra.id === "tiemRango"){
        document.getElementById("tiemValorMov").textContent = valor;
    }

    let colorIzquierda = "#77b4d8"; 
    let colorDerecha = "#ddd";      

    barra.style.background = `linear-gradient(to right, ${colorIzquierda} 0%, ${colorIzquierda} ${porcentaje}%, ${colorDerecha} ${porcentaje}%, ${colorDerecha} 100%)`;
}

function calcularYogur(leche, lactobacillus, streptococcus, temperatura, tiempo) {
    let descripcion = '';
    let textura = '';
    let puntajeTextura = 0;

    // Leche
    if (leche === 'cabra') {
        descripcion += '&#x1f410 La leche de cabra → Es más digestiva y ligera. Tiende a formar yogures más suaves y con menos firmeza.<br />';
        puntajeTextura += 1;
    } else if (leche === 'vaca') {
        descripcion += '&#x1f404 La leche de vaca → Es equilibrada en grasa y proteína. Ideal para un yogur cremoso y bien formado.<br />';
        puntajeTextura += 0;
    } else if (leche === 'sinlactosa') {
        descripcion += '&#x26a0;&#xfe0f; Leche sin lactosa → Puede dificultar la fermentación porque las bacterias se alimentan de lactosa.<br />';
        puntajeTextura -= 1;
    }

    // Bacterias
    if (lactobacillus && streptococcus) {
        descripcion += '&#x1f9a0; Has añadido *Lactobacillus bulgaricus* y *Streptococcus thermophilus* → ¡Perfecta simbiosis! Juntas acidifican y espesan mejor.<br />';
        puntajeTextura += 3;
    } else if (lactobacillus || streptococcus) {
        descripcion += '&#x1f9a0; Solo has añadido una bacteria → La fermentación será más lenta y menos efectiva.<br />';
        puntajeTextura += 0;
    } else{
        descripcion += '&#x26a0;&#xfe0f; No has añadido bacterias → No se puede iniciar la fermentación sin cultivos activos.<br />';
        puntajeTextura -= 3;
    }
  
    // Temperatura
    if (temperatura >= 42 && temperatura <= 45) {
        descripcion += '&#x1f321;&#xfe0f; Temperatura ideal → Las bacterias trabajan eficientemente entre 42 y 45°C.<br />';
        puntajeTextura += 2;
    } else if (temperatura < 42) {
        descripcion += '&#x2744;&#xfe0f; Temperatura baja → Las bacterias no fermentan bien por debajo de 40°C. Yogur quedará líquido.<br />';
        puntajeTextura -= 2;
    } else if (temperatura > 47){
        descripcion += '&#x1f525; Temperatura alta → Puede matar bacterias y hacer que el yogur se corte.<br />';
        puntajeTextura -= 1;
    }
  
    // Tiempo
    if (tiempo >= 6 && tiempo <= 8) {
        descripcion += '&#x23f3; Tiempo ideal → Las bacterias tienen suficiente tiempo para fermentar y espesar bien la leche.<br />';
        puntajeTextura += 2;;
    } else if (tiempo < 6) {
        descripcion += '&#x1f550; Tiempo insuficiente → El yogur no llega a formar su textura ni su acidez características.<br />';
        puntajeTextura -= 2;
    } else if (tiempo >= 9) {
        descripcion += '&#x23f1;&#xfe0f; Tiempo excesivo → El yogur se vuelve demasiado ácido y puede separarse el suero.<br />';
        puntajeTextura -= 1;
    }


    if (puntajeTextura >= 6) {
        textura = 'firme';
    } else if (puntajeTextura >= 3) {
        textura = 'cremoso';
    } else if (puntajeTextura >= 0) {
        textura = 'liquido';
    } else if (puntajeTextura >= -2) {
        textura = 'separado';
    } else {
        textura = 'nofermentado';
    }
  
    return { textura, descripcion };
}

function simularYogur() {
    let resultadoDiv = document.getElementById('resultadoYogur');
    resultadoDiv.style.display = 'block';
    
    if (!tipoLeche) {
        document.getElementById('descripcion').textContent = "¡Selecciona un tipo de leche!";
    }
    else{
        let lactobacillus = document.getElementById('bactLacto').checked;
        let streptococcus = document.getElementById('bactStrep').checked;

        let temp = parseInt(document.getElementById('tempRango').value);
        let time = parseInt(document.getElementById('tiemRango').value);

        let resultado = calcularYogur(tipoLeche, lactobacillus, streptococcus, temp, time);

        document.getElementById('descripcion').innerHTML = resultado.descripcion;

        let nombreImagen = `yogur_${resultado.textura}.png`;
        let rutaImagen = `../img/${nombreImagen}`;

        let imagenYogur = document.getElementById('imagenYogur');
        imagenYogur.src = rutaImagen;
        imagenYogur.alt = `Yogur ${resultado.textura} hecho con leche de ${tipoLeche}`; 
        imagenYogur.style.display = 'block';
    }
}