console.log("Prueba enlace");
 
const getUsers = () => {
    document.getElementById("spinner").style.display = "block";

    fetch ("https://reqres.in/api/users?delay=3")
        .then(response => {
            console.log("Respuesta " + response.status)
            return response.json(); 
            })
        .then((usersObj)=> {
            console.log(usersObj.data)
            localStorage.setItem("usersData", JSON.stringify(usersObj.data));
            for(i=0;i<6;i++){ 
                document.getElementById("first-name"+(i+1)).innerHTML= usersObj.data[i].first_name; 
                document.getElementById("email"+(i+1)).innerHTML= usersObj.data[i].email; 
                document.getElementById("ident"+(i+1)).innerHTML= usersObj.data[i].id;
                document.getElementById("last"+(i+1)).innerHTML= usersObj.data[i].last_name; 
                document.getElementById("avatar"+(i+1)).src= "https://reqres.in/img/faces/"+[i+1]+"-image.jpg";
            } 

            document.getElementById("spinner").style.display = "none";
            
        }) 
        .catch(error => console.log(error));
    
}
 getUsers(); 