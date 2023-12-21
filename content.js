function scrapeContent() {
    const bodyText = document.body.innerText;
    console.log(bodyText); // Or handle the scraped content as needed
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrape") {
        scrapequery();
        sendResponse({status: "Content scraped"});
    }
});

function scrapequery() {
    // const instructions = document.querySelector('[data-testid="instructions"]').textContent;

    const fields = document.querySelector('[data-testid="fields-text"]').textContent;

    const question_elements = document.querySelectorAll('[data-testid^="question-"]');
    
    const questions = [];

    for (const elem of question_elements) {
  
        var regex = /^question-\d+$/;
        var testDataId = elem.getAttribute('data-testid');

        if (regex.test(testDataId)) {
           questions.push(elem.textContent);
        }

    }
    console.log(questions);
}