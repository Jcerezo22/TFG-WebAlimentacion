$(window).on("load",inicio);

function inicio(){
    $("#pestannas").tabs({
        event:"click"
    });
    
    $('#cascara').on('click', function() {
        ocultarTodo();
        $('#infoCascara').show();
    });

    $('#clara').on('click', function() {
        ocultarTodo();
        $('#infoClara').show();
    });

    $('#yema').on('click', function() {
        ocultarTodo();
        $('#infoYema').show();
    });

    $("#botonFrescura").on("click", calcularFrescura);
}

function ocultarTodo() {
    $('.infoParte').hide();
}

function calcularFrescura(event){
    event.preventDefault();

    let tipoFecha = $('input[name="tipoFecha"]:checked').val(); ;
    let fechaStr = $('#fechaInput').val();

    if (fechaStr) {
        let fecha = new Date(fechaStr);
        let fechaActual = new Date();

        if(tipoFecha == "fcp"){
        fecha.setDate(fecha.getDate() - 28);
        }

        let diferenciaFechas = fechaActual - fecha;
        let diasPasados = Math.floor(diferenciaFechas / (1000 * 60 * 60 * 24));

        let phClara = estimarPHClara(diasPasados);
        let phYema = estimarPHYema(diasPasados);


        $('#resultadoSimulador').removeClass('estadoInicial').addClass('estadoFinal');
        $('#mensajeResultado').text('📅 Días desde la puesta: '+diasPasados);

        $('#phBarras').show();
        $('#barraClara').css('width', `${(phClara - 7.5) * 40}%`);
        $('#phClaraTexto').text(" "+phClara);
        $('#barraYema').css('width', `${(phYema - 6.0) * 100}%`);
        $('#phYemaTexto').text(" "+phYema);

        let estadoHuevo = determinarEstado(phClara, phYema);
        $('#imagenSimulador').attr('src', `../img/huevo_${estadoHuevo.replace(' ', '_')}.png`);

    } else {
        $('#mensajeResultado').text('Por favor selecciona una fecha.');
    }

    

    // $('#mensajeResultado').text('✅ El huevo está fresco medio (🟡)');
    // $('#imagenResultado').attr('src', 'huevo-fresco-medio.png');
}


function estimarPHClara(dias) {
    return Math.min((7.6 + dias * 0.1).toFixed(1), 9.5);
}

function estimarPHYema(dias) {
    return Math.min((6.0 + dias * 0.02).toFixed(1), 6.6);
}

function determinarEstado(phClara, phYema) {
    if (phClara < 8.0 && phYema < 6.2) {
        return 'muy fresco';
    } else if (phClara < 8.5 && phYema < 6.4) {
        return 'aun fresco';
    } else if (phClara < 9.0 && phYema < 6.5) {
        return 'poco fresco';
    } else {
        return 'no fresco';
    }
}