import { expect, describe, it } from 'vitest'
import { Ranker} from '../../Backend/utilities/ranking';
import { DegreeType, County, Institution,Geography } from '../../src/enums'
import { Education, TableFilters, QuizAnswers, UserInputs, IntermediateRankingType, FinalRankingType, EducationVector} from '../../src/types'


const defaultMock: Education = {
    url: "", // irrelevant 
    rank: null, // irrelevant 
    title: "", // irrelevant 
    degreeType: "" as DegreeType, // irrelevant 
    counties: [] as County[], // irrelevant 
    geographies: [] ,
    institution: "" as Institution, // irrelevant
    subjects: [],
    industries: [], // irrelevant
    hours: {
      withManyStudents:0,
      withFewStudents: 0,
      withSupervision: 0
    },
    socialFeedback: {
      socialEnvironment: 0,
      groupEngagement:0,
      loneliness: 0,
      stress: 0
    },
    academicFeedback: {
      academicEnvironment: 0,
      teacherEvaluation: 0,
      satisfaction: 0
    }, //irrelevant
    academicWorkload: {
      lectures: 0,
      literature: 0,
      studentJob: 0
    },
    degreeStructure: {
      contents: {
        teaching: 0, //irrelevant
        exams: 0,
        internship: 0,
        internationalStay: 0
      },
      teachingMethods: ["Klasseundervisning (holdundervisning)","jo"] //irrelevant
    },
    dropoutRate: 0, //irrelevant
    jobData: {
      salaries: {
        newGraduate: {
          lowerQuartile: 0, //irrelevant
          median: 0,
          upperQuartile: 0, //irrelevant
          projectedDirection: ""
        }, //irrelevant
        experienced: {
          lowerQuartile: 0, //irrelevant
          median:0,
          upperQuartile: 0, //irrelevant
          projectedDirection: ""
        }
      }, //irrelevant
      workSchedule: {
        workingHours: 0, //irrelevant
        fixedHoursPercent:0,
        flexibleHoursPercent:0,
        selfSchedulePercent: 0,
        variableSchedulePercent: 0,
        nightAndEveningShiftsPercent: 0,
      },
      unemployment: {
        newGraduate: 0,
        experienced: 0,
        projectedNewGraduate: 0, //irelevant
        projectedExperienced: 0
      }, //irelevant
      degreeRelevance: 0,
      degreePreparesForJob: 0, // irelevant
      nationalJobs: 0 } //irelevant 
  };

const mockEducation1: Education = {
    url: "", // irrelevant 
    rank: null, // irrelevant 
    title: "", // irrelevant 
    degreeType: "" as DegreeType, // irrelevant 
    counties: [] as County[], // irrelevant 
    geographies: [Geography.Midtjylland] ,
    institution: "" as Institution, // irrelevant
    subjects: [],
    industries: [], // irrelevant
    hours: {
      withManyStudents:0.5,
      withFewStudents: 0.3,
      withSupervision: 0.1
    },
    socialFeedback: {
      socialEnvironment: 0.8,
      groupEngagement:0.9,
      loneliness: 0.3,
      stress: 0.3
    },
    academicFeedback: {
      academicEnvironment: 0.2,
      teacherEvaluation: 0.5,
      satisfaction: 0.6 //irrelevant
    }, //irrelevant
    academicWorkload: {
      lectures: 0.1,
      literature: 0.1,
      studentJob: 0.9
    },
    degreeStructure: {
      contents: {
        teaching: 0, //irrelevant
        exams: 0.2,
        internship: 0.4,
        internationalStay: 0.4
      },
      teachingMethods: ["Klasseundervisning (holdundervisning)"] //irrelevant
    },
    dropoutRate: 0, //irrelevant
    jobData: {
      salaries: {
        newGraduate: {
          lowerQuartile: 0, //irrelevant
          median: 0.6,
          upperQuartile: 0, //irrelevant
          projectedDirection: ""
        }, //irrelevant
        experienced: {
          lowerQuartile: 0, //irrelevant
          median:0.8,
          upperQuartile: 0, //irrelevant
          projectedDirection: ""
        }
      }, //irrelevant
      workSchedule: {
        workingHours: 0, //irrelevant
        fixedHoursPercent:0.9,
        flexibleHoursPercent:0.1,
        selfSchedulePercent: 0.2,
        variableSchedulePercent: 0.4,
        nightAndEveningShiftsPercent: 0.2,
      },
      unemployment: {
        newGraduate: 0.5,
        experienced: 0.1,
        projectedNewGraduate: 0, //irelevant
        projectedExperienced: 0
      }, //irelevant
      degreeRelevance: 0.1,
      degreePreparesForJob: 0, // irelevant
      nationalJobs: 0 } //irelevant 
  };

const defaultFilters:TableFilters = {
    wantedDegreeTypes: [],
    canStudyInGeographies: [], 
    canStudyAtInstitution: [],
    hasSubjects: [],
    hasFormsOfEducation: [],
    educationDuration: {minimum: 0, maximum: 1},
    wantedSalary: { newGraduate: {minimum: 0, maximum: 1},
                    experienced: {minimum: 0, maximum: 1}},
    unemployment: { newGraduate: {minimum: 0, maximum: 1},
                    experienced: {minimum: 0, maximum: 1}},
    hasFlexibleJobSchedule: false, 
    wantedWorkingHours: {minimum: 0, maximum: 1},
    canWorkInternationally: false,
}

