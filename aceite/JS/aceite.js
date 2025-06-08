$(window).on("load",inicio);

function inicio(){
    $("#pestannas").tabs({
        event:"click"
    });

    $("#acidosGrasos").on("click", () => mostrarInfo('acidos'));
    $("#polifenoles").on("click", () => mostrarInfo('polifenoles'));
    $("#tocoferoles").on("click", () => mostrarInfo('tocoferoles'));
    $("#compVolAro").on("click", () => mostrarInfo('aromaticos'));

    $("#cerrarBoton").on("click", cerrarInfo);
    
}

function mostrarInfo(compuesto){
    const info = {
        acidos: {
            title: "Ácidos Grasos",
            desc: "Principalmente ácido oleico (monoinsaturado), seguido de ácido linoleico (poliinsaturado) y ácido palmítico (saturado)"
        },
        polifenoles: {
            title: "Polifenoles",
            desc: "Antioxidantes naturales que protegen contra la oxidación."
        },
        tocoferoles: {
            title: "Tocoferoles (Vitamina E)",
            desc: "Contribuyen a la estabilidad del aceite y aportan beneficios antioxidantes."
        },
        aromaticos: {
            title: "Compuestos Aromáticos",
            desc: "Compuestos volátiles y aromáticos: Responsables del sabor y aroma característicos, especialmente en el aceite de oliva virgen extra."
        }
    };

    $('#infoTitulo').text(info[compuesto].title);
    $('#infoDesc').text(info[compuesto].desc);

    $("#dialogMindMap")[0].showModal(); 


}

function cerrarInfo() {
    $("#dialogMindMap")[0].close(); 
}