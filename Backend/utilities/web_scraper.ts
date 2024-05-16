import axios from 'axios';
import { load } from 'cheerio';
import OpenAI from 'openai';
import { spawn } from 'child_process';
import fs from 'fs';

import { EducationsGroupped, Profession, NormalizedProfession, Education, Subject } from "../../src/types";

const openai = new OpenAI({ apiKey: 'sk-proj-G0xX1ik8iBjsWcO0mILaT3BlbkFJRYxWgMmDxlIaMmWvmHFz' }); // Replace with your actual API key

export async function test() {
    const test = await fetchHtml("https://www.ug.dk/uddannelser/arbejdsmarkedsuddannelseramu/transporterhvervene/renovation-0");
    console.log(test);
}

export async function processAllEducations() {
    const filePath = '../../Backend/cache/education_groups.ts';
    console.log("Starting processing of all educations");

    const groupedEducations = loadEducationsFromFile(filePath);
    let allEducationData = {};

    for (const educationGroup of groupedEducations) {
        const groupData = await assignSubjectRankings([educationGroup]);
        allEducationData = { ...allEducationData, ...groupData };
    }

    const outputFilePath = 'Backend/cache/all-education-data.json';
    try {
        const jsonData = JSON.stringify(allEducationData, null, 2);
        await fs.promises.writeFile(outputFilePath, jsonData);
        console.log(`All education data saved to ${outputFilePath}`);
    } catch (err) {
        console.error(`Error writing data to file ${outputFilePath}:`, err);
    }
}

async function assignSubjectRankings(educationData: EducationsGroupped) {
    console.log("Starting assigning of subject rankings");
    const groupData: { [key: string]: any } = {};

    for (let index = educationData.length - 1; index >= 0; index--) {
        console.log(index + " " + educationData[index].url);
        const result = await loadSubjectsFromUrls(educationData[index].url, educationData[index].title);
        if (!result) {
            console.error(`Error processing URL ${educationData[index].url}`);
            continue;
        }
        groupData[educationData[index].title] = result;
    }
    return groupData;
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

interface CategoryData {
    [category: string]: number;
}

interface NamedCategoryData {
    name: string;
    url: string;
    data: CategoryData;
}

export async function getPersonalizedMessage(url: string) {
    try {
        const text = await getAllText(url);
        const promptString = "hvordan vil denne uddannelse passe til en person med disse præferencer, giv en kort personlig tekst. brug data'en fra preferences, 1 er en lav præference og 5 er høj præference. returneres som en JSON-streng, returer kun den personlige tekst.";

        const preferences = {
            academic_environment_priority: 5,
            degree_relevance_priority: 5,
            dislike_exam_priority: 3,
            experienced_salary_priority: 5,
            fixed_hours_priority: 2,
            flexible_hours_priority: 4,
            general_salary_priority: 5,
            group_engagement_priority: 1,
            high_workload_acceptance_priority: 2,
            industries_priority: 3,
            international_stay_priority: 4,
            internship_priority: 2,
            lectures_priority: 3,
            literature_priority: 3,
            loneliness_priority: 5,
            self_schedule_priority: 4,
            social_environment_priority: 1,
            starting_salary_priority: 5,
            stress_priority: 2,
            student_job_priority: 5,
            subjects_priority: 4,
            teaching_priority: 3,
            unemployment_priority: 4,
            variable_schedule_priority: 2,
            work_internationally_priority: 4,
        };

        const message = await sendMessageToChatGPT(text, preferences, promptString);
        return { message };
    } catch (error) {
        console.error('Error:', error);
        return "An error occurred while processing the request.";
    }
}

async function removeNewlines(input: string): Promise<string> {
    return input.replace(/[\r\n]+/g, '');
}

async function removeConsecutiveUppercase(str: string): Promise<string> {
    return str.replace(/[A-Z]{3,}/g, '');
}

async function removeMultipleSpaces(str: string): Promise<string> {
    return str.replace(/ +/g, ' ');
}

async function removeParentheses(str: string): Promise<string> {
    return str.replace(/[()]/g, '.');
}

async function sanitizeText(text: string): Promise<string> {
    try {
        text = await removeNewlines(text);
        text = await removeMultipleSpaces(text);
        text = await removeConsecutiveUppercase(text);
        text = await removeParentheses(text);
        return text;
    } catch (error) {
        console.error(`Error sanitizing text: ${error}`);
        return text;
    }
}

export async function getHeadliner(url: string) {
    const response = await fetchHtml(url);
    if (response === "Error fetching the URL") {
        return "Error fetching the URL";
    }
    const headlinerText = await getHeadlinerText(response.data);
    console.log(headlinerText);
    return { headlinerText };
}

export async function getHeadlinerText(html: string) {
    try {
        const $ = load(html);
        const headlinerText = $('.field-item.even').first().text();
        return headlinerText;
    } catch (error) {
        console.error(`Error filtering data: ${error}`);
    }
}

async function getSmallSummary(html: string) {
    try {
        const $ = load(html);
        const smallSummary = $('.field-item.even').eq(2).text();
        return smallSummary;
    } catch (error) {
        console.error(`Error filtering data: ${error}`);
    }
}

export async function getDescribingText(html: string) {
    try {
        const $ = load(html);
        const headlinerText = $('.views-row.views-row-1').text();
        return headlinerText;
    } catch (error) {
        console.error(`Error filtering data: ${error}`);
    }
}

function fetchHtml(url: string) {
    try {
        if (!url.startsWith('https://')) {
            url = 'https://' + url;
        }

        return axios.get(url);
    } catch (error) {
        console.error('Error fetching the URL:', error);
        return "Error fetching the URL";
    }
}

async function sendMessageToChatGPT(text: string, preferences: Record<string, number>, promptString: string) {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: ("dette er data omkring uddanelsen" + text).replace(/\s+/g, ' ').trim() +
                    ' | ' +
                    "dette data er omkring brugeren" + JSON.stringify(preferences).replace(/"/g, ''),
            },
            {
                role: "user",
                content: promptString
            },
        ],
        model: "gpt-3.5-turbo-0301",
        response_format: { type: "json_object" },
        temperature: 0.2,
    });

    return completion.choices[0].message.content;
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
        model: "gpt-3.5-turbo-0301",
        response_format: { type: "json_object" },
        temperature: 0.1,
    });

    return completion.choices[0].message.content;
}

