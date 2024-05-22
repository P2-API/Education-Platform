import { AcademicFeedback, AcademicWorkload, DegreeContents, Education, HoursSpentDoing, Industry, JobData, JobWorkSchedule, MinimumMaximum, Salaries, SalaryFilters, SocialFeedback, TableFilters, Unemployment, UnemploymentFilters } from "../../src/types";
import { getMinimumEducation, getMaximumEducation, getEducationDurationRange } from "../server/on-server-start";
import deepCopy from "./deep-copy";


let minimumEducation: Education;
let maximumEducation: Education;

const normilize = (number: number, min: number, max: number) => {
    if (min == 0 && max == 0) return 0;
    if (min == max) return 1;

    return (number - min) / (max - min); // puts the number in the range [0, 1], given the min and max
}

export const normalizeFilters = (filters: TableFilters): TableFilters => {
    minimumEducation ??= getMinimumEducation();
    maximumEducation ??= getMaximumEducation();

    const normalizedFilters = deepCopy(filters);

    normalizeSalaryFilters(normalizedFilters.wantedSalary);
    normalizeUnemploymentFilters(normalizedFilters.unemployment);
    normalizeWorkingHoursFilters(normalizedFilters.wantedWorkingHours);
    normalizeEducationDurationFilters(normalizedFilters.educationDuration);
    return normalizedFilters;
}

const normalizeSalaryFilters = (salaryFilter: SalaryFilters) => {
    const minSalary = minimumEducation.jobData.salaries;
    const maxSalary = maximumEducation.jobData.salaries;

    salaryFilter.newGraduate.minimum = normilize(salaryFilter.newGraduate.minimum, minSalary.newGraduate.lowerQuartile, maxSalary.newGraduate.upperQuartile);
    salaryFilter.newGraduate.maximum = normilize(salaryFilter.newGraduate.maximum, minSalary.newGraduate.lowerQuartile, maxSalary.newGraduate.upperQuartile);

    salaryFilter.experienced.minimum = normilize(salaryFilter.experienced.minimum, minSalary.experienced.lowerQuartile, maxSalary.experienced.upperQuartile);
    salaryFilter.experienced.maximum = normilize(salaryFilter.experienced.maximum, minSalary.experienced.lowerQuartile, maxSalary.experienced.upperQuartile);
}

const normalizeUnemploymentFilters = (unemploymentFilter: UnemploymentFilters) => {
    let minUnemployment = minimumEducation.jobData.unemployment;
    let maxUnemployment = maximumEducation.jobData.unemployment;

    let minValue = Math.min(minUnemployment.newGraduate, minUnemployment.experienced);
    let maxValue = Math.max(maxUnemployment.newGraduate, maxUnemployment.experienced);

    unemploymentFilter.newGraduate.minimum = normilize(unemploymentFilter.newGraduate.minimum, minValue, maxValue);
    unemploymentFilter.newGraduate.maximum = normilize(unemploymentFilter.newGraduate.maximum, minValue, maxValue);

    unemploymentFilter.experienced.minimum = normilize(unemploymentFilter.experienced.minimum, minValue, maxValue);
    unemploymentFilter.experienced.maximum = normilize(unemploymentFilter.experienced.maximum, minValue, maxValue);
}

const normalizeWorkingHoursFilters = (workingHoursFilter: MinimumMaximum) => {
    const minWorkingHours = minimumEducation.jobData.workSchedule.workingHours;
    const maxWorkingHours = maximumEducation.jobData.workSchedule.workingHours;

    workingHoursFilter.minimum = normilize(workingHoursFilter.minimum, minWorkingHours, maxWorkingHours);
    workingHoursFilter.maximum = normilize(workingHoursFilter.maximum, minWorkingHours, maxWorkingHours);
}

const normalizeEducationDurationFilters = (educationDurationFilter: MinimumMaximum) => {
    const educationDurationRange = getEducationDurationRange();

    educationDurationFilter.minimum = normilize(educationDurationFilter.minimum, educationDurationRange.minimum, educationDurationRange.maximum);
    educationDurationFilter.maximum = normilize(educationDurationFilter.maximum, educationDurationRange.minimum, educationDurationRange.maximum);
}






export const normilizesEducations = (educations: Education[]): Education[] => {
    minimumEducation ??= getMinimumEducation();
    maximumEducation ??= getMaximumEducation();

    const normilizedEducations = deepCopy(educations);
    normilizedEducations.forEach((education) => {
        normilizeEducation(education); // Normilize each numerical value in the education
    });
    return normilizedEducations;
}

