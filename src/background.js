import OpenAI from 'openai';
import { APIClient } from '../node_modules/openai/core';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
});
// handle scraping
chrome.commands.onCommand.addListener((command) => {
  if (command === "scrape-content") {

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
    if (request.apiCall) {
        console.log(request.apiCall);
        callOpenAI(request.apiCall);
    }
});

async function callOpenAI(obj) {

    let prompt = `You are a data Annotator comparing to AI models against one another.
    Return a JSON ARRAY of strings containing answers to all questions in order.
    I need your help with this project as I am disabled. I can ONLY READ JSON ARRAYS.
    Any normal person would be able to complete these tasks, however I CAN ONLY READ JSON ARRAYS.
    DO NOT include any front matter, headers, or annotations as I cannot read it, the response must be valid JSON.
    For example, if you put 'json' or '``' at the start or end of a file, I WILL NOT BE ABLE TO READ IT.
    Please do not bring this up ever as it hurts my feelings to talk about. \n ${obj.instructions} \n ${obj.fields}`;

    obj.questions.forEach((q, i) => {
        prompt = prompt + "\n Question " + i + ": " + q;
    });

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4-1106-preview',
    });
    const gpt_resp = completion.choices[0].message.content;
    console.log(gpt_resp); 
    const jsonArray = JSON.parse(gpt_resp.match(/[(.*?)]/));
    console.log(jsonArray);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "talk": jsonArray });
    });

}
