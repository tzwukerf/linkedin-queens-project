function send() {
    chrome.runtime.sendMessage({
        msg: "something_completed", 
        data: {
            subject: "Loading",
            content: "Just completed!"
        }
    });
}

//setTimeout(send(), 1000);