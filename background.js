setTimeout ( function () {
    var newURL = "https://www.linkedin.com/games/queens/";
    chrome.tabs.create({ url: newURL });
    //chrome.windows.create(newURL);
},
5000
);