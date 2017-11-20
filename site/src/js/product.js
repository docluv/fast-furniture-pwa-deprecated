function getProductById(id) {

    if (!id) {
        console.log("missing product id");
        return;
    }

    fetch("./api/products/" + id + ".json")  
        .then(   function (response) {    
            if (response.status !== 200) {     
                console.log('Looks like there was a problem. Status Code: ' +       response.status);     
                return;    
            }
               
            response.json().then(function (data) {     
                console.log(data);    
            });   
        }  )  .catch(function (err) {   
            console.log('Fetch Error :-S', err);  
        });

}


getProductById(getParameterByName("prod"));