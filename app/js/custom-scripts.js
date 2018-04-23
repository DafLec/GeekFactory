url = 'http://localhost:63342/GeekFactory/';
//Custom scripts

//Cleans data from browser cache local storage.
function clearStoreDB() {
    //Cleans data
    store.clearAll();
}

// Fills project list
function fillProjectList() {
    var html = '';
    for(var i=1; i<=store.get("projectTot"); i++){
        html = '' +
            '<li>' +
            '   <div class="collapsible-header blue-text">'+store.get("project"+i).name+'</div>' +
            '   <div class="collapsible-body">'+
            '       <span>Description: '+store.get("project"+i).description+'</span><br>' +
            '       <span>Valor: $'+store.get("project"+i).cost+'</span>' +
            '   </div>' +
            '</li>';
        $('#projectListSide').append(html);
    }

}

//Fills criteria list
function fillCriteriaList(){
    var html = '';
    for(var i=1; i<=store.get("criteriaTot"); i++){
        html = '' +
            '<li>' +
            '   <div class="collapsible-header blue-text">'+store.get("criteria"+i).name+'</div>' +
            '   <div class="collapsible-body">' +
            '       <span>Tipo: ' +store.get("criteria"+i).type+ '</span><br>' +
            // '       <span>Valor: ' +store.get("criteria"+i).value+ '</span>' +
            '   </div>' +
            '</li>';
        $('#criteriaListSide').append(html);
    }
}

//Fills criteria tab table
function fillCriteriaTab(){
    for(var i=1; i<=store.get("criteriaTot"); i++){
        var temp = store.get("criteria"+i);
        $("#criteria-swap").children("form").children("table").append("<tr><td>"+temp.name+"</td>"+"<td>"+temp.type+"</td><td><input class='col s2 m2 white-text' min='0' max='100' type= 'number' name='ponC"+i+"'><a class='white-text col s1 m1'>%</a> </td></tr>")
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
                    $("#value-swipe"+i).append('<td><select style="display: inline" name="criterium"><option value="" disabled selected>Eliga una opción</option><option value="1">Muy bajo</option><option value="2">Bajo</option><option value="3">Medio</option><option value="4">Alto</option><option value="5">Muy alto</option></select></td>');
                }else{
                    $("#value-swipe"+i).append('<td><input type="number" name="criterium" class="form-control text-center col s10 m10 white-text"></td>');
                }
                
            }
        }
    }
}

function fillModalMatrizTable(){
    for(var i=0; i<=store.get("criteriaTot"); i++){
        //analize data
        if(i>0){
            var criteria = toArray(i);
            console.log(store.get("criteria"+i));
            if (store.get("criteria"+i).mayMen == 1){//Bigger is better
                criteria= sortByKey(criteria, 'criterium').reverse(); //descending order
            }else{//lower is better
                criteria = sortByKey(criteria,"criterium");//acending order
            }
        }
        
        //fills table
        for(var j =0; j<=store.get("projectTot")+1;j++){
            //This if is for filling the first row of the table
            if(i==0){
               if(j==0){
                   $("#modalMatrizTable").append("<tr><th>Criterio</th></tr>");
               }else if(j==1){
                   $("#modalMatrizTable").children("tr").append("<th>Ponderación</th>");
               }else{
                    $("#modalMatrizTable").children("tr").append("<th>"+store.get("project"+(j-1)).name+"</th");   
               }
            }
            //In the first column we need the criteria name
            if(i>0&&j==0){
                $("#modalMatrizTable").append("<tr id=matriz"+i+"><th>"+store.get("criteria"+i).name+"</th></tr>");
            }
            //In the second column we need the criterium's ponderation
            if(i>0&&j==1){
                $("#matriz"+i).append("<th>"+store.get("ponC"+i)+" %</th>");
            }
            //Following columns depend on priority
            if(i>0&&j>1){
                criteria.forEach(function(c){
                    console.log(c.name);
                });
            }
        }
    }
}

function refreshCtotal(ponCtot){
    $('#cTotal').text('Total: ' + ponCtot+'%');
}

 //Saves the values of the criteria assigned to each project 
function valueMatrix() {
    console.log("Saved values!");
    var data = $('#value-Form').serializeArray();
    for(var i=1, j=0;i<=store.get("criteriaTot");i++){
        for(var k=1;k<=store.get("projectTot");j++, k++){
            store.set("proj"+k+"crit"+i, data[j].value);
            console.log(store.get("proj"+k+"crit"+i));
        }
    }
    fillModalMatrizTable();
}

function toArray(n){
    var array= [];
    for (var i=1; i<=store.get("projectTot");i++){
        array.push({name: store.get("project"+i).name,
                   criterium: store.get("proj"+i+"crit"+n)});
    }
    //console.log(array);
    return array;
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

//Runs when html finishes loading
$(document).ready(function () {
    //Needed for materialize css.
    $('.modal').modal();
    $('select').formSelect();
    $('.tabs').tabs({swipeable: true});
    $('.collapsible').collapsible();

    //Total number of criteria and projects
    if(store.get("criteriaTot")==null){
        store.set("criteriaTot", 0);
    }
    if(store.get("projectTot") == null){
       store.set("projectTot", 0)
    }
    var ptot = store.get("projectTot");
    var ctot = store.get("criteriaTot");
    var ponCtot = 0;
    
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
        var MayMen = $('#selectValueCrit').val();
        console.log("Criterio: " , data);
        //Store data into Store.js
        if (data[0].value != '') {
            //Sets values to the store object
            //If there is no criteria with that name, it will be created, otherwise it will alert the user.
            if (store.get(data[0].value) == null) {
                ctot ++;
                store.set("criteria"+ctot, {name: data[0].value, type: data[1].value, mayMen: MayMen});//Stores information about criteria in storage
                var criteria = store.get("criteria"+ctot);
                console.log("Criteria created! \nName: " + criteria.name + "\nQuantity: " + criteria.type + "\nSort By: " + criteria.mayMen);
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
            if(data[i].value == null || data[i].value === '' || data[i].value === 'NaN'){
                alert("Debe de ingresar un valor de ponderación para cada criterio");
                break;
            }else {
                console.log("Ponderación criterio "+(i+1)+": "+data[i].value);
                store.set("ponC"+(i+1),data[i].value);
                ponCtot += parseInt(data[i].value);
                refreshCtotal(ponCtot);
                console.log("ponCtot", ponCtot);
            }
        }

        console.log("Ponderacion:", ponCtot);
        if ( ponCtot !== 100 ){
            alert("Porfavor verifique que la suma de las ponderaciones sea igual a 100");
        }

        ponCtot = 0;
    });
});