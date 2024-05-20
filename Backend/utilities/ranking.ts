import { Education, RankedEducationsType, UserInputs, TableFilters, QuizAnswers, EducationVector, FinalRankingType, IntermediateRankingType, MinimumMaximum, EducationData, SalaryFilters, UnemploymentFilters } from "../../src/types"
import { findOptimalSolution } from "./linear-programming"
import { DegreeTypeToDuration } from "../../src/enums"
import { getEducationData } from "../server/on-server-start"

export class Ranker {
    ranking: RankedEducationsType
    constructor() {
        this.ranking = { upperhalf: [], lowerhalf: [] }
    }

    produceRanking(userInputs: UserInputs): FinalRankingType {
        const educationData:EducationData = getEducationData()
        educationData.normalized = educationData.normalized.filter((education) => education.subjects.length > 0)
        this.roughSorting(userInputs.filters, educationData.normalized)
        const optimalEducation = findOptimalSolution(userInputs)
        const rankedEducations = this.normSorting(this.ranking, optimalEducation, userInputs)
        return this.changeToApropriateType(rankedEducations, educationData.normal)
    }

    changeToApropriateType(rankedEducations: IntermediateRankingType, normalEducationData:Education[]): FinalRankingType {
        const finalRanking: FinalRankingType = { ranking: [], index: 0 }
        rankedEducations.upperhalf.forEach((education) => finalRanking.ranking.push({ education: education.education, score: education.similarity }))
        finalRanking.index = finalRanking.ranking.length
        rankedEducations.lowerhalf.forEach((education) => finalRanking.ranking.push({ education: education.education, score: education.similarity }))
        this.normalizeScores(finalRanking.ranking)
        //map the ranked educations to the normal education data
        finalRanking.ranking.map((education) => {
            const normalEducation = normalEducationData.find((normalEducation) => (normalEducation.title === education.education.title && normalEducation.institutions === education.education.institutions));
            if (normalEducation) {
                education.education = normalEducation;
            } else {
                throw new Error("could not map normalized education to normal education data");
            }
        });
        return finalRanking
    }

    normalizeScores(ranking: { education: Education, score: number }[]) {
        const maxScore = ranking.reduce((max, education) => education.score > max ? education.score : max, 0)
        ranking.forEach((education) => education.score = 1 - education.score / maxScore)
    }

    roughSorting(filters: TableFilters, educations: Education[]) {
        educations.forEach((education) => {
            /*
            console.log("education duration", DegreeTypeToDuration(education.degreeType,true))
            console.log("forms of education",(filters.hasFormsOfEducation.length == 0)? true: (filters.hasFormsOfEducation.some((teachingMethod) => education.degreeStructure.teachingMethods.includes(teachingMethod))))
            console.log("degreeType:",(filters.wantedDegreeTypes.length === 0) ? true : filters.wantedDegreeTypes.includes(education.degreeType))
            console.log("geography:",(filters.canStudyInGeographies.length === 0) ? true : filters.canStudyInGeographies.some((geography) => education.geographies.includes(geography))) 
            console.log("institution",(filters.canStudyAtInstitution.length === 0) ? true : filters.canStudyAtInstitution.includes(education.institutions)) 
            console.log("internationally",filters.canWorkInternationally ? (education.jobData.nationalJobs > 0.8 ? false : true) : true)
            console.log("flexibility",(filters.hasFlexibleJobSchedule === true) ? (education.jobData.workSchedule.flexibleHoursPercent > 0.5 ? true : false) : true)
            console.log("duration",this.educationDurationFilterPassed(education, filters.educationDuration))
            console.log("working hours",this.workingHoursFilterPassed(education, filters.wantedWorkingHours))
            */
            if (this.filtersPassed(education, filters)) {
                this.ranking.upperhalf.push(education)
                console.log("education",education.jobData.salaries)
                console.log("upperquartile",education.jobData.salaries.newGraduate.upperQuartile)
                console.log("filterMaximum",filters.wantedSalary.newGraduate.maximum)
            }
            else {
                this.ranking.lowerhalf.push(education)
            }
        })
    }

    normSorting(ranking: RankedEducationsType, optimalEducation: Education, userInputs:UserInputs): IntermediateRankingType {
        const normValue = 2;
        const optimalEducationVector: EducationVector = this.educationVector(optimalEducation, userInputs);
        const educationVectors: {upperhalf: EducationVector[], lowerhalf: EducationVector[]} = this.addEducationVectors(ranking, userInputs);
        //educationVectors.upperhalf.forEach((education) => console.log("coordinates", education.coordinates))
        //console.log("optimalEducationCoordinates", optimalEducationVector.coordinates)
        const sortedEducations: IntermediateRankingType = {upperhalf: [], lowerhalf: []};
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
        //console.log("education", education.coordinates)
        education.coordinates.forEach((coordinate, index) => {
            sum += Math.pow(coordinate.value - optimalEducation.coordinates[index].value, normValue)
        })
        return Math.pow(sum, 1 / normValue)
    }

