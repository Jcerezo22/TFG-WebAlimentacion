$(window).on("load", inicio);

function inicio() {
    $("#pestannas").tabs({ event: "click" });

    $(".cargar").on("click", function (e) {
        e.preventDefault();
        const url = $(this).data("url");
        $("#recetasTab").load(url);
    });

    let imagenMapa = $("#imagenMapa");

    if (imagenMapa[0].complete) {
        $("map").imageMapResize(); 
    } else {
        imagenMapa.on("load", function () {
        $("map").imageMapResize(); 
        });
    }
}