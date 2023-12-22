import { apikey } from "./config.js";

// handle scraping
chrome.commands.onCommand.addListener((command) => {
    console.log('apikey', apikey)
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

// handle api call
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.apiCall) {
        // Call OpenAI API with the textContent
        callOpenAI(request.apiCall);
    }
});

function callOpenAI(textContent) {
    const apiKey = 'YOUR_API_KEY';  // Replace with your OpenAI API key

    fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: textContent,
            max_tokens: 50
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Handle the response data
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


export default {}