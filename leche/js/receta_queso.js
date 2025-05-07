if (document.addEventListener)
	window.addEventListener("load", inicio)
else if (document.attachEvent)
	window.attachEvent("onload", inicio);

function inicio(){
    let contenedor = document.querySelector('.contenedorOpciones');

    if (document.addEventListener) {
        contenedor.addEventListener("click", selecionarTipoLeche);
    } else if (document.attachEvent) {
        contenedor.attachEvent("onclick", selecionarTipoLeche);
    }
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