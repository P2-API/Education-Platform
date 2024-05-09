import { Education, MinimumMaximum, TableSectionDataFromServer } from "../../src/types";
import { GetEducationsOnServerStart } from "../utilities/csv_importer";
import { DegreeType, Institution, Geography, DegreeTypeToDuration } from "../../src/enums";


let educations: Education[] = [];

export const onStart = () => {
    //console.log("onStart");
    cacheEducations();
}

const cacheEducations = async () => {
    //console.log("cacheEducations");
    educations = await GetEducationsOnServerStart();
    caclulateBasedOnEducations();
}

export const getCachedEducations = (): Education[] => {
    return educations;
}

const caclulateBasedOnEducations = () => {
    //console.log("caclulateBasedOnEducations");

    caclulateEnumTypes();
    calculateMinimumAndMaximumEducation();
    calculateMinMaxDegreeDuration();
    calclulateSalaryRanges();
}

let degreeTypeKeys: (keyof typeof DegreeType)[];
let degreeTypes: DegreeType[];
let degreeTypesString: string[];

let institutionKeys: (keyof typeof Institution)[];
let institutes: Institution[];
let institutesString: string[];

let geographyKeys: (keyof typeof Geography)[];
let geographies: Geography[];
let geographiesString: string[];

const caclulateEnumTypes = () => {
    //console.log("calculateEnumTypes");

    degreeTypeKeys = Object.keys(DegreeType).filter(key => isNaN(Number(key))) as (keyof typeof DegreeType)[];
    degreeTypes = degreeTypeKeys.map(key => DegreeType[key]);
    degreeTypesString = degreeTypeKeys.map(value => value.toString());

    institutionKeys = Object.keys(Institution).filter(key => isNaN(Number(key))) as (keyof typeof Institution)[];
    institutes = institutionKeys.map(key => Institution[key]);
    institutesString = institutionKeys.map(value => value.toString());

    geographyKeys = Object.keys(Geography).filter(key => isNaN(Number(key))) as (keyof typeof Geography)[];
    const geographies: Geography[] = geographyKeys.map(key => Geography[key]);
    geographiesString = geographyKeys.map(value => value.toString());
}

export const getDegreeTypeKeys = () => {
    return degreeTypeKeys;
}

export const getDegreeTypes = (): DegreeType[] => {
    return degreeTypes;
}

export const getDegreeTypesAsString = (): string[] => {
    return degreeTypesString;
}

export const getInstitutionKeys = () => {
    return institutionKeys;
}

export const getInstitutes = (): Institution[] => {
    return institutes;
}

export const getInstitutesAsString = (): string[] => {
    return institutesString;
}

export const getGeographyKeys = () => {
    return geographyKeys;
}

export const getGeographies = (): Geography[] => {
    return geographies;
}

export const getGeographiesAsString = (): string[] => {
    return geographiesString;
}

let minimumEducation: Education;
let maximumEducation: Education;

const calculateMinimumAndMaximumEducation = () => {
    minimumEducation = { ...educations[0] }; // creates a copy of the first education
    maximumEducation = { ...educations[0] };
    educations.forEach((education) =>{
        recursivelyCallFunctionOnAllNumberProperties(minimumEducation, education, Math.min); // recursively finds the minimum of all properties
        recursivelyCallFunctionOnAllNumberProperties(maximumEducation, education, Math.max);
    });
};

const recursivelyCallFunctionOnAllNumberProperties = (object1: object, object2: object, func: (number1: number, number2: number) => number) => {
    for (const key in object2){ // run the body of the for loop for all keys in object2
        if (typeof object2[key] === 'number'){ // if the key is a number call the function 'func'
            object1[key] = func(object1[key], object2[key]);
        }
        else if (typeof object2[key] === 'object' && object2[key] !== null){ // else if the key is an object call this same function recursively
            recursivelyCallFunctionOnAllNumberProperties(object1[key], object2[key], func);
        } 
    }
}

let educationDurationRange: MinimumMaximum;

const calculateMinMaxDegreeDuration = () => {
    //console.log("caclulateMinMaxDegreeDuration");

    let educationDurationMin = DegreeTypeToDuration(degreeTypes[0]).minimum;
    let educationDurationMax = DegreeTypeToDuration(degreeTypes[0]).maximum;
    degreeTypes.forEach((degreeType) => {
        let newDuration = DegreeTypeToDuration(degreeType);
        if (newDuration.minimum != -1) {
            educationDurationMin = Math.min(educationDurationMin, newDuration.minimum);
            educationDurationMax = Math.max(educationDurationMax, newDuration.maximum);
        }
    });
    educationDurationRange = { minimum: educationDurationMin, maximum: educationDurationMax }
}

const getEducationDurationRange = (): MinimumMaximum => {
    return educationDurationRange;
}

let newGraduateSalaryRange: MinimumMaximum;
let experiencedSalaryRange: MinimumMaximum;

const calclulateSalaryRanges = () => {
    //console.log("calculateSalaryRanges");

    let newGraduateSalaryMin = 0 //educations[0].job_data.salaries.newGraduate.lower_quartile;
    let experiencedSalaryMin = 0 //educations[0].job_data.salaries.experienced.lower_quartile;
    let newGraduateSalaryMax = 0 //educations[0].job_data.salaries.newGraduate.upper_quartile;
    let experiencedSalaryMax = 0 //educations[0].job_data.salaries.experienced.upper_quartile;

    educations.forEach((education) => {
        const salaries = education.jobData.salaries;
        if ((Number.isNaN(salaries.newGraduate.lowerQuartile)
            || Number.isNaN(salaries.newGraduate.upperQuartile)
            || Number.isNaN(salaries.experienced.lowerQuartile)
            || Number.isNaN(salaries.experienced.upperQuartile)) == false
        ) {
            newGraduateSalaryMin = Math.min(newGraduateSalaryMin, education.jobData.salaries.newGraduate.lowerQuartile);
            experiencedSalaryMin = Math.min(experiencedSalaryMin, education.jobData.salaries.experienced.lowerQuartile);
            newGraduateSalaryMax = Math.max(newGraduateSalaryMax, education.jobData.salaries.newGraduate.upperQuartile);
            experiencedSalaryMax = Math.max(experiencedSalaryMax, education.jobData.salaries.experienced.upperQuartile);
        }
    });
    newGraduateSalaryRange = { minimum: newGraduateSalaryMin, maximum: newGraduateSalaryMax };
    experiencedSalaryRange = { minimum: experiencedSalaryMin, maximum: experiencedSalaryMax };
}

export const getNewGraduateSalaryRange = (): MinimumMaximum => {
    return newGraduateSalaryRange;
}

export const getExperiencedSalaryRange = (): MinimumMaximum => {
    return experiencedSalaryRange;
}

export const getTableSectionData = (): TableSectionDataFromServer => {
    return {
        educations: educations,

        degreeTypeKeys: degreeTypeKeys,
        degreeTypes: degreeTypes,
        degreeTypesString: degreeTypesString,

        institutionKeys: institutionKeys,
        institutes: institutes,
        institutesString: institutesString,

        geographyKeys: geographyKeys,
        geographies: geographies,
        geographiesString: geographiesString,

        educationDurationRange: educationDurationRange,

        newGraduateSalaryRange: newGraduateSalaryRange,
        experiencedSalaryRange: experiencedSalaryRange,
    }
}