$(window).on("load",inicio);

let g, h, d, t;
let gVal, hVal, dVal, tVal;
let resultado;

function inicio(){
    $("#pestannas").tabs({
        event:"click"
    });

    $('a.leerMas[href="#"]').on('click', function(e) {
        e.preventDefault();
    });

    $("#hidratosCarbono").on("click", () => mostrarInfo('hidratosCarbono'));
    $("#proteinas").on("click", () => mostrarInfo('proteinas'));
    $("#lipidos").on("click", () => mostrarInfo('lipidos'));
    $("#fibra").on("click", () => mostrarInfo('fibra'));
    $("#minerales").on("click", () => mostrarInfo('minerales'));
    $("#vitaminas").on("click", () => mostrarInfo('vitaminas'));
    $("#enzimas").on("click", () => mostrarInfo('enzimas'));
    $("#fenoAnti").on("click", () => mostrarInfo('fenoAnti'));
    $("#pigNat").on("click", () => mostrarInfo('pigNat'));
    $("#antiNutri").on("click", () => mostrarInfo('antiNutri'));

    $("#cerrarBoton").on("click", cerrarInfo);

    $("#dietaProteicaBtn").on("click", () => mostrarDietas('dietaProteica'));
    $("#dietaGlutenBtn").on("click", () => mostrarDietas('dietaGluten'));
    $("#dietaCarboBtn").on("click", () => mostrarDietas('dietaCarbo'));
    $("#dietaFibraBtn").on("click", () => mostrarDietas('dietaFibra'));
    $("#dietaGlucemicaBtn").on("click", () => mostrarDietas('dietaGlucemica'));
    $("#infoDetalladaBtn").on("click", () => mostrarDietas('infoDetallada'));

    $(".cerrarCruz").on("click", cerrarDieta);

    // Inicializar variables
    g = $("#granulometria");
    h = $("#humedad");
    d = $("#densidad");
    t = $("#temperatura");

    g.on('input', actualizarColorBarra);
    g.trigger('input');
    h.on('input', actualizarColorBarra);
    h.trigger('input');
    d.on('input', actualizarColorBarra);
    d.trigger('input');
    t.on('input', actualizarColorBarra);
    t.trigger('input');

    gVal = $("#gVal");
    hVal = $("#hVal");
    dVal = $("#dVal");
    tVal = $("#tVal");

    resultado = $("#resultado");

    [g, h, d, t].forEach(el => el.on("input", actualizar));

    actualizar(); // inicial
}


