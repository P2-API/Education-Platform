import React, { useMemo, useRef } from "react";
import { Institution } from "../../../src/enums"
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowVirtualizer,
  MRT_Row,
  MRT_ColumnVirtualizer,
} from "material-react-table";
import { Education, FinalRankingType, QuizAnswers, RankedDataStructure, TableFilters } from "../../../src/types";
import { useServer } from "../../../Backend/server/useServer";
import { useEffect, useState, useContext } from "react";
import { filtersContext, QuizInfoContext } from "../Tabs";

type RankedMaterialReactDataTableProps = {
  rankedData: FinalRankingType;
}





const RankedMaterialReactDataTable: React.FC<RankedMaterialReactDataTableProps> = ({ rankedData }) => {
  
  const { getSmallTextAboutEducation, getPersonalizedMessage } = useServer();
  const filterInfo = useContext(filtersContext);
  const quizInfo = useContext(QuizInfoContext);
  const filters = filterInfo.filters
  const quizAnswers = quizInfo.quizData;


  const data: RankedDataStructure[] = rankedData.ranking;

  const columns: MRT_ColumnDef<RankedDataStructure>[] = useMemo(
    () => [
      {
        accessorKey: "education.rank",
        header: "Rang", // Change to your language's translation for "Rang"
        size: 75,
        sortingFn: (rowA, rowB) => {
          const rankB = rowB.original.education?.rank || 0;
          const rankA = rowA.original.education?.rank || 0;
          return rankA - rankB;
        },
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const rank = row.original.education.rank;
          if (rank == null || rank == undefined || rank == 0) {
            return (
              <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}><b>{row.index + 1}</b></p>
            );
          }

          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{row.original.education.rank}</p>
          );
        }
      },
      {
        accessorKey: "score",
        header: "Score",
        size: 75,
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const score = row.original.score * 100;
          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{score.toFixed(2)}%</p>
          );
        }
      },
      {
        accessorKey: "education.title",
        header: "Uddannelse",
        minSize: 130,
        size: 150,
        maxSize: 200,
      },
      {
        accessorKey: "education.degreeType",
        header: "Type",
        size: 160,
      },
      {
        accessorKey: "education.institutions",
        header: "Uddannelsessted",
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const institutionName = Institution[row.original.education.institutions];
          // (row.original.institutions)
          return (
            <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{institutionName}</p>
          );
        },
      },
      {
        accessorKey: "education.geographies",
        header: "Geografi",
        size: 120,
        sortingFn: (rowA, rowB) => {
          return rowA.original.education.geographies.length - rowB.original.education.geographies.length;
        },
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const geography = row.original.education.geographies;
          return (
            <ul style={{ padding: 0, width: "250px", justifyContent: "center", alignItems: "center" }}>
              {geography.map((geo: string) => (
                <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }} key={geo}>{geo}</p>
              ))}
            </ul>
          );
        }
      },

      {
        accessorKey: "education.subjects",
        header: "Fag",
        size: 130,
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const subjects: string[] = row.original.education.subjects.map((subject) => subject.title)
          // ("subjects", subjects)
          return (
            <ul style={{ padding: 0, width: "250px", justifyContent: "center", height: "60px" }}>
              {subjects.map((subject: string, index: number) => (
                <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }} key={subject}>{index + 1}.{subject}</p>
              ))}
            </ul>
          );
        }
      },
      {
        accessorKey: "education.industries",
        header: "Brancher",
        size: 370,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = 0;
          let rowBMedian = 0;
          rowA.original.education.industries.forEach(rowAIndustry => {
            rowAMedian += rowAIndustry.share;
          })
          rowB.original.education.industries.forEach(rowBIndustry => {
            rowBMedian += rowBIndustry.share;
          })
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const industries: string[] = row.original.education.industries.map((industry) => industry.title)
          // ("subjects", industries)
          return (
            <ul style={{ padding: 0, width: "250px", justifyContent: "center", height: "60px", }}>
              {industries.map((industry: string) => (
                <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }} key={industry}>{industry}</p>
              ))}
            </ul>
          );
        }
      },
      {
        accessorKey: "education.hours",
        header: "Undervisningsfordeling",
        size: 180,
        sortingFn: (rowA, rowB) => {
          let KlasseUndervisningA = rowA.original.education.hours.withFewStudents;
          let KlasseUndervisningB = rowB.original.education.hours.withFewStudents;
          let totalHoursA = KlasseUndervisningA + rowA.original.education.hours.withManyStudents + rowA.original.education.hours.withSupervision;
          let totalHoursB = KlasseUndervisningB + rowB.original.education.hours.withManyStudents + rowB.original.education.hours.withSupervision;
          let rowAMedian = KlasseUndervisningA / totalHoursA;
          let rowBMedian = KlasseUndervisningB / totalHoursB;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const hoursTitles: string[] = ["Forelæsninger", "Klasse/Gruppearbejde", "Med vejledning"];
          const hoursNumbers: number[] = Object.values(row.original.education.hours);
          const totalHours = hoursNumbers.reduce((acc, curr) => acc + curr, 0);
          hoursNumbers.forEach((hours, index) => {
            hoursNumbers[index] = Math.round((hours / totalHours) * 100);
          })

          // ("hoursNumbers", hoursNumbers)
          // ("hoursTitles", hoursTitles)
          return (
            <ul style={{ padding: 0, width: "250px", justifyContent: "center", height: "60px", }}>
              {hoursTitles.map((title: string, index: number) => (
                <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }} key={title}>{title}: {hoursNumbers[index]}%</p>
              ))}
            </ul>
          );
        }
      },
      {
        accessorKey: "education.socialFeedback",
        header: "Socialt miljø 1 til 5",
        size: 160,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.education.socialFeedback.socialEnvironment + rowA.original.education.socialFeedback.groupEngagement + rowA.original.education.socialFeedback.loneliness + rowA.original.education.socialFeedback.stress;
          let rowBMedian = rowB.original.education.socialFeedback.socialEnvironment + rowB.original.education.socialFeedback.groupEngagement + rowB.original.education.socialFeedback.loneliness + rowB.original.education.socialFeedback.stress;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const socialEnvironment = row.original.education.socialFeedback.socialEnvironment;
          const groupEngagement = row.original.education.socialFeedback.groupEngagement;
          const loneliness = row.original.education.socialFeedback.loneliness;
          const stress = row.original.education.socialFeedback.stress;

          // ("hoursNumbers", hoursNumbers)
          // ("hoursTitles", hoursTitles)
          return (
            <ul style={{ padding: 0, width: "250px", justifyContent: "center", height: "80px", }}>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Socialt Miljø: {socialEnvironment} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Gruppeengagement: {groupEngagement} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Ensomhed: {loneliness} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Stress: {stress} </p>
            </ul>
          );
        }
      },
      {
        accessorKey: "education.academicFeedback",
        header: "Fagligt miljø 1 til 5",
        size: 200,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.education.academicFeedback.academicEnvironment + rowA.original.education.academicFeedback.teacherEvaluation + rowA.original.education.academicFeedback.satisfaction;
          let rowBMedian = rowB.original.education.academicFeedback.academicEnvironment + rowB.original.education.academicFeedback.teacherEvaluation + rowB.original.education.academicFeedback.satisfaction;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const academicEnvironment = row.original.education.academicFeedback.academicEnvironment;
          const teacherEvaluation = row.original.education.academicFeedback.teacherEvaluation;
          const satisfaction = row.original.education.academicFeedback.satisfaction;
          // ("hoursNumbers", hoursNumbers)
          // ("hoursTitles", hoursTitles)
          return (
            <ul style={{ padding: 0, width: "250px", justifyContent: "center", height: "60px", }}>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Fagligt Miljø: {academicEnvironment.toFixed(2)} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Lærerevaluering: {teacherEvaluation.toFixed(2)} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Tilfredshed: {satisfaction.toFixed(2)} </p>
            </ul>
          );
        }
      },
      {
        accessorKey: "education.academicWorkload",
        header: "Arbejdsbyrde",
        size: 160,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.education.academicWorkload.lectures
          let rowBMedian = rowB.original.education.academicWorkload.lectures
          let totalHoursA = rowA.original.education.academicWorkload.lectures + rowA.original.education.academicWorkload.literature + rowA.original.education.academicWorkload.studentJob;
          let totalHoursB = rowB.original.education.academicWorkload.lectures + rowB.original.education.academicWorkload.literature + rowB.original.education.academicWorkload.studentJob;
          rowAMedian = rowAMedian / totalHoursA;
          rowBMedian = rowBMedian / totalHoursB;

          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const lectures = row.original.education.academicWorkload.lectures;
          const literature = row.original.education.academicWorkload.literature;
          const studentJob = row.original.education.academicWorkload.studentJob;
          const total = lectures + literature + studentJob;
          const lecturesPercent = Math.round((lectures / total) * 100);
          const literaturePercent = Math.round((literature / total) * 100);
          const studentJobPercent = Math.round((studentJob / total) * 100);

          return (
            <ul style={{ padding: 0, width: "250px", justifyContent: "center", height: "60px", }}>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Forelæsninger: {lecturesPercent}%</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Litteratur: {literaturePercent}%</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Studiejob: {studentJobPercent}%</p>
            </ul>
          );
        }
      },
      {
        accessorKey: "education.degreeStructure.contents",
        header: "Uddannelsesstruktur",
        size: 180,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.education.degreeStructure.contents.teaching
          let rowBMedian = rowB.original.education.degreeStructure.contents.teaching
          let totalHoursA = rowA.original.education.degreeStructure.contents.teaching + rowA.original.education.degreeStructure.contents.exams + rowA.original.education.degreeStructure.contents.internship + rowA.original.education.degreeStructure.contents.internationalStay;
          let totalHoursB = rowB.original.education.degreeStructure.contents.teaching + rowB.original.education.degreeStructure.contents.exams + rowB.original.education.degreeStructure.contents.internship + rowB.original.education.degreeStructure.contents.internationalStay;
          rowAMedian = rowAMedian / totalHoursA;
          rowBMedian = rowBMedian / totalHoursB;

          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const teaching = row.original.education.degreeStructure.contents.teaching;
          const exams = row.original.education.degreeStructure.contents.exams;
          const internship = row.original.education.degreeStructure.contents.internship;
          return (
            <ul style={{ padding: 0, width: "250px", justifyContent: "center", height: "60px", }}>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Undervisning: {teaching}%</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Eksamen {exams}%</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Praktik: {internship}%</p>
            </ul>
          )
        },
      },
      {
        accessorKey: "education.degreeStructure.teachingMethods",
        header: "Undervisningsform",
        size: 160,
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const teachingMethods = row.original.education.degreeStructure.teachingMethods;
          return (
            <ul style={{ padding: 0, width: "250px", justifyContent: "center", height: "60px", }}>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>1. {teachingMethods[0]} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>2. {teachingMethods[1]} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>3. {teachingMethods[2]} </p>
            </ul>
          )
        },
      },
      {
        accessorKey: "education.dropoutRate",
        header: "Dropout-rate",
        size: 130,
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const dropoutRate = row.original.education.dropoutRate;
          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{dropoutRate}%</p>
          );
        }
      },
      {
        accessorKey: "education.jobData.salaries.newGraduate",
        header: "Løn som nyuddannet",
        size: 200,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.education.jobData.salaries.newGraduate.lowerQuartile + rowA.original.education.jobData.salaries.newGraduate.median + rowA.original.education.jobData.salaries.newGraduate.upperQuartile;
          let rowBMedian = rowB.original.education.jobData.salaries.newGraduate.lowerQuartile + rowB.original.education.jobData.salaries.newGraduate.median + rowB.original.education.jobData.salaries.newGraduate.upperQuartile;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const lower_quartile = row.original.education.jobData.salaries.newGraduate.lowerQuartile;
          const median = row.original.education.jobData.salaries.newGraduate.median;
          const upper_quartile = row.original.education.jobData.salaries.newGraduate.upperQuartile;
          return (
            <ul style={{ padding: 0, width: "250px", height: "60px", scrollbarWidth: "thin", marginRight: "1em" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Nedre Kvartil: </p>
                <p style={{ margin: 0 }} > {Math.floor(lower_quartile * 1000).toLocaleString('en-US', { minimumFractionDigits: 0, useGrouping: true }).replace(/,/g, '.')} kr.</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Median: </p>
                <p style={{ margin: 0 }} > {Math.floor(median * 1000).toLocaleString('en-US', { minimumFractionDigits: 0, useGrouping: true }).replace(/,/g, '.')} kr.</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Øvre Kvartil: </p>
                <p style={{ margin: 0 }} > {Math.floor(upper_quartile * 1000).toLocaleString('en-US', { minimumFractionDigits: 0, useGrouping: true }).replace(/,/g, '.')} kr.</p>
              </div>
            </ul>
          );
        }
      },
      {
        accessorKey: "education.jobData.salaries.experienced",
        header: "Løn som erfaren",
        size: 200,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.education.jobData.salaries.experienced.lowerQuartile + rowA.original.education.jobData.salaries.experienced.median + rowA.original.education.jobData.salaries.experienced.upperQuartile;
          let rowBMedian = rowB.original.education.jobData.salaries.experienced.lowerQuartile + rowB.original.education.jobData.salaries.experienced.median + rowB.original.education.jobData.salaries.experienced.upperQuartile;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const lower_quartile = row.original.education.jobData.salaries.experienced.lowerQuartile;
          const median = row.original.education.jobData.salaries.experienced.median;
          const upper_quartile = row.original.education.jobData.salaries.experienced.upperQuartile;
          return (
            <ul style={{ padding: 0, width: "250px", height: "60px", scrollbarWidth: "thin", marginRight: "1em" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Nedre Kvartil: </p>
                <p style={{ margin: 0 }} > {Math.floor(lower_quartile * 1000).toLocaleString('en-US', { minimumFractionDigits: 0, useGrouping: true }).replace(/,/g, '.')} kr.</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Median: </p>
                <p style={{ margin: 0 }} > {Math.floor(median * 1000).toLocaleString('en-US', { minimumFractionDigits: 0, useGrouping: true }).replace(/,/g, '.')} kr.</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Øvre Kvartil: </p>
                <p style={{ margin: 0 }} > {Math.floor(upper_quartile * 1000).toLocaleString('en-US', { minimumFractionDigits: 0, useGrouping: true }).replace(/,/g, '.')} kr.</p>
              </div>
            </ul>
          );
        }
      },
      {
        accessorKey: "education.jobData.unemployment",
        header: "Arbejdsløshed",
        size: 160,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.education.jobData.unemployment.newGraduate + rowA.original.education.jobData.unemployment.experienced;
          let rowBMedian = rowB.original.education.jobData.unemployment.newGraduate + rowB.original.education.jobData.unemployment.experienced;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const newGraduate = row.original.education.jobData.unemployment.newGraduate;
          const experienced = row.original.education.jobData.unemployment.experienced;
          return (
            <ul style={{ padding: 0, width: "250px", height: "40px", scrollbarWidth: "thin", marginRight: "1.5em" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Nyuddannede: </p>
                <p style={{ margin: 0 }} >{newGraduate}%</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Erfarne: </p>
                <p style={{ margin: 0 }} >{experienced}%</p>
              </div>
            </ul>
          );
        }
      },
      {
        accessorKey: "education.jobData.workSchedule",
        header: "Arbejdstid (job)",
        size: 180,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.education.jobData.workSchedule.workingHours
          let rowBMedian = rowB.original.education.jobData.workSchedule.workingHours
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {
          const working_hours = row.original.education.jobData.workSchedule.workingHours;
          const flexible_hours = row.original.education.jobData.workSchedule.flexibleHoursPercent + row.original.education.jobData.workSchedule.selfSchedulePercent + row.original.education.jobData.workSchedule.variableSchedulePercent;
          const fixed_hours = row.original.education.jobData.workSchedule.fixedHoursPercent;
          const flexible_hours_percent = flexible_hours / (flexible_hours + fixed_hours);

          return (
            <ul style={{ padding: 0, width: "250px", height: "60px", scrollbarWidth: "thin", marginRight: "1.5em" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Arbejdstimer:  </p>
                <p style={{ margin: 0 }} >{Math.floor(working_hours)} timer </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Fleksible timer: </p>
                <p style={{ margin: 0 }} >{Math.floor(flexible_hours_percent * 100)}%</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Faste timer: </p>
                <p style={{ margin: 0 }} >{Math.floor((1 - flexible_hours_percent) * 100)}%</p>
              </div>
            </ul>
          )
        }
      },
      {
        accessorKey: "education.jobData.degreeRelevance",
        header: "Job relevans",
        size: 120,
        sortingFn: (rowA, rowB) => {
          return rowA.original.education.jobData.degreeRelevance - rowB.original.education.jobData.degreeRelevance;
        },
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {

          const degree_relevance = row.original.education.jobData.degreeRelevance;
          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{degree_relevance}</p>
          );
        }
      },
      {
        accessorKey: "ranking.education.jobData.degreePreparesForJob",
        header: "Job forberedende",
        size: 140,
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {

          const degree_prepares_for_job = row.original.education.jobData.degreePreparesForJob;
          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{degree_prepares_for_job}</p>
          );
        }
      },
      {
        accessorKey: "education.jobData.nationalJobs",
        header: "Internationalt job",
        size: 140,
        Cell: ({ row }: { row: MRT_Row<RankedDataStructure> }) => {

          let national_jobs = row.original.education.jobData.nationalJobs;
          if (national_jobs < 0) {
            national_jobs = national_jobs / 10000;
          }

          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "3em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{national_jobs}%</p>
          );
        }
      }

    ],
    []
  );

  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
  const columnVirtualizerInstanceRef = useRef<MRT_ColumnVirtualizer>(null);


  type DetailPanelContentProps = {
    row: MRT_Row<RankedDataStructure>;
  };


  const getMessage = async (filters: TableFilters, quizAnswers: QuizAnswers, education: Education) => {
    const message = await getPersonalizedMessage(filters, quizAnswers, education);
    return message;
  }

  const DetailPanelContent: React.FC<DetailPanelContentProps> = ({row}) => {
    const margingLeft = columnVirtualizerInstanceRef.current?.scrollOffset || 0;
    const [smallText, setSmallText] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
      getSmallTextAboutEducation(row.original.education).then((text) => {
        setSmallText(text);
      });
    }, [row.original.education]);

    const handleClick = async () => {
      getMessage(filters, quizAnswers, row.original.education).then((message) => {
        setMessage(message);
      });
    }

    return (
      <div style={{marginLeft: `${margingLeft}px`, height: "800px", width: "400px", padding: 0, backgroundColor: "grey", overflowY: "scroll", scrollbarWidth: "thin" }}>
        <p>{smallText}</p>
        {!smallText && <p>Loading...</p>}
        <button onClick={handleClick}>
          Generate personal recommendation
        </button>
        <p>{message}</p>
      </div>
    );
  };

  const table = useMaterialReactTable({
    columns,
    data, //10,000 rows
    enableExpandAll: false,
    renderDetailPanel: ({ row }: { row: MRT_Row<RankedDataStructure>; }) => <DetailPanelContent row={row} />,
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        cursor: 'pointer',
        backgroundColor: (!row.getIsExpanded() && row.index >= rankedData.index) ? "#f2cbcb" : row.getIsExpanded() ? "#f0f0f0" : row.index <= 10 ? row.index <= 4 ? "#72bd7f" : "#9bd5a5" : "#cfe6d3",
      },
    }),
    positionExpandColumn: "first",
    enableBottomToolbar: false,
    enableColumnResizing: true, // enable column resizing
    enableGlobalFilter: true,
    enableColumnVirtualization: true,
    columnVirtualizerInstanceRef,
    enablePagination: false,
    enableStickyHeader: true,
    enableSorting: true,

    enableColumnPinning: true,
    enableColumnActions: false,
    initialState: {
      density: "compact",
      columnPinning: { left: ["rank"] },


    },
    enableRowVirtualization: true,
    muiTableBodyCellProps: { sx: { padding: 0, paddingLeft: "1rem", height: "90px", scrollbarWidth: "none", overflow: "hidden" } },
    muiTableHeadCellProps: { sx: { padding: 0, paddingLeft: "1rem" } },
    rowVirtualizerInstanceRef, //optional
    rowVirtualizerOptions: { overscan: 2 }, //optionally customize the row virtualizer
    columnVirtualizerOptions: { overscan: 4 }, //optionally customize the column virtualizer
  });



  return <MaterialReactTable table={table} />
};

export default RankedMaterialReactDataTable;
