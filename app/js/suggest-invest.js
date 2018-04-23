function suggestInvest(){
    alert("Success");
}

$('#inversion').on('input',function(e){
    if ($(this).val() === null || $(this).val() == '' || $(this).val() === 0) {
        $('#btnInvest').hide();
    } else {
        $('#btnInvest').show();
    }
});