function mostrarInfo(param){
    const info = {
        hidratosCarbono: {
            title: "Hidratos de carbono",
            desc: " Dentro de los hidratos de carbono encontramos: <br> - <strong>Almidón</strong>: es el polisacárido predominante.Proporciona energía y es esencial para la textura y estructura de los productos tras la cocción, gracias al proceso de gelatinización. <br> -<strong>Azúcares simples</strong> (como glucosa y maltosa): están presentes en pequeñas cantidades. Son importantes porque alimentan a las levaduras durante la fermentación, favoreciendo el crecimiento de las masas"
        },
        proteinas: {
            title: "Proteínas",
            desc: "En el caso del trigo, destacan la <strong>gliadina</strong> y la <strong>glutenina</strong>, que, al mezclarse con agua, forman el <strong>gluten</strong>, responsable de la elasticidad y firmeza de las masas.<br> En otros tipos de harinas (como de maíz o arroz), las proteínas no forman gluten, lo que afecta la textura y estructura de los productos finales. <br>Además, las proteínas aportan aminoácidos esenciales para la nutrición humana."
        },
        lipidos: {
            title: "Lípidos (grasas)",
            desc: "Aportan sabor y contribuyen a la textura (untuosidad y ternura).<br> En harinas de frutos secos o semillas (como almendra o nuez) el contenido graso es más elevado. <br> Sin embargo, los lípidos pueden oxidarse con el tiempo, provocando enranciamiento y reduciendo la vida útil de la harina."
        },
        fibra: {
            title: "Fibra",
            desc: "Harinas refinadas: contienen entre un 2% y un 3% de fibra. <br> Harinas integrales: pueden alcanzar del 5% al 15%- <br> La fibra es fundamental para la salud digestiva y también influye en la capacidad de absorción de agua y en la textura de las masas."
        },
        minerales: {
            title: "Minerales (cenizas)",
            desc: "Entre ellos destacan minerales como el hierro, fósforo, magnesio, potasio y zinc. <br> La cantidad de minerales está relacionada con el grado de extracción: las harinas integrales, que conservan el salvado y el germen, son más ricas en minerales que las harinas refinadas"
        },
        vitaminas: {
            title: "Vitaminas",
            desc: "Estas vitaminas son esenciales para el metabolismo energético y otras funciones vitales. <br>Sin embargo, en el proceso de refinado se pierde una gran parte de las vitaminas originales, lo que hace que las harinas integrales sean nutricionalmente más completas."
        },
        enzimas: {
            title: "Enzimas",
            desc: "<strong>Amilasas</strong>: que descomponen el almidón en azúcares simples durante la fermentación.<br><strong>Proteasas</strong>: que actúan sobre las proteínas, modificando la elasticidad de la masa. Estas enzimas son fundamentales para procesos como la fermentación y la maduración de la masa."
        },
        fenoAnti: {
            title: "Compuestos fenólicos y antioxidantes",
            desc: "También contribuyen al sabor, color y conservación del producto final."
        },
        pigNat: {
            title: "Pigmentos naturales",
            desc: "Estos pigmentos también tienen propiedades antioxidantes"
        },
        antiNutri: {
            title: "Antinutrientes",
            desc: "Los <strong>fitatos</strong>, por ejemplo, pueden reducir la absorción de minerales como el hierro y el zinc, aunque también ofrecen efectos antioxidantes beneficiosos."
        }
    };

    $('#infoTitulo').text(info[param].title);
    $('#infoDesc').html(info[param].desc);

    $("#dialogCompQui")[0].showModal(); 

    
}

function cerrarInfo() {
    $("#dialogCompQui")[0].close(); 
}

function mostrarDietas(dieta) {
    $('.dietas').removeClass('active').hide();

    let target = $('#' + dieta);

    if (target.length) {
        target.addClass('active').fadeIn(200);


    $('html, body').animate({
        scrollTop: target.offset().top
    }, 500);
    } else {
        console.warn("No se encontró el panel con ID:", dieta);
    }
}

function cerrarDieta() {
  $(this).closest('.dietas').removeClass('active');
}

function actualizar() {
    const granulometria = parseInt(g.val());
    const humedad = parseFloat(h.val());
    const densidad = parseFloat(d.val());
    const temperatura = parseFloat(t.val());

    gVal.text(granulometria);
    hVal.text(humedad);
    dVal.text(densidad.toFixed(2));
    tVal.text(temperatura);

    // Diagnóstico dinámico
    let uso, estado, recomendacion;

    if (granulometria < 150) {
        uso = "Repostería y panes suaves";
    } else if (granulometria < 300) {
        uso = "Panificación general";
    } else {
        uso = "Productos integrales o rústicos";
    }

    if (humedad > 15 || temperatura > 25) {
        estado = "Riesgo alto de proliferación microbiana 🚨";
    } else if (humedad < 12) {
        estado = "Harina muy seca, podría afectar absorción";
    } else {
        estado = "Buena estabilidad";
    }

    if (densidad > 0.75) {
        recomendacion = "Almacenar en recipientes resistentes, poco aireados.";
    } else {
        recomendacion = "Harina aireada, fácil de mezclar.";
    }

    resultado.html(`
        <p><strong>Recomendación:</strong> ${recomendacion}</p>
        <p><strong>Estado de conservación:</strong> ${estado}</p>
        <p><strong>Uso ideal:</strong> ${uso}</p>
    `);
}

function actualizarColorBarra(event){
    let barra = $(event.target);

    let valor = parseFloat(barra.val());
    let min = parseFloat(barra.attr('min'));
    let max = parseFloat(barra.attr('max'));

    // Determinar los colores según el valor
    let colorIzquierda = "#8b461b";
    let porcentaje = ((valor - min) / (max - min)) * 100;

    barra.css('background', `linear-gradient(to right, ${colorIzquierda} 0%, ${colorIzquierda} ${porcentaje}%, #ddd ${porcentaje}%, #ddd 100%)`);
}


