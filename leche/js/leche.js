$(window).on("load",inicio);

function inicio(){
    $("#pestannas").tabs({
        event:"click"
    });

    $('.cargar').on('click', function(e) {
        e.preventDefault();
        const url = $(this).data('url');
        $('#recetasTab').load(url); // Cargar contenido externo en esa pestaña
    });

    $('.acidez').on('click', function() {
        ocultarTodo();
        $('#infoAcidez').show();
    });

    $('#clara').on('click', function() {
        ocultarTodo();
        $('#infoClara').show();
    });

    $('#yema').on('click', function() {
        ocultarTodo();
        $('#infoYema').show();
    });
}

function ocultarTodo() {
    $('.infoParte').hide();
}

