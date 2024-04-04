import axios from 'axios';
import { load } from 'cheerio';
import TextRazor from 'textrazor';
import * as deepl from 'deepl-node';
import spacy from 'spacy';


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

async function calculateSimilarities(topics, wordList) {
    const nlp = await spacy.load('en_core_web_sm');
    const wordSimilarities = {};

    for (let topic of topics) {
        for (let word of wordList) {
            const similarity = nlp.similarity(topic.label, word);
            wordSimilarities[`${topic.label}-${word}`] = similarity;
        }
    }

    const sortedPairs = Object.entries(wordSimilarities).sort((a, b) => b[1] - a[1]);

    return sortedPairs;
}

(async () => {

    const url = 'https://www.ug.dk/uddannelser/professionsbacheloruddannelser/socialogsundhedsuddannelser/sygeplejerske';
    const htmlData = await fetchHtmlData(url);
    const text = await filterData(htmlData) + '. ' + await filterData2(htmlData);
    const useableText = addSpaceBeforeUppercase(text);
    const subjects = [
        "Science", "Technology", "Engineering", "Mathematics",
        "Arts", "Humanities", "Literature",
        "Business", "Entrepreneurship", "Management",
        "Social", "Sciences", "Psychology",
        "Health", "Medicine", "Nursing",
        "Environmental", "Sustainability", "Ecology",
        "Technology", "Innovation", "Data",
        "Education", "Teaching", "Mentorship",
        "Media", "Communication", "Journalism",
        "Interdisciplinary", "Studies", "Exploration"
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

            console.log("First 10 Specific Topics and Scores:");
            console.log(topics);

            // Call calculateSimilarities
            calculateSimilarities(topics, subjects);
            const sortedPairs = await calculateSimilarities(topics, subjects);
            console.log(sortedPairs);
        } catch (err) {
            console.error(err);
        }
    })();

    //implimention of word similarity api intergration using spacy https://spacy.io/universe/project/spacy-js

})();       