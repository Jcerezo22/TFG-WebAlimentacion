$(window).on("load", inicio);

function inicio() {
    $("#pestannas").tabs({ event: "click" });

    $(".cargar").on("click", function (e) {
        e.preventDefault();
        const url = $(this).data("url");
        $("#recetasTab").load(url);
    });

    let imagenMapa = $("#imagenMapa");

    if (imagenMapa[0].complete) {
        $("map").imageMapResize(); 
    } else {
        imagenMapa.on("load", function () {
        $("map").imageMapResize(); 
        });
    }

    $("area").on("click", function(e) {
        e.preventDefault();  
    })

    $("#cerrarBoton").on("click", cerrarInfo);
}


function mostrarInfo(pais) {
    const infoPorPais = {
        canada: "Canadá es conocido por su producción de leche en Quebec y Ontario.",
        estados_unidos: "Estados Unidos es uno de los principales productores y consumidores de productos lácteos.",
        mexico: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        brasil: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        rusia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        china: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        mongolia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        india: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        pakistan: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        australia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        nuevaZelanda: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        españa: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        francia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        italia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        reinoUnido: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        irlanda: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        groenlandia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        islandia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        argentina: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        chile: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        peru: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        bolivia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        paraguay: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        uruguay: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        ecuador: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        colombia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        venezuela: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        guayana: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        cuba: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        puerto_rico: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        guatemala: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        nicaragua: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        costa_rica: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        panama: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        honduras: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        elSalvador: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        surinam: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        belice: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        guayanaFrancesa: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        noruega: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        suecia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        finlandia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        belgica: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        paises_bajos: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        alemania: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        dinamarca: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        suiza: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        polonia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        lituania: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        letonia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        estonia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        bielorrusia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        ucrania: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        moldavia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        grecia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        serbia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        macedonia_norte: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        albania: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        montenegro: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        croacia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        bosnia_y_herzegovina: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        bulgaria: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        rumania: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        austria: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        eslovaquia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        chequia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        japon: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        corea_norte: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        corea_sur: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        filipinas: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        nueva_guinea: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        indonesia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        malasia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        singapur: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        brunei: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        nepal: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        butan: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        bangladesh: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        myanmar: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        tailandia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        laos: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        vietnam: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        camboya: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        yemen: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        oman: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        emiratos_arabes_unidos: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        irak: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        sirira: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        libano: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        israel: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        singapur: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        jordania: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        iran: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        azerbaiyan: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        armenia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        afganistan: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        tayikistan: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        kirguistan: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        uzbekistan: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        turkmenistan: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        kazajistán: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        egipto: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        libia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        tunez: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        argelia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        marruecos: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        sahara_occidental: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        mauritania: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        mali: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        niger: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        chad: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        sudan: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        sudan_sur: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        eritrea: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        etiopia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        yibuti: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        somalia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        senegal: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        gambia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        guineaBisau: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        guinea: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        sierra_leona: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        liberia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        costa_de_marfil: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        burkina_faso: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        ghana: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        togo: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        benin: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        nigeria: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        camerun: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        republica_centro_africana: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        gabon: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        guinea_ecuatorial: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        congo: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        republica_democratica_del_congo: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        angola: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        namibia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        botsuana: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        sudafrica: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        lesoto: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        madagascar: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        zimbabue: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        mozambique: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        zambia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        malaui: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        tanzania: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        kenia: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        uganda: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        ruanda: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        burundi: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua.",
        esuatini: "México tiene una importante industria lechera en regiones como Jalisco y Chihuahua."
    };

    let tituloPais = normalizarPais(pais);
    let textoPais = infoPorPais[tituloPais] || "Información no disponible.";

    $("#infoTitulo").text(pais.charAt(0).toUpperCase() + pais.slice(1));
    $("#infoContenido").text(textoPais);
    $("#dialogPaises")[0].showModal();  
}

function cerrarInfo() {
    $("#dialogPaises")[0].close(); 
}

function normalizarPais(nombre) {
    return nombre.toLowerCase().replace(/\s+/g, "_");
}