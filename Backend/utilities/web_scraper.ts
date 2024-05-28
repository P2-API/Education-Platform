import axios, { AxiosError } from 'axios';
import { load } from 'cheerio';
import OpenAI from 'openai';
import { spawn } from 'child_process';
import fs from 'fs';

import { EducationsGroupped, NormalizedProfession, Profession, Education, Subject, NormalizedProfessionData, TableFilters, QuizAnswers } from "../../src/types";


const failedUrls: string[] = [];
const openai = new OpenAI({ apiKey: 'sk-proj-pY2yhpi6h9E2Q4CYCN6GT3BlbkFJH6OCl6ORakU0vfl5gl6O' });

interface GroupData {
    [key: string]: unknown;
}

interface CategoryData {
    [category: string]: number;
}

interface NamedCategoryData {
    name: string;
    url: string;
    data: CategoryData;
}

interface Keyword {
    word: string;
    document_frequency: number;
    pos_tags: string[];
    score: number;
}

interface KeywordsResponse {
    keywords: Keyword[];
}

interface Rankings {
    [subject: string]: number;
}

export async function manualKeywordExtraction(url: string) {
    const response = await fetchHtml(url);
    if (response === "Error fetching the URL") {
        return "Error fetching the URL";
    }

    const headlinerText = await getHeadlinerText(response.data);
    if (!headlinerText) {
        return "Error extracting headliner text";
    }

    const smallSummary = await getSmallSummary(response.data);
    if (!smallSummary) {
        return "Error extracting small summary";
    }

    const describingText = await getDescribingText(response.data);
    if (!describingText) {
        return "Error extracting describing text";
    }

    let allText = headlinerText + smallSummary + describingText;

    allText = await sanitizeText(allText);

    const englishText = await translateTextToEnglishChatGPT(allText);
    if (!englishText) {
        return "Error translating text";
    }

    const keywords = await extractKeywordsFromText(englishText);
    if (!keywords) {
        return "Error extracting keywords";
    }

}

export async function processAllEducations() {
    const filePath = 'Backend/cache/education_groups.ts';
    console.log("Starting processing of all educations");

    const groupedEducations = loadEducationsFromFile(filePath);
    let allEducationData = {};
    let index = 0;

    for (const educationGroup of groupedEducations) {
        index++;
        console.log(`Processing education ${index}/${groupedEducations.length}: ${educationGroup.title}`);
        const groupData = await assignSubjectRankings([educationGroup]);
        allEducationData = { ...allEducationData, ...groupData };
    }

    const educationSubjects = readJsonFile('Backend/cache/all-education-data.json') as Record<string, Profession>;

    const newEducationData = updateProfessions(educationSubjects, allEducationData);

    const outputFilePath = 'Backend/cache/all-education-data.json';
    try {
        const jsonData = JSON.stringify(newEducationData, null, 2);
        await fs.promises.writeFile(outputFilePath, jsonData);
        console.log(`All education data saved to ${outputFilePath}`);
    } catch (err) {
        console.error(`Error writing data to file ${outputFilePath}:`, err);
    }
}

async function assignSubjectRankings(educationData: { url: string; title: string }[]) {
    const groupData: GroupData = {};

    for (let index = educationData.length - 1; index >= 0; index--) {
        const result: unknown = await loadSubjectsFromUrls(educationData[index].url, educationData[index].title);
        if (!result) {
            console.error(`Error processing URL ${educationData[index].url}`);
            // If processing fails, add the URL to the failedUrls array
            failedUrls.push(educationData[index].url);
            continue;
        }
        groupData[educationData[index].title] = result;
    }

    // After processing all URLs, write failed URLs to a file
    await saveFailedUrlsToFile();

    return groupData;
}

async function saveFailedUrlsToFile() {
    const outputFilePath = 'Backend/cache/failed_urls.txt';
    try {
        // Convert array of failed URLs to string and append to file
        if (failedUrls.length === 0) {
            return;
        }
        await fs.promises.writeFile(outputFilePath, failedUrls.join('\n') + '\n');
    } catch (err) {
        console.error(`Error appending failed URLs to file ${outputFilePath}:`, err);
    }
}

