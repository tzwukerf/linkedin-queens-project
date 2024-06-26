
// this interacts with the popup dom

//TODO:
// DONE: make this run once a day
// chrome says it kills workers after 15 mins or something, test to see if it works after 15 mins


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

}


function autoRun(given_time) {
    console.log("auto enabled");

    // date
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var day = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth();
    var s_hour = parseInt(given_time.split(":")[0]);
    var s_min = parseInt(given_time.split(":")[1]);
    console.log(date)
    console.log(given_time);

    if (s_hour == hour && s_min == min) {
        openTab();
    }

    //untested
    // chrome.storage.sync.get(["last_day"]).then((result) => {

    //     // date
    //     var date = new Date();
    //     var hour = date.getHours();
    //     var min = date.getMinutes();
    //     var day = date.getDate();
    //     var year = date.getFullYear();
    //     var month = date.getMonth();
    //     var s_hour = parseInt(given_time.split(":")[0]);
    //     var s_min = parseInt(given_time.split(":")[1]);
    //     console.log(date)
    //     console.log(given_time);

    //     if (last_day == undefined) {
    //         chrome.storage.sync.set({ "last_day": day }, function () {
    //             if (s_hour == hour && s_min <= min) {
    //                 openTab();
    //             }
    //         });
    //     } else {
    //         if (day != result) {
    //             if (s_hour == hour && s_min <= min) {
    //                 openTab();
    //             }
    //         }
    //     }
    // });

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

