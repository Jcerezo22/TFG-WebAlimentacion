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
}

