import * as fs from "fs"
import axios from 'axios';

import { Education } from "../../src/types"
import * as csvParse from 'csv-parse'
import { CountyToGeography, County, Institution } from "../../src/enums";

const header = ["Titel"];

const csvURL = "https://ufm.dk/uddannelse/statistik-og-analyser/uddannelseszoom/ufm_samlet_23mar2024.csv";
const csvFilePath = "./src/education-csv.csv";

// File path for writing not being used anymore
const tsObjectWritePath = "./src/debug/tsObject.ts"

const parseOptions: csvParse.Options = {
    columns: true,
    trim: true 
};

function csvParser(csvData: string): Education[] {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const educations: Education[] = [];
    
    for (let i = 1; i < lines.length - 1; i++) {
        const values = lines[i].split(';');

        const education: Education = {
            "url": values[2],
            "rank": null,
            "title": values[4],
            "degree_type": values[6],
            "counties": [County[values[11]]],
            "geographies": [CountyToGeography(County[values[11]])],
            "institutions": Institution[values[9]],
            "subjects": [],
            "industries": [
                {
                    title: values[28],
                    share: Number(values[24])
                },
                {
                    title: values[29],
                    share: Number(values[25])
                },
                {
                    title: values[30],
                    share: Number(values[26])
                }
            ],
            "hours": {
                withManyStudents: Number(values[19]),
                withFewStudents: Number(values[20]),
                withSupervision: Number(values[21])
            },
            /*"student_feedback": {
                socialEnvironment: Number(String(values[70]).replace(",", ".")),
                academicEnvironment: Number(String(values[58]).replace(",", ".")),
                groupEngagement: Number(String(values[62]).replace(",", ".")),
                loneliness: Number(String(values[112]).replace(",", ".")),
                stress: Number(String(values[121]).replace(",", ".")),
                teacherEvaluation: (Number(String(values[89]).replace(",", ".")) + Number(String(values[93]).replace(",", ".")) + Number(String(values[97]).replace(",", ".")) + Number(String(values[101]).replace(",", ".")))/4,
                satisfaction: Number(String(values[130]).replace(",", "."))
            },*/
            social_feedback: {
                socialEnvironment: Number(String(values[70]).replace(",", ".")),
                groupEngagement: Number(String(values[62]).replace(",", ".")),
                loneliness: Number(String(values[112]).replace(",", ".")),
                stress: Number(String(values[121]).replace(",", "."))
            },
            academic_feedback: {
                academicEnvironment: Number(String(values[58]).replace(",", ".")),
                teacherEvaluation: (Number(String(values[89]).replace(",", ".")) + Number(String(values[93]).replace(",", ".")) + Number(String(values[97]).replace(",", ".")) + Number(String(values[101]).replace(",", ".")))/4,
                satisfaction: Number(String(values[130]).replace(",", "."))
            },
            academic_workload: {
                lectures: Number(String(values[72]).replace(",", ".")),
                literature: Number(String(values[74]).replace(",", ".")),
                studentJob: Number(String(values[76]).replace(",", "."))
            },
            degree_structure: {
                contents: {
                    teaching: Number(String(values[85]).replace(",", ".")),
                    exams: Number(String(values[81]).replace(",", ".")),
                    internship:Number(String(values[82]).replace(",", ".")),
                    internationalStay: Number(String(values[84]).replace(",", "."))
                },
                teachingMethods: [
                    values[104],
                    values[105],
                    values[106],
                    values[107],
                    values[108]
                ]
            },
            dropout_rate: Number(values[16]),
            job_data: {
                salaries: {
                    newGraduate: {
                        lower_quartile: parseFloat(String(values[40]).replace(",", ".")),
                        median: parseFloat(String(values[39]).replace(",", ".")),
                        upper_quartile: parseFloat(String(values[41]).replace(",", ".")),
                        projected_direction: ""
                    },
                    experienced: {
                        lower_quartile: parseFloat(String(values[50]).replace(",", ".")),
                        median: parseFloat(String(values[49]).replace(",", ".")),
                        upper_quartile: parseFloat(String(values[51]).replace(",", ".")),
                        projected_direction: ""
                    }
                },
                workSchedule: {
                    working_hours: Number(values[154]),
                    fixed_hours_percent: Number(values[145]),
                    flexible_hours_percent: Number(values[147]),
                    self_schedule_percent: Number(values[149]),
                    variable_schedule_percent: Number(values[148]),
                    night_and_evening_shifts_percent: Number(values[146])
                },
                unemployment: {
                    newGraduate: Number(values[35]),
                    experienced: Number(values[45]),
                    projectedNewGraduate: 0,
                    projectedExperienced: 0
                },
                degree_relevance: Number(String(values[172]).replace(",", ".")),
                degree_prepares_for_job: Number(String(values[176]).replace(",", ".")),
                national_jobs: Number(String(values[180]).replace(",", "."))
            }
        };
        
        for (const property in education) if (Number.isNaN(property) || property == null || property == undefined) continue;

        // This no run if property be bye bye
        educations.push(education);
    }

    return educations;
}

function removeDuplicates(educations: Education[]) {
    // TODO: Lav en ting der fikser når der er flere ens uddannelser så de skal kombineres.
}

export function importCSV(/*WritePath = tsObjectWritePath,*/ CSVReadPath = csvFilePath): Education[] {
    
    var educations: Education[] = [];
    const file = fs.readFileSync(CSVReadPath, 'utf-8');
    
    educations = csvParser(file);
    //fs.writeFileSync(WritePath, `import { Education } from "../../src/types"\nimport { CountyToGeography, County, Institution } from "../../src/enums"\n\nexport let educations: Education[] = ${JSON.stringify(educations, null, 4)};\n`);
    return educations;
} 

async function downloadFile(url: string, filePath: string) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(filePath, response.data);
        console.log("File downloaded successfully!");
    } catch (error) {
        console.error("Error downloading file:", error);
    }
}

export const GetEducationsOnServerStart = async (): Promise<Education[]> =>{
    await downloadFile(csvURL, csvFilePath);
    return importCSV()
}