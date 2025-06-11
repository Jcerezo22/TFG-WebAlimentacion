$(window).on("load",inicio);

function inicio(){
    $("#pestannas").tabs({
        event:"click"
    });

    $("#diasRango").on("input", function(event) {
        actualizarValorSlider(event);
        actualizarResultadoSlider($(this).val());
    });

    $("#diasRango").trigger("input");

    $("#bvt").on("click", () => mostrarInfo('bvt'));
    $("#amoniaco").on("click", () => mostrarInfo('amoniaco'));
    $("#tma").on("click", () => mostrarInfo('tma'));
    $("#ph").on("click", () => mostrarInfo('pH'));
    $("#compAgua").on("click", () => mostrarInfo('composicionAgua'));
    $("#proteinas").on("click", () => mostrarInfo('proteinas'));
    $("#lipidos").on("click", () => mostrarInfo('lipidos'));
    $("#aminoacidos").on("click", () => mostrarInfo('aminoacidos'));
    $("#minerales").on("click", () => mostrarInfo('minerales'));
    $("#acidosGrasos").on("click", () => mostrarInfo('acidosGrasos'));
    $("#color").on("click", () => mostrarInfo('color'));
    $("#aw").on("click", () => mostrarInfo('aw'));
    $("#tamForma").on("click", () => mostrarInfo('tamanoForma'));
    $("#salinidad").on("click", () => mostrarInfo('salinidad'));
    $("#textura").on("click", () => mostrarInfo('textura'));
    $("#temperatura").on("click", () => mostrarInfo('temperatura'));

    $("#cerrarBoton").on("click", cerrarInfo);

    $('a.leerMas[href="#"]').on('click', function(e) {
        e.preventDefault();
    });

    $("#botonCorregir").on("click", corregirChecklist);
    $("#botonVolverEmp").on("click", reiniciarChecklist);
}

function actualizarValorSlider(event) {
    let barra = $(event.target);

    let valor = parseFloat(barra.val());
    let min = parseFloat(barra.attr("min"));
    let max = parseFloat(barra.attr("max"));

    let porcentaje = ((valor - min) / (max - min)) * 100;

    let colorIzquierda = "#6e8192";
    let colorDerecha = "#ddd";

    barra.css("background", `linear-gradient(to right, ${colorIzquierda} 0%, ${colorIzquierda} ${porcentaje}%, ${colorDerecha} ${porcentaje}%, ${colorDerecha} 100%)`);
}


function actualizarResultadoSlider(dias){
    let dia = parseInt(dias);
    $("#diasValorMov").text("Día " + dia);  

    // BVT 
    let bvt = 5 + (35 * dias / 10);
    let bvtEstado = getEstado(bvt, {normal: 15, moderado: 30});

    $("#bvtValor").text(bvt.toFixed(1));
    $("#bvtEstado")
        .text(bvtEstado)
        .attr("class", "estado" + bvtEstado);

    // Amoniaco 
    let amoniaco;

    if (dias < 3) 
        amoniaco = 2;
    else if (dias > 10) 
        amoniaco = 25;
    else 
        amoniaco = 2 + (23 * (dias - 3) / 7);

    let amoniacoEstado = getEstado(amoniaco, {normal: 8, moderado: 18});

    $("#amoniacoValor").text(amoniaco.toFixed(1));
    $("#amoniacoEstado")
        .text(amoniacoEstado)
        .attr("class", "estado" + amoniacoEstado);

    // TMA
    let tma;

    if (dias < 2) 
        tma = 1;
    else if (dias > 10) 
        tma = 18;
    else 
        tma = 1 + (17 * (dias - 2) / 8);

    let tmaEstado = getEstado(tma, {normal: 5, moderado: 12});

    $("#tmaValor").text(tma.toFixed(1));
    $("#tmaEstado")
        .text(tmaEstado)
        .attr("class", "estado" + tmaEstado);

    // pH (6.8 a 6.1)
    let ph = 6.8 - (0.7 * dias / 10);

    if (ph < 6.1) 
        ph = 6.1;

    let phEstado

    if (ph >= 6.5) {
        phEstado = 'Normal';
    } else if (ph >= 6.2) {
        phEstado = 'Moderado';
    } else {
        phEstado = 'Critico';
    }

    $("#phValor").text(ph.toFixed(2));
    $("#phEstado")
        .text(phEstado)
        .attr("class", "estado" + phEstado);
}

function getEstado(value, niveles) {
    let estado = 'Critico'; 

    if (value <= niveles.normal) {
        estado = 'Normal';
    } else if (value <= niveles.moderado) {
        estado = 'Moderado';
    }

    return estado;
}

