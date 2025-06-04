$(window).on("load", inicio);

function inicio(){
    $("#pestannas").tabs({
        event:"click"
    });

    $('.acidez').on('click', function() {
        ocultarTodo();
        $('.acidez').css('background-color', '#2875a8');
        $('#infoAcidez').show();
    });

    $("#acidezRango").on('input', actualizarValorAcidez);
    $("#acidezRango").trigger('input');
    $('#medirAcidez').on('click', calcularAcidez);


    $('#clara').on('click', function() {
        ocultarTodo();
        $('.acidez').css('background-color', '#2875a8');
        $('#infoClara').show();
    });

    $('#yema').on('click', function() {
        ocultarTodo();
        $('.acidez').css('background-color', '#2875a8');
        $('#infoYema').show();
    });

}

function ocultarTodo() {
    $('.infoParte').hide();
}

function actualizarValorAcidez(event){
    let barra = $(event.target);

    let valor = parseFloat(barra.val());
    let min = parseFloat(barra.attr('min'));
    let max = parseFloat(barra.attr('max'));

    let porcentaje = ((valor - min) / (max - min)) * 100;

    if (barra.attr('id') === "acidezRango") {
        $("#acidezValorMov").text(valor.toFixed(1) + "ºD");
    }

    let colorIzquierda = "#77b4d8"; 
    let colorDerecha = "#ddd";      

    barra.css('background', `linear-gradient(to right, ${colorIzquierda} 0%, ${colorIzquierda} ${porcentaje}%, ${colorDerecha} ${porcentaje}%, ${colorDerecha} 100%)`);
}

function calcularAcidez(event){
    let valor = parseFloat($("#acidezRango").val());
        $("#acidezValorMov").text(valor.toFixed(1) + "ºD");

        let mensaje = "";
        if (valor < 14) {
            mensaje = "⚠️ <b>Baja:</b> leche aguada o vaca enferma";
        } else if (valor >= 14 && valor <= 18) {
            mensaje = "✔️ <b>Normal:</b> 14ºD a 18ºD";
        } else {
            mensaje = "🚫 <b>Alta:</b> leche vieja o mal refrigerada";
        }

        $("#descripcion").html(mensaje);
        $("#resultadoAcidez").show();
}

