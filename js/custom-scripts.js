url = 'http://localhost:63342/GeekFactory/';
//Custom scripts

//Cleans data from browser cache local storage.
function clearStoreDB() {
    //Cleans data
    store.clearAll();
}
<!-- Fills table, info stored in store.js in valores.html-->
function fillTable() {

    //Fills table with all projects.
    store.each(function(value, key) {
        $("#projectTable").append("<tr><td>"+ store.get(key).name+"</td><td>Criteria 1</td><td>Criteria 2</td></tr>");
    });
}
<!-- Ends fill table, info stored in store.js-->

<!-- Creates project, stores it in store.js -->
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
<!-- Ends create project, stored in store.js-->