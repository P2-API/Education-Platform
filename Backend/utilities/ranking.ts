import { Education, RankedEducationsType, UserImputs, TableFilters, QuizAnswers, EducationVector, FinalRankingType, IntermedietRankingType } from "../../src/types"
import { findOptimalSolution } from "./linear-programming"

export class Ranker {
    ranking: RankedEducationsType
    constructor() {
        this.ranking = { upperhalf: [], lowerhalf: [] }
    }

    produceRanking(educations: Education[], userImputs: UserImputs): FinalRankingType {
        this.ranking.upperhalf = educations
        this.roughSorting(userImputs.filters)
        const optimalEducation = findOptimalSolution(userImputs)
        const rankedEducations = this.normSorting(this.ranking, optimalEducation, userImputs.quizAnswers)
        return this.changeToApropriateType(rankedEducations)
    }

    changeToApropriateType(rankedEducations: IntermedietRankingType): FinalRankingType {
        let finalRanking: FinalRankingType = { ranking: [], index: 0 }
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

    roughSorting(filters: TableFilters) {
        this.ranking.upperhalf.forEach((education) => {
            if (!this.filtersPassed(education, filters)) {
                this.ranking.lowerhalf.push(education)
            }
        })
    }

    normSorting(ranking: RankedEducationsType, optimalEducation: Education, weights: QuizAnswers): IntermedietRankingType {
        const normValue = 2;
        const optimalEducationVector: EducationVector = this.educationVector(optimalEducation, weights);
        const educationVecotors: { upperhalf: EducationVector[], lowerhalf: EducationVector[] } = this.addEducationVectors(ranking, weights);
        let sortedEducations: IntermedietRankingType = { upperhalf: [], lowerhalf: [] };

        educationVecotors.upperhalf.forEach((education) => {
            sortedEducations.upperhalf.push({ education: education.education, similarity: this.norm(education, optimalEducationVector, normValue) })
        })
        educationVecotors.lowerhalf.forEach((education) => {
            sortedEducations.lowerhalf.push({ education: education.education, similarity: this.norm(education, optimalEducationVector, normValue) })
        })

        return sortedEducations
    }

    norm(education: EducationVector, optimalEducation: EducationVector, normValue: number): number {
        let sum = 0;
        education.coordinates.forEach((coordinate, index) => {
            sum += Math.pow(coordinate - optimalEducation.coordinates[index], normValue)
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
        let weightedEducationVector: EducationVector = { education: education, coordinates: [] }; //the coordinates are calculated by multiplying the values of relevant education properties with the weight of the corresponding property
        let coordinates = weightedEducationVector.coordinates
        //add subjects
        education.subjects.forEach((subject) => {
            coordinates.push(subject.score * weights.subjectsPriority)
        })
        //add industries
        education.industries.forEach((industry) => {
            coordinates.push(industry.share * weights.subjectsPriority)
        })
        //add hours
        coordinates.push(education.hours.withFewStudents * weights.highWorkloadAcceptancePriority,
            education.hours.withManyStudents * weights.highWorkloadAcceptancePriority,
            education.hours.withSupervision * weights.highWorkloadAcceptancePriority)
        //add socialFeedback
        coordinates.push(education.socialFeedback.socialEnvironment * weights.socialEnvironmentPriority,
            education.socialFeedback.groupEngagement * weights.groupEngagementPriority,
            education.socialFeedback.loneliness * weights.lonelinessPriority)
        //add academicFeedback
        coordinates.push(education.academicFeedback.academicEnvironment * weights.academicEnvironmentPriority,
            education.academicFeedback.teacherEvaluation * weights.teachingPriority)
        //add academicWorkload
        coordinates.push(education.academicWorkload.studentJob * weights.studentJobPriority,
            education.academicWorkload.lectures * weights.lecturesPriority,
            education.academicWorkload.literature * weights.literaturePriority)
        //add degreeStructure
        coordinates.push(education.degreeStructure.contents.exams * weights.dislikeExamPriority,
            education.degreeStructure.contents.internship * weights.internshipPriority,
            education.degreeStructure.contents.internationalStay * weights.internationalStayPriority)
        //add jobData
        coordinates.push(education.jobData.salaries.newGraduate.median * weights.startingSalaryPriority,
            education.jobData.salaries.experienced.median * weights.experiencedSalaryPriority,
            education.jobData.unemployment.experienced * weights.unemploymentPriority,
            education.jobData.unemployment.newGraduate * weights.unemploymentPriority,
            education.jobData.degreeRelevance * weights.degreeRelevancePriority,
            education.jobData.workSchedule.fixedHoursPercent * weights.fixedHoursPriority,
            education.jobData.workSchedule.flexibleHoursPercent * weights.flexibleHoursPriority,
            education.jobData.workSchedule.selfSchedulePercent * weights.selfSchedulePriority,
            education.jobData.workSchedule.variableSchedulePercent * weights.variableSchedulePriority,
            education.jobData.workSchedule.nightAndEveningShiftsPercent * weights.nightAndEveningShiftsPriority)

        return weightedEducationVector
    }

    filtersPassed(education: Education, filters: TableFilters) {
        return filters.wantedDegreeTypes.includes(education.degreeType) &&
            filters.canStudyInGeoraphies.includes(education.geographies[0]) &&
            filters.canStudyAtInstitution.includes(education.institutions) &&
            filters.hasFormsOfEducation.every((teachingMethod) => education.degreeStructure.teachingMethods.includes(teachingMethod)) &&
            filters.canWorkInternationally ? (education.jobData.nationalJobs ? false : true) : true
    }
}