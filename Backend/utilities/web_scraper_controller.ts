import { getHeadlinerText } from '../utilities/web_scraper.ts';
//import { getDescribingText } from '../utilities/web_scraper.ts';
import { fetchHtml } from '../utilities/web_scraper.ts';

console.log(getHeadlinerText("html"));


export async function getHeadliner(url: string) {
    const response = await fetchHtml(url);
    if (response === "Error fetching the URL") {
        return "Error fetching the URL";
    }
    const headlinerText = getHeadlinerText(response.data);
    //const describingText = getDescribingText(response.data);
    return { headlinerText};
}


