if (document.addEventListener)
	window.addEventListener("load", inicio)
else if (document.attachEvent)
	window.attachEvent("onload", inicio);

function inicio(){
    let contenedor = document.querySelector(".contenedorOpciones");
    let barraPh = document.getElementById("phRango")

    if (document.addEventListener) {
        contenedor.addEventListener("click", selecionarTipoLeche);
        barraPh.addEventListener("input", actualizarValorPh);
    } else if (document.attachEvent) {
        contenedor.attachEvent("onclick", selecionarTipoLeche);
        barraPh.attachEvent("oninput", actualizarValorPh);
    }

    barraPh.dispatchEvent(new Event('input'));
}


function selecionarTipoLeche(event){

    let opcionesLeche = document.querySelectorAll('.opcionLeche');
    let tipoLeche = '';

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

    document.getElementById("phValorMov").textContent = valor.toFixed(1);

    let colorIzquierda = "#77b4d8"; // verde
    let colorDerecha = "#ddd";      // gris

    barra.style.background = `linear-gradient(to right, ${colorIzquierda} 0%, ${colorIzquierda} ${porcentaje}%, ${colorDerecha} ${porcentaje}%, ${colorDerecha} 100%)`;
}