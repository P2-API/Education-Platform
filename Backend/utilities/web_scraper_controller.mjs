import { getHeadlinerText } from '../../Backend/utilities/web_scraper.ts';
import { getDescribingText } from '../../Backend/utilities/web_scraper.ts';
import { fetchHtml } from '../../Backend/utilities/web_scraper.ts';


export async function getallText(url) {
    const response = await fetchHtml(url);
    if (response === "Error fetching the URL") {
        return "Error fetching the URL";
    }
    const headlinerText = getHeadlinerText(response.data);
    const describingText = getDescribingText(response.data);
    return { headlinerText, describingText };
}

const response = await fetchHtml("https://www.ug.dk/uddannelser/bachelorogkandidatuddannelser/bacheloruddannelser/naturvidenskabeligebacheloruddannelser/matematikfysikkemiogdatalogi/datalogi");
if (typeof response !== "string") {
    getHeadlinerText(response.data);
}
