import * as fs from "fs"
import axios from 'axios';

import { Education } from "../../src/types"
import * as csvParse from 'csv-parse'
import { County, DegreeType, Institution, Geography } from "../../src/enums";
import { countyToGeography } from "./custom-type-conversion";

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

        //Hvis char " er fundet, så køre indtil man finder " igen, fjern alle ; der er mellem dem
        const values = removeSemicolonsBetweenQuotes(lines[i]).split(';');

        const education: Education = {
            "url": values[2],
            "rank": 0,
            "title": values[4],
            "degreeType": DegreeType[values[6]],
            "counties": [County[values[11]]],
            "geographies": [countyToGeography(County[values[11]])],
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
            socialFeedback: {
                socialEnvironment: Number(String(values[70]).replace(",", ".")),
                groupEngagement: Number(String(values[62]).replace(",", ".")),
                loneliness: Number(String(values[112]).replace(",", ".")),
                stress: Number(String(values[121]).replace(",", "."))
            },
            academicFeedback: {
                academicEnvironment: Number(String(values[58]).replace(",", ".")),
                teacherEvaluation: (Number(String(values[89]).replace(",", ".")) + Number(String(values[93]).replace(",", ".")) + Number(String(values[97]).replace(",", ".")) + Number(String(values[101]).replace(",", "."))) / 4,
                satisfaction: Number(String(values[130]).replace(",", "."))
            },
            academicWorkload: {
                lectures: Number(String(values[72]).replace(",", ".")),
                literature: Number(String(values[74]).replace(",", ".")),
                studentJob: Number(String(values[76]).replace(",", "."))
            },
            degreeStructure: {
                contents: {
                    teaching: Number(String(values[85]).replace(",", ".")),
                    exams: Number(String(values[81]).replace(",", ".")),
                    internship: Number(String(values[82]).replace(",", ".")),
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
            dropoutRate: Number(values[16]),
            jobData: {
                salaries: {
                    newGraduate: {
                        lowerQuartile: parseFloat(String(values[40]).replace(",", ".")),
                        median: parseFloat(String(values[39]).replace(",", ".")),
                        upperQuartile: parseFloat(String(values[41]).replace(",", ".")),
                        projectedDirection: "example direction"
                    },
                    experienced: {
                        lowerQuartile: parseFloat(String(values[50]).replace(",", ".")),
                        median: parseFloat(String(values[49]).replace(",", ".")),
                        upperQuartile: parseFloat(String(values[51]).replace(",", ".")),
                        projectedDirection: "example direction"
                    }
                },
                workSchedule: {
                    workingHours: Number(values[154]),
                    fixedHoursPercent: Number(values[145]),
                    flexibleHoursPercent: Number(values[147]),
                    selfSchedulePercent: Number(values[149]),
                    variableSchedulePercent: Number(values[148]),
                    nightAndEveningShiftsPercent: Number(values[146])
                },
                unemployment: {
                    newGraduate: Number(values[35]),
                    experienced: Number(values[45]),
                    projectedNewGraduate: 0,
                    projectedExperienced: 0
                },
                degreeRelevance: Number(String(values[172]).replace(",", ".")),
                degreePreparesForJob: Number(String(values[176]).replace(",", ".")),
                nationalJobs: Number(String(values[180]).replace(",", "."))
            }
        };

        // For some reason we also need to discard working hours as it gives weird values that are impossible to decode what is.
        if (recursivelyCheckForMissingProperties(education) || education.jobData.workSchedule.workingHours == 0) {
            continue;
        }

        // This no run if property be bye bye
        educations.push(education);
    }
    return educations;
}

export function removeSemicolonsBetweenQuotes(input: string): string {
    let insideQuotes = false;
    let result = '';

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char === '"') {
            insideQuotes = !insideQuotes;
            result += char;
        } else if (char === ';' && insideQuotes) {
            continue;
        } else {
            result += char;
        }
    }

    return result;
}

const recursivelyCheckForMissingProperties = (object: object): boolean => {
    for (const key in object) { // loop through keys in the object 
        if (typeof object[key] === 'object' && object[key] !== null) { // check if keys value is an object
            let answer = recursivelyCheckForMissingProperties(object[key]); // call for nested object
            if (answer) {
                return true;
            }
        }
        else {
            let answer = isAMissingProperty(object[key]); // else check if the keys value is "missing"
            if (answer) {
                return true;
            }
        }
    }
    return false; // no "missing" value found
}

function isAMissingProperty(property: any): boolean {
    if ((typeof property === 'number' && Number.isNaN(property)) || (typeof property === 'string' && property == "") || property == null || property == undefined) {
        return true;
    }
    return false;
}

export function importCSV(CSVReadPath = csvFilePath): Education[] {
    var educations: Education[] = [];
    const file = fs.readFileSync(CSVReadPath, 'utf-8');

    educations = csvParser(file);
    return educations;
}

async function downloadFile(url: string, filePath: string) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(filePath, response.data);
        ("File downloaded successfully!");
    } catch (error) {
        console.error("Error downloading file:", error);
    }
}

export const GetEducationsOnServerStart = async (): Promise<Education[]> => {
    await downloadFile(csvURL, csvFilePath);
    return importCSV()
}