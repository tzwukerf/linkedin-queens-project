
//plan:
// - once dom loaded, if firstLoad in storage is undefined, then load in default settings
// - whenever the html is changed, set the storage
// - based on the storage, send to backend

var loaded_mode = undefined;
var loaded_time = undefined;

// from Stack Overflow: https://stackoverflow.com/questions/59440008/how-to-wait-for-asynchronous-chrome-storage-local-get-to-finish-before-continu

const readLocalStorage = async (key) => {
    
    return new Promise((resolve, reject) => {
        
      chrome.storage.sync.get([key], function (result) {
        if (result[key] === undefined) {
          //reject();
          resolve(undefined);
        } else {
          resolve(result[key]);
        }
      });
    });
  };

getData();

async function getData() {
    
    loaded_mode = await readLocalStorage('mode');
    loaded_time = await readLocalStorage('p_time');
    loaded_secs = await readLocalStorage('p_secs');

    if (document.readyState === "loading") {
        // Loading hasn't finished yet
        document.addEventListener("DOMContentLoaded", changeEvent);
      } else {
        // `DOMContentLoaded` has already fired
        changeEvent();
      }
}



function changeEvent() {
    var mode_elem = document.getElementById("mode");
    var time_elem = document.getElementById("appt-time");
    var secs_elem = document.getElementById("quantity");

    if (loaded_mode != undefined) {
        mode.checked = loaded_mode;
    }
    if (loaded_time != undefined) {
        time_elem.value = loaded_time;
    }
    if (loaded_secs != undefined) {
        secs_elem.value = loaded_secs;
    }

    mode_elem.addEventListener("change", (event) => {
        mode_elem = document.getElementById("mode");
        sendToStorage("mode", mode_elem.checked);
        sendToBack("mode", mode_elem.checked);
    });

    time_elem.addEventListener("change", (event) => {
        time_elem = document.getElementById("appt-time");
        sendToStorage("p_time", time_elem.value);
        //sendToBack("p_time", time_elem);
    });

    secs_elem.addEventListener("change", (event) => {
        secs_elem = document.getElementById("quantity");
        sendToStorage("p_secs", secs_elem.value);
        //sendToBack("p_time", time_elem);
    });

}

function sendToStorage(query, content) {
    if (query == "mode") {
        chrome.storage.sync.set({ "mode": content }, function () { });
    } else if (query == "p_time") {
        chrome.storage.sync.set({ "p_time": content }, function () { });
    } else if (query == "p_secs") {
        chrome.storage.sync.set({ "p_secs": content }, function () { });
    }
}


function sendToBack(query, content) {
    if (query == "mode") {
        console.log("in mode send")
        chrome.runtime.sendMessage({
            message: "mode",
            data: content
        });
    } else if (query == "p_time") {
        chrome.runtime.sendMessage({
            message: "p_time",
            data: content
        });

    }
}
