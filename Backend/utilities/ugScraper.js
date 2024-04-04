import { spawn } from 'child_process';
import axios from 'axios';
import { load } from 'cheerio';
import TextRazor from 'textrazor';
import * as deepl from 'deepl-node';



const textRazor = new TextRazor('ee38eb1dffc5d19af37965711c0f6533e65a5297e9deaeb4fc495563');
const authKey = "532b6341-31c0-4c51-9cef-043f21bbfd91:fx";
const translator = new deepl.Translator(authKey);

async function fetchHtmlData(url) {
    try {
        const newUrl = (url + "#Indhold");
        const response = await axios.get(newUrl);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

async function filterData(htmlData) {
    try {
        const $ = load(htmlData);
        const element = $('.views-row.views-row-1');
        const text = getTextSanitized(element, $);
        return text;
    } catch (error) {
        console.error(`Error filtering data: ${error}`);
    }
}

async function filterData2(htmlData) {
    try {
        const $ = load(htmlData);
        const element = $('.field-item.even');
        const text = getTextSanitized(element, $);
        return text;
    } catch (error) {
        console.error(`Error filtering data: ${error}`);
    }
}

function getTextSanitized(element, $) {
    let textContent = [];
    let stopAdding = false;

    element.contents().each(function () {
        if (this.type === 'text') {
            const nodeText = $(this).text().trim();
            if (nodeText === 'Brug for mere hjælp?') {
                stopAdding = true;
            }
            if (!stopAdding) {
                textContent.push(nodeText);
            }
        } else if (this.type === 'tag' && this.name !== 'dl' && this.name !== 'a') {
            const style = $(this).attr('style');
            if (!(this.name === 'p' && style && style.includes('text-align: right'))) {
                const childText = $(this).text().trim();
                if (childText === 'Brug for mere hjælp?') {
                    stopAdding = true;
                }
                if (!stopAdding) {
                    textContent.push(childText);
                }
            }
        }
    });

    return textContent.join(' ');
}

function addSpaceBeforeUppercase(text) {
    return text.replace(/(?<=[a-z])(?=[A-Z])/g, ' ');
}

function calculateSimilarities(topics, wordList) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['calculate_similarity.py']);

        let dataToSend = {
            topics: topics,
            word_list: wordList
        };

        pythonProcess.stdin.write(JSON.stringify(dataToSend));
        pythonProcess.stdin.end();

        pythonProcess.stdout.on('data', (data) => {
            const result = JSON.parse(data.toString());
            resolve(result);
        });

        pythonProcess.stderr.on('data', (data) => {
            reject(data.toString());
        });
    });
}


(async () => {

    const url = 'https://www.ug.dk/uddannelser/bachelorogkandidatuddannelser/bacheloruddannelser/sundhedsvidenskabeligebacheloruddannelser/medicin';
    const htmlData = await fetchHtmlData(url);
    const text = await filterData(htmlData) + '. ' + await filterData2(htmlData);
    const useableText = addSpaceBeforeUppercase(text);
    const subjects = [
        {"Matematik": ["Matematik", "Algebra", "Modellering", "Statistik"]},
        {"Sundhedsvæsen": ["Sundhedsvæsen", "hospital", "sygdom", "medicin"]},
        {"Økonomi": ["Finans", "Økonomi", "Regnskab", "Virksomhed"]},
        {"Kommunikation": ["Journalistik", "Kommunikation", "Medier", "Psykologi"]},
        {"Markedsføring": ["Markedsføring", "Målgruppe", "Branding",  "Reklame"]},
        {"Kunst": ["Kunst", "Billedkunst", "Musik", "Litteratur"]},
        {"Naturvidenskab": ["Naturvidenskab", "Fysik", "Fysik", "Fysik"]},
    ];

    //console.log(useableText);

    const options = { extractors: 'topics' };

    (async () => {
        let result = await translator.translateText(useableText, 'DA', 'en-GB');

        try {
            const res = await textRazor.exec(result.text, options, { languageOverride: 'en' });
            const topics = res.response.topics.slice(0, 10).map(topic => ({
                label: topic.label,
                score: topic.score
            }));
            const word_list = res.response.topics.slice(0, 10).map(topic => (
                topic.label
            ));

            console.log("First 10 Specific Topics and Scores:");
            console.log(topics);
            console.log(word_list);

            // Call calculateSimilarities
            const similarities = await calculateSimilarities(word_list, subjects);
            console.log(similarities);

        } catch (err) {
            console.error(err);
        }


    })();


})();       