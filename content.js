function scrapeContent() {
    const bodyText = document.body.innerText;
    console.log(bodyText); // Or handle the scraped content as needed
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrape") {
        scrapeContent();
        sendResponse({status: "Content scraped"});
    }
});
