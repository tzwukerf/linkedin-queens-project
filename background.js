chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "something_completed") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)
            var div = document.getElementById('container');

            div.innerHTML += 'Extra stuff';
        }
    }
);
    console.log("auto enabled");
    //have this here as background
    // setTimeout ( function () {
    //     var newURL = "https://www.linkedin.com/games/queens/";
    //     chrome.tabs.create({ url: newURL });
    //     //chrome.windows.create(newURL);

    // },
    // 5000
    // );


    //close in the content.js after solving and putting on linkedin
    // setTimeout(function() {
    //     chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    //         //'tabs' will be an array with only one element: an Object describing the active tab
    //         //  in the current window. To remove the tab, pass the ID: to chrome.tabs.remove().
    //         chrome.tabs.remove(tabs[0].id);
    //     });
    // }, 10000);