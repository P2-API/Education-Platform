const axios = require('axios');
const response = (fetchHtml("https://www.ug.dk/uddannelser/bachelorogkandidatuddannelser/bacheloruddannelser/naturvidenskabeligebacheloruddannelser/matematikfysikkemiogdatalogi/datalogi"));
//const html = fetchHtml("https://www.ug.edu.gh/");
console.log(getHeadlinerText("https://www.ug.dk/uddannelser/bachelorogkandidatuddannelser/bacheloruddannelser/naturvidenskabeligebacheloruddannelser/matematikfysikkemiogdatalogi/datalogi"));


async function getHeadliner(url: string) {
    const response = await fetchHtml(url);
    if (response === "Error fetching the URL") {
        return "Error fetching the URL";
    }
    console.log(response.data);
    const headlinerText = getHeadlinerText(response.data);
    //const describingText = getDescribingText(response.data);
    return {headlinerText};
}

function getHeadlinerText(html: string) {
    // Your implementation here
    const headlinerText = filterHtmlHelperFirstTagOnly(html, "field-item even");
    console.log(headlinerText);
    return headlinerText;
}

function getDescribingText(html: string) {
    // Your implementation here
    return html;
}

function fetchHtml(url: string) {
    try {
        return axios.get(url);
    } catch (error) {
        console.log(error);
        return"Error fetching the URL";
    }
}

function filterHtmlHelper(html: string, className: string) {
    const regex = new RegExp(`<[^>]*class=["'].*?\\b${className}\\b.*?["'][^>]*>(.*?)</[^>]*>`, 'g');
    const matches = html.match(regex);
    if (matches === null) {
        return "No matches found";
    }
    return matches;
}

function filterHtmlHelperFirstTagOnly(html: string, className: string) {
    const regex = new RegExp(`<div[^>]*class=["'].*?\\b${className}\\b.*?["'][^>]*>(.*?)</div>`);
    const match = html.match(regex);
    if (match === null) {
        return "No match found";
    }
    const textRegex = /<[^>]*>(.*?)<\/[^>]*>/;
    const textMatch = match[1].match(textRegex);
    if (textMatch === null) {
        return "No text found";
    }
    return textMatch[1];
}

