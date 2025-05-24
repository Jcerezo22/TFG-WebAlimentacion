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
      $('#resultadoSimulador').removeClass('estadoInicial').addClass('estadoFinal');
      $('#mensajeResultado').text('📅 Días desde la puesta: '+diasPasados);

    } else {
        $('#mensajeResultado').text('Por favor selecciona una fecha.');
    }

    

    // $('#mensajeResultado').text('✅ El huevo está fresco medio (🟡)');
    // $('#imagenResultado').attr('src', 'huevo-fresco-medio.png');
}

