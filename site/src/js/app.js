        if ('serviceWorker' in navigator) {  

            navigator.serviceWorker.register('/sw.js').then(reg => { 

                // reg.installing; // the installing worker, or undefined
                // reg.waiting; // the waiting worker, or undefined
                // reg.active; // the active worker, or undefined   

                console.log("Registration was successful"); 

                reg.addEventListener('updatefound', () => {   // A wild service worker has appeared in reg.installing!
                      
                    const newWorker = reg.installing;  

                    console.log("newWorker.state: ", newWorker.state);  
                     // "installing" - the install event has fired, but not yet complete
                       // "installed"  - install complete
                       // "activating" - the activate event has fired, but not yet complete
                       // "activated"  - fully active
                       // "redundant"  - discarded. Either failed install, or it's been
                       //                replaced by a newer version

                    newWorker.addEventListener('statechange', () => {    
                        // newWorker.state has changed

                        console.log("service worker state change");
        
                    }); 

                }); 

            });

            navigator.serviceWorker.addEventListener('controllerchange',
                function () {

  // This fires when the service worker controlling this page
  // changes, eg a new worker has as skipped waiting and become
  // the new active worker.
                    console.log('serviceWorker.onControllerchange',
                        navigator.serviceWorker.controller.scriptURL);

                });

        }


        function getParameterByName(name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }