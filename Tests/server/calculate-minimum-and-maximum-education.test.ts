import { describe, it, expect, test } from 'vitest';

import { getMinimumEducation, getMaximumEducation, calculateMinimumAndMaximumEducation } from '../../Backend/server/on-server-start';
import { Education, MinimumMaximum } from '../../src/types';
import { County, DegreeType, Geography, Institution, SubjectTitle } from '../../src/enums';

const education1: Education = 
{ 
    title: "education1",  
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rank: -1,
    degreeType: DegreeType['Kunstnerisk uddannelse'],
    counties: [County.Randers, County.Guldborgsund],
    geographies: [Geography.Midtjylland],
    institutions: [Institution['Aalborg Universitet']],
    subjects: [
        {
            title: SubjectTitle.Dansk,
            score: 10
        },
        {
            title: SubjectTitle.Biologi,
            score: -4
        }
    ],
    industries: [
        {
            title: "Musik Industrien :)",
            share: 2
        }
    ],
    hours: {
        withManyStudents: 121,
        withFewStudents: -3,
        withSupervision: 3,
    },
    socialFeedback: {
        socialEnvironment: 20,
        groupEngagement: 1,
        loneliness: 10,
        stress: -100,
    },
    academicFeedback:{
        academicEnvironment: 3,
        teacherEvaluation: 2,
        satisfaction: 1,
    },
    academicWorkload:{
        lectures: 0,
        literature: 10,
        studentJob: 9,
    },
    degreeStructure:{
        contents:{
            teaching: 2,
            exams: 0,
            internship: 3,
            internationalStay: 100
        },
        teachingMethods: ["Selv studie"]
    },
    dropoutRate: 10,
    jobData: {
        salaries: {
            newGraduate:{
                lowerQuartile: 0,
                median:10,
                upperQuartile:6,
                projectedDirection: "up" 
            },
            experienced:{
                lowerQuartile:-10,
                median:9,
                upperQuartile:5,
                projectedDirection: "down"
            }
        },
        workSchedule:{
            fixedHoursPercent:10,
            workingHours:10,
            flexibleHoursPercent:10,
            selfSchedulePercent:10,
            variableSchedulePercent:10,
            nightAndEveningShiftsPercent: 9
        },
        degreeRelevance:10,
        unemployment:{
            newGraduate:10,
            projectedNewGraduate:10,
            experienced:9,
            projectedExperienced:100
        },
        nationalJobs:10,
        degreePreparesForJob:0,
    }
}

const education2: Education = 
{ 
    title: "education2",  
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rank: -1,
    degreeType: DegreeType['Kunstnerisk uddannelse'],
    counties: [County.Randers, County.Guldborgsund],
    geographies: [Geography.Midtjylland],
    institutions: [Institution['Aalborg Universitet']],
    subjects: [
        {
            title: SubjectTitle.Dansk,
            score: 30
        },
        {
            title: SubjectTitle.Biologi,
            score: 2
        }
    ],
    industries: [
        {
            title: "Musik Industrien :)",
            share: 1
        }
    ],
    hours: {
        withManyStudents: 10,
        withFewStudents: 12,
        withSupervision: 0,
    },
    socialFeedback: {
        socialEnvironment: 0,
        groupEngagement: 10,
        loneliness: 5,
        stress: -105,
    },
    academicFeedback:{
        academicEnvironment: 30,
        teacherEvaluation: 1,
        satisfaction: 5,
    },
    academicWorkload:{
        lectures: -2,
        literature: 4,
        studentJob: 30,
    },
    degreeStructure:{
        contents:{
            teaching: 20,
            exams: -3,
            internship: 6,
            internationalStay: 50
        },
        teachingMethods: ["Selv studie"]
    },
    dropoutRate: 30,
    jobData: {
        salaries: {
            newGraduate:{
                lowerQuartile: -1,
                median:11,
                upperQuartile:0,
                projectedDirection: "up" 
            },
            experienced:{
                lowerQuartile:0,
                median:11,
                upperQuartile:50,
                projectedDirection: "down"
            }
        },
        workSchedule:{
            fixedHoursPercent:11,
            workingHours:1,
            flexibleHoursPercent:11,
            selfSchedulePercent:1,
            variableSchedulePercent:11,
            nightAndEveningShiftsPercent: 69
        },
        degreeRelevance:12,
        unemployment:{
            newGraduate:2,
            projectedNewGraduate:9,
            experienced:9,
            projectedExperienced:100
        },
        nationalJobs:102,
        degreePreparesForJob:0
    }
}

