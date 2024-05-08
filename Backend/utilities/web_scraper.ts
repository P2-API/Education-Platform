import axios from 'axios';
import { load } from 'cheerio';

getPersonalizedMessage("https://www.ug.dk/uddannelser/bachelorogkandidatuddannelser/bacheloruddannelser/naturvidenskabeligebacheloruddannelser/matematikfysikkemiogdatalogi/datalogi")

async function getPersonalizedMessage(url: string) {
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

        const message = await sendMessageToChatGPT(headlinerText, describingText, preferences);
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


async function sendMessageToChatGPT(headlinerText: string, describingText: string, preferences: Record<string, number>): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY; // Use environment variable for API key
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const command = "hvordan vil denne uddannelse passe til en person med disse præferencer, giv en kort personlig tekst";

    try {
        const response = await axios.post(apiUrl, {
            model: 'text-davinci-003',
            messages: [
                { role: 'system', content: headlinerText },
                { role: 'system', content: describingText },
                { role: 'user', content: command },
                { role: 'user', content: JSON.stringify(preferences) } // Convert object to string
            ],
            max_tokens: 150,
            stop: ['\n', ''],
            temperature: 0.7
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error sending message to ChatGPT API:', error);
        throw new Error('Error sending message to ChatGPT API');
    }
}
