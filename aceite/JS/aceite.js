$(window).on("load",inicio);

function inicio(){
    $("#pestannas").tabs({
        event:"click"
    });

    $("#acidosGrasos").on("click", () => mostrarInfo('acidos'));
    $("#polifenoles").on("click", () => mostrarInfo('polifenoles'));
    $("#tocoferoles").on("click", () => mostrarInfo('tocoferoles'));
    $("#compVolAro").on("click", () => mostrarInfo('aromaticos'));

    $("#cerrarBoton").on("click", cerrarInfo);

    $("#botonCorregir").on("click", corregirQuiz);
    $("#botonVolverEmp").on("click", reiniciarChecklist);
}

function mostrarInfo(compuesto){
    const info = {
        acidos: {
            title: "Ácidos Grasos",
            desc: "Principalmente ácido oleico (monoinsaturado), seguido de ácido linoleico (poliinsaturado) y ácido palmítico (saturado)"
        },
        polifenoles: {
            title: "Polifenoles",
            desc: "Antioxidantes naturales que protegen contra la oxidación."
        },
        tocoferoles: {
            title: "Tocoferoles (Vitamina E)",
            desc: "Contribuyen a la estabilidad del aceite y aportan beneficios antioxidantes."
        },
        aromaticos: {
            title: "Compuestos Aromáticos",
            desc: "Compuestos volátiles y aromáticos: Responsables del sabor y aroma característicos, especialmente en el aceite de oliva virgen extra."
        }
    };

    $('#infoTitulo').text(info[compuesto].title);
    $('#infoDesc').text(info[compuesto].desc);

    $("#dialogMindMap")[0].showModal(); 


}

function cerrarInfo() {
    $("#dialogMindMap")[0].close(); 
}


function corregirQuiz(){
    const mensajes = {
        acidez: {
            "0.5": "&#x2139;&#xfe0f; ¡Es un aceite virgen extra! Máxima calidad y beneficios nutricionales.",
            "1.2": "&#x2139;&#xfe0f; Es un aceite virgen. Aún apto, con buena calidad, pero menor que el virgen extra.",
            "2.5": "&#x2139;&#xfe0f; Aceite lampante. No es apto para consumo directo."
        },
        peroxidos: {
            "5": "&#x2139;&#xfe0f; Excelente frescura y poder antioxidante.",
            "12": "&#x2139;&#xfe0f; Calidad aceptable, pero empieza a oxidarse.",
            "25": "&#x2139;&#xfe0f; Alta oxidación, el aceite ha perdido propiedades."
        },
        antioxidantes: {
            "Alta": "&#x2139;&#xfe0f; Perfecto para proteger tus células y reducir la inflamación.",
            "Media": "&#x2139;&#xfe0f; Buen perfil, aunque no tan protector.",
            "Baja": "&#x2139;&#xfe0f; Bajo efecto antioxidante. El aceite puede degradarse más rápido."
        },
        humo: {
            "200": "&#x2139;&#xfe0f; Apto para salteados y uso en crudo (virgen extra).",
            "230": "&#x2139;&#xfe0f; Ideal para frituras a alta temperatura (refinado).",
            "170": "&#x2139;&#xfe0f; Poca resistencia al calor. No recomendado para cocinar."
        }
    };

    // 1. Acidez
    let valAcidez = $("input[name='acidez']:checked").val();
    $("#p1 .retro").html(`<p>${mensajes.acidez[valAcidez] || "&#x2139;&#xfe0f; Selecciona una opción."}</p>`);
    $("input[name='acidez']:checked").closest('label').addClass('seleccionada');

    // 2. Peróxidos
    let valPerox = $("input[name='peroxidos']:checked").val();
    $("#p2 .retro").html(`<p>${mensajes.peroxidos[valPerox] || "&#x2139;&#xfe0f; Selecciona una opción."}</p>`);
    $("input[name='peroxidos']:checked").closest('label').addClass('seleccionada');

    // 3. Antioxidantes
    let valAnti = $("input[name='antioxidantes']:checked").val();
    $("#p3 .retro").html(`<p>${mensajes.antioxidantes[valAnti] || "&#x2139;&#xfe0f; Selecciona una opción."}</p>`);
    $("input[name='antioxidantes']:checked").closest('label').addClass('seleccionada');

    // 4. Punto de humo
    let valHumo = $("input[name='humo']:checked").val();
    $("#p4 .retro").html(`<p>${mensajes.humo[valHumo] || "&#x2139;&#xfe0f; Selecciona una opción."}</p>`);
    $("input[name='humo']:checked").closest('label').addClass('seleccionada');

    $(".retro").show();
}

function reiniciarChecklist() {
    $("input[type='radio']").prop("checked", false);
    $("label").removeClass("seleccionada");
    $(".retro").hide();
}