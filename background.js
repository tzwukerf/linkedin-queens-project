
// this interacts with the popup dom

//TODO:
// DONE: make this run once a day
// chrome says it kills workers after 15 mins or something, test to see if it works after 15 mins





// message code
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

//     console.log(request.message)
//     console.log(request.data);
//     if (request.data == undefined) {
//         console.log("ERROR: request.data undefined mode. Contact the developer tzwukerf@gmail.com")
//         return;
//     }

//     // message
//     if (request.message == "mode") {
//         (request.data) ? (auto = true) : (auto = false)
//     } else if (request.message == "p_time") {
//         var time_msg = request.data.split(":");
//         s_hour = parseInt(time_msg[0]);
//         s_min = parseInt(time_msg[1]);
//     } else if (request.message == "p_secs") {
//         p_secs = request.data;
//     } else {
//         console.log("ERROR: else statement in event listener. Contact developer tzwukerf@gmail.com");
//         return;
//     }
//   })

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        console.log("This is a first install!");
        chrome.storage.sync.set({ "mode": true }, function () {
            chrome.storage.sync.set({ "p_time": "13:30" }, function () {
                chrome.storage.sync.set({ "p_secs": 0 }, function () {
                    main();
                });
            });
        });
    }
    // else if(details.reason == "update"){
    //     var thisVersion = chrome.runtime.getManifest().version;
    //     console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    // }
});


// main background scripts that runs when triggered


chrome.alarms.create("dailyAlarm", { delayInMinutes: 1, periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(() => {
    main();
});
function main() {
    console.log(chrome.storage.sync.get("p_time"));

    // default settings, will get changed upon user change to popup
    var auto;
    var loaded_time;

    chrome.storage.sync.get(["mode"]).then((result_mode) => {
        auto = result_mode.mode;
        console.log("Value is " + result_mode.mode);

        chrome.storage.sync.get(["p_time"]).then((result_time) => {
            loaded_time = result_time.p_time;
            console.log("Value is " + result_time.p_time);
    
            if (auto != undefined) {
                if (auto) {
                    console.log("auto run")
                    console.log(loaded_time)
                    autoRun(loaded_time);
                } else {
                    buttonRun();
                }
            }
          });
      });

      


    console.log("main run")

    // const readLocalStorage = async (key) => {

    //     return new Promise((resolve, reject) => {

    //         chrome.storage.sync.get([key], function (result) {
    //             if (result[key] === undefined) {
    //                 //reject();
    //                 resolve(undefined);
    //             } else {
    //                 resolve(result[key]);
    //             }
    //         });
    //     });
    // };


    // async function getData() {
    //     auto = await readLocalStorage('mode');
    //     loaded_time = await readLocalStorage('p_time');
    //     loaded_secs = await readLocalStorage('p_secs');
    // }

    // getData();
    // console.log(auto);
    // console.log(loaded_time);

    
}


function autoRun(given_time) {
    console.log("auto enabled");
    // date
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var year = date.getFullYear();
    var month = date.getMonth();
    var s_hour = parseInt(given_time.split(":")[0]);
    var s_min = parseInt(given_time.split(":")[1]);
    console.log(date)
    console.log(given_time);
    if (s_hour == hour && s_min <= min) {
        openTab();
    }
}

function buttonRun() {
    console.log("button mode enabled");
    console.log("this feature is not yet implemented")
}

// opening the tab
function openTab() {
    var newURL = "https://www.linkedin.com/games/queens/";
    if (chrome.tabs.create({ url: newURL })) {
        return;
    }
    chrome.windows.create(newURL);
}

