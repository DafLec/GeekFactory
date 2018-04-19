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
    store.each(function(value, key) {
        $("#projectTable").append("<tr><td>"+ store.get(key).name+"</td><td>Criteria 1</td><td>Criteria 2</td></tr>");
    });
}
// Ends fill table, info stored in store.js-->

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
            alert("Lo sentimos, este proyecto ya existe!");
        }
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

function createProyect() {
    
}

// Ends create project, stored in store.js-->
$(document).ready(function () {

    //Starts tabs
    $('.tabs').tabs();

    // Creates new criteria
    $('#newCriteria-Form').submit(function (e) {
        e.preventDefault();

        //Gets values from the form and puts them in an array.
        var data = $(this).serializeArray();

        //Store data into Store.js
        if (data[0].value != '') {
            //Sets values to the store object
            //If there is no criteria with that name, it will be created, otherwise it will alert the user.
            if (store.get(data[0].value) == null) {
                store.set(data[0].value, {name: data[0].value, type: data[1].value, quantity: data[2].value});//Stores information about project in storage

                var criteria = store.get(data[0].value);
                console.log("Criteria created! \nName: " + criteria.name + "\nType: " + criteria.type + "\nQuantity: " + criteria.quantity + "\n");

                $('#newCriteria-Form').trigger('reset');//Cleans/Restarts #newCriteria-Form.

            } else if (store.get(data[0].value) !== null) {
                alert("Lo sentimos, este criterio ya existe!");
            }
        }else {
            alert("Porfavor escriba un nombre para el criterio");
        }
    });
});