function loadEducationsFromFile(filePath: string): EducationsGroupped {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error loading data from file ${filePath}:`, err);
        return [];
    }
}

export async function getPersonalizedMessage(filters: TableFilters, quiz: QuizAnswers, education: Education, doesPassFilters: Boolean): Promise<string> {
    try {
        const text = await getAllText(education.url);
        if (text === "Error fetching the URL" || text === null) {
            console.error("Error fetching or processing text from URL:", education.url);
            return "Der skete en fejl ved generering af en besked, prøv venligst senere";
        }
        const passesFilters = doesPassFilters ? "Ja! derfor SKAL du forklare hvorfor den kan anbefales" : "Nej. Derfor skal du forklare HVORFOR den ikke lever op til kravene.";
        const promptString = `Lever denne uddannelse op til kravene? ${passesFilters}. Du skal give en kort forklaring på, om denne uddannelse passer til den enkelte bruger. Det er helt fint at sige at den ikke lever op til kravene. Hvis filters.hasSubjects er en tom liste, så skal du ikke inddrage fagene i din besvarelse. Hvis en uddannelse ikke lever op til filtrene, så skal du ikke kommentere på, hvorfor den kan være et godt match, men hvorfor den ikke er et godt match. Det vigtige er, om fagene man har valgt i filtret passer til uddannelsen. Du skal tage udgangspunkt i de præferancer brugeren har valgt, og de filtre brugeren har valgt, samt de faktiske data for den enkelte uddannelse. Du skal fokusere på de præferancer som brugeren har valgt, som har en score på 4-5. Du skal fokusere meget på de filtre der er valgt, eksempelvis løn eller arbejdsløshed. Du skal også tage højde for de filtre brugeren har valgt, og kun anbefale uddannelsen hvis den passer til de filtre brugeren har valgt. Hvis en uddannelse har lave score i de fag man har valgt, så skal man ikke anbefale uddannelsen. Hvis ikke uddannelsen lever op til filtrene, så skal du fortælle brugeren hvorfor den ikke passer. returneres som en JSON-streng, og resultatet skal hedde 'svar'. Returner kun den personlige tekst.`;

        const message = await sendMessageToChatGPT(text, quiz, education, filters, promptString);
        console.log("message:", message)
        if (!message) return "Der skete en fejl. Prøv igen eller kontakt serveren."
        return message;
    } catch (error) {
        console.error('Error:', error);
        return "Der skete en fejl ved generering af en besked, prøv venligst senere";
    }
}


export function removeNewlines(input: string) {
    return input.replace(/[\r\n]+/g, '');
}

export function removeConsecutiveUppercase(str: string) {
    return str.replace(/[A-Z]{3,}/g, '');
}

export function removeMultipleSpaces(str: string) {
    return str.replace(/ +/g, ' ');
}

export function removeParentheses(str: string) {
    return str.replace(/[()]/g, '.');
}

export async function sanitizeText(text: string) {
    try {
        text = removeNewlines(text);
        text = removeMultipleSpaces(text);
        text = removeConsecutiveUppercase(text);
        text = removeParentheses(text);
        return text;
    } catch (error) {
        console.error(`Error sanitizing text: ${error}`);
        return text;
    }
}

export async function getHeadliner(url: string): Promise<{ headlinerText: string | null }> {
    try {
        const response = await fetchHtml(url);
        if (response === "Error fetching the URL") {
            return { headlinerText: "Error fetching the URL" };
        }

        if (response === null) {
            console.error('Error: Response is null');
            return { headlinerText: null };
        }

        let headlinerText = await getHeadlinerText(response.data);

        if (headlinerText === "Her kan du se nedlagte uddannelser, hvor du ikke længere kan søge optagelse. Oversigten går 5 år tilbage og dækker både uddannelser for unge og vokse. ") {
            headlinerText = "Denne uddannelse er nedlagt."
        }

        return { headlinerText };
    } catch (error) {
        console.error('Error:', error);
        return { headlinerText: null };
    }
}

export async function getHeadlinerText(html: string): Promise<string | null> {
    try {
        if (!html) {
            console.error('Error: HTML content is empty or null.');
            return null;
        }
        const $ = load(html);
        const headlinerText = $('.field-item.even').first().text();
        return headlinerText || null; // Return null if headlinerText is empty
    } catch (error) {
        console.error(`Error filtering data: ${error}`);
        return null;
    }
}

export async function getSmallSummary(html: string): Promise<string | null> {
    try {
        if (!html) {
            console.error('Error: HTML content is empty or null.');
            return null;
        }
        const $ = load(html);
        const smallSummary = $('.field-item.even').eq(2).text();
        return smallSummary || null; // Return null if smallSummary is empty
    } catch (error) {
        console.error(`Error filtering data: ${error}`);
        return null;
    }
}

export async function getDescribingText(html: string): Promise<string | null> {
    try {
        if (!html) {
            console.error('Error: HTML content is empty or null.');
            return null;
        }
        const $ = load(html);
        const describingText = $('.views-row.views-row-1').text();
        return describingText || null; // Return null if describingText is empty
    } catch (error) {
        console.error(`Error filtering data: ${error}`);
        return null;
    }
}


export async function fetchHtml(url: string) {
    try {
        if (!url.startsWith('https://')) {
            url = "https://" + url;
        }
        return await axios.get(url);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error;
            if (axiosError.response && axiosError.response.status === 403) {
                console.error('Error: Forbidden (403) - Access to the URL is forbidden.');
            } else {
                console.error('Error fetching the URL:', axiosError.message);
            }
        } else {
            console.error('Error fetching the URL:', error);
        }
        return "Error fetching the URL";
    }
}

async function sendMessageToChatGPT(text: string, preferences: QuizAnswers, education: Education, filters: TableFilters, promptString: string) {
    let svar: string = "";
    try {
        await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: (
                        "dette er en kort text omkring uddanelsen =" + text
                    ).replace(/\s+/g, " ").trim() +
                        ". Lever den op til filtrene? = " +
                        " | " +
                        "Følgende data er brugerens individuelle præferencar. En score på 1 betyder at det slet ikke er vigtigt, en score på 3 betyder at det ikke rigtigt er vigtigt, en score på 4 eller 5 betyder at det er meget vigtigt for vedkommende. Du skal fokusere på de prioriteter som brugeren har valgt, som har en score på 4-5. Her er præferancerne. =" +
                        JSON.stringify(preferences).replace(/"/g, "") +
                        " | " +
                        "Følgende er data omkring den specifikke uddanelse. Det er uddannelsens score indenfor en række faktorer. Her er alle numeriske værdier under subjects normaliseret til at være mellem 0 og 1. 0 betyder at uddannelsesn er den laveste i forhold til alle andre uddssannelser, mens en score på 1 betyder at uddannelsen har den højeste score for denne faktor af alle uddannelser. =" +
                        JSON.stringify(education).replace(/"/g, "") +
                        " | " +
                        "Følgende er hvilke filtre brugeren har valgt at sammenligne uddanelserne med. HVIS SUBJECTS er TOM, SKAL DU IKKE KOMMENTERE OVERHOVEDET PÅ BRUGERENS SCORE INDENFOR FAG. Alle punkter er hårde filtre, hvilket vil sige, at hvis en bruger har indtastet Hovedstaten indenfor Geografi, så er det kun uddannelser der ligger i Hovedstaten som er accepteret. Det eneste punkt der ikke er en hård filter er Subjects, hvilket handler om de fag brugeren har valgt. Et fag som brugeren har valgt fungerer som en vægt i rangeringen af hvilken uddannelse der er den optimale for den enkelte bruger. Hvis en bruger har valgt fagene Matematik og Programmering, og uddannelsens score indenfor de 2 fag er under 0.5, så skal du ikke anbefale uddannelsen på baggrund af fagene. Her er filtrene = " +
                        JSON.stringify(filters).replace(/"/g, "")
                },
                {
                    role: "user",
                    content: promptString
                }
            ],
            model: "gpt-4o",
            response_format: { type: "json_object" },
            temperature: 0.2
        }).then((result) => {
            const jsonString = result.choices[0].message.content;
            if (jsonString == null) return "Der skete en fejl, prøv igen eller kontakt serveren. 11"
            const jsonObject = JSON.parse(jsonString);
            const answer: string = jsonObject.svar// ChatGPT har fået besked på at svare tilbage med 'svar'.
            svar = answer;
        });
        return svar;
    } catch (error) {
        console.error("Error:", error);
        return "Der skete en fejl. Prøv igen."
    }

}

async function translateTextToEnglishChatGPT(text: string) {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: text
            },
            {
                role: "user",
                content: "translate the text to english, dont make format changes to the text, pls give the translationed text back in a JSON with all text in one string."
            },
        ],
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
        temperature: 0.1,
    });

    (completion.choices[0].message.content);
    return completion.choices[0].message.content;
}

export async function extractKeywordsFromText(text: string): Promise<string[] | undefined> {
    const apiKey = 'eyJvcmciOiI2NTNiOTllNjEzOGM3YzAwMDE2MDM5NTEiLCJpZCI6IjFhOTZlYjJkZjQxNzQxNjlhYjM1ZTk4YzgzNWIwNjkyIiwiaCI6Im11cm11cjEyOCJ9';
    const apiUrl = 'https://gw.cortical.io/nlp/keywords?limit=10';
    const options = {
        text: text,
        languageOverride: 'en',
    };

    try {
        const response = await axios.post(apiUrl, options, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey,
                'limit': 10,
            }
        });

        const keyword_list = response.data;
        return extractWordsFromKeywords(keyword_list);
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

function extractWordsFromKeywords(response: KeywordsResponse): string[] {
    return response.keywords.map(keyword => keyword.word);
}

async function getAllText(url: string) {

    const response = await fetchHtml(url);
    if (response === "Error fetching the URL") {
        return "Error fetching the URL";
    }

    const headlinerText = await getHeadlinerText(response.data);
    if (!headlinerText) {
        return "Error extracting headliner text";
    }

    const smallSummary = await getSmallSummary(response.data);
    if (!smallSummary) {
        return "Error extracting small summary";
    }

    const describingText = await getDescribingText(response.data);
    if (!describingText) {
        return "Error extracting describing text";
    }

    let allText = headlinerText + smallSummary + describingText;

    allText = await sanitizeText(allText);

    return (allText);
}


async function analyseSubjects(keywords: string[]): Promise<Rankings> {
    const similarities = await calculateSimilarity(keywords);
    return similarities;
}

export async function calculateSimilarity(wordList: string[]): Promise<Rankings> {
    return new Promise((resolve, reject) => {
        const inputFile = 'Backend/cache/input.json';
        const outputFile = 'Backend/cache/output.json';
        fs.writeFileSync(inputFile, JSON.stringify({ words: wordList }));

        const pythonProcess = spawn('python', ['Backend/utilities/semanticanalyzer.py', inputFile, outputFile]);

        pythonProcess.stderr.on('data', (data) => {
            reject(`Error from Python script: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                const outputData = fs.readFileSync(outputFile, 'utf8');
                const rankings: Rankings = JSON.parse(outputData);
                resolve(rankings);
            } else {
                reject(`Python script exited with non-zero code ${code}`);
            }
        });
    });
}