async function extractKeywordsFromText(text: string): Promise<string[] | undefined> {
    const apiKey = 'eyJvcmciOiI2NTNiOTllNjEzOGM3YzAwMDE2MDM5NTEiLCJpZCI6IjFhOTZlYjJkZjQxNzQxNjlhYjM1ZTk4YzgzNWIwNjkyIiwiaCI6Im11cm11cjEyOCJ9'; // Replace with your actual API key
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

interface Keyword {
    word: string;
    document_frequency: number;
    pos_tags: string[];
    score: number;
}

interface KeywordsResponse {
    keywords: Keyword[];
}

async function getAllText(url: string) {
    const response = await fetchHtml(url);
    if (response === "Error fetching the URL") {
        return "Error fetching the URL";
    }

    const headlineText = await getHeadlinerText(response.data);
    const smallSummaryText = await getSmallSummary(response.data);
    const describingText = await getDescribingText(response.data);

    return `${headlineText}\n${smallSummaryText}\n${describingText}`;
}

async function analyseSubjects(keywords: string[]): Promise<Rankings> {
    const similarities = await calculateSimilarity(keywords);
    return similarities;
}

async function calculateSimilarity(wordList: string[]): Promise<Rankings> {
    return new Promise((resolve, reject) => {
        const inputFile = 'Backend/cache/input.json';
        const outputFile = 'Backend/cache/output.json';
        fs.writeFileSync(inputFile, JSON.stringify({ words: wordList }));

        const pythonProcess = spawn('python', ['semanticanalyzer.py', inputFile, outputFile]);

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

interface Rankings {
    [subject: string]: number;
}

export async function loadSubjectsFromUrls(url: string, name: string): Promise<NamedCategoryData | undefined> {
    try {
        const text = await getAllText(url);
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

function saveToJsonFile(data: any, filename: string): void {
    try {
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        console.log(`Data has been saved to ${filename}`);
    } catch (error) {
        console.error(`Error saving data to ${filename}: ${error}`);
    }
}

function readJsonFile(filename: string): any {
    try {
        const jsonString = fs.readFileSync(filename, 'utf-8');
        return JSON.parse(jsonString);
    } catch (error) {
        console.error(`Error reading JSON file ${filename}: ${error}`);
        return null;
    }
}

function normalizeData(professions: Record<string, Profession>): NormalizedProfession[] {
    const normalizedProfessions: NormalizedProfession[] = [];
    const maxValueByDataKey: Record<string, number> = {};
    const minValueByDataKey: Record<string, number> = {};

    for (const professionKey in professions) {
        if (Object.prototype.hasOwnProperty.call(professions, professionKey)) {
            const data = professions[professionKey].data;
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
    if (!educationSubjects) {
        console.error('Error reading education subjects from file.');
        return;
    }

    const professions = normalizeData(educationSubjects);
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

    //console.log(educations);
}