function mostrarInfo(param){
    const info = {
        bvt: {
            title: "Bases Volátiles Totales (BVT)",
            desc: " Incluye la medición de compuestos como la trimetilamina, dimetilamina y amoniaco, que se producen durante el deterioro bacteriano y autolítico. Aunque el análisis de BVT es útil, generalmente refleja los últimos estadios del deterioro avanzado y no es confiable para medir el deterioro durante los primeros días de almacenamiento"
        },
        amoniaco: {
            title: "Amoniaco",
            desc: "Es un buen indicador de calidad en productos como el calamar. Se ha demostrado que el amoniaco puede ser más útil para predecir el deterioro en productos pesqueros que se degradan principalmente por la vía autolítica, en lugar de la microbiológica."
        },
        tma: {
            title: "Trimetilamina (TMA)",
            desc: "Aunque su presencia no correlaciona siempre con el número de bacterias, la TMA es útil para evaluar la calidad de muchos pescados marinos demersales. Su medición permite una evaluación objetiva y rápida del deterioro del pescado."
        },
        pH: {
            title: "pH",
            desc: "Tras la muerte del animal, el pH disminuye debido a la acumulación de ácido láctico, lo que refleja la frescura y calidad del pescado. Un pH bajo puede indicar un proceso de descomposición o deterioro."
        },
        composicionAgua: {
            title: "Composición de agua",
            desc: "El porcentaje de agua puede variar dependiendo de la especie y el estado del pescado (fresco, congelado, seco, etc.)"
        },
        proteinas: {
            title: "Proteínas",
            desc: "Los pescados son una excelente fuente de proteínas de alta calidad, que incluyen aminoácidos esenciales para el organismo."
        },
        lipidos: {
            title: "Lípidos (Grasas)",
            desc: "Los pescados grasos, como el salmón, pueden tener un contenido mucho mayor (hasta un 30%). Los ácidos grasos omega-3 presentes en los pescados grasos son beneficiosos para la salud cardiovascular"
        },
        aminoacidos: {
            title: "Aminoácidos",
            desc: "Especialmente los aminoácidos ramificados y los de cadena larga. Estos son esenciales para la síntesis de proteínas en el cuerpo humano."
        },
        minerales: {
            title: "Minerales",
            desc: "Como calcio, fósforo, hierro, yodo y magnesio. La concentración varía dependiendo de la especie"
        },
        acidosGrasos: {
            title: "Ácidos grasos",
            desc: "Especialmente los omega-3 (EPA y DHA), que son conocidos por sus beneficios para la salud"
        },
        color: {
            title: "Lípidos (Grasas)",
            desc: " Los pescados frescos tienen una carne de color blanco, rosado o rojo, dependiendo de la especie. El color de las branquias también es un buen indicador de frescura (debe ser brillante y de color rojo o rosado)."
        },
        aw: {
            title: "Actividad de agua (Aw)",
            desc: "Los valores generalmente están entre 0.98 y 1.00 en pescado fresco, lo que significa que es altamente susceptible a la proliferación bacteriana si no se conserva adecuadamente."
        },
        tamanoForma: {
            title: "Tamaño y forma",
            desc: " Los pescados más grandes pueden tener una textura y un contenido graso diferentes a los más pequeños."
        },
        salinidad: {
            title: "Salinidad",
            desc: "La concentración de sal puede influir en su sabor, conservación y en la formación de proteínas. La salinidad también afecta la capacidad de retención de agua del pescado."
        },
        textura: {
            title: "Textura",
            desc: " Se debe evaluar la elasticidad de la carne y la firmeza al presionar con los dedos. La carne debe retraerse y no quedar marcas."
        },
        temperatura: {
            title: "Temperatura",
            desc: "El pescado debe mantenerse refrigerado (entre 0°C y 4°C) o congelado (-18°C o más bajo) para prevenir el crecimiento bacteriano."
        }
    };

    $('#infoTitulo').text(info[param].title);
    $('#infoDesc').text(info[param].desc);

    $("#dialogParamQui")[0].showModal(); 

    
}

function cerrarInfo() {
    $("#dialogParamQui")[0].close(); 
}

function corregirChecklist() {
    let total = 0;
    const casos = document.querySelectorAll(".contendorPregunta");

    casos.forEach(caso => {
        const radio = caso.querySelector("input[type='radio']:checked");
        const explicacion = caso.querySelector(".expCaso");
        const correcta = caso.querySelector("input.correcta");

        // Resetear estilos
        caso.querySelectorAll("label").forEach(label => {
            label.classList.remove("correctaAcertada", "incorrectaMarcada", "correctaNoMarcada");
        });

        // Mostrar explicación
        if (explicacion) explicacion.style.display = "block";

        if (radio) {
            const esCorrecta = radio.classList.contains("correcta");
            radio.parentElement.classList.add(esCorrecta ? "correctaAcertada" : "incorrectaMarcada");
            total += esCorrecta ? 1 : -1;
        } else if (correcta) {
            correcta.parentElement.classList.add("correctaNoMarcada");
        }
    });

    $("#resultado").html(`<p>Puntuación final: ${total}/${casos.length}</p>`).fadeIn();
}

function reiniciarChecklist() {
    $("input[type='radio']").prop("checked", false);
    $("label").removeClass("correctaAcertada incorrectaMarcada correctaNoMarcada");
    $(".expCaso").hide();
    $("#resultado").hide();
}