    addEducationVectors(ranking: RankedEducationsType, userInputs: UserInputs): { upperhalf: EducationVector[], lowerhalf: EducationVector[] } {
        const educationVecotors: { upperhalf: EducationVector[], lowerhalf: EducationVector[] } = { upperhalf: [], lowerhalf: [] };
        ranking.upperhalf.forEach((education) => educationVecotors.upperhalf.push(this.educationVector(education, userInputs)))
        ranking.lowerhalf.forEach((education) => educationVecotors.lowerhalf.push(this.educationVector(education, userInputs)))
        return educationVecotors
    }

    educationVector(education: Education, userInputs:UserInputs): EducationVector {
        const weightedEducationVector: EducationVector = { education: education, coordinates: [] }; //the coordinates are calculated by multiplying the values of relevant education properties with the weight of the corresponding property
        const coordinates = weightedEducationVector.coordinates
        const weights:QuizAnswers = userInputs.quizAnswers
        const filterSubjects:string[] = userInputs.filters.hasSubjects
        const subjectWeightAmplifier = 10
        //add subjects
        if (filterSubjects.length > 0){
            //console.log("hi")
            //console.log(education.title)
            //console.log(education.subjects)
            filterSubjects.forEach((filterSubject) => {
                try{
                    const subject = education.subjects.find((subject) => {return subject.title === filterSubject})
                    coordinates.push({name: subject.title, value: subject.score * weights.subjectsPriority * subjectWeightAmplifier})
                } catch{
                    new Error("subject not found")
                }
            })
        } else {
            education.subjects.forEach((subject) => {
                coordinates.push({ name: subject.title, value: subject.score * weights.subjectsPriority })
            })
        }
       // console.log("coordinates", coordinates)
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
    
       return   ((filters.wantedDegreeTypes.length === 0) ? true : filters.wantedDegreeTypes.includes(education.degreeType))
                && ((filters.canStudyInGeographies.length === 0) ? true : filters.canStudyInGeographies.some((geography) => education.geographies.includes(geography)))
                && ((filters.canStudyAtInstitution.length === 0) ? true : filters.canStudyAtInstitution.includes(education.institutions)) 
                && ((filters.hasFormsOfEducation.length == 0)? true: (filters.hasFormsOfEducation.some((teachingMethod) => education.degreeStructure.teachingMethods.includes(teachingMethod)))) 
                && (filters.canWorkInternationally ? (education.jobData.nationalJobs > 0.8 ? false : true) : true)
                && ((filters.hasFlexibleJobSchedule === true) ? (education.jobData.workSchedule.flexibleHoursPercent > 0.5 ? true : false) : true)
                && this.educationDurationFilterPassed(education, filters.educationDuration)
                && this.workingHoursFilterPassed(education, filters.wantedWorkingHours)
                && this.salaryFilterPassed(education, filters.wantedSalary)
                && this.unemploymentFilterPassed(education, filters.unemployment)
    }
    educationDurationFilterPassed(education: Education, educationDurationFilter: MinimumMaximum): boolean {
        const educationDuration: MinimumMaximum = DegreeTypeToDuration(education.degreeType,true)
        return educationDuration.minimum >= educationDurationFilter.minimum && educationDuration.maximum <= educationDurationFilter.maximum
    }
    workingHoursFilterPassed(education: Education, workingHoursFilter: MinimumMaximum): boolean {
        return education.jobData.workSchedule.workingHours >= workingHoursFilter.minimum && education.jobData.workSchedule.fixedHoursPercent <= workingHoursFilter.maximum
    }
    salaryFilterPassed(education: Education, salaryFilter: SalaryFilters): boolean {
        return education.jobData.salaries.newGraduate.lowerQuartile >= salaryFilter.newGraduate.minimum && education.jobData.salaries.newGraduate.upperQuartile <= salaryFilter.newGraduate.maximum
                && education.jobData.salaries.experienced.lowerQuartile >= salaryFilter.experienced.minimum && education.jobData.salaries.experienced.upperQuartile <= salaryFilter.experienced.maximum
    }
    unemploymentFilterPassed(education: Education, unemploymentFilter: UnemploymentFilters): boolean {
        return education.jobData.unemployment.newGraduate <= unemploymentFilter.newGraduate.maximum && education.jobData.unemployment.newGraduate >= unemploymentFilter.newGraduate.minimum
            && education.jobData.unemployment.experienced <= unemploymentFilter.experienced.maximum && education.jobData.unemployment.experienced >= unemploymentFilter.experienced.minimum
    }
}