const defaultWeights: QuizAnswers = {
  subjectsPriority: 3,
  highWorkloadAcceptancePriority: 3,
  socialEnvironmentPriority: 3,
  industriesPriority: 3,
  stressPriority: 3,
  groupEngagementPriority: 3,
  lonelinessPriority: 3,
  academicEnvironmentPriority: 3,
  teachingPriority: 3,
  studentJobPriority: 3,
  lecturesPriority: 3,
  literaturePriority: 3,
  dislikeExamPriority: 3,
  internshipPriority: 3,
  internationalStayPriority: 3,
  startingSalaryPriority: 3,
  experiencedSalaryPriority: 3,
  unemploymentPriority: 3,
  degreeRelevancePriority: 3,
  fixedHoursPriority: 3,
  flexibleHoursPriority: 3,
  selfSchedulePriority: 3,
  variableSchedulePriority: 3,
  nightAndEveningShiftsPriority: 3,
  workNationallyPriority: 3
}

const defaultUserInputs:UserInputs = {quizAnswers: defaultWeights, filters: defaultFilters}
  
describe("changeToApropriateType()", () => {
    it("should convert the input ranking to a ranking of the appropriate type", () => {
        //arrange
        const ranker = new Ranker();
        let inputRanking:IntermediateRankingType = {upperhalf:[{education:defaultMock, similarity: 5},
                                                                  {education:defaultMock, similarity: 20}, 
                                                                  {education:defaultMock, similarity: 8}],
                                                      lowerhalf:[]}
        let expectedRanking: FinalRankingType = {ranking:[{education:defaultMock, score: 0.75},
                                                            {education:defaultMock, score: 0},
                                                            {education:defaultMock, score: 0.6}],
                                                   index: 3}
        
        //act
        let actualRanking = ranker.changeToApropriateType(inputRanking,[defaultMock])
        
        //assert
        expect(actualRanking).toEqual(expectedRanking)
          
        //arrange
        inputRanking = {upperhalf:[{education:defaultMock, similarity: 5},
                        {education:defaultMock, similarity: 20}], 
                        lowerhalf:[{education:defaultMock, similarity: 8}]}
        expectedRanking = {ranking:[{education:defaultMock, score: 0.75},
                                   {education:defaultMock, score: 0},
                                   {education:defaultMock, score: 0.6}],
                            index: 2}
        //act
        actualRanking = ranker.changeToApropriateType(inputRanking,[defaultMock])
        
        //assert
        expect(actualRanking).toEqual(expectedRanking)
    })
})

describe("normalizeScores()", () => {
    it("should normalize the scores of the input ranking", () => {
        //arrange
        let ranker = new Ranker();
        let ranking: { education: Education, score: number }[] = [ {education:defaultMock, score: 5},
                                                                      {education:defaultMock, score: 20}, 
                                                                      {education:defaultMock, score: 8}]
        const expectedRanking:  {education: Education, score: number }[] = [{education:defaultMock, score: 0.75},
                                                                            {education:defaultMock, score: 0},
                                                                            {education:defaultMock, score: 0.6}]
        //act 
        ranker.normalizeScores(ranking)

        //assert
        expect(ranking).toEqual(expectedRanking)

        //arrange
        ranker = new Ranker();
        ranking = []

        //act
        ranker.normalizeScores(ranking)

        //assert
        expect(ranking).toEqual([])
    })
})

describe("roughSorting()", () => {
    it("should split the educations into to categories based on user filters", () => {
        //arrange
        let ranker = new Ranker();
        //act
        ranker.roughSorting(defaultFilters, [defaultMock, mockEducation1])

        //assert 
        expect(ranker.ranking.upperhalf.length).toBe(2)
        expect(ranker.ranking.lowerhalf.length).toBe(0)

        ranker.ranking.upperhalf.forEach((education, index) => {
            expect(education).toEqual([defaultMock, mockEducation1][index])
        })

        //arrange
        const modifiedFilters = {...defaultFilters}
        modifiedFilters.canStudyInGeographies = [Geography.Midtjylland]
        modifiedFilters.canStudyAtInstitution = [Institution["Aalborg Universitet"]]
        ranker = new Ranker();
        
        //act
        ranker.roughSorting(modifiedFilters, [mockEducation1, defaultMock])

        
        //assert
        expect(ranker.ranking.upperhalf.length).toBe(0)
        expect(ranker.ranking.lowerhalf.length).toBe(2)
        ranker.ranking.lowerhalf.forEach((education, index) => {
            expect(education).toEqual([mockEducation1,defaultMock][index])
        })

        //arrange
        ranker = new Ranker();
        const mockEducation2 = {...mockEducation1}
        mockEducation2.geographies = [Geography.Sjælland]
        modifiedFilters.canStudyAtInstitution = []
        //act
        ranker.roughSorting(modifiedFilters, [mockEducation1, mockEducation2])

        //assert
        expect(ranker.ranking.upperhalf.length).toBe(1)
        expect(ranker.ranking.lowerhalf.length).toBe(1)
        expect(ranker.ranking.lowerhalf[0]).toEqual(mockEducation2)
        expect(ranker.ranking.upperhalf[0]).toEqual(mockEducation1)
        
    })
})