const normilizeEducation = (education: Education) => {
    normilizeEducationIndustries(education.industries);
    normilizeEducationHours(education.hours);
    normilizeEducationSocialFeedback(education.socialFeedback);
    normilizeEducationAcademicFeedback(education.academicFeedback);
    normilizeEducationAcademicWorkload(education.academicWorkload);
    normilizeEducationDegreeStructureContents(education.degreeStructure.contents);
    education.dropoutRate = normilize(education.dropoutRate, minimumEducation.dropoutRate, maximumEducation.dropoutRate);
    normilizeEducationJobData(education.jobData);
}

const normilizeEducationIndustries = (industries: Industry[]) => {
    industries.forEach((industry) => {
        let minShare = 0;
        let maxShare = 0;
        minimumEducation.industries.forEach((minIndustry) => {
            if (industry.title === minIndustry.title) {
                minShare = minIndustry.share;
            }
        });
        maximumEducation.industries.forEach((maxIndustry) => {
            if (industry.title === maxIndustry.title) {
                maxShare = maxIndustry.share;
            }
        });
        industry.share = normilize(industry.share, minShare, maxShare);
    });
}

const normilizeEducationHours = (hours: HoursSpentDoing) => {
    let minHours = minimumEducation.hours;
    const maxHours = maximumEducation.hours;
    hours.withFewStudents = normilize(hours.withFewStudents, minHours.withFewStudents, maxHours.withFewStudents);
    hours.withManyStudents = normilize(hours.withManyStudents, minHours.withManyStudents, maxHours.withManyStudents);
    hours.withSupervision = normilize(hours.withSupervision, minHours.withSupervision, maxHours.withSupervision);
}

const normilizeEducationSocialFeedback = (socialFeedback: SocialFeedback) => {
    let minSocialFeedback = minimumEducation.socialFeedback;
    let maxSocialFeedback = maximumEducation.socialFeedback;
    socialFeedback.groupEngagement = normilize(socialFeedback.groupEngagement, minSocialFeedback.groupEngagement, maxSocialFeedback.groupEngagement);
    socialFeedback.loneliness = normilize(socialFeedback.loneliness, minSocialFeedback.loneliness, maxSocialFeedback.loneliness);
    socialFeedback.socialEnvironment = normilize(socialFeedback.socialEnvironment, minSocialFeedback.socialEnvironment, maxSocialFeedback.socialEnvironment);
    socialFeedback.stress = normilize(socialFeedback.stress, minSocialFeedback.stress, maxSocialFeedback.stress);
}

const normilizeEducationAcademicFeedback = (academicFeedback: AcademicFeedback) => {
    let minAcademicFeedback = minimumEducation.academicFeedback;
    let maxAcademicFeedback = maximumEducation.academicFeedback;
    academicFeedback.academicEnvironment = normilize(academicFeedback.academicEnvironment, minAcademicFeedback.academicEnvironment, maxAcademicFeedback.academicEnvironment);
    academicFeedback.satisfaction = normilize(academicFeedback.satisfaction, minAcademicFeedback.satisfaction, maxAcademicFeedback.satisfaction);
    academicFeedback.teacherEvaluation = normilize(academicFeedback.teacherEvaluation, minAcademicFeedback.teacherEvaluation, maxAcademicFeedback.teacherEvaluation);
}

const normilizeEducationAcademicWorkload = (academicWorkload: AcademicWorkload) => {
    let minAcademicWorkload = minimumEducation.academicWorkload;
    let maxAcademicWorkload = maximumEducation.academicWorkload;
    academicWorkload.lectures = normilize(academicWorkload.lectures, minAcademicWorkload.lectures, maxAcademicWorkload.lectures);
    academicWorkload.literature = normilize(academicWorkload.literature, minAcademicWorkload.literature, maxAcademicWorkload.literature);
    academicWorkload.studentJob = normilize(academicWorkload.studentJob, minAcademicWorkload.studentJob, maxAcademicWorkload.studentJob);
}

const normilizeEducationDegreeStructureContents = (degreeContents: DegreeContents) => {
    let minDegreeContents = minimumEducation.degreeStructure.contents;
    let maxDegreeContents = maximumEducation.degreeStructure.contents;
    degreeContents.teaching = normilize(degreeContents.teaching, minDegreeContents.teaching, maxDegreeContents.teaching);
    degreeContents.exams = normilize(degreeContents.exams, minDegreeContents.exams, maxDegreeContents.exams);
    degreeContents.internship = normilize(degreeContents.internship, minDegreeContents.internship, maxDegreeContents.internship);
    degreeContents.internationalStay = normilize(degreeContents.internationalStay, minDegreeContents.internationalStay, maxDegreeContents.internationalStay);
}

