url = 'http://localhost:63342/GeekFactory/';
//Custom scripts

//Cleans data from browser cache local storage.
function clearStoreDB() {
    //Cleans data
    store.clearAll();
}
// Fills table, info stored in store.js in valores.html
function fillTable() {
    //Fills table with all projects.
    store.get('proyects').each(function(value, key) {
        var html;
        html = "<li class='collection-item'><div>"+ store.get(key).name+ "<a href='#!' class='secondary-content'><i class='material-icons'>add</i></a></div></li>";
        $("#projectListSide").append(html);
    });
}
// Ends fill table, info stored in store.js-->

// Fills table, info stored in store.js in valores.html
function fillProjectTable() {


}
// Ends fill table, info stored in store.js-->

function createHtmlSwal(html) {
    console.log(html);
    swal({  title: "Agregar proyecto",
            text: html.toString(),
            type: "input",
            html: true,
            customClass: 'swal-wide',
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Agregar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: false },
        function(isConfirm){
            if (isConfirm) {
                swal("Success!", "Tu proyecto ha sido agregado correctamente. :)", "success");   }
            else {
                swal("Cancelado", "Se cancelo el proyecto ),:", "error");   }
        });
}

// Ends create project, stored in store.js-->
$(document).ready(function () {
    //Needed for materialize css.
    $('.modal').modal();
    $('select').formSelect();
    $('.tabs').tabs({swipeable: true});

    // Creates new criteria
    $('#newCriteria-Form').submit(function (e) {
        e.preventDefault();

        //Gets values from the form and puts them in an array.
        var data = $(this).serializeArray();
        console.log("Criterio: " , data);
        //Store data into Store.js
        if (data[0].value != '') {
            //Sets values to the store object
            //If there is no criteria with that name, it will be created, otherwise it will alert the user.
            if (store.get(data[0].value) == null) {
                store.set(data[0].value, {name: data[0].value, quantity: data[1].value});//Stores information about criteria in storage
                var criteria = store.get(data[0].value);
                console.log("Criteria created! \nName: " + criteria.name + "\nQuantity: " + criteria.quantity + "\n");
                $('#newCriteria-Form').trigger('reset');//Cleans/Restarts #newCriteria-Form.

            } else if (store.get(data[0].value) !== null) {
                alert("Lo sentimos, este criterio ya existe");
            }
        }else {
            alert("Porfavor escriba un nombre para el criterio");
        }
    });
    
    //Creates new project
    $('#newProject-Form').submit(function(e) {
        e.preventDefault();
        //Gets values from the form
        var data = $(this).serializeArray();
        console.log("Proyecto: ",data);
        if(data[0].value != ''){
            if(store.get(data[0].value) == null){
                store.set(data[0].value, {name: data[0].value, description: data[1].value, cost: data[2].value});
                var project = store.get(data[0].value);
                console.log('Project created! \nName: '+project.name + '\nDescription: '+project.description+'\nQuantity: '+project.cost);
                $('newProject-Form').trigger('reset');
            }else if (store.get(data[0].vale) !== null){
                alert("Lo sentimos, este proyecto ya existe");
            }
        }else{
            alert("Por favor escriba el nombre del proyecto");
        }
    });
});