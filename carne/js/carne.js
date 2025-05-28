$(window).on("load",inicio);

function inicio(){
    $("#pestannas").tabs({
        event:"click"
    });

    graficoCarne();

    $("#botonCorregir").on("click", corregirChecklist);
    $("#botonVolverEmp").on("click", reiniciarChecklist);
    $("#horasRango").on("input", actualizarValorSlider);
    $("#horasRango").trigger("input");
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

    if (barra.attr("id") === "horasRango") {
        $("#horasValorMov").text(valor.toFixed(2));
    }

    let colorIzquierda = "#ab2a20";
    let colorDerecha = "#ddd";

    barra.css("background", `linear-gradient(to right, ${colorIzquierda} 0%, ${colorIzquierda} ${porcentaje}%, ${colorDerecha} ${porcentaje}%, ${colorDerecha} 100%)`);
}