const normilizeEducationJobData = (jobData: JobData) => {
    let minJobData = minimumEducation.jobData;
    let maxJobData = maximumEducation.jobData;
    normilizeEducationSalaries(jobData.salaries);
    normilizeEducationWorkSchedule(jobData.workSchedule);
    normilizeUnemployment(jobData.unemployment);
    jobData.degreeRelevance = normilize(jobData.degreeRelevance, minJobData.degreeRelevance, maxJobData.degreeRelevance);
    jobData.degreePreparesForJob = normilize(jobData.degreePreparesForJob, minJobData.degreePreparesForJob, maxJobData.degreePreparesForJob);
    jobData.nationalJobs = normilize(jobData.nationalJobs, minJobData.nationalJobs, maxJobData.nationalJobs);
}

const normilizeEducationSalaries = (salary: Salaries) => {
    let minSalary = minimumEducation.jobData.salaries;
    let maxSalary = maximumEducation.jobData.salaries;
    salary.newGraduate.lowerQuartile = normilize(salary.newGraduate.lowerQuartile, minSalary.newGraduate.lowerQuartile, maxSalary.newGraduate.upperQuartile);
    salary.newGraduate.median = normilize(salary.newGraduate.median, minSalary.newGraduate.lowerQuartile, maxSalary.newGraduate.upperQuartile);
    salary.newGraduate.upperQuartile = normilize(salary.newGraduate.upperQuartile, minSalary.newGraduate.lowerQuartile, maxSalary.newGraduate.upperQuartile);

    salary.experienced.lowerQuartile = normilize(salary.experienced.lowerQuartile, minSalary.experienced.lowerQuartile, maxSalary.experienced.upperQuartile);
    salary.experienced.median = normilize(salary.experienced.median, minSalary.experienced.lowerQuartile, maxSalary.experienced.upperQuartile);
    salary.experienced.upperQuartile = normilize(salary.experienced.upperQuartile, minSalary.experienced.lowerQuartile, maxSalary.experienced.upperQuartile);
}

const normilizeEducationWorkSchedule = (workSchedule: JobWorkSchedule) => {
    let minWorkSchedule = minimumEducation.jobData.workSchedule;
    let maxWorkSchedule = maximumEducation.jobData.workSchedule;
    workSchedule.fixedHoursPercent = normilize(workSchedule.fixedHoursPercent, minWorkSchedule.fixedHoursPercent, maxWorkSchedule.fixedHoursPercent);
    workSchedule.flexibleHoursPercent = normilize(workSchedule.flexibleHoursPercent, minWorkSchedule.flexibleHoursPercent, maxWorkSchedule.flexibleHoursPercent);
    workSchedule.nightAndEveningShiftsPercent = normilize(workSchedule.nightAndEveningShiftsPercent, minWorkSchedule.nightAndEveningShiftsPercent, maxWorkSchedule.nightAndEveningShiftsPercent);
    workSchedule.selfSchedulePercent = normilize(workSchedule.selfSchedulePercent, minWorkSchedule.selfSchedulePercent, maxWorkSchedule.selfSchedulePercent);
    workSchedule.variableSchedulePercent = normilize(workSchedule.variableSchedulePercent, minWorkSchedule.variableSchedulePercent, maxWorkSchedule.variableSchedulePercent);
    workSchedule.workingHours = normilize(workSchedule.workingHours, minWorkSchedule.workingHours, maxWorkSchedule.workingHours);
}

const normilizeUnemployment = (unemployment: Unemployment) => {
    let minUnemployment: Unemployment = minimumEducation.jobData.unemployment;
    let maxUnemployment: Unemployment = maximumEducation.jobData.unemployment;

    let minValue = Math.min(minUnemployment.newGraduate, minUnemployment.experienced);
    let maxValue = Math.max(maxUnemployment.newGraduate, maxUnemployment.experienced);

    unemployment.experienced = normilize(unemployment.experienced, minValue, maxValue);
    unemployment.newGraduate = normilize(unemployment.newGraduate, minValue, maxValue);
    unemployment.projectedExperienced = normilize(unemployment.projectedExperienced, minUnemployment.projectedExperienced, maxUnemployment.projectedExperienced);
    unemployment.projectedNewGraduate = normilize(unemployment.projectedNewGraduate, minUnemployment.projectedNewGraduate, maxUnemployment.projectedNewGraduate);
}

export const normalizeFlexibleHours = (value: number) => {
    const minJobFlexibility = minimumEducation.jobData.workSchedule.flexibleHoursPercent;
    const maxJobFlexibility = maximumEducation.jobData.workSchedule.flexibleHoursPercent;
    return normilize(value, minJobFlexibility, maxJobFlexibility);
}

export const normalizeNationalJobs = (value: number) => {
    const minNationalJobs = minimumEducation.jobData.nationalJobs;
    const maxNationalJobs = maximumEducation.jobData.nationalJobs;

    return normilize(value, minNationalJobs, maxNationalJobs);
}

export default normilize;