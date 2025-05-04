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
}

function ocultarTodo() {
    $('.infoParte').hide();
}

