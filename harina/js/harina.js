$(window).on("load",inicio);

function inicio(){
    $("#pestannas").tabs({
        event:"click"
    });

    $('a.leerMas[href="#"]').on('click', function(e) {
        e.preventDefault();
    });
}


function mostrarInfo(param){
    const info = {
        hidratosCarbono: {
            title: "Hidratos de carbono",
            desc: " Incluye la medición de compuestos como la trimetilamina, dimetilamina y amoniaco, que se producen durante el deterioro bacteriano y autolítico. Aunque el análisis de BVT es útil, generalmente refleja los últimos estadios del deterioro avanzado y no es confiable para medir el deterioro durante los primeros días de almacenamiento"
        },
        proteinas: {
            title: "Proteínas",
            desc: "Es un buen indicador de calidad en productos como el calamar. Se ha demostrado que el amoniaco puede ser más útil para predecir el deterioro en productos pesqueros que se degradan principalmente por la vía autolítica, en lugar de la microbiológica."
        },
        lipidos: {
            title: "Lípidos (grasas)",
            desc: "Aunque su presencia no correlaciona siempre con el número de bacterias, la TMA es útil para evaluar la calidad de muchos pescados marinos demersales. Su medición permite una evaluación objetiva y rápida del deterioro del pescado."
        },
        fibra: {
            title: "Fibra",
            desc: "Tras la muerte del animal, el pH disminuye debido a la acumulación de ácido láctico, lo que refleja la frescura y calidad del pescado. Un pH bajo puede indicar un proceso de descomposición o deterioro."
        },
        minerales: {
            title: "Minerales (cenizas)",
            desc: "El porcentaje de agua puede variar dependiendo de la especie y el estado del pescado (fresco, congelado, seco, etc.)"
        },
        vitaminas: {
            title: "Vitaminas",
            desc: "Los pescados son una excelente fuente de proteínas de alta calidad, que incluyen aminoácidos esenciales para el organismo."
        },
        enzimas: {
            title: "Enzimas",
            desc: "Los pescados grasos, como el salmón, pueden tener un contenido mucho mayor (hasta un 30%). Los ácidos grasos omega-3 presentes en los pescados grasos son beneficiosos para la salud cardiovascular"
        },
        fenoAnti: {
            title: "Compuestos fenólicos y antioxidantes",
            desc: "Especialmente los aminoácidos ramificados y los de cadena larga. Estos son esenciales para la síntesis de proteínas en el cuerpo humano."
        },
        pigNat: {
            title: "Pigmentos naturales",
            desc: "Como calcio, fósforo, hierro, yodo y magnesio. La concentración varía dependiendo de la especie"
        },
        antiNutri: {
            title: "Antinutrientes",
            desc: "Especialmente los omega-3 (EPA y DHA), que son conocidos por sus beneficios para la salud"
        }
    };

    $('#infoTitulo').text(info[param].title);
    $('#infoDesc').text(info[param].desc);

    $("#dialogCompQui")[0].showModal(); 

    
}

function cerrarInfo() {
    $("#dialogCompQui")[0].close(); 
}