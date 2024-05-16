import { Education, RankedEducationsType, UserImputs, TableFilters, QuizAnswers, EducationVector, FinalRankingType, IntermediateRankingType, MinimumMaximum } from "../../src/types"
import { findOptimalSolution } from "./linear-programming"
import { DegreeTypeToDuration } from "../../src/enums"
import { getNormilizedEducations } from "../server/on-server-start"

export class Ranker {
    ranking: RankedEducationsType
    constructor() {
        this.ranking = { upperhalf: [], lowerhalf: [] }
    }

    produceRanking(userImputs: UserImputs): FinalRankingType {
        const normalizedEducations = getNormilizedEducations()
        console.log("teachingMethods and type", normalizedEducations[0].degreeStructure.teachingMethods, typeof normalizedEducations[0].degreeStructure.teachingMethods[0])
        console.log("filter teachingMethods and type", userImputs.filters.hasFormsOfEducation, typeof userImputs.filters.hasFormsOfEducation[0])
        this.roughSorting(userImputs.filters, normalizedEducations)
        const optimalEducation = findOptimalSolution(userImputs)
        const rankedEducations = this.normSorting(this.ranking, optimalEducation, userImputs.quizAnswers)
        return this.changeToApropriateType(rankedEducations)
    }

    changeToApropriateType(rankedEducations: IntermediateRankingType): FinalRankingType {
        const finalRanking: FinalRankingType = { ranking: [], index: 0 }
        rankedEducations.upperhalf.forEach((education) => finalRanking.ranking.push({ education: education.education, score: education.similarity }))
        finalRanking.index = finalRanking.ranking.length
        rankedEducations.lowerhalf.forEach((education) => finalRanking.ranking.push({ education: education.education, score: education.similarity }))
        this.normalizeScores(finalRanking.ranking)
        return finalRanking
    }

    normalizeScores(ranking: { education: Education, score: number }[]) {
        const maxScore = ranking.reduce((max, education) => education.score > max ? education.score : max, 0)
        ranking.forEach((education) => education.score = 1 - education.score / maxScore)
    }

    roughSorting(filters: TableFilters, educations: Education[]) {
        educations.forEach((education) => {
            if (this.filtersPassed(education, filters)) {
                this.ranking.upperhalf.push(education)
            }
            else {
                this.ranking.lowerhalf.push(education)
            }
        })
    }

    normSorting(ranking: RankedEducationsType, optimalEducation: Education, weights: QuizAnswers): IntermediateRankingType {
        const normValue = 2;
        const optimalEducationVector: EducationVector = this.educationVector(optimalEducation, weights);
        const educationVectors: { upperhalf: EducationVector[], lowerhalf: EducationVector[] } = this.addEducationVectors(ranking, weights);
        const sortedEducations: IntermediateRankingType = { upperhalf: [], lowerhalf: [] };

        educationVectors.upperhalf.forEach((education) => {
            sortedEducations.upperhalf.push({ education: education.education, similarity: this.norm(education, optimalEducationVector, normValue) })
        })
        educationVectors.lowerhalf.forEach((education) => {
            sortedEducations.lowerhalf.push({ education: education.education, similarity: this.norm(education, optimalEducationVector, normValue) })
        })

        //sort each half
        sortedEducations.upperhalf.sort((a, b) => a.similarity - b.similarity)
        sortedEducations.lowerhalf.sort((a, b) => a.similarity - b.similarity)
        return sortedEducations
    }

    norm(education: EducationVector, optimalEducation: EducationVector, normValue: number): number {
        let sum = 0;
        //console.log("education", education)
        //console.log("industries", education.education.industries)
        //console.log("degreeStructure contents", education.education.degreeStructure.contents)
        //console.log("optimalEducation", optimalEducation)
        education.coordinates.forEach((coordinate, index) => {
            sum += Math.pow(coordinate.value - optimalEducation.coordinates[index].value, normValue)
        })
        return Math.pow(sum, 1 / normValue)
    }

    addEducationVectors(ranking: RankedEducationsType, weights: QuizAnswers): { upperhalf: EducationVector[], lowerhalf: EducationVector[] } {
        const educationVecotors: { upperhalf: EducationVector[], lowerhalf: EducationVector[] } = { upperhalf: [], lowerhalf: [] };
        ranking.upperhalf.forEach((education) => educationVecotors.upperhalf.push(this.educationVector(education, weights)))
        ranking.lowerhalf.forEach((education) => educationVecotors.lowerhalf.push(this.educationVector(education, weights)))
        return educationVecotors
    }

