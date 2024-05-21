import { PropertyNames } from '../../src/types';

export const EducationPropertyNames: PropertyNames = {
    "hours.withManyStudents": "Tid med mange studerende",
    "hours.withFewStudents": "Tid med få studerende",
    "hours.withSupervision": "Tid med vejleder",
    "socialFeedback.socialEnvironment": "Social miljø",
    "socialFeedback.groupEngagement": "Gruppe engagement",
    "socialFeedback.loneliness": "Ensomhed",
    "socialFeedback.stress": "Stress",
    "academicFeedback.academicEnvironment": "Fagligt miljø",
    "academicFeedback.teacherEvaluation": "Underviser evaluering",
    "academicFeedback.satisfaction": "Tilfredshed",
    "academicWorkload.lectures": "Foredrag",
    "academicWorkload.literature": "Læsning",
    "academicWorkload.studentJob": "Studenter arbejde",
    "degreeStructure.contents.teaching": "Undervisning",
    "degreeStructure.contents.exams": "Eksamener",
    "degreeStructure.contents.internship": "Praktik",
    "degreeStructure.contents.internationalStay": "Udlands ophold",
    "dropoutRate": "Frafald",
    "jobData.salaries.newGraduate.lowerQuartile": "Nyuddannet nedre kvartil løn",
    "jobData.salaries.newGraduate.median": "Nyuddannet median af løn",
    "jobData.salaries.newGraduate.upperQuartile": "Nyuddannet øvre kvartil løn",
    "jobData.salaries.experienced.lowerQuartile": "Erfaren nedre kvartil løn",
    "jobData.salaries.experienced.median": "Erfaren median af løn",
    "jobData.salaries.experienced.upperQuartile": "Erfaren øvre kvartil løn",
    "jobData.workSchedule.workingHours": "Ugelige arbejdstimer",
    "jobData.workSchedule.fixedHoursPercent": "Tid med fast arbejdstimer",
    "jobData.workSchedule.flexibleHoursPercent": "Tid med fleksible arbejdstimer",
    "jobData.workSchedule.selfSchedulePercent": "Tid med selv-planlagte arbejdstimer",
    "jobData.workSchedule.variableSchedulePercent": "Tid med variable arbejdstimer",
    "jobData.workSchedule.nightAndEveningShiftsPercent": "Tid med nat og aften arbejde",
    "jobData.unemployment.newGraduate": "Nyuddannet arbejdsløshed",
    "jobData.unemployment.experienced": "Erfaren arbejdsløshed",
    "jobData.degreeRelevance": "Relevens af uddannelse",
    "jobData.degreePreparesForJob": "Uddannelse forbereder til job",
    "jobData.nationalJobs": "Nationale jobs"
}

export function PropertiesToPropertyNames(properties: string[]): string[] {
    let names: string[] = []
    properties.forEach((property) => {
        names.push(ConvertPropertyToName(property));
    });
    return names;
}

export const ConvertPropertyToName = (property: string): string => { 
    return property = EducationPropertyNames[property as keyof PropertyNames];

}
