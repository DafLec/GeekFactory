url = 'http://localhost:63342/GeekFactory/';
//Custom scripts

//Cleans data from browser cache local storage.
function clearStoreDB() {
    //Cleans data
    store.clearAll();
}

// Fills project list
function fillProjectList() {
    for(var i=1; i<=store.get("projectTot"); i++){
        $('#projectListSide').append("<li>"+store.get("project"+i).name+"</li>");
    }

}

//Fills criteria list
function fillCriteriaList(){
    for(var i=1; i<=store.get("criteriaTot"); i++){
        $('#criteriaListSide').append("<li>"+store.get("criteria"+i).name+"</li>");
    }
}

//Fills criteria tab table
function fillCriteriaTab(){
    for(var i=1; i<=store.get("criteriaTot"); i++){
        var temp = store.get("criteria"+i);
        $("#criteria-swap").children("form").children("table").append("<tr><td>"+temp.name+"</td>"+"<td>"+temp.type+"</td><td><input type= 'text' name='ponC"+i+"'></td></tr>")
    }
}

//Fills values tab table
function fillValuesTab(){
    for(var i=0; i<=store.get("criteriaTot"); i++){
        for(var j =0; j<=store.get("projectTot");j++){
            //This if is for filling the first row of the table
            if(i==0){
               if(j==0){
                   $("#value-swipe").children("form").children("table").append("<tr><th>Criterio</th></tr>");   
               }else{
                   $("#value-swipe").children("form").children("table").children("tr").append("<th>"+store.get("project"+j).name+"</th");
               }
            }
            //In the first column we need the criteria name
            if(i>0&&j==0){
                $("#value-swipe").children("form").children("table").append("<tr id=value-swipe"+i+"><th>"+store.get("criteria"+i).name+"</th></tr>");
            }else if(i>0&&j>0){
                //The following columns depend on the type of criterion
                if(store.get("criteria"+i).type=="Cualitativo"){
                    $("#value-swipe"+i).append('<td><select style="display: inline"><option value="" disabled selected>Eliga una opción</option><option value="1">Muy bajo</option><option value="2">Bajo</option><option value="3">Medio</option><option value="4">Alto</option><option value="5">Muy alto</option></select></td>');
                }else{
                    $("#value-swipe"+i).append('<td><input type="number" class="form-control text-center"></td>');
                }
                
            }
        }
    }
}

//Runs when html finishes loading
$(document).ready(function () {
    //Needed for materialize css.
    $('.modal').modal();
    $('select').formSelect();
    $('.tabs').tabs({swipeable: true});
    
    //Total number of criteria and projects
    if(store.get("criteriaTot")==null){
        store.set("criteriaTot", 0);
    }
    if(store.get("projectTot") == null){
       store.set("projectTot", 0)
    }
    var ptot = store.get("projectTot");
    var ctot = store.get("criteriaTot");
    
    //Fills both lists
    fillCriteriaList();
    fillProjectList();
    
    //Fills both tabs
    fillCriteriaTab();
    fillValuesTab();
    
    // Creates new criteria on submit forms
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
                ctot ++;
                store.set("criteria"+ctot, {name: data[0].value, type: data[1].value});//Stores information about criteria in storage
                var criteria = store.get("criteria"+ctot);
                console.log("Criteria created! \nName: " + criteria.name + "\nQuantity: " + criteria.type + "\n");
                store.set("criteriaTot", ctot);
                $('#newCriteria-Form').trigger('reset');//Cleans/Restarts #newCriteria-Form.
                location.reload();
            } else if (store.get(data[0].value) !== null) {
                alert("Lo sentimos, este criterio ya existe");
            }
        }else {
            alert("Porfavor escriba un nombre para el criterio");
        }
    });
    
    //Creates new project on submit forms
    $('#newProject-Form').submit(function(e) {
        e.preventDefault();
        //Gets values from the form
        var data = $(this).serializeArray();
        console.log("Proyecto: ",data);
        if(data[0].value != ''){
            if(store.get(data[0].value) == null){
                ptot ++;
                store.set("project"+ptot, {name: data[0].value, description: data[1].value, cost: data[2].value});
                var project = store.get("project"+ptot);
                console.log('Project created! \nName: '+project.name + '\nDescription: '+project.description+'\nCost: '+project.cost);
                store.set("projectTot", ptot);
                $('#newProject-Form').trigger('reset');
                location.reload();
            }else if (store.get(data[0].vale) !== null){
                alert("Lo sentimos, este proyecto ya existe");
            }
        }else{
            alert("Por favor escriba el nombre del proyecto");
        }
    });
    
    //Saves the value of the ponderations of the criteria
    $('#criteriaPonderation-Form').submit(function(e){
        e.preventDefault();
        
        var data = $(this).serializeArray();
        for(var i =0; i<store.get("criteriaTot"); i++){
            if(data[i].value== null){
                alert("Debe de ingresar un varlor de ponderación para cada criterio")
                break;
            }else{
                console.log("Ponderación criterio "+(i+1)+": "+data[i].value);
                store.set("ponC"+(i+1),data[i].value);
            }
        }
    });
    
    //Analize and shows the priority of each project   
    $('#value-Form').submit(function(e){
        
    });
});