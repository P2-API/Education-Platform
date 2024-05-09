import { useMemo, useRef } from "react";
import { Education } from "../../src/types";
import { Institution, Geography } from "../../src/enums";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowVirtualizer,
  MRT_Row,
} from "material-react-table";

const MaterialReactDataTable = () => {



  const columns: MRT_ColumnDef<Education>[] = useMemo(
    () => [
      {
        accessorKey: "rank",
        header: "Rang", // Change to your language's translation for "Rang"
        size: 60,
      },
      {
        accessorKey: "title",
        header: "Education", // Change to your language's translation for "Education"
        minSize: 130,
        size: 150,
        maxSize: 200,
      },
      {
        accessorKey: "degree_type",
        header: "Type", // Change to your language's translation for "degree_type"
        size: 160,
      },
      /* {
        accessorKey: "geography",
        header: "Geografi", // Change to your language's translation for "geography"
        size: 110,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const geographyNames = row.original.geographies.map((location: number) => Geography[location])
          //console.log("geographyNames", geographyNames)
          return (
            // map 
            <ul style={{ width: "250px , height: "65px", justgeographyNames.map((location: string) => (ifyContent: "center", overflowY: "scroll", paddingBottom: "0px" }} >
              {geographyNames.map((location: string) => (
                <p className="noselect" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }} key={location}>{location}</p>
              ))}
            </ul>
          );
        },
      }, */
      {
        accessorKey: "institutions",
        header: "Uddannelsessted",
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const institutionName = Institution[row.original.institutions];
          //console.log(row.original.institutions)
          return (
            <p className="" style={{ cursor: "default", overflowX: "scroll", scrollbarWidth: "none", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{institutionName}</p>
          );
        },
      },
      {
        accessorKey: "subjects",
        header: "Fag", // Change to your language's translation for "subjects"
        size: 130,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const subjects: string[] = row.original.subjects.map((subject) => subject.title)
          //console.log("subjects", subjects)
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
        accessorKey: "industries",
        header: "Brancher", // Change to your language's translation for "subjects"
        size: 130,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const industries: string[] = row.original.industries.map((industry) => industry.title)
          //console.log("subjects", industries)
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
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const hoursTitles: string[] = ["Forelæsninger", "Klasse/Gruppearbejde", "Med vejledning"];
          const hoursNumbers: number[] = Object.values(row.original.hours);
          //console.log("hoursNumbers", hoursNumbers)
          //console.log("hoursTitles", hoursTitles)
          return (
            <ul style={{ padding: 0, overflowY: "scroll", width: "250px", justifyContent: "center", height: "60px", scrollbarWidth: "thin" }}>
              {hoursTitles.map((title: string, index: number) => (
                <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }} key={title}>{title}: {hoursNumbers[index]}%</p>
              ))}
            </ul>
          );
        }
      },
      {
        accessorKey: "student_feedback",
        header: "Socialt miljø 1 til 5",
        size: 160,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const socialEnvironment = row.original.student_feedback.socialEnvironment;
          const groupEngagement = row.original.student_feedback.groupEngagement;
          const loneliness = row.original.student_feedback.loneliness;
          const stress = row.original.student_feedback.stress;
          //console.log("hoursNumbers", hoursNumbers)
          //console.log("hoursTitles", hoursTitles)
          return (
            <ul style={{ padding: 0, overflowY: "scroll", width: "250px", justifyContent: "center", height: "80px", scrollbarWidth: "thin" }}>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Socialt Miljø: {socialEnvironment} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Gruppeengagement: {groupEngagement} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Ensomhed: {loneliness} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Stress: {stress} </p>
            </ul>
          );
        }
      },
      /*       {
              accessorKey: "student_feedback",
              header: "Fagligt miljø 1 til 5",
              size: 200,
              Cell: ({ row }: { row: MRT_Row<Education> }) => {
                const academicEnvironment = row.original.student_feedback.academicEnvironment;
                const teacherEvaluation = row.original.student_feedback.teacherEvaluation;
                const satisfaction = row.original.student_feedback.satisfaction;
                //console.log("hoursNumbers", hoursNumbers)
                //console.log("hoursTitles", hoursTitles)
                return (
                  <ul style={{ padding: 0, overflowY: "scroll", width: "250px", justifyContent: "center", height: "60px", scrollbarWidth: "thin" }}>
                    <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Fagligt Miljø: {academicEnvironment} </p>
                    <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Lærerevaluering: {teacherEvaluation} </p>
                    <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Tilfredshed: {satisfaction} </p>
                  </ul>
                );
              }
            }, */
      {
        accessorKey: "academic_workload",
        header: "Arbejdsbyrde",
        size: 160,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const lectures = row.original.academic_workload.lectures;
          const literature = row.original.academic_workload.literature;
          const studentJob = row.original.academic_workload.studentJob;
          return (
            <ul style={{ padding: 0, overflowY: "scroll", width: "250px", justifyContent: "center", height: "60px", scrollbarWidth: "thin" }}>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Forelæsninger: {lectures} timer</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Litteratur: {literature} timer</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Studiejob: {studentJob} timer</p>
            </ul>
          );
        }
      },
      {
        accessorKey: "degree_structure.contents",
        header: "Uddannelsesstruktur",
        size: 180,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const teaching = row.original.degree_structure.contents.teaching;
          const exams = row.original.degree_structure.contents.exams;
          const internship = row.original.degree_structure.contents.internship;
          const internationalStay = row.original.degree_structure.contents.internationalStay;
          return (
            <ul style={{ padding: 0, overflowY: "scroll", width: "250px", justifyContent: "center", height: "80px", scrollbarWidth: "thin" }}>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Undervisning: {teaching}%</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Eksamen {exams}%</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Praktik: {internship}%</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Udlandsophold: {internationalStay}%</p>
            </ul>
          )
        },
      },
      {
        accessorKey: "degree_structure.teachingMethods",
        header: "Undervisningsform",
        size: 160,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const teachingMethods = row.original.degree_structure.teachingMethods;
          console.log("teachingMethods", teachingMethods)
          return (
            <ul style={{ padding: 0, overflowX: "scroll", width: "250px", justifyContent: "center", height: "60px", scrollbarWidth: "thin" }}>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>1. {teachingMethods[0]} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>2. {teachingMethods[1]} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>3. {teachingMethods[2]} </p>
            </ul>
          )
        },
      },
      {
        accessorKey: "dropout_rate",
        header: "Dropout-rate",
        size: 130,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const dropoutRate = row.original.dropout_rate;
          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{dropoutRate * 100}%</p>
          );
        }
      },
      {
        accessorKey: "job_data.salaries.newGraduate",
        header: "Løn som nyuddannet",
        size: 200,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const lower_quartile = row.original.job_data.salaries.newGraduate.lower_quartile;
          const median = row.original.job_data.salaries.newGraduate.median;
          const upper_quartile = row.original.job_data.salaries.newGraduate.upper_quartile;
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
        accessorKey: "job_data.salaries.experienced",
        header: "Løn som erfaren",
        size: 200,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const lower_quartile = row.original.job_data.salaries.experienced.lower_quartile;
          const median = row.original.job_data.salaries.experienced.median;
          const upper_quartile = row.original.job_data.salaries.experienced.upper_quartile;
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
        accessorKey: "job_data.unemployment",
        header: "Arbejdsløshed",
        size: 160,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const newGraduate = row.original.job_data.unemployment.newGraduate;
          const experienced = row.original.job_data.unemployment.experienced;
          return (
            <ul style={{ padding: 0, width: "250px", height: "40px", scrollbarWidth: "thin", marginRight: "1.5em" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Nyuddannede: </p>
                <p style={{ margin: 0 }} >{newGraduate * 100}%</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontWeight: "normal" }}>Erfarne: </p>
                <p style={{ margin: 0 }} >{experienced * 100}%</p>
              </div>
            </ul>
          );
        }
      },
      {
        accessorKey: "job_data.workSchedule",
        header: "Arbejdstid (job)",
        size: 180,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const working_hours = row.original.job_data.workSchedule.working_hours;
          const flexible_hours = row.original.job_data.workSchedule.flexible_hours_percent + row.original.job_data.workSchedule.self_schedule_percent + row.original.job_data.workSchedule.variable_schedule_percent;
          const fixed_hours = row.original.job_data.workSchedule.fixed_hours_percent;
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
        accessorKey: "job_data.degree_relevance",
        header: "Job relevans",
        size: 120,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {

          const degree_relevance = row.original.job_data.degree_relevance;
          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{degree_relevance}</p>
          );
        }
      },
      {
        accessorKey: "job_data.degree_prepares_for_job",
        header: "Job forberedende",
        size: 140,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {

          const degree_prepares_for_job = row.original.job_data.degree_prepares_for_job;
          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{degree_prepares_for_job}</p>
          );
        }
      },
      {
        accessorKey: "job_data.national_jobs",
        header: "Internationalt job",
        size: 140,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {

          const national_jobs = row.original.job_data.national_jobs;
          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "3em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{Math.floor((1 - national_jobs) * 100)}%</p>
          );
        }
      }

    ],
    []
  );

  const data: Education[] = [
    {
      url: "https://www.sdu.dk/da/uddannelse/bachelor/datalogi",
      rank: 1,
      title: "Datalogi",
      degree_type: "Universitets-uddannelse",
      counties: [1, 2, 3],
      geographies: [1, 2],
      institutions: Institution["Aalborg Universitet"],
      subjects: [
        {
          title: "Matematik",
          score: 0.92,
        },
        {
          title: "Kunst",
          score: 0.52,
        },
        {
          title: "Programmering",
          score: 0.78,
        },
      ],
      industries: [
        {
          title: "IT",
          share: 0.43,
        },
        {
          title: "Vidensservice",
          share: 0.22,
        },
        {
          title: "Forsvaret",
          share: 0.15,
        },
      ],
      hours: {
        withManyStudents: 30,
        withFewStudents: 60,
        withSupervision: 10,
      },
      student_feedback: {
        socialEnvironment: 4.1,
        academicEnvironment: 4.8,
        groupEngagement: 3.9,
        loneliness: 1.2,
        stress: 0.5,
        teacherEvaluation: 4.2,
        satisfaction: 4.7,
      },
      academic_workload: {
        lectures: 20,
        literature: 13,
        studentJob: 5,
      },
      degree_structure: {
        contents: {
          teaching: 40,
          exams: 30,
          internship: 20,
          internationalStay: 10,
        },
        teachingMethods: ["Projektarbejde", "Klasseundervisning", "Selvstudie"],
      },
      dropout_rate: 0.31,
      job_data: {
        salaries: {
          newGraduate: {
            lower_quartile: 32.2,
            median: 38.2,
            upper_quartile: 41.4,
            projected_direction: "up",
          },
          experienced: {
            lower_quartile: 40.2,
            median: 49.2,
            upper_quartile: 61.4,
            projected_direction: "up",
          },
        },
        workSchedule: {
          working_hours: 38,
          fixed_hours_percent: 0.79,
          flexible_hours_percent: 0.11,
          self_schedule_percent: 0.5,
          variable_schedule_percent: 0.5,
          night_and_evening_shifts_percent: 0.0,
        },
        unemployment: {
          newGraduate: 0.03,
          experienced: 0.01,
          projectedNewGraduate: 0.02,
          projectedExperienced: 0.01,
        },
        degree_relevance: 4.5,
        degree_prepares_for_job: 4.2,
        national_jobs: 0.92
      }
    },
  ];

  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  const table = useMaterialReactTable({
    columns,
    data, //10,000 rows
    enableBottomToolbar: false,
    enableColumnResizing: false,
    enableGlobalFilter: false,
    enableColumnVirtualization: true,
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
    muiTableBodyCellProps: { sx: { padding: 0, paddingLeft: "1rem", height: "90px", scrollbarWidth: "none", } },
    muiTableHeadCellProps: { sx: { padding: 0, paddingLeft: "1rem" } },
    rowVirtualizerInstanceRef, //optional
    rowVirtualizerOptions: { overscan: 8 }, //optionally customize the row virtualizer
    columnVirtualizerOptions: { overscan: 17 }, //optionally customize the column virtualizer

  });

  return <MaterialReactTable table={table} />;
};

export default MaterialReactDataTable;
