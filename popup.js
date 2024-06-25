
document.addEventListener('DOMContentLoaded', function() {







    chrome.storage.sync.get(/* String or Array */["firstLoad"], function(items){
        if (items.length == 0) {
                console.log("ITEMS:" + items);

                chrome.storage.sync.set({ "auto_run": "true" }, function(){});
                chrome.storage.sync.set({ "p_time": "13:30" }, function(){});

                chrome.storage.sync.set({ "firstLoad": "false" }, function(){});
        }

        chrome.storage.sync.get(/* String or Array */["auto_run"], function(items){
            //  items = [ { "yourBody": "myBody" } ]
            console.log("checks")
            console.log(items.key)
            if (items.key) {
                document.getElementById("mode").checked = true;
            } else {
                document.getElementById("mode").checked = false;
            }
        
        });
    
        chrome.storage.sync.get(/* String or Array */["p_time"], function(items){
            console.log("time")
            console.log(items.key)
            //  items = [ { "yourBody": "myBody" } ]
            document.querySelector('input[type="time"]').value = items.key;
        
        });
    

    });

    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
          console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
          );

          if (key == "mode") {
            chrome.storage.sync.set({ "mode": newValue }, function(){
                //  A data saved callback omg so fancy
            });
          }
          if (key == "p_time") {
            chrome.storage.sync.set({ "p_time": newValue }, function(){
                //  A data saved callback omg so fancy
            });
          }
          
        

          //send over the mode

        chrome.runtime.sendMessage({
            msg: "mode", 
            data: {
                subject: "mode",
                content: document.getElementById('mode').checked
            }
        });
        console.log(document.getElementById('mode').checked)

        // send over preferred time
        chrome.runtime.sendMessage({
            msg: "p_time", 
            data: {
                subject: "p_time",
                content: document.querySelector('input[type="time"]').value
            }
        });


        }
      });
    
    
    
    
    

    
    

    



});


//setTimeout(send(), 1000);