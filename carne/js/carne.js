$(window).on("load",inicio);

function inicio(){
    $("#pestannas").tabs({
        event:"click"
    });

    $("#botonCorregir").on("click", corregirChecklist);
    $("#botonVolverEmp").on("click", reiniciarChecklist);
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