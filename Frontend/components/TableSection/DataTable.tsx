import { useMemo, useRef, useEffect, useState } from "react";
import { Education } from "@src/types"
import { Institution } from "../../../src/enums"
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowVirtualizer,
  MRT_Row,
  MRT_ColumnVirtualizer,
} from "material-react-table";
import { useServer } from "@backend/server/useServer"

type MaterialReactDataTableProps = {
  data: Education[];
}

const MaterialReactDataTable: React.FC<MaterialReactDataTableProps> = ({ data }) => {

  const { getSmallTextAboutEducation } = useServer();


  const columns: MRT_ColumnDef<Education>[] = useMemo(
    () => [
      {
        accessorKey: "rank",
        header: "Rang", // Change to your language's translation for "Rang"
        size: 75,
        sortingFn: (rowA, rowB) => {
          return (rowA.original.rank ?? 0) - (rowB.original.rank ?? 0);
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const rank = row.original.rank;
          if (rank == null || rank == undefined || rank == 0) {
            return (
              <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>-</p>
            );
          }

          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{row.original.rank}</p>
          );
        }
      },
      {
        accessorKey: "title",
        header: "Uddannelse",
        minSize: 130,
        size: 150,
        maxSize: 200,
      },
      {
        accessorKey: "degreeType",
        header: "Type",
        size: 160,
      },
      {
        accessorKey: "institutions",
        header: "Uddannelsessted",
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const institutionName = Institution[row.original.institution];
          // (row.original.institutions)
          return (
            <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{institutionName}</p>
          );
        },
      },
      {
        accessorKey: "geography",
        header: "Geografi",
        size: 120,
        sortingFn: (rowA, rowB) => {
          return rowA.original.geographies[0].localeCompare(rowB.original.geographies[0]);
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const geography = row.original.geographies;
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
        accessorKey: "subjects",
        header: "Fag",
        size: 130,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const subjects: string[] = row.original.subjects
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map((subject) => subject.title);

          return (
            <ul style={{ padding: 0, width: "250px", justifyContent: "center", height: "60px" }}>
              {subjects.map((subject: string, index: number) => (
                <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }} key={subject}>
                  {index + 1}.{subject}
                </p>
              ))}
            </ul>
          );
        }
      },
      {
        accessorKey: "industries",
        header: "Brancher",
        size: 370,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = 0;
          let rowBMedian = 0;
          rowA.original.industries.forEach(rowAIndustry => {
            rowAMedian += rowAIndustry.share;
          })
          rowB.original.industries.forEach(rowBIndustry => {
            rowBMedian += rowBIndustry.share;
          })
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const industries: string[] = row.original.industries.map((industry) => industry.title)
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
        accessorKey: "hours",
        header: "Undervisningsfordeling",
        size: 180,
        sortingFn: (rowA, rowB) => {
          let KlasseUndervisningA = rowA.original.hours.withFewStudents;
          let KlasseUndervisningB = rowB.original.hours.withFewStudents;
          let totalHoursA = KlasseUndervisningA + rowA.original.hours.withManyStudents + rowA.original.hours.withSupervision;
          let totalHoursB = KlasseUndervisningB + rowB.original.hours.withManyStudents + rowB.original.hours.withSupervision;
          let rowAMedian = KlasseUndervisningA / totalHoursA;
          let rowBMedian = KlasseUndervisningB / totalHoursB;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const hoursTitles: string[] = ["Forelæsninger", "Klasse/Gruppearbejde", "Med vejledning"];
          const hoursNumbers: number[] = Object.values(row.original.hours);
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
        accessorKey: "socialFeedback",
        header: "Socialt miljø 1 til 5",
        size: 160,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.socialFeedback.socialEnvironment + rowA.original.socialFeedback.groupEngagement + rowA.original.socialFeedback.loneliness + rowA.original.socialFeedback.stress;
          let rowBMedian = rowB.original.socialFeedback.socialEnvironment + rowB.original.socialFeedback.groupEngagement + rowB.original.socialFeedback.loneliness + rowB.original.socialFeedback.stress;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const socialEnvironment = row.original.socialFeedback.socialEnvironment;
          const groupEngagement = row.original.socialFeedback.groupEngagement;
          const loneliness = row.original.socialFeedback.loneliness;
          const stress = row.original.socialFeedback.stress;
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
        accessorKey: "academicFeedback",
        header: "Fagligt miljø 1 til 5",
        size: 200,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.academicFeedback.academicEnvironment + rowA.original.academicFeedback.teacherEvaluation + rowA.original.academicFeedback.satisfaction;
          let rowBMedian = rowB.original.academicFeedback.academicEnvironment + rowB.original.academicFeedback.teacherEvaluation + rowB.original.academicFeedback.satisfaction;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const academicEnvironment = row.original.academicFeedback.academicEnvironment;
          const teacherEvaluation = row.original.academicFeedback.teacherEvaluation;
          const satisfaction = row.original.academicFeedback.satisfaction;
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
        accessorKey: "academicWorkload",
        header: "Arbejdsbyrde",
        size: 160,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.academicWorkload.lectures
          let rowBMedian = rowB.original.academicWorkload.lectures
          let totalHoursA = rowA.original.academicWorkload.lectures + rowA.original.academicWorkload.literature + rowA.original.academicWorkload.studentJob;
          let totalHoursB = rowB.original.academicWorkload.lectures + rowB.original.academicWorkload.literature + rowB.original.academicWorkload.studentJob;
          rowAMedian = rowAMedian / totalHoursA;
          rowBMedian = rowBMedian / totalHoursB;

          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const lectures = row.original.academicWorkload.lectures;
          const literature = row.original.academicWorkload.literature;
          const studentJob = row.original.academicWorkload.studentJob;
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
        accessorKey: "degreeStructure.contents",
        header: "Uddannelsesstruktur",
        size: 180,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.degreeStructure.contents.teaching
          let rowBMedian = rowB.original.degreeStructure.contents.teaching
          let totalHoursA = rowA.original.degreeStructure.contents.teaching + rowA.original.degreeStructure.contents.exams + rowA.original.degreeStructure.contents.internship + rowA.original.degreeStructure.contents.internationalStay;
          let totalHoursB = rowB.original.degreeStructure.contents.teaching + rowB.original.degreeStructure.contents.exams + rowB.original.degreeStructure.contents.internship + rowB.original.degreeStructure.contents.internationalStay;
          rowAMedian = rowAMedian / totalHoursA;
          rowBMedian = rowBMedian / totalHoursB;

          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const teaching = row.original.degreeStructure.contents.teaching;
          const exams = row.original.degreeStructure.contents.exams;
          const internship = row.original.degreeStructure.contents.internship;
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
        accessorKey: "degreeStructure.teachingMethods",
        header: "Undervisningsform",
        size: 160,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const teachingMethods = row.original.degreeStructure.teachingMethods;
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
        accessorKey: "dropoutRate",
        header: "Dropout-rate",
        size: 130,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const dropoutRate = row.original.dropoutRate;
          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{dropoutRate}%</p>
          );
        }
      },
      {
        accessorKey: "jobData.salaries.newGraduate",
        header: "Løn som nyuddannet",
        size: 200,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.jobData.salaries.newGraduate.lowerQuartile + rowA.original.jobData.salaries.newGraduate.median + rowA.original.jobData.salaries.newGraduate.upperQuartile;
          let rowBMedian = rowB.original.jobData.salaries.newGraduate.lowerQuartile + rowB.original.jobData.salaries.newGraduate.median + rowB.original.jobData.salaries.newGraduate.upperQuartile;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const lower_quartile = row.original.jobData.salaries.newGraduate.lowerQuartile;
          const median = row.original.jobData.salaries.newGraduate.median;
          const upper_quartile = row.original.jobData.salaries.newGraduate.upperQuartile;
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
        accessorKey: "jobData.salaries.experienced",
        header: "Løn som erfaren",
        size: 200,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.jobData.salaries.experienced.lowerQuartile + rowA.original.jobData.salaries.experienced.median + rowA.original.jobData.salaries.experienced.upperQuartile;
          let rowBMedian = rowB.original.jobData.salaries.experienced.lowerQuartile + rowB.original.jobData.salaries.experienced.median + rowB.original.jobData.salaries.experienced.upperQuartile;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const lower_quartile = row.original.jobData.salaries.experienced.lowerQuartile;
          const median = row.original.jobData.salaries.experienced.median;
          const upper_quartile = row.original.jobData.salaries.experienced.upperQuartile;
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
        accessorKey: "jobData.unemployment",
        header: "Arbejdsløshed",
        size: 160,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.jobData.unemployment.newGraduate + rowA.original.jobData.unemployment.experienced;
          let rowBMedian = rowB.original.jobData.unemployment.newGraduate + rowB.original.jobData.unemployment.experienced;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const newGraduate = row.original.jobData.unemployment.newGraduate;
          const experienced = row.original.jobData.unemployment.experienced;
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
        accessorKey: "jobData.workSchedule",
        header: "Arbejdstid (job)",
        size: 180,
        sortingFn: (rowA, rowB) => {
          let rowAMedian = rowA.original.jobData.workSchedule.workingHours
          let rowBMedian = rowB.original.jobData.workSchedule.workingHours
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const working_hours = row.original.jobData.workSchedule.workingHours;
          const flexible_hours = row.original.jobData.workSchedule.flexibleHoursPercent
          const fixed_hours = row.original.jobData.workSchedule.fixedHoursPercent;

          return (
            <ul style={{ padding: 0, width: "250px", height: "60px", scrollbarWidth: "thin", marginRight: "1.5em" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Arbejdstimer:  </p>
                <p style={{ margin: 0 }} >{Math.floor(working_hours)} timer </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Fleksible timer: </p>
                <p style={{ margin: 0 }} >{flexible_hours}%</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Faste timer: </p>
                <p style={{ margin: 0 }} >{fixed_hours}%</p>
              </div>
            </ul>
          )
        }
      },
      {
        accessorKey: "jobData.degreeRelevance",
        header: "Job relevans",
        size: 120,
        sortingFn: (rowA, rowB) => {
          return rowA.original.jobData.degreeRelevance - rowB.original.jobData.degreeRelevance;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {

          const degree_relevance = row.original.jobData.degreeRelevance;
          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{degree_relevance}</p>
          );
        }
      },
      {
        accessorKey: "jobData.degreePreparesForJob",
        header: "Job forberedende",
        size: 140,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {

          const degree_prepares_for_job = row.original.jobData.degreePreparesForJob;
          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{degree_prepares_for_job}</p>
          );
        }
      },
      {
        accessorKey: "jobData.nationalJobs",
        header: "Nationale job",
        size: 140,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {

          let national_jobs = row.original.jobData.nationalJobs;
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
    row: MRT_Row<Education>;
  };


  const DetailPanelContent: React.FC<DetailPanelContentProps> = ({ row }) => {
    const [smallText, setSmallText] = useState<string | null>(null);


    useEffect(() => {
      getSmallTextAboutEducation(row.original).then((text) => {
        setSmallText(text);
      });
    }, [row.original.title]);


    const margingLeft = columnVirtualizerInstanceRef.current?.scrollOffset || 0;

    return (
      <div style={{ marginLeft: `${margingLeft}px`, height: "300px", width: "400px", padding: 0, overflowY: "scroll", scrollbarWidth: "thin" }}>
        <p style={{ borderBottom: "2px solid #006eff", marginBottom: "0em" }}><b>{row.original.title}:</b></p>
        {!smallText && <p>Indlæser...</p>}
        {smallText && (
          <>

            <p>{smallText}</p>
            <p>Hvis du vil generere en personlig anbefaling skal du først vælge filtre og trykke beregn eller besvare quizzen.</p>
            <a href={`https://${row.original.url}`} style={{ color: "blue" }} target="" rel="noopener noreferrer">Læs mere om uddannelsen på UG.dk</a>

          </>
        )}

      </div>
    );
  };

  const table = useMaterialReactTable({
    columns,
    data, //10,000 rows
    enableExpandAll: false,
    renderDetailPanel: ({ row }: { row: MRT_Row<Education>; }) => <DetailPanelContent row={row} />,
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //set only this row to be expanded
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

  return <MaterialReactTable table={table} />;
};

export default MaterialReactDataTable;