    educationVector(education: Education, weights: QuizAnswers): EducationVector {
        const weightedEducationVector: EducationVector = { education: education, coordinates: [] }; //the coordinates are calculated by multiplying the values of relevant education properties with the weight of the corresponding property
        const coordinates = weightedEducationVector.coordinates
        //add subjects
        education.subjects.forEach((subject) => {
            coordinates.push({ name: subject.title, value: subject.score * weights.subjectsPriority })
        })
        /*
        //add industries
        education.industries.forEach((industry) => {
            coordinates.push({ name: industry.title, value: industry.share * weights.subjectsPriority })
        })
        */
        //add hours
        coordinates.push({ name: "HoursWithFewStudent", value: education.hours.withFewStudents * weights.highWorkloadAcceptancePriority },
            { name: "HourswithManyStedents", value: education.hours.withManyStudents * weights.highWorkloadAcceptancePriority },
            { name: "HoursWithSupervision", value: education.hours.withSupervision * weights.highWorkloadAcceptancePriority })
        //add socialFeedback
        coordinates.push({ name: "socialEnvironment", value: education.socialFeedback.socialEnvironment * weights.socialEnvironmentPriority },
            { name: "groupEngaement", value: education.socialFeedback.groupEngagement * weights.groupEngagementPriority },
            { name: "loneliness", value: education.socialFeedback.loneliness * weights.lonelinessPriority })
        //add academicFeedback
        coordinates.push({ name: "acedemicEnvironment", value: education.academicFeedback.academicEnvironment * weights.academicEnvironmentPriority },
            { name: "acedemicFeedback", value: education.academicFeedback.teacherEvaluation * weights.teachingPriority })
        //add academicWorkload
        coordinates.push({ name: "studentJob", value: education.academicWorkload.studentJob * weights.studentJobPriority },
            { name: "lectures", value: education.academicWorkload.lectures * weights.lecturesPriority },
            { name: "literature", value: education.academicWorkload.literature * weights.literaturePriority })
        //add degreeStructure
        coordinates.push({ name: "exams", value: education.degreeStructure.contents.exams * weights.dislikeExamPriority },
            { name: "internship", value: education.degreeStructure.contents.internship * weights.internshipPriority },
            { name: "internationalStay", value: education.degreeStructure.contents.internationalStay * weights.internationalStayPriority })
        //add jobData
        coordinates.push({ name: "salaryNewGraduate", value: education.jobData.salaries.newGraduate.median * weights.startingSalaryPriority },
            { name: "salaryExperienced", value: education.jobData.salaries.experienced.median * weights.experiencedSalaryPriority },
            { name: "unemploymentExperienced", value: education.jobData.unemployment.experienced * weights.unemploymentPriority },
            { name: "unemploymentNewGraduate", value: education.jobData.unemployment.newGraduate * weights.unemploymentPriority },
            { name: "degreeRelevance", value: education.jobData.degreeRelevance * weights.degreeRelevancePriority },
            { name: "fixedHoursPercernt", value: education.jobData.workSchedule.fixedHoursPercent * weights.fixedHoursPriority },
            { name: "flexibleHoursPercent", value: education.jobData.workSchedule.flexibleHoursPercent * weights.flexibleHoursPriority },
            { name: "selfSchedulePercent", value: education.jobData.workSchedule.selfSchedulePercent * weights.selfSchedulePriority },
            { name: "variableSchedulePercent", value: education.jobData.workSchedule.variableSchedulePercent * weights.variableSchedulePriority },
            { name: "nightAndEveningShiftsPercent", value: education.jobData.workSchedule.nightAndEveningShiftsPercent * weights.nightAndEveningShiftsPriority })
           // { name: "nationalJobs", value: education.jobData.nationalJobs * weights.workNationallyPriority })

        return weightedEducationVector
    }

    filtersPassed(education: Education, filters: TableFilters) {
       return ((filters.wantedDegreeTypes.length === 0) ? true : filters.wantedDegreeTypes.includes(education.degreeType)) &&
               ((filters.canStudyInGeographies.length === 0) ? true : filters.canStudyInGeographies.some((geography) => education.geographies.includes(geography))) &&
               ((filters.canStudyAtInstitution.length === 0) ? true : filters.canStudyAtInstitution.includes(education.institutions)) &&
                (filters.hasFormsOfEducation.length == 0)? true: (filters.hasFormsOfEducation.some((teachingMethod) => education.degreeStructure.teachingMethods.includes(teachingMethod))) //&&
                && (filters.canWorkInternationally ? (education.jobData.nationalJobs > 0.8 ? false : true) : true)// &&
               && ((filters.hasFlexibleJobSchedule === true) ? (education.jobData.workSchedule.flexibleHoursPercent > 0.5 ? true : false) : true)// &&
               &&  this.educationDurationFilterPassed(education, filters.educationDuration) //&&
                && this.workingHoursFilterPassed(education, filters.wantedWorkingHours)

    }
    educationDurationFilterPassed(education: Education, educationDurationFilter: MinimumMaximum): boolean {
        const educationDuration: MinimumMaximum = DegreeTypeToDuration(education.degreeType,true)
        return educationDuration.minimum >= educationDurationFilter.minimum && educationDuration.maximum <= educationDurationFilter.maximum
    }
    workingHoursFilterPassed(education: Education, workingHoursFilter: MinimumMaximum): boolean {
        return education.jobData.workSchedule.workingHours >= workingHoursFilter.minimum && education.jobData.workSchedule.fixedHoursPercent <= workingHoursFilter.maximum
    }
}