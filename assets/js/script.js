/* console.log("Prueba enlace");
 
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
 getUsers();  */

 const startBtn= document.querySelector("#start");

 const getUsers = () => {
    document.getElementById("spinner").style.display = "block";
  
    const storedData = localStorage.getItem("usersData");
    const currentTime = new Date();
  
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const storedTime = new Date(parsedData.timestamp);
      const timeDiff = currentTime.getTime() - storedTime.getTime();
      const minuteInMilliseconds = 60 * 1000; // One minute in milliseconds
  
      if (timeDiff <= minuteInMilliseconds) {
        // Use data from local storage
        mainContainer.removeAttribute("class");
        displayUserData(parsedData.data);
        console.log("Data loaded from local storage.");
        document.getElementById("spinner").style.display = "none";

        return;
      }
    }
  
    // Fetch new data from API
    fetch("https://reqres.in/api/users?delay=3")
      .then(response => {
        console.log("Respuesta " + response.status);
        return response.json();
      })
      .then((usersObj) => {
        console.log(usersObj.data);
        const dataToStore = {
          data: usersObj.data,
          timestamp: currentTime.getTime()
        };
        localStorage.setItem("usersData", JSON.stringify(dataToStore));
        displayUserData(usersObj.data);
        console.log("Data loaded from API.");
      })
      .catch(error => console.log(error))
      .finally(() => {
        document.getElementById("spinner").style.display = "none";
        mainContainer.removeAttribute("class");

      });
  };
  
  const displayUserData = (userData) => {
    for (let i = 0; i < 6; i++) {
      document.getElementById("first-name" + (i + 1)).innerHTML = userData[i].first_name;
      document.getElementById("email" + (i + 1)).innerHTML = "Email: "+ userData[i].email;
      document.getElementById("ident" + (i + 1)).innerHTML = "ID: "+ userData[i].id;
      document.getElementById("last" + (i + 1)).innerHTML = userData[i].last_name;
      document.getElementById("avatar" + (i + 1)).src = "https://reqres.in/img/faces/" + [i + 1] + "-image.jpg";
    }
  };
  
const spinner= document.querySelector("#spinner-container");  
const mainContainer= document.querySelector("#cards-container");  
  
startBtn.addEventListener("click", function() {
    spinner.removeAttribute("class");
    document.getElementById("start").style.display = "none";
    getUsers();
}

);

