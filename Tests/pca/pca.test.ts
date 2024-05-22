import {describe, it, expect} from 'vitest';
import {QuizAnswers, TableFilters, UserInputs, EducationData, EducationVector, PCAData, Education } from '../../src/types';
import {getEducationData} from '../../Backend/server/on-server-start';
import {constructEducationVectors, constructMatrix, pcaData} from '../../Backend/utilities/pca';
import { PCA } from 'ml-pca';

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
  geographies: [] ,
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

const defaultFilters:TableFilters = {
  wantedDegreeTypes: [],
  canStudyInGeographies: [],
  canStudyAtInstitution: [],
  hasSubjects: [],
  hasFormsOfEducation: [],
  educationDuration: { minimum: 0, maximum: 1 },
  wantedSalary: {
    newGraduate: { minimum: 0, maximum: 1 },
    experienced: { minimum: 0, maximum: 1 }
  },
  unemployment: {
    newGraduate: { minimum: 0, maximum: 1 },
    experienced: { minimum: 0, maximum: 1 }
  },
  hasFlexibleJobSchedule: false,
  wantedWorkingHours: {
    minimum: 0,
    maximum: 0
  },
  canWorkInternationally: false
}

const defaultUserInputs:UserInputs = {quizAnswers: defaultWeights, filters: defaultFilters}

const defaultSubjectsCount = 22
const numberOfVariables = 24
const educationData:EducationData = getEducationData()

describe('constructEducationVectors()', () => {
  it ('should return an array of educationVectors', () => {

    // Act
    const defaultEducationVectors = constructEducationVectors(defaultUserInputs)
  
    // Assert
    expect(defaultEducationVectors.length).toBe(educationData.normalized.length)
    defaultEducationVectors.forEach((educationVector) => {
      expect(educationVector.coordinates.length).toBe(defaultSubjectsCount + numberOfVariables)
    })

    // Arrange
    const modifiedUserInputs = {...defaultUserInputs}
    modifiedUserInputs.filters.hasSubjects = ["matematik"]

    // Act
    const actualEducationVecotors = constructEducationVectors(modifiedUserInputs)

    // Assert
    expect(actualEducationVecotors.length).toBe(educationData.normalized.length)
    actualEducationVecotors.forEach((educationVector) => {
      expect(educationVector.coordinates.length).toBe(1 + numberOfVariables)
    })
  })
})

describe('constructMatrix()', () => {
  it ('should return a matrix of education data', () => {
    // Arrange
    const defaultEducationVectors:EducationVector[] = constructEducationVectors(defaultUserInputs)

    // Act
    const actualMatrix:number[][] = constructMatrix(defaultEducationVectors)

    // Assert
    expect(actualMatrix.length).toBe(educationData.normalized.length)
    actualMatrix.forEach((row) => {
      expect(row.length).toBe(defaultSubjectsCount + numberOfVariables)
    })

    // Arrange
    const modifiedUserInputs = {...defaultUserInputs}
    modifiedUserInputs.filters.hasSubjects = ["musik","jura"]
    const modifiedEducationVectors:EducationVector[] = constructEducationVectors(modifiedUserInputs)

    // Act
    const actualMatrix2:number[][] = constructMatrix(modifiedEducationVectors)

    // Assert
    expect(actualMatrix2.length).toBe(educationData.normalized.length)
    actualMatrix2.forEach((row) => {
      expect(row.length).toBe(2 + numberOfVariables)
    })
  })
})

describe('pcaData()', () => {
  it ('should return a PCAData object', () => {
    // Arrange
    const educationVectors:EducationVector[] = [{education: defaultMock, coordinates: [{name: "test", value: 1},{name: "test2", value: 2}]},
                                                {education: mockEducation1, coordinates: [{name: "test", value: 3},{name: "test2", value: 4}]},]
    const transformedData = [[1,2],[3,4]]
    const pca = new PCA([[1,2],[3,4],[5,6],[7,8],[9,10]])
    
    // Act
    const actualPCAData:PCAData = pcaData(educationVectors, transformedData, pca)

    // Assert
    expect(actualPCAData.points.length).toBe(educationVectors.length)
    actualPCAData.points.forEach((point,index) => {
      expect(point.x).toBe(transformedData[index][0])
      expect(point.y).toBe(transformedData[index][1])
      expect(point.education).toBe(educationVectors[index].education)
    })
  })
})
