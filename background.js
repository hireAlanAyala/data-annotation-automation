chrome.commands.onCommand.addListener((command) => {
    if (command === "scrape-content") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['content.js']
            });
            chrome.tabs.sendMessage(tabs[0].id, {action: "scrape"});
        });
    }
});