describe("norm()",()=>{
    it("should find the 'distance' between an education an the optimal education",()=>{
      //case 1
      //arrange
      const ranker = new Ranker();
      let mockEducationVector:EducationVector = {education:defaultMock, coordinates:[]}
      let mockOptimalVector:EducationVector = {education:mockEducation1, coordinates:[]}
      
      //act
      let actualDistance = ranker.norm(mockEducationVector, mockOptimalVector,2)

      //assert
      expect(actualDistance).toBe(0.0)

      //case 2
      //arrange
      mockEducationVector = {education:mockEducation1, coordinates:[{name:"", value:4},
                                                                      {name:"", value:5}]}
      mockOptimalVector = {education:defaultMock, coordinates:[{name:"", value:1},
                                                                {name:"", value:1}]}
      //act
      actualDistance = ranker.norm(mockEducationVector, mockOptimalVector,2)

      //assert
      expect(actualDistance).toBe(5.0)

      //case 3
      //arraange
      mockEducationVector = {education:mockEducation1, coordinates:[{name:"", value:3},
                                                                      {name:"", value:1}]}
      mockOptimalVector = {education:defaultMock, coordinates:[{name:"", value:1},{name:"", value:0}]}
      //act
      actualDistance = ranker.norm(mockEducationVector, mockOptimalVector,1)

      //assert
      expect(actualDistance).toBe(3.0)
    })
})

describe("filtersPassed()",()=>{
    it("should return true if the education complies with the filters",()=>{
      //arrange
      const ranker = new Ranker();
      
      //act
      let returnValue = ranker.filtersPassed(defaultMock,defaultFilters)

      //assert
      expect(returnValue).toBe(true)

      //arrange
      const modifiedFilters = {...defaultFilters}
      modifiedFilters.canStudyInGeographies = [Geography.Midtjylland]
      modifiedFilters.canStudyAtInstitution = [Institution["Aalborg Universitet"]]

      //act
      returnValue = ranker.filtersPassed(defaultMock,modifiedFilters)

      //assert
      expect(returnValue).toBe(false)
    })
})

describe("educationVector()", () => {
  it("should convert the education to a vector", () => {

      // arrange
      const precision = 0.01;
      const ranker = new Ranker();
      const educationVector = ranker.educationVector;
      const expectedEducationVector = {
        education: mockEducation1,
        coordinates: [
            { name: 'hoursWithFewStudent', value: 0.9 },
            { name: 'hoursWithManyStedents', value: 1.5 },
            { name: 'hoursWithSupervision', value: 0.3 },
            { name: 'socialEnvironment', value: 2.4 },
            { name: 'groupEngaement', value: 2.7 },
            { name: 'loneliness', value: 2.1 },
            { name: 'stress', value: 2.1 },
            { name: 'acedemicEnvironment', value: 0.6 },
            { name: 'teacherEvaluation', value: 1.5 },
            { name: 'studentJob', value: 2.7 },
            { name: 'lectures', value: 0.3 },
            { name: 'literature', value: 0.3 },
            { name: 'exams', value: 0.6 },
            { name: 'internship', value: 1.2 },
            { name: 'internationalStay', value: 1.2 },
            { name: 'salaryNewGraduate', value: 1.8 },
            { name: 'salaryExperienced', value: 2.4 },
            { name: 'unemploymentExperienced', value: 2.7 },
            { name: 'unemploymentNewGraduate', value: 1.5 },
            { name: 'degreeRelevance', value: 0.3 },
            { name: 'fixedHoursPercernt', value: 2.7 },
            { name: 'flexibleHoursPercent', value: 0.3 },
            { name: 'selfSchedulePercent', value: 0.6 },
            { name: 'variableSchedulePercent', value: 1.2 },
            { name: 'nightAndEveningShiftsPercent', value: 0.6 },
      ]};

      // act
      const actualEducationVector = educationVector(mockEducation1, defaultUserInputs);
      
      // assert
      expect(actualEducationVector.education).toEqual(expectedEducationVector.education);
      expect(actualEducationVector.coordinates.length).toBe(expectedEducationVector.coordinates.length);
      for (let i = 0; i < actualEducationVector.coordinates.length; i++) {
        console.log(actualEducationVector.coordinates[i].name, expectedEducationVector.coordinates[i].name)
        expect(actualEducationVector.coordinates[i].name).toBe(expectedEducationVector.coordinates[i].name);
        console.log(actualEducationVector.coordinates[i].value, expectedEducationVector.coordinates[i].value)
        expect(actualEducationVector.coordinates[i].value).toBeCloseTo(expectedEducationVector.coordinates[i].value, precision);
      }
  })
})
