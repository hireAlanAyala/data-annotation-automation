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

        answerquestion(question_element, answer)
        
    })

    console.log(questions);
}

function answerquestion(question, response) {
    console.log(question);
    // grab all elements and search text content of them
    // identify the html element 'answer'

    if (question) {

        const childElements = question.querySelectorAll("*");
        let elementWithText;
        childElements.forEach(element => {
            if (element.textContent.includes(response)) {
                elementWithText = element;
            }
        });
        if (elementWithText) {
            console.log("Element containing " + response , elementWithText);
        } else {
            console.log("No element with " + response + " found inside " + question);
        }
    } else {
        console.log("Parent element with ID " + question + " not found");
    }

}

   // Version 1: Web-ext scrapes page and gets a response from GPT
            // (maybe in a popup)
   // Version 2: Fill in radio buttons and response from GPT
   // Version 3: Automated scrolls and waits to fill in GPT response

   // const question# = document.querySelector('[data-testid^="question-"]').textContent;

   //const radioButton = document.getElementById("0acbecdf-2fa6-4f18-8c5d-a0aaeeb8616e.4cd65af1-514d-4401-993b-fdebdaace9df");
   // radioButton.click()
