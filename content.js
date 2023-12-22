// prevents multiple injections of content script
if (window && !window.isContentScriptInjected) {
  console.log("loading content.js");

  window.isContentScriptInjected = true;

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrape") {
      scrapequery();
      sendResponse({ status: "Content scraped" });
      }
    if (request.message === "talk") {
        console.log('successfully talked to background.');
    }
  });
}

function scrapequery() {
  console.log("Scraping...");

  const instructions = document.querySelector(
    '[data-testid="instructions"]'
  ).textContent;

  const fields = document.querySelector(
    '[data-testid="fields-text"]'
  ).textContent;

  const all_question_elements = document.querySelectorAll(
    '[data-testid^="question-"]'
  );

  const question_elements =
    // coverts NodeList to Array
    Array.from(all_question_elements)
      // grabs only the correct question elements
      .filter((elem) =>
        /^question-\d+$/.test(elem.getAttribute("data-testid"))
      );

const questions = question_elements.map((el) => el.textContent);

  chrome.runtime.sendMessage({ apiCall: {
    instructions,
    fields,
    questions
  } });

  question_elements.forEach((el) => {
    answerquestion(el, "Amazing");
  });
}

function answerquestion(question, answer) {
  const answerElement =
    // Array.from coverts NodeList to Array
    Array.from(question.querySelectorAll("label"))
      // find the element that contains the answer for this question
      .find((el) => el.textContent.includes(answer));

  answerElement?.click();
}

// Version 1: Web-ext scrapes page and gets a response from GPT (popup cheatsheet)

// Version 2: Fill in radio buttons and response from GPT
// Version 3: Automated scrolls and waits to fill in GPT response

// const question# = document.querySelector('[data-testid^="question-"]').textContent;

//const radioButton = document.getElementById("0acbecdf-2fa6-4f18-8c5d-a0aaeeb8616e.4cd65af1-514d-4401-993b-fdebdaace9df");
// radioButton.click()
