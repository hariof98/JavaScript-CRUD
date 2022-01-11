let id = 'null';
displayData();
//localStorage.clear();

function processData(e){
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let mobile = document.getElementById("mobile").value;
    if(fname == '' || lname == ''){
        document.getElementById("msg").innerHTML = "* Please Enter Both First Name and Last Name";
        event.preventDefault();
    }
    else if(mobile == ''){
        document.getElementById("msg").innerHTML = "* Please Enter Mobile Number";
        event.preventDefault();
    }
    else if(mobile.length < 10 || mobile.length > 10 ){
        document.getElementById("msg").innerHTML = "* Mobile Number Should be 10 digits!";
        event.preventDefault();
    }
    else{
        console.log(id);
        if(id == 'null'){
            let arr = getLocalStorage();             
            if(arr == null){
                const myStorage = [
                    {
                        "First Name": fname,
                        "Last Name": lname,
                        "Mobile":  mobile
                    }
                ]
                setLocalStorage(myStorage);
            }
            else{
                const myUpdateStorage = {
                        "First Name": fname,
                        "Last Name": lname,
                        "Mobile":  mobile
                    }
                
                arr.push(myUpdateStorage);
                setLocalStorage(arr);
            }
            document.getElementById("msg").innerHTML = "Data Added";
        }
        else{
            let arr = getLocalStorage();
            arr[id]['First Name'] = fname;
            arr[id]['Last Name'] = lname;
            arr[id]['Mobile'] = mobile;
            console.log(id);
            setLocalStorage(arr);
            document.getElementById("msg").innerHTML = "Data Updated";
        }   
        resetFormData();
        displayData();
    }
}   

function displayData(){
    let arr = getLocalStorage();  
    //console.log(arr);
    if(arr != null){
        var row = document.createElement('td');
        let html = '';
        for(var list =0;  list<=arr.length; list++){
            html=html+ `<tr>
                <td>${arr[list]["First Name"]} ${arr[list]["Last Name"]} </td>
                <td>${arr[list]["Mobile"]}</td>
                <td><a href="javascript:;" onclick="editData(${list});">Edit</a>/<a href="javascript:void(0)" onclick="deleteData(${list});">Delete</a></td>
            </tr>`
            document.getElementById('root').innerHTML= html;
        }
        console.log(row);
        document.getElementById('root').appendChild = row;
    }
}

function resetFormData(){
    document.getElementById("fname").value = '';
    document.getElementById("lname").value = '';
    document.getElementById("mobile").value = '';
}

function deleteData(myid){
    let arr = getLocalStorage();     
    arr.splice(myid,1);
    setLocalStorage(arr);
    displayData();
}

function editData(myid){
    id = myid;
    let arr = getLocalStorage();     
    document.getElementById("fname").value  = arr[myid]['First Name'];
    document.getElementById("lname").value = arr[myid]['Last Name'];
    document.getElementById("mobile").value = arr[myid]["Mobile"];
    
}

function getLocalStorage(){
    let arr = JSON.parse(localStorage.getItem('JavaScript-CRUD'));       
    return arr;
}

function setLocalStorage(arr){
    localStorage.setItem('JavaScript-CRUD', JSON.stringify(arr));
}