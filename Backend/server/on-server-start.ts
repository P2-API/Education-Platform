import { Education, MinimumMaximum, TableSectionDataFromServer } from "../../src/types";
import { GetEducationsOnServerStart } from "../utilities/csv_importer";
import { DegreeType, Institution, Geography, DegreeTypeToDuration } from "../../src/enums";


let educations: Education[] = [];

export const onStart = () => {
    cacheEducations();    
}

const cacheEducations = async () => {
    educations = await GetEducationsOnServerStart();
    caclulateBasedOnEducations();
}

export const getCachedEducations = (): Education[] => {
    return educations;
}

const caclulateBasedOnEducations = () => {
    caclulateEnumTypes();
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

let educationDurationRange: MinimumMaximum;

const calculateMinMaxDegreeDuration = () => {
    let educationDurationMin = DegreeTypeToDuration(degreeTypes[0]).minimum;
    let educationDurationMax = DegreeTypeToDuration(degreeTypes[0]).maximum;
    degreeTypes.forEach((degreeType) => {
        let newDuration = DegreeTypeToDuration(degreeType);
        if (newDuration.minimum != -1) {
            educationDurationMin = Math.min(educationDurationMin, newDuration.minimum);
            educationDurationMax = Math.max(educationDurationMax, newDuration.maximum);
        }
    });
    educationDurationRange = {minimum: educationDurationMin, maximum: educationDurationMax}
}

const getEducationDurationRange = (): MinimumMaximum => {
    return educationDurationRange;
}

let newGraduateSalaryRange: MinimumMaximum;
let experiencedSalaryRange: MinimumMaximum;

const calclulateSalaryRanges = () => {
    let newGraduateSalaryMin = educations[0].job_data.salaries.newGraduate.lower_quartile;
    let experiencedSalaryMin = educations[0].job_data.salaries.experienced.lower_quartile;
    let newGraduateSalaryMax = educations[0].job_data.salaries.newGraduate.upper_quartile;
    let experiencedSalaryMax = educations[0].job_data.salaries.experienced.upper_quartile;
    educations.forEach((education) => {
        newGraduateSalaryMin = Math.min(newGraduateSalaryMin, education.job_data.salaries.newGraduate.lower_quartile);
        experiencedSalaryMin = Math.min(experiencedSalaryMin, education.job_data.salaries.experienced.lower_quartile);
        newGraduateSalaryMax = Math.max(newGraduateSalaryMax, education.job_data.salaries.newGraduate.upper_quartile);
        experiencedSalaryMax = Math.max(experiencedSalaryMax, education.job_data.salaries.experienced.upper_quartile);
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