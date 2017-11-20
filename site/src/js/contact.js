



fetch("https://7g46i3t1el.execute-api.us-east-1.amazonaws.com/demo/contact", {
	method: "POST", 
	mode: "cors", 
	redirect: "follow",
	headers: new Headers({
		"Content-Type": "application/json"
	})
}).then(function(response) { 

    /* handle response */ 

    console.log(response);

});