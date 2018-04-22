url = 'http://localhost:63342/GeekFactory/';
//Custom scripts

//Cleans data from browser cache local storage.
function clearStoreDB() {
    //Cleans data
    store.clearAll();
}
// Fills table, info stored in store.js in valores.html
function fillTable() {

    // //Fills table with all projects.
    // store.each(function(value, key) {
    //     $("#projectTable").append("<tr><td>"+ store.get(key).name+"</td><td>Criteria 1</td><td>Criteria 2</td></tr>");
    // });

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

// // Fills table, info stored in store.js in valores.html
// function fillCriteriaTable() {
//
//     //Fills table with all projects.
//     store.each(function(value, key) {
//         var html = '';
//         html = ;
//         $("#projectTable").append(html);
//     });
// }
// // Ends fill table, info stored in store.js-->

// Creates project, stores it in store.js -->
function createProject() {
    //Gets information from forms
    var projectName = document.getElementById("projectName").value;
    var projectDescription = document.getElementById("projectDescription").value;
    var projectQty = document.getElementById("projectQty").value;

    if (projectName != '') {
        //Sets values to the store object
        //If there is no project with that name, it will be created, otherwise it will alert the user.
        if (store.get(projectName) == null) {
            store.set(projectName, {name: projectName, description: projectDescription, quantity: projectQty});//Stores information about project in storage
            var project = store.get(projectName);
            console.log("Project created! \nName: " + project.name + "\nDescription: " + project.description + "\nQuantity: " + project.quantity + "\n");

        } else if (store.get(projectName) !== null) {
            swal("Error!", "Lo sentimos el proyecto ya existe!", "error")        }
    }else {
        alert("Porfavor escriba un nombre para el proyecto");
    }

    //TODO:Delete after testing.
    //Prints in console all projects.
    store.each(function(value, key) {
        console.log("Name: " + store.get(key).name);
        console.log("Description: " + store.get(key).description);
        console.log("Quantity: " + store.get(key).quantity + "\n");
    })
}

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

    // $('#addProject').on('click', function () {
    //     var html;
    //     html = '' +
    //         '<form onsubmit="createProject()">'+
    //         '   <div class="form-group">' +
    //         '       <label for="projectName">Nombre del proyecto</label>' +
    //         '       <input id="projectName" type="text" class="form-control text-center" placeholder="Nombre">' +
    //         '    </div>' +
    //         '    <div class="form-group">' +
    //         '       <label for="projectDescription">Descripción</label>' +
    //         '       <textarea id="projectDescription" class="form-control"></textarea>' +
    //         '    </div>' +
    //         '    <div>' +
    //         '       <label for="projectQty">Costo</label>' +
    //         '       <input id="projectQty" type="number" class="form-control text-center" placeholder="Cantidad">' +
    //         '    </div>' +
    //         '    <br>' +
    //         '    <div class="text-center">' +
    //         '       <button type="submit" class="btn btn-outline-success">Guardar</button>' +
    //         '    </div>' +
    //         '</form>';
    //     console.log("Project add", html);
    //     createHtmlSwal(html);
    // });

    // $('#addProject').on('click', function () {
    //     var html = '';
    //     console.log("Project add");
    //     createHtmlSwal(html);
    // });

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
                store.set(data[0].value, {name: data[0].value, quantity: data[1].value});//Stores information about project in storage

                var criteria = store.get(data[0].value);
                console.log("Criteria created! \nName: " + criteria.name + "\nQuantity: " + criteria.quantity + "\n");

                $('#newCriteria-Form').trigger('reset');//Cleans/Restarts #newCriteria-Form.

            } else if (store.get(data[0].value) !== null) {
                alert("Lo sentimos, este criterio ya existe!");
            }
        }else {
            alert("Porfavor escriba un nombre para el criterio");
        }
    });
});