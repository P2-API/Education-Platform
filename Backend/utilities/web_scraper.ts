import axios from 'axios';
import { load } from 'cheerio';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: 'sk-proj-G0xX1ik8iBjsWcO0mILaT3BlbkFJRYxWgMmDxlIaMmWvmHFz' });

translateTextToEnglishChatGPT("Som datalog designer og udvikler du de it-systemer, som danner grundlag for uundværlige funktioner for mennesker, virksomheder og samfund.");
//getPersonalizedMessage("https://www.ug.dk/uddannelser/arbejdsmarkedsuddannelseramu/transporterhvervene/renovation-0")

export async function getPersonalizedMessage(url: string) {
    try {
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

        const message = await sendMessageToChatGPT(headlinerText, describingText, preferences, promptString);
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
    return {headlinerText};
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
        console.log(error);
        return"Error fetching the URL";
    }
}

async function sendMessageToChatGPT(headlinerText: string, describingText: string, preferences: Record<string, number>, promptString: string) {
    const completion = await openai.chat.completions.create({
      messages: [
        {
            role: "system",
            content: ("dette er data omkring uddanelsen" + headlinerText + describingText).replace(/\s+/g, ' ').trim() +
            ' | ' +
            "dette data er omkring brugeren" + JSON.stringify(preferences).replace(/"/g, ''),
        },
        { 
            role: "user", 
            content: promptString },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    //console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
}
  

async function translateTextToEnglishChatGPT(text: string) {
    const completion = await openai.chat.completions.create({
        messages: [
            {   role: "system", 
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

    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
}