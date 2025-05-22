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
        brasil: "Brasil cuenta con una gran producción lechera, especialmente en Minas Gerais y Paraná.",
        rusia: "Rusia produce leche a gran escala, con importantes granjas en regiones como Moscú y Tatarstán.",
        china: "China ha aumentado su producción lechera, especialmente en Mongolia Interior y Heilongjiang.",
        mongolia: "Mongolia produce leche principalmente a través de la ganadería nómada, con un alto consumo de productos lácteos fermentados.",
        india: "India es el mayor productor de leche del mundo, con millones de pequeños ganaderos en todo el país.",
        pakistan: "Pakistán es uno de los principales productores de leche en Asia, con una industria centrada en búfalos lecheros.",
        australia: "Australia exporta gran parte de su producción lechera, especialmente desde Victoria y Tasmania.",
        nueva_zelanda: "Nueva Zelanda es líder mundial en exportaciones de productos lácteos, con una producción centrada en la isla norte y sur.",
        españa: "España tiene una fuerte producción lechera, destacando Galicia y Cantabria como regiones clave.",
        francia: "Francia es un gran productor de leche en Europa, conocida también por su gran variedad de quesos.",
        italia: "Italia produce leche de alta calidad, base de productos como el queso parmesano y la mozzarella.",
        reino_unido: "El Reino Unido tiene una sólida industria lechera, con granjas distribuidas por Inglaterra, Escocia e Irlanda del Norte.",
        irlanda: "Irlanda destaca por su producción lechera basada en pastoreo, con gran énfasis en la exportación.",
        groenlandia: "Groenlandia tiene una producción lechera muy limitada debido a su clima extremo y baja densidad de población.",
        islandia: "Islandia mantiene una producción lechera localmente sostenible, con vacas criadas en establos climatizados.",
        argentina: "Argentina es un productor lechero importante en Sudamérica, con fuerte actividad en la región pampeana.",
        chile: "Chile produce leche principalmente en el sur, con un enfoque en calidad y exportación.",
        peru: "Perú tiene una industria lechera en expansión, con producción destacada en Cajamarca y Arequipa.",
        bolivia: "Bolivia produce leche en varias regiones, siendo Cochabamba una de las más importantes.",
        paraguay: "Paraguay ha incrementado su producción lechera, con un enfoque creciente en la industrialización.",
        uruguay: "Uruguay se destaca por su producción lechera de calidad, especialmente en Colonia y San José.",
        ecuador: "Ecuador tiene producción lechera en la Sierra andina, destacando provincias como Pichincha y Tungurahua.",
        colombia: "Colombia tiene una industria lechera activa, con producción en regiones como Cundinamarca y Antioquia.",
        venezuela: "Venezuela produce leche principalmente en los Andes y en los llanos centrales.",
        guayana: "Guayana tiene una producción lechera limitada, centrada en pequeñas explotaciones ganaderas.",
        cuba: "Cuba tiene producción lechera estatal y privada, principalmente en provincias centrales.",
        puerto_rico: "Puerto Rico tiene una industria lechera local consolidada, con producción concentrada en el norte de la isla.",
        guatemala: "Guatemala cuenta con una creciente industria lechera, especialmente en la región occidental.",
        nicaragua: "Nicaragua produce leche a través de pequeños y medianos productores en el norte del país.",
        costa_rica: "Costa Rica tiene una industria lechera moderna, con granjas principalmente en la zona de Cartago.",
        panama: "Panamá cuenta con producción lechera en provincias como Chiriquí y Coclé.",
        honduras: "Honduras desarrolla su producción lechera en zonas como Olancho y Santa Bárbara.",
        elSalvador: "El Salvador tiene una producción lechera moderada, con enfoque en el consumo local.",
        surinam: "Surinam cuenta con una pequeña producción lechera destinada principalmente al mercado interno.",
        belice: "Belice tiene una industria lechera limitada, pero en crecimiento, con productos frescos locales.",
        guayanaFrancesa: "La Guayana Francesa importa gran parte de sus productos lácteos debido a su baja producción local.",
        noruega: "Noruega posee una sólida industria lechera, con énfasis en la calidad y bienestar animal.",
        suecia: "Suecia es un importante productor europeo de leche, con un fuerte enfoque ecológico.",
        finlandia: "Finlandia produce leche de alta calidad, incluso en climas fríos, y es conocida por su mantequilla y quesos.",
        belgica: "Bélgica cuenta con una destacada producción lechera, especialmente en la región de Flandes.",
        paises_bajos: "Los Países Bajos son líderes en tecnología agrícola y producción lechera eficiente.",
        alemania: "Alemania es uno de los mayores productores de leche de Europa, con una fuerte industria quesera.",
        dinamarca: "Dinamarca tiene una industria lechera moderna, reconocida por productos como la mantequilla Lurpak.",
        suiza: "Suiza es famosa por sus productos lácteos de alta calidad, especialmente quesos como el Gruyère.",
        polonia: "Polonia tiene una de las mayores producciones lecheras de Europa del Este.",
        lituania: "Lituania mantiene una producción lechera importante, con énfasis en la exportación regional.",
        letonia: "Letonia cuenta con una industria lechera centrada en granjas familiares y producción local.",
        estonia: "Estonia ha modernizado su producción lechera, contribuyendo a sus exportaciones agroalimentarias.",
        bielorrusia: "Bielorrusia produce grandes volúmenes de leche, destinados en gran parte al mercado ruso.",
        ucrania: "Ucrania es un productor lechero importante en Europa Oriental, con potencial de crecimiento.",
        moldavia: "Moldavia tiene una industria lechera centrada en pequeñas explotaciones rurales.",
        grecia: "Grecia es famosa por su leche de cabra y oveja, utilizada en productos como el queso feta.",
        serbia: "Serbia produce leche en cantidades moderadas, con un enfoque en productos frescos y quesos locales.",
        macedonia_norte: "Macedonia del Norte tiene una industria lechera tradicional y en desarrollo.",
        albania: "Albania produce leche principalmente en pequeñas granjas familiares.",
        montenegro: "Montenegro cuenta con una modesta producción lechera, destacando sus quesos artesanales.",
        croacia: "Croacia tiene una producción lechera enfocada en autosuficiencia y calidad.",
        bosnia_y_herzegovina: "Bosnia y Herzegovina produce leche a nivel regional, principalmente para consumo interno.",
        bulgaria: "Bulgaria destaca por su producción de yogures y quesos tradicionales a base de leche de vaca y oveja.",
        rumania: "Rumania produce grandes cantidades de leche, con un mercado interno en crecimiento.",
        austria: "Austria tiene una industria lechera ecológica y bien regulada, con productos de alta calidad.",
        eslovaquia: "Eslovaquia mantiene una producción lechera estable, con un enfoque en lácteos frescos.",
        chequia: "Chequia (República Checa) cuenta con una industria lechera moderna y competitiva.",
        japon: "Japón produce leche localmente, con un fuerte control de calidad y consumo de leche fresca y yogures.",
        corea_norte: "Corea del Norte tiene una producción lechera muy limitada, centrada en sectores estatales.",
        corea_sur: "Corea del Sur produce leche localmente y promueve su consumo mediante campañas de salud.",
        filipinas: "Filipinas tiene una industria lechera emergente, con fuerte dependencia de la importación.",
        nueva_guinea: "Papúa Nueva Guinea tiene una producción lechera muy reducida, basada en sistemas tradicionales.",
        indonesia: "Indonesia ha venido desarrollando su industria lechera para suplir la creciente demanda local.",
        malasia: "Malasia produce leche en menor escala, complementada con productos importados.",
        singapur: "Singapur importa la mayoría de sus productos lácteos debido a su limitada capacidad agrícola.",
        brunei: "Brunei depende principalmente de la importación de productos lácteos.",
        nepal: "Nepal produce leche mediante pequeños agricultores y cooperativas en zonas rurales.",
        butan: "Bután tiene una producción lechera limitada, orientada al autosustento y el mercado local.",
        bangladesh: "Bangladesh tiene una industria lechera en crecimiento, apoyada por programas gubernamentales.",
        myanmar: "Myanmar desarrolla su producción lechera con ayuda de cooperativas y programas rurales.",
        tailandia: "Tailandia tiene una creciente industria lechera, con énfasis en leche fresca y procesada.",
        laos: "Laos cuenta con una industria lechera modesta, enfocada en mercados locales.",
        vietnam: "Vietnam ha invertido en modernizar su industria lechera, especialmente en leche líquida y yogurt.",
        camboya: "Camboya tiene una producción lechera muy pequeña, sujeta a expansión futura.",
        yemen: "Yemen tiene una producción lechera limitada, enfocada en leche de cabra y camella.",
        oman: "Omán impulsa la producción de leche local para reducir la dependencia de importaciones.",
        emiratos_arabes_unidos: "Los Emiratos Árabes Unidos desarrollan granjas tecnológicas para producción de leche en el desierto.",
        irak: "Irak produce leche a nivel local, aunque gran parte de su demanda se cubre con importaciones.",
        sirira: "Siria, pese al conflicto, mantiene cierta producción lechera local principalmente en zonas rurales.",
        libano: "Líbano es conocido por su producción artesanal de quesos y yogures a base de leche local.",
        israel: "Israel tiene una de las industrias lecheras más avanzadas del mundo, destacando en tecnología y rendimiento.",
        jordania: "Jordania cuenta con una industria lechera estable, centrada en leche de vaca y cabra.",
        iran: "Irán es un productor lechero importante en la región, con énfasis en el consumo doméstico.",
        azerbaiyan: "Azerbaiyán produce leche principalmente en zonas rurales, con industrias lácteas en desarrollo.",
        armenia: "Armenia mantiene una producción lechera tradicional, con énfasis en productos como yogures y quesos.",
        afganistan: "Afganistán tiene una producción lechera local, principalmente de vacas y búfalos, destinada al consumo interno.",
        tayikistan: "Tayikistán produce leche a pequeña escala, mayormente en granjas familiares.",
        kirguistan: "Kirguistán cuenta con una tradición pastoril y producción lechera significativa en zonas rurales.",
        uzbekistan: "Uzbekistán ha modernizado parte de su industria lechera, enfocada en la autosuficiencia.",
        turkmenistan: "Turkmenistán tiene una producción lechera limitada, con enfoque en el consumo local.",
        kazajistán: "Kazajistán cuenta con una creciente industria lechera, impulsada por inversiones y exportaciones regionales.",
        egipto: "Egipto produce leche principalmente de vacas y búfalas, con consumo elevado de productos lácteos frescos.",
        libia: "Libia depende en gran medida de la importación de productos lácteos debido a su baja producción local.",
        tunez: "Túnez tiene una industria lechera moderada, centrada en el consumo doméstico y la elaboración de yogures.",
        argelia: "Argelia produce leche localmente, pero aún depende de importaciones para cubrir la demanda.",
        marruecos: "Marruecos tiene una industria lechera en expansión, apoyada por programas de modernización agrícola.",
        sahara_occidental: "El Sahara Occidental tiene producción lechera limitada debido a sus condiciones climáticas áridas.",
        mauritania: "Mauritania produce leche mayormente de camellos, adaptada a su entorno desértico.",
        mali: "Mali tiene producción lechera tradicional basada en el pastoreo nómada.",
        niger: "Níger mantiene una producción lechera de subsistencia, especialmente de cabras y vacas.",
        chad: "Chad cuenta con producción lechera tradicional, aunque limitada por factores climáticos.",
        sudan: "Sudán tiene una industria lechera significativa con vacas, cabras y camellos, abasteciendo el consumo local.",
        sudan_sur: "Sudán del Sur produce leche en pequeña escala, con un enfoque en comunidades rurales.",
        eritrea: "Eritrea tiene producción lechera modesta, mayormente para consumo interno.",
        etiopia: "Etiopía tiene una importante industria lechera en expansión, basada en pequeños productores rurales.",
        yibuti: "Yibuti depende casi totalmente de la importación de productos lácteos por su escasa producción local.",
        somalia: "Somalia produce principalmente leche de camella, importante en su dieta tradicional.",
        senegal: "Senegal cuenta con una producción lechera creciente, impulsada por programas de desarrollo rural.",
        gambia: "Gambia tiene una producción lechera limitada, centrada en pequeñas granjas.",
        guineaBisau: "Guinea-Bisáu produce leche en pequeña escala, con escasa infraestructura industrial.",
        guinea: "Guinea cuenta con producción lechera de subsistencia, orientada al autoconsumo.",
        sierra_leona: "Sierra Leona tiene una industria lechera emergente, aún dependiente de importaciones.",
        liberia: "Liberia tiene producción lechera limitada, con foco en productos frescos locales.",
        costa_de_marfil: "Costa de Marfil está desarrollando su industria lechera con apoyo internacional.",
        burkina_faso: "Burkina Faso produce leche principalmente mediante el pastoreo tradicional.",
        ghana: "Ghana promueve el desarrollo de su sector lácteo, aunque aún depende de importaciones.",
        togo: "Togo tiene una producción lechera modesta, centrada en el consumo nacional.",
        benin: "Benín cuenta con producción lechera de pequeña escala, mayormente artesanal.",
        nigeria: "Nigeria es uno de los mayores consumidores de productos lácteos de África, con producción en aumento.",
        camerun: "Camerún produce leche localmente, pero enfrenta desafíos logísticos y climáticos.",
        republica_centro_africana: "La República Centroafricana tiene una industria lechera poco desarrollada, basada en producción familiar.",
        gabon: "Gabón depende en gran parte de la importación de productos lácteos por su baja producción.",
        guinea_ecuatorial: "Guinea Ecuatorial tiene una industria lechera incipiente, apoyada por el sector privado.",
        congo: "El Congo produce leche en pequeña escala, con foco en consumo local.",
        republica_democratica_del_congo: "La República Democrática del Congo tiene producción lechera limitada, mayormente artesanal.",
        angola: "Angola impulsa el crecimiento de su industria lechera con inversiones extranjeras.",
        namibia: "Namibia tiene una industria lechera pequeña pero eficiente, centrada en el mercado interno.",
        botsuana: "Botsuana produce leche localmente, con programas estatales para mejorar la producción.",
        sudafrica: "Sudáfrica es el mayor productor lechero del África subsahariana, con una industria moderna y diversificada.",
        lesoto: "Lesoto produce leche a pequeña escala, con apoyo de cooperativas rurales.",
        madagascar: "Madagascar tiene una industria lechera en desarrollo, centrada en productos frescos.",
        zimbabue: "Zimbabue cuenta con una industria lechera que ha enfrentado altibajos, pero sigue activa.",
        mozambique: "Mozambique produce leche localmente, aunque sigue dependiendo de las importaciones.",
        zambia: "Zambia tiene una industria lechera creciente, promovida por programas gubernamentales.",
        malaui: "Malaui cuenta con una producción lechera modesta, basada en ganadería familiar.",
        tanzania: "Tanzania tiene una sólida producción lechera local, especialmente de leche de vaca y cabra.",
        kenia: "Kenia es uno de los líderes africanos en producción lechera, con una cadena de valor bien estructurada.",
        uganda: "Uganda produce grandes volúmenes de leche, con un mercado local activo y oportunidades de exportación.",
        ruanda: "Ruanda ha modernizado su industria lechera en años recientes con buenos resultados.",
        burundi: "Burundi tiene una industria lechera pequeña, centrada en el consumo comunitario.",
        esuatini: "Esuatini (antes Suazilandia) mantiene una producción lechera orientada al mercado interno."
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