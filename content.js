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

var regex = /^question-\d+$/;

function scrapequery() {
    // const instructions = document.querySelector('[data-testid="instructions"]').textContent;

    const fields = document.querySelector('[data-testid="fields-text"]').textContent;

    const question_elements =
        document.querySelectorAll('[data-testid^="question-"]')
        // trims out junk html elements
        .filter(function(elem) {
            var testDataId = elem.getAttribute('data-testid');
            return regex.test(testDataId);
        })

    const questions = question_elements.map(function(elem) {
        return elem.textContent;
    })

    questions.forEach(function(question, i) {
        const question_element = question_elements[i];

        answerQuestion(question_element, answer)
    })
}