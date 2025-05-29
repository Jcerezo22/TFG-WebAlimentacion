$(window).on("load",inicio);

function inicio(){
    $("#pestannas").tabs({
        event:"click"
    });

    graficoCarne();

    $("#botonCorregir").on("click", corregirChecklist);
    $("#botonVolverEmp").on("click", reiniciarChecklist);

    $("#horasRango").on("input", function(event) {
        actualizarValorSlider(event);
        actualizarResultadoSlider($(this).val());
    });

    $("#horasRango").trigger("input");

    $("#botonDfd").on("click", mostrarInfopH);
    $("#botonPse").on("click", mostrarInfopH);
}

function corregirChecklist() {
    let total = 0;
    let checkboxes = document.querySelectorAll("#checklist input[type='checkbox']");

    for (let checkbox of checkboxes) {
        let $checkbox = $(checkbox);
        let $label = $checkbox.parent();

        $label.removeClass("correctaAcertada incorrectaMarcada correctaNoMarcada");

        if (checkbox.checked) {
            if ($checkbox.hasClass("correcta")) {
                total += 1;
                $label.addClass("correctaAcertada");
            } else if ($checkbox.hasClass("incorrecta")) {
                total -= 1;
                $label.addClass("incorrectaMarcada");
            }
        } else {
            if ($checkbox.hasClass("correcta")) {
                $label.addClass("correctaNoMarcada");
            }
        }
    }

    
    if(total >= 10)
        $("#resultado").html("<p>Puntaje total: " + total+"</p><p>&#x1f7e2 <strong>Carne Apta</strong></p>").fadeIn();
    else if (total >= 0 && total <= 9)
        $("#resultado").html("<p>Puntaje total: " + total+"</p><p>&#x1f7e1 <strong>Parámetros Intermedios</strong>, posible afectación en textura o vida útil.</p>").fadeIn();
    else 
        $("#resultado").html("<p>Puntaje total: " + total+"</p><p>&#x1f7e0 Carne <strong>No Apta</strong>, pH alterado, CRA baja, signos de deterioro o contaminantes</p>").fadeIn();

}

function reiniciarChecklist() {
    $("#checklist input[type='checkbox']").prop("checked", false);

    $("#checklist label").removeClass("correctaAcertada incorrectaMarcada correctaNoMarcada");

    $("#resultado").hide();
}


function graficoCarne(){
    let contextoGrafico = document.getElementById('graficoCarne').getContext('2d');

    let grafico = new Chart(contextoGrafico, {
        type: 'doughnut',
        data: {
            labels: ['Agua', 'Proteínas', 'Grasas', 'Carbohidratos', 'Minerales','Vitaminas'],
            datasets: [{
                label: 'Composición Nutricional (%)',
                data: [70, 19, 15, 1.5, 0.5, 0.5],
                backgroundColor: [
                    '#ab2a20',
                    '#da635a',
                    '#cb8984',
                    '#ab4537',
                    '#fbeada',
                    '#fb6a3f'
                ],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Composición Química de la Carne',
                    font: {
                        family: 'Gliker',
                        size: 20,
                        weight: 'bold'
                    },
                    color: '#ab2a20',
                    align: 'center',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const rangos = {
                                'Agua': '60-75%',
                                'Proteínas': '~19%',
                                'Grasas': '0.5%-30%',
                                'Carbohidratos': '1-2%',
                                'Minerales': '<1%',
                                'Vitaminas': '<1%'
                            };
                            return `${context.label}: ${rangos[context.label]}`;
                        }
                    }
                }
            }
        }
    });
}

function actualizarValorSlider(event) {
    let barra = $(event.target);

    let valor = parseFloat(barra.val());
    let min = parseFloat(barra.attr("min"));
    let max = parseFloat(barra.attr("max"));

    let porcentaje = ((valor - min) / (max - min)) * 100;

    let colorIzquierda = "#ab2a20";
    let colorDerecha = "#ddd";

    barra.css("background", `linear-gradient(to right, ${colorIzquierda} 0%, ${colorIzquierda} ${porcentaje}%, ${colorDerecha} ${porcentaje}%, ${colorDerecha} 100%)`);
}

function minutosAHoras(min) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m}min`;
}


function actualizarResultadoSlider(horas){
    let ph, estado, riesgo;

    let minutos = horas * 60;

    if (minutos === 0) {
        $("#horasValorMov").text("0 h");
    } else {
        $("#horasValorMov").text(minutosAHoras(minutos));
    }

    if (horas == 0) {
        ph = 7.0;
        estado = "🔴 Fresca, sin cambios aún";
        riesgo = "Alto";
    } else if (horas <= 0.75) { 
        ph = 7.0 - (horas * 1.33);
        estado = "Inicia acidificación";
        riesgo = "🟠 Medio";
    } else if (horas <= 6) {
        ph = 6.3 - ((horas - 0.75) * 0.15); 
        estado = "En proceso de maduración";
        riesgo = "🟢  Bajo";
    } else {
        ph = 5.8 - ((horas - 6) * 0.02); 
        estado = "Maduración avanzada"; 
        riesgo = "🟢 Muy bajo";
    }

    $("#phCarne").text(ph.toFixed(2));
    $("#estadoCarne").text(estado);
    $("#riesgoBacteriano").text(riesgo);    
}

function mostrarInfopH(event){
    let boton = $(event.target);

    if (boton.is("#botonDfd")) {
        $("#infoExtra").html("<strong>DFD</strong>: Ocurre cuando el pH sigue siendo mayor a 6.0 a las 24 horas. Puede deberse a un agotamiento del glucógeno muscular antes del sacrificio. La carne resultante suele ser oscura, firme y seca.");
    }
    else if(boton.is("#botonPse")){
        $("#infoExtra").html("<strong>PSE</strong>: Se produce cuando el pH₄₅ es inferior a 6.0. Suele estar asociado a un descenso rápido del pH mientras la temperatura post mortem aún es elevada. La carne resultante es pálida, blanda y exudativa.")
    }

    $("#infoExtra").show();
}