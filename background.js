
// this interacts with the popup dom


var auto = true;
var s_min = 0;
var s_hour = 12;

var now = new Date();

// get the current date and time as a string
var currentDateTime = now.toLocaleString();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var date = now.getDate();
var hour = now.getHours();
var min = now.getMinutes();

console.log(currentDateTime);
console.log(hour);
console.log(min);


// can't interact with DOM, have to send async messages
chrome.runtime.onMessage.addListener(
    function(request) {
      console.log(request.data.subject);
      if (request.data.subject == "mode") {
        if (request.data.content) {
            auto = true;
        } else {
            auto = false;
        }
      } else if (request.data.subject == "p_time") {

      }
    }
  );



// code from stack overflow, untested, https://stackoverflow.com/questions/60591487/chrome-extensions-how-to-set-function-to-execute-when-day-has-changed
function tick() {
    // Re-calculate the timestamp for the next day
    let next = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Adjust the timestamp if you want to run the code
    // around the same time of each day (e.g. 10:00 am)
    next.setHours(s_hour);
    next.setMinutes(s_min);
    next.setSeconds(0);
    next.setMilliseconds(0);

    // Save the new timestamp
    localStorage.savedTimestamp = next.getTime();

    // Run the function
    main();
}

function checkTimestamp() {
    if (localStorage.savedTimestamp) {
        let timestamp = parseInt(localStorage.savedTimestamp);

        if (Date.now() >= timestamp)
            tick();
    } else {
        // First time running
        tick();
    }
}

// Check every minute
setInterval(checkTimestamp, 60000);


function main() {
    if (auto) {
        autoRun();
    } else {
        buttonRun();
    }
}



function autoRun() {
    console.log("auto enabled");
    if (s_hour == hour && s_min <= min) {
        openTab();
    }
}

function buttonRun() {
    console.log("button mode enabled");

}

// opening the tab
function openTab() {
    var newURL = "https://www.linkedin.com/games/queens/";
    if (chrome.tabs.create({ url: newURL })) {
        return;
    }
    chrome.windows.create(newURL);
}



// document.addEventListener('DOMContentLoaded', function() {
//     var test = document.getElementById("hi");
//         console.log(document);
//         test.innerText = currentDateTime;

//         function send() {
//             chrome.runtime.sendMessage({
//                 msg: "something_completed", 
//                 data: {
//                     subject: "Loading",
//                     content: "Just completed!"
//                 }
//             });
//         }
//     });

    



    //have this here as background
    


    // chrome.runtime.onMessage.addListener(
    //     function(request, sender, sendResponse) {
    //         if (request.msg === "something_completed") {
    //             //  To do something
    //             console.log(request.data.subject)
    //             console.log(request.data.content)
    //             var div = document.getElementById('container');

    //             div.innerHTML += 'Extra stuff';
    //         }
    //     }
    // );


    //close in the content.js after solving and putting on linkedin
    // setTimeout(function() {
    //     chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    //         //'tabs' will be an array with only one element: an Object describing the active tab
    //         //  in the current window. To remove the tab, pass the ID: to chrome.tabs.remove().
    //         chrome.tabs.remove(tabs[0].id);
    //     });
    // }, 10000);