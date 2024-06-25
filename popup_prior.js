

document.getElementById("mode").checked = items.key;












document.addEventListener('DOMContentLoaded', function () {

    var mode_val;
    var p_val;

    chrome.storage.sync.get(/* String or Array */["firstLoad"], function (items) {

        //first load
        if (items.length == undefined) {
            console.log("ITEMS:" + items);

            chrome.storage.sync.set({ "auto_run": "true" }, function () { });
            chrome.storage.sync.set({ "p_time": "13:30" }, function () { });

            chrome.storage.sync.set({ "firstLoad": "false" }, function () { });
        }

        mode_val = getMode();

        p_val = getP();


    });

    // other loads

    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            console.log(
                `Storage key "${key}" in namespace "${namespace}" changed.`,
                `Old value was "${oldValue}", new value is "${newValue}".`
            );

            if (key == "mode") {
                chrome.storage.sync.set({ "mode": newValue }, function () {
                    //  A data saved callback omg so fancy
                });
            }
            if (key == "p_time") {
                chrome.storage.sync.set({ "p_time": newValue }, function () {
                    //  A data saved callback omg so fancy
                });

            }

            mode_val = getMode();

            p_val = getP();

            console.log(newValue);


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




function getP() {
    chrome.storage.sync.get(/* String or Array */["p_time"], function (items) {
        console.log("time")
        console.log(items.key)
        //  items = [ { "yourBody": "myBody" } ]
        if (items.key) {
            document.querySelector('input[type="time"]').value = items.key;
        }
        return items.key

    });

}

function getMode() {
    chrome.storage.sync.get(/* String or Array */["auto_run"], function (items) {
        //  items = [ { "yourBody": "myBody" } ]
        console.log("checks")
        console.log(items.key)
        if (items.key) {
            document.getElementById("mode").checked = items.key;
        } // true or false
        return items.key;

    });
}


// //setTimeout(send(), 1000);