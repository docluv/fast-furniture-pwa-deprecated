
var fetchImage = document.querySelector(".fetch-image");

fetch("https://love2dev.com/images/mountain-valley.jpg")  
    .then(function (response) {
        return response.blob();
    })

.then(function (myBlob) {

    var objectURL = URL.createObjectURL(myBlob);

    fetchImage.src = objectURL;

}).catch(function (err) {   
    console.log('CORS Fetch Error :-S', err);  
});

fetch("https://love2dev.com/images/mountain-valley.jpg", {
    "mode": "no-cors"
})  
    .then(function (response) {
        return response.blob();
    })

.then(function (myBlob) {

    var objectURL = URL.createObjectURL(myBlob);

    fetchImage.src = objectURL;

}).catch(function (err) {   
    console.log('No CORS Fetch Error :-S', err);  
});