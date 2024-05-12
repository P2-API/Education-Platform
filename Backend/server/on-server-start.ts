import { Education, EducationGroup, MinimumMaximum, TableSectionDataFromServer } from "../../src/types";
import { GetEducationsOnServerStart } from "../utilities/csv_importer";
import { DegreeType, Institution, Geography, DegreeTypeToDuration } from "../../src/enums";

import * as fs from "fs"; 
import { educationToEducationGroup } from "../utilities/custom_type_conversion";

let educations: Education[] = [];
let educationGroups: EducationGroup[] = [];

let degreeTypeKeys: (keyof typeof DegreeType)[];
let subjectKeys: string[];
let institutionKeys: (keyof typeof Institution)[];
let geographyKeys: (keyof typeof Geography)[];

let minimumEducation: Education;
let maximumEducation: Education;

let newGraduateSalaryRange: MinimumMaximum;
let experiencedSalaryRange: MinimumMaximum;

export const onStart = () => {
    //console.log("onStart");
    cacheEducations();
}

const cacheEducations = async () => {
    //console.log("cacheEducations");
    educations = await GetEducationsOnServerStart();
    caclulateBasedOnEducations();
    groupEducations();
    console.log("Grouped Educations: ", educationGroups.length);
    fs.writeFileSync("./Backend/cache/education_groups.ts", JSON.stringify(educationGroups));
}

function groupEducations() {
    educations.forEach((education) => {
        var alreadyGrouped = false;
        educationGroups.forEach((groupedEducation) => {
            if (groupedEducation.title == education.title) alreadyGrouped = true;
        })
        if (!alreadyGrouped) educationGroups.push(educationToEducationGroup(education));
    })
}

export const getCachedEducations = (): Education[] => {
    return educations;
}

const caclulateBasedOnEducations = () => {
    //console.log("caclulateBasedOnEducations");

    caclulateEnumTypes();
    calculateMinimumAndMaximumEducation(educations);
    calculateSubjectKeys();
    calculateMinMaxDegreeDuration();
}

// I don't know if this is what it is meant to do
const calculateSubjectKeys = () => {
    educations.forEach((education) => {
        education.subjects.forEach((subject) => {
            if (!subjectKeys.includes(subject.title)) 
                subjectKeys.push(subject.title);
        })
    })
}

const caclulateEnumTypes = () => {
    //console.log("calculateEnumTypes");

    degreeTypeKeys = Object.keys(DegreeType) as (keyof typeof DegreeType)[];

    institutionKeys = Object.keys(Institution) as (keyof typeof Institution)[];

    geographyKeys = Object.keys(Geography) as (keyof typeof Geography)[];
}

export const getSubjectKeys = () => {
    return subjectKeys;
}

export const getDegreeTypeKeys = () => {
    return degreeTypeKeys;
}

export const getInstitutionKeys = () => {
    return institutionKeys;
}

export const getGeographyKeys = () => {
    return geographyKeys;
}

export const calculateMinimumAndMaximumEducation = (educations: Education[]) => {
    let minimumEducationCopy = { ...educations[0], title: "minimum education" }; // creates a copy of the first education
    let maximumEducationCopy = { ...educations[1], title: "maximum education" };
    educations.forEach((education) =>{
        minimumEducationCopy = recursivelyCallFunctionOnAllNumberProperties(minimumEducationCopy, education, Math.min) as Education; // recursively finds the minimum of all properties
        maximumEducationCopy = recursivelyCallFunctionOnAllNumberProperties(maximumEducationCopy, education, Math.max) as Education;
    });
    minimumEducation = minimumEducationCopy;
    maximumEducation = maximumEducationCopy;
};

const recursivelyCallFunctionOnAllNumberProperties = (object1: object, object2: object, func: (number1: number, number2: number) => number): object => {
    for (const key in object2){ // run the body of the for loop for all keys in object2
        if (typeof object2[key] === 'number'){ // if the key is a number call the function 'func'
            //if (func.name == "min") console.log(key, "was", object1[key], object2[key], "became", func(object1[key], object2[key]), func.name);
            object1[key] = func(object1[key], object2[key]);
        }
        else if (typeof object2[key] === 'object' && object2[key] !== null){ // else if the key is an object call this same function recursively
            object1[key] = recursivelyCallFunctionOnAllNumberProperties(object1[key], object2[key], func);
        }  
    }
    return object1;
}

export const getMinimumEducation = (): Education => {
    return minimumEducation;
}

export const getMaximumEducation = (): Education => {
    return maximumEducation;
}

let educationDurationRange: MinimumMaximum;

const calculateMinMaxDegreeDuration = () => {
    //console.log("caclulateMinMaxDegreeDuration");

    let educationDurationMin = DegreeTypeToDuration(degreeTypeKeys[0]).minimum;
    let educationDurationMax = DegreeTypeToDuration(degreeTypeKeys[0]).maximum;
    degreeTypeKeys.forEach((degreeType) => {
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

export const getTableSectionData = (): TableSectionDataFromServer => {
    return {
        educations: educations,

        degreeTypeKeys: degreeTypeKeys,
        
        subjectKeys: subjectKeys,

        institutionKeys: institutionKeys,

        geographyKeys: geographyKeys,

        educationDurationRange: educationDurationRange,

        minimumValueEducation: minimumEducation,
        maximumValueEducation: maximumEducation,
    }
}