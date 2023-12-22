// handle scraping
chrome.commands.onCommand.addListener((command) => {
  if (command === "scrape-content") {
console.log('key', import.meta.env.VITE_OPEN_AI_API_KEY);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ["content.js"],
        },
        // sends message after mounitng
        () => chrome.tabs.sendMessage(tabs[0].id, { action: "scrape" })
      );
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.apiCall) callOpenAI(request.apiCall)
});

function callOpenAI(prompt) {
  console.log('calling model');
}
