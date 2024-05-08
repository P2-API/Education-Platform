const axios = require('axios');


export function getHeadlinerText(html: string) {
    // Your implementation here
    const headlinerText = filterHtmlHelperFirstTagOnly(html, "field-item even");
    console.log(headlinerText);
    return headlinerText;
}

export function getDescribingText(html: string) {
    // Your implementation here
    return html;
}

export function fetchHtml(url: string) {
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
    const regex = new RegExp(`<[^>]*class=["'].*?\\b${className}\\b.*?["'][^>]*>(.*?)</[^>]*>`);
    const match = html.match(regex);
    if (match === null) {
        return "No match found";
    }
    return match[0];
}
