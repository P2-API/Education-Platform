import { PropertyNames } from '../../src/types';

const EducationPropertyNames: PropertyNames = {
    rank: "Rank",
    withManyStudents: "Tid med mange studerende",
    withFewStudents: "Tid med få studerende",
    withSupervision: "Tid med vejleder",
    socialEnvironment: "Social miljø",
    groupEngagement: "Gruppe engagement",
    loneliness: "Ensomhed",
    stress: "Stress",
    academicEnvironment: "Fagligt miljø",
    teacherEvaluation: "Underviser evaluering",
    satisfaction: "Tilfredshed",
    lectures: "Foredrag",
    literature: "Læsning",
    studentJob: "Studenter arbejde",
    teaching: "Undervisning",
    exams: "Eksamener",
    internship: "Praktik",
    internationalStay: "Udlands ophold",
    dropoutRate: "Drop ud rate",
    lowerQuartile: "Nedre kvartil løn",
    median: "Median af løn",
    upperQuartile: "Øvre kvartil løn",
    workingHours: "Ugelige arbejdstimer",
    fixedHoursPercent: "Tid med fast arbejdstimer",
    flexibleHoursPercent: "Tid med fleksible arbejdstimer",
    selfSchedulePercent: "Tid med selv-planlagte arbejdstimer",
    variableSchedulePercent: "Tid med variable arbejdstimer",
    nightAndEveningShiftsPercent: "Tid med nat og aften arbejde",
    newGraduate: "Ny uddannet",
    experienced: "Erfaren",
    projectedNewGraduate: "Projekteret ny udannet",
    projectedExperienced: "Projekteret erfaren",
    degreeRelevance: "Relevens af uddannelse",
    degreePreparesForJob: "Uddannelse forbereder til job",
    nationalJobs: "Nationale jobs"
}

export function PropertiesToPropertyNames(properties: string[]): string[] {
    let names: string[] = []
    properties.forEach((property) => {
        names.push(ConvertPropertyToName(property));
    });
    return names;
}

export const ConvertPropertyToName = (property: string): string => { 
    return property = EducationPropertyNames[property as keyof PropertyNames]
}
