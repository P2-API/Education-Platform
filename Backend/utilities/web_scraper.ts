import axios from 'axios';
import { load } from 'cheerio';
import OpenAI from 'openai';
import { spawn } from 'child_process';
//import TextRazor from 'textrazor';
//import { EducationGroup } from "../../src/types";

const openai = new OpenAI({ apiKey: 'sk-proj-G0xX1ik8iBjsWcO0mILaT3BlbkFJRYxWgMmDxlIaMmWvmHFz' });

//translateTextToEnglishChatGPT("Som datalog designer og udvikler du de it-systemer, som danner grundlag for uundværlige funktioner for mennesker, virksomheder og samfund.");
//getPersonalizedMessage("https://www.ug.dk/uddannelser/arbejdsmarkedsuddannelseramu/transporterhvervene/renovation-0")
getSubjectsFromUgText("https://www.ug.dk/uddannelser/arbejdsmarkedsuddannelseramu/transporterhvervene/renovation-0");


async function getSubjectsFromUgText(url: string) {
    try {
        const text = await getAllText(url);

        const englishText = await translateTextToEnglishChatGPT(text);
        if (!englishText) {
            return "Error translating text";
        }
        console.log(englishText);

        const keywords = await extractKeywordsFromText(englishText);
        if (!keywords) {
            return "Error extracting keywords";
        }
        console.log(keywords);

        const similarities = await analyseSubjects(keywords);
        if (!similarities) {
            return "Error analysing subjects";
        }
        console.log(similarities);
        

    } catch (error) {
        console.error('Error:', error);
        return "An error occurred while processing the request.";
    }

}

export async function getPersonalizedMessage(url: string) {
    try {
        const text = await getAllText(url);

        const promptString = "hvordan vil denne uddannelse passe til en person med disse præferencer, giv en kort personlig tekst. brug gerne data'en fra preferences, 1 er en lav præference og 5 er høj præference. returneres som en JSON-streng, returer kun den personlige tekst.";

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
        console.log('Response from ChatGPT:', message);
        return { message };
    } catch (error) {
        console.error('Error:', error);
        return "An error occurred while processing the request.";
    }
}


export async function getHeadliner(url: string) {
    const response = await fetchHtml(url);
    if (response === "Error fetching the URL") {
        return "Error fetching the URL";
    }
    const headlinerText = getHeadlinerText(response.data);
    return { headlinerText };
}

function getHeadlinerText(html: string) {
    try {
        const $ = load(html);
        const headlinerText = $('.field-item.even').first().text();
        return headlinerText;
    } catch (error) {
        console.error(`Error filtering data: ${error}`);
    }

}

export function getDescribingText(html: string) {
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
                content: "translate the text to english, pls give the translationed text back in a JSON string."
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

    const headlinerText = getHeadlinerText(response.data);
    if (!headlinerText) {
        return "Error extracting headliner text";
    }

    const describingText = getDescribingText(response.data);
    if (!describingText) {
        return "Error extracting describing text";
    }

    return (headlinerText + describingText);
}


async function analyseSubjects(keywords: string[]) {
    const similarities = await calculateSimilarity(keywords, );
    console.log(similarities);
    return similarities;
}

async function calculateSimilarity(wordList: string[]): Promise<Rankings> {
    return new Promise((resolve, reject) => {
        // Run the Python script as a child process
        const pythonProcess = spawn('python', ['semanticanalyzer.py']);

        // Send word_list to the Python script
        const input: WordList = { words: wordList };
        pythonProcess.stdin.write(JSON.stringify(input));
        pythonProcess.stdin.end();

        let outputData = '';

        // Handle output from the Python script
        pythonProcess.stdout.on('data', (data) => {
            outputData += data.toString();
        });

        // Handle errors from the Python script
        pythonProcess.stderr.on('data', (data) => {
            reject(`Error from Python script: ${data}`);
        });

        // Handle Python script exit
        pythonProcess.on('close', (code) => {
            if (code === 0) {
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

interface WordList {
    words: string[];
}