export async function loadSubjectsFromUrls(url: string, name: string): Promise<NamedCategoryData | undefined> {
    try {
        const text = await getAllText(url);
        if (text === "Error fetching the URL" || text === null) {
            console.error("Error fetching or processing text from URL:", url);
            return undefined;
        }

        const sanitizedText = await sanitizeText(text);
        const englishText = await translateTextToEnglishChatGPT(sanitizedText);

        if (!englishText) {
            console.error("Error translating text");
            return undefined;
        }

        const keywords = await extractKeywordsFromText(englishText);
        if (!keywords) {
            console.error("Error extracting keywords");
            return undefined;
        }

        const similarities = await analyseSubjects(keywords);
        if (!similarities) {
            console.error("Error analysing subjects");
            return undefined;
        }

        const namedData: NamedCategoryData = {
            name: name,
            url: url,
            data: {}
        };

        for (const subject in similarities) {
            namedData.data[subject] = similarities[subject];
        }

        return namedData;
    } catch (error) {
        console.error(`Error processing URL ${url}:`, error);
        return undefined;
    }
}


export function saveToJsonFile(data: unknown, filename: string): void {
    try {
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error saving data to ${filename}: ${error}`);
    }
}

export function readJsonFile(filename: string): unknown {
    try {
        const jsonString = fs.readFileSync(filename, 'utf-8');
        return JSON.parse(jsonString);
    } catch (error) {
        console.error(`Error reading JSON file ${filename}: ${error}`);
        return null;
    }
}

export function normalizeData(professions: Record<string, any>): NormalizedProfession[] {
    const normalizedProfessions: NormalizedProfession[] = [];
    const maxValueByDataKey: Record<string, number> = {};
    const minValueByDataKey: Record<string, number> = {};

    for (const professionKey in professions as Record<string, unknown>) {
        if (Object.prototype.hasOwnProperty.call(professions, professionKey)) {
            const data = (professions[professionKey] as NormalizedProfession).data;
            for (const dataKey in data) {
                if (Object.prototype.hasOwnProperty.call(data, dataKey)) {
                    const value = data[dataKey];
                    if (maxValueByDataKey[dataKey] === undefined || value > maxValueByDataKey[dataKey]) {
                        maxValueByDataKey[dataKey] = value;
                    }
                    if (minValueByDataKey[dataKey] === undefined || value < minValueByDataKey[dataKey]) {
                        minValueByDataKey[dataKey] = value;
                    }
                }
            }
        }
    }

    for (const professionKey in professions) {
        if (Object.prototype.hasOwnProperty.call(professions, professionKey)) {
            const profession = professions[professionKey];
            const { name, url, data } = profession;
            const normalizedData: Record<string, number> = {};

            for (const dataKey in data) {
                if (Object.prototype.hasOwnProperty.call(data, dataKey)) {
                    const dataValue = data[dataKey];
                    const maxValue = maxValueByDataKey[dataKey];
                    const minValue = minValueByDataKey[dataKey];
                    const normalizedValue = (dataValue - minValue) / (maxValue - minValue);
                    normalizedData[dataKey] = normalizedValue;
                }
            }

            normalizedProfessions.push({ name, url, data: normalizedData });
        }
    }

    saveToJsonFile(normalizedProfessions, 'Backend/cache/normalized-education-data.json');
    return normalizedProfessions;
}

export function assignSubjectsToEducations(educations: Education[]): void {
    const educationSubjects = readJsonFile('Backend/cache/all-education-data.json');
    if (!educationSubjects || Object.keys(educationSubjects).length === 0) {
        console.error('Error reading education subjects from file or the file is empty.');
        return;
    }

    let professions = normalizeData(educationSubjects);
    if (!professions) {
        console.error('Error normalizing education data or the normalized data is empty.');
        return;
    }

    professions = translateProfessions(professions);

    professions.forEach(profession => {
        const matchingEducations = educations.filter(education => education.url === profession.url && education.title === profession.name);

        const subjects: Subject[] = Object.keys(profession.data).map(key => ({
            title: key,
            score: profession.data[key]
        }));

        matchingEducations.forEach(education => {
            education.subjects = subjects;
        });


    });
}

function translateProfessions(professions: NormalizedProfession[]): NormalizedProfession[] {
    const translatedProfessions: NormalizedProfession[] = [];

    const keyTranslationDict: Record<string, string> = {
        "Natural Science": "Naturvidenskab",
        "Art": "Kunst",
        "History": "Historie",
        "Psychology": "Psykologi",
        "Philosophy": "Filosofi",
        "Mathematics": "Matematik",
        "Architecture": "Arkitektur",
        "Music": "Musik",
        "Politics": "Politik",
        "Culture": "Kultur",
        "Health Science": "Sundhedsvidenskab",
        "Law": "Jura",
        "Economics": "Økonomi",
        "Information Technology": "Informationsteknologi",
        "Programming": "Programmering",
        "Environmental Science": "Miljøvidenskab",
        "Education": "Uddannelse",
        "Journalism": "Journalistik",
        "Communication": "Kommunikation",
        "Religion": "Religion",
        "Sociology": "Sociologi",
        "Agricultural Science": "Landbrugsvidenskab"
    };

    for (const profession of professions) {
        const { name, url, data } = profession;
        const translatedData: NormalizedProfessionData = {};

        // Translate data keys
        for (const oldKey in data) {
            if (Object.prototype.hasOwnProperty.call(data, oldKey)) {
                const oldValue = data[oldKey];
                const newKey = keyTranslationDict[oldKey];
                if (newKey) {
                    translatedData[newKey] = oldValue;
                }
            }
        }

        translatedProfessions.push({ name, url, data: translatedData });
    }

    return translatedProfessions;
}

function updateProfessions(
    existingProfessions: Record<string, Profession>,
    newProfessions: Record<string, Profession>
): Record<string, Profession> {
    for (const key in newProfessions) {
        if (Object.prototype.hasOwnProperty.call(newProfessions, key)) {
            const newProfession = newProfessions[key];

            if (Object.prototype.hasOwnProperty.call(existingProfessions, key)) {
                existingProfessions[key].data = newProfession.data;
            } else {
                existingProfessions[key] = newProfession;
            }
        }
    }

    return existingProfessions;
}