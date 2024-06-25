
// this interacts with the popup dom

//TODO:
// - make this run once a day, so far it doesn't work

// default settings, will get changed upon user change to popup
var auto = true;
var s_hour = 13;
var s_min = 30;
var p_secs = 0;

// message code
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    
    console.log(request.message)
    console.log(request.data);
    if (request.data == undefined) {
        console.log("ERROR: request.data undefined mode. Contact the developer tzwukerf@gmail.com")
        return;
    }

    // message
    if (request.message == "mode") {
        (request.data) ? (auto = true) : (auto = false)
    } else if (request.message == "p_time") {
        var time_msg = request.data.split(":");
        s_hour = parseInt(time_msg[0]);
        s_min = parseInt(time_msg[1]);
    } else if (request.message == "p_secs") {
        p_secs = request.data;
    } else {
        console.log("ERROR: else statement in event listener. Contact developer tzwukerf@gmail.com");
        return;
    }
  })


// main background scripts that runs when triggered

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

