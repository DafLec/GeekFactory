function suggestInvest(){
    var investment = $('#inversion').val();
    var pCost = 100;//TODO:CHANGE FOR REAL VALUES FROM PROJECTS.
    var html = '<a class="blue-grey-text">Proyectos prioritarios ejecutables con el presupuesto de inversion: </a>'+
        '<br><br>'+
        '<div class="divider"></div> '+
        '<div style="overflow-y: scroll">';

    var i;
    for (i = 0; i < 20; i++) {
        if (pCost<=investment){
            html += '' +
                '<a>'+i+'</a><br>' +
                '<div class="divider"></div>';
        }
    }

    html += '</div>';
    swal({
            title: "Listo!",
            text: html,
            type: "success",
            html: true,
            customClass: 'swal-wider',
            confirmButtonColor: "#00b0ff",
            confirmButtonText: "Terminar",
            closeOnConfirm: true },
        function(){

        });
}

$('#inversion').on('input',function(e){
    if ($(this).val() === null || $(this).val() == '' || $(this).val() === 0) {
        $('#btnInvest').hide();
    } else {
        $('#btnInvest').show();
    }
});