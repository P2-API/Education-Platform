import axios from 'axios';
import { load } from 'cheerio';
import OpenAI from 'openai';
import { spawn } from 'child_process';
import fs from 'fs';
import { getGroupedEducations } from '../server/on-server-start';

//import { promises } from 'dns';
//import TextRazor from 'textrazor';

const openai = new OpenAI({ apiKey: 'sk-proj-G0xX1ik8iBjsWcO0mILaT3BlbkFJRYxWgMmDxlIaMmWvmHFz' });
const urls = ["https://www.ug.dk/uddannelser/arbejdsmarkedsuddannelseramu/transporterhvervene/renovation-0"];

//translateTextToEnglishChatGPT("Som datalog designer og udvikler du de it-systemer, som danner grundlag for uundværlige funktioner for mennesker, virksomheder og samfund.");
//getPersonalizedMessage("https://www.ug.dk/uddannelser/arbejdsmarkedsuddannelseramu/transporterhvervene/renovation-0")
//assignSubjectRankings(getGroupedEducations)

export async function assignSubjectRankings(subjectData) {
    for (const title in subjectData) {
        const url = subjectData[title].url;
        const name = subjectData[title].name;
        const result = await loadSubjectsFromUrls(url, name);

        // Serialize the result to JSON format
        const jsonData = JSON.stringify(result, null, 2); // Use null and 2 for pretty formatting

        // Choose a file path where you want to save the data
        const filePath = `subject-data-${name}.json`;

        // Write the serialized data to the file
        fs.writeFile(filePath, jsonData, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing data to file ${filePath}:`, err);
            } else {
                console.log(`Data saved to ${filePath}`);
            }
        });
    }
}


(async () => {
    const test = await loadSubjectsFromUrls(urls, "Renovation");
    console.log(test)
})();

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
        return axios.get(url);
    } catch (error) {
        (error);
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
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
        temperature: 0.2,
    });

    // (completion.choices[0].message.content);
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
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
        temperature: 0.1,
    });

    (completion.choices[0].message.content);
    return completion.choices[0].message.content;
}

//When textrazor anwsers i might use this function to extract keywords
/*
async function extractKeywordsFromText(text: string): Promise<string[]> {
    const apiKey = 'ee38eb1dffc5d19af37965711c0f6533e65a5297e9deaeb4fc495563'; // Replace 'YOUR_API_KEY' with your actual TextRazor API key
    const apiUrl = 'https://api.textrazor.com/';
    const options = {
        apiKey: apiKey,
        text: text,
        extractors: ['entities', 'topics'], // Specify the extractors you want to use
        languageOverride: 'eng', // Override the language detection if needed
    };

    try {
        const response = await axios.post(apiUrl, options, {
            headers: {
                'X-TextRazor-Key': apiKey
            }
        })

        if (response.data.response && response.data.response.topics) {
            // Extract keywords from topics
            const word_list: string[] = response.data.response.topics.slice(0, 10).map((topic: any) => (
                topic.label
            ));

            return word_list; // Return the word list
        } else {
            console.error('No topics found in response');
            return []; // Return an empty array if no topics found
        }

    } catch (error) {
        console.error('Error:', error);
        return []; // Return an empty array if there's an error
    }
}
*/

async function extractKeywordsFromText(text: string): Promise<string[] | undefined> {

    const apiKey = 'eyJvcmciOiI2NTNiOTllNjEzOGM3YzAwMDE2MDM5NTEiLCJpZCI6IjFhOTZlYjJkZjQxNzQxNjlhYjM1ZTk4YzgzNWIwNjkyIiwiaCI6Im11cm11cjEyOCJ9'; // Replace 'YOUR_API_KEY' with your actual TextRazor API key
    const apiUrl = 'https://gw.cortical.io/nlp/keywords?limit=10';
    const options = {
        text: text,
        languageOverride: 'en', // Override the language detection if needed
    };

    try {
        const response = await axios.post(apiUrl, options, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey,
                'limit': 10,
            }
        })

        const keyword_list = response.data;
        const extractedWords = extractWordsFromKeywords(keyword_list);
        return extractedWords ? extractedWords.flat() : undefined;

    } catch (error) {
        console.error('Error:', error);
        return []; // Return an empty array if there's an error
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


async function analyseSubjects(keywords: string[]) {
    const similarities = await calculateSimilarity(keywords, );
    return similarities;
}

async function calculateSimilarity(wordList: string[]): Promise<Rankings> {
    return new Promise((resolve, reject) => {
        // Create temporary input and output files
        const inputFile = 'input.json';
        const outputFile = 'output.json';
        fs.writeFileSync(inputFile, JSON.stringify({ words: wordList }));

        // Run the Python script as a child process
        const pythonProcess = spawn('python', ['semanticanalyzer.py', inputFile, outputFile]);

        // Handle errors from the Python script
        pythonProcess.stderr.on('data', (data) => {
            reject(`Error from Python script: ${data}`);
        });

        // Handle Python script exit
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                // Read output file and parse JSON
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


export async function loadSubjectsFromUrls(urls: string[], name: string): Promise<NamedCategoryData[]> {
    const loadedData: NamedCategoryData[] = [];

    for (const url of urls) {
        try {
            const text = await getAllText(url);
            const sanitizedText = await sanitizeText(text);

            const englishText = await translateTextToEnglishChatGPT(sanitizedText);
            if (!englishText) {
                console.error("Error translating text");
                continue;
            }

            const keywords = await extractKeywordsFromText(englishText);
            if (!keywords) {
                console.error("Error extracting keywords");
                continue;
            }

            const similarities = await analyseSubjects(keywords);
            if (!similarities) {
                console.error("Error analysing subjects");
                continue;
            }

            const namedData: NamedCategoryData = {
                name: name,
                url: url,
                data: {} // Placeholder for data
            };
            // Add loaded data to namedData
            for (const subject in similarities) {
                namedData.data[subject] = similarities[subject]; // Assign similarity scores to data
            }
            loadedData.push(namedData);
        } catch (error) {
            console.error(`Error processing URL ${url}:`, error);
            continue;
        }
    }

    return loadedData;
}