const minimumEducation: Education = 
{ 
    title: "minimum education",  
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rank: -1,
    degreeType: DegreeType['Kunstnerisk uddannelse'],
    counties: [County.Randers, County.Guldborgsund],
    geographies: [Geography.Midtjylland],
    institutions: [Institution['Aalborg Universitet']],
    subjects: [
        {
            title: SubjectTitle.Dansk,
            score: 10
        },
        {
            title: SubjectTitle.Biologi,
            score: -4
        }
    ],
    industries: [
        {
            title: "Musik Industrien :)",
            share: 1
        }
    ],
    hours: {
        withManyStudents: 10,
        withFewStudents: -3,
        withSupervision: 0,
    },
    socialFeedback: {
        socialEnvironment: 0,
        groupEngagement: 1,
        loneliness: 5,
        stress: -105,
    },
    academicFeedback:{
        academicEnvironment: 3,
        teacherEvaluation: 1,
        satisfaction: 1,
    },
    academicWorkload:{
        lectures: -2,
        literature: 4,
        studentJob: 9,
    },
    degreeStructure:{
        contents:{
            teaching: 2,
            exams: -3,
            internship: 3,
            internationalStay: 50
        },
        teachingMethods: ["Selv studie"]
    },
    dropoutRate: 10,
    jobData: {
        salaries: {
            newGraduate:{
                lowerQuartile: -1,
                median:10,
                upperQuartile:0,
                projectedDirection: "up" 
            },
            experienced:{
                lowerQuartile:-10,
                median:9,
                upperQuartile:5,
                projectedDirection: "down"
            }
        },
        workSchedule:{
            fixedHoursPercent:10,
            workingHours:1,
            flexibleHoursPercent:10,
            selfSchedulePercent:1,
            variableSchedulePercent:10,
            nightAndEveningShiftsPercent: 9
        },
        degreeRelevance:10,
        unemployment:{
            newGraduate:2,
            projectedNewGraduate:9,
            experienced:9,
            projectedExperienced:100
        },
        nationalJobs:10,
        degreePreparesForJob:0
    }
}

const maximumEducation: Education = 
{ 
    title: "maximum education",  
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rank: -1,
    degreeType: DegreeType['Kunstnerisk uddannelse'],
    counties: [County.Randers, County.Guldborgsund],
    geographies: [Geography.Midtjylland],
    institutions: [Institution['Aalborg Universitet']],
    subjects: [
        {
            title: SubjectTitle.Dansk,
            score: 30
        },
        {
            title: SubjectTitle.Biologi,
            score: 2
        }
    ],
    industries: [
        {
            title: "Musik Industrien :)",
            share: 2
        }
    ],
    hours: {
        withManyStudents: 121,
        withFewStudents: 12,
        withSupervision: 3,
    },
    socialFeedback: {
        socialEnvironment: 20,
        groupEngagement: 10,
        loneliness: 10,
        stress: -100,
    },
    academicFeedback:{
        academicEnvironment: 30,
        teacherEvaluation: 2,
        satisfaction: 5,
    },
    academicWorkload:{
        lectures: 0,
        literature: 10,
        studentJob: 30,
    },
    degreeStructure:{
        contents:{
            teaching: 20,
            exams: 0,
            internship: 6,
            internationalStay: 100
        },
        teachingMethods: ["Selv studie"]
    },
    dropoutRate: 30,
    jobData: {
        salaries: {
            newGraduate:{
                lowerQuartile: 0,
                median:11,
                upperQuartile:6,
                projectedDirection: "up" 
            },
            experienced:{
                lowerQuartile:0,
                median:11,
                upperQuartile:50,
                projectedDirection: "down"
            }
        },
        workSchedule:{
            fixedHoursPercent:11,
            workingHours:10,
            flexibleHoursPercent:11,
            selfSchedulePercent:10,
            variableSchedulePercent:11,
            nightAndEveningShiftsPercent: 69
        },
        degreeRelevance:12,
        unemployment:{
            newGraduate:10,
            projectedNewGraduate:10,
            experienced:9,
            projectedExperienced:100
        },
        nationalJobs:102,
        degreePreparesForJob:0
    }
}

test("Calculate Minimum And Maximum Education", () => {
    const educations: Education[] = [education1, education2];
    calculateMinimumAndMaximumEducation(educations); 

    expect(getMinimumEducation()).toStrictEqual(minimumEducation);
    expect(getMaximumEducation()).toStrictEqual(maximumEducation);
})

