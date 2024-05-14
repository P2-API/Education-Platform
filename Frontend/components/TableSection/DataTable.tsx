import { useMemo, useRef } from "react";
import { Education } from "@src/types"
import { Institution, County, Geography, DegreeType } from "../../../src/enums"
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowVirtualizer,
  MRT_Row,
} from "material-react-table";

type MaterialReactDataTableProps = {
  data: Education[];
}

const MaterialReactDataTable: React.FC<MaterialReactDataTableProps> = ({ data }) => {
  const columns: MRT_ColumnDef<Education>[] = useMemo(
    () => [
      {
        accessorKey: "rank",
        header: "Rang", // Change to your language's translation for "Rang"
        size: 60,
      },
      {
        accessorKey: "title",
        header: "Education",
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
          const institutionName = Institution[row.original.institutions];
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
        sortingFn: (rowA, rowB, columnId) => {
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
          const subjects: string[] = row.original.subjects.map((subject) => subject.title)
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
        accessorKey: "industries",
        header: "Brancher",
        size: 370,
        sortingFn: (rowA, rowB, columnId) => {
          let rowAMedian = 0;
          let rowBMedian = 0;
          rowA.original.industries.forEach(rowAIndustry =>{
            rowAMedian += rowAIndustry.share;
          })
          rowB.original.industries.forEach(rowBIndustry =>{
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
        sortingFn: (rowA, rowB, columnId) => {
          let rowAMedian = rowA.original.hours.withFewStudents + rowA.original.hours.withManyStudents + rowA.original.hours.withSupervision;
          let rowBMedian = rowB.original.hours.withFewStudents + rowB.original.hours.withManyStudents + rowB.original.hours.withSupervision;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const hoursTitles: string[] = ["Forelæsninger", "Klasse/Gruppearbejde", "Med vejledning"];
          const hoursNumbers: number[] = Object.values(row.original.hours);
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
        sortingFn: (rowA, rowB, rowId) =>{
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
        sortingFn: (rowA, rowB, rowId) =>{
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
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Fagligt Miljø: {academicEnvironment} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Lærerevaluering: {teacherEvaluation} </p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Tilfredshed: {satisfaction} </p>
            </ul>
          );
        }
      },
      {
        accessorKey: "academicWorkload",
        header: "Arbejdsbyrde",
        size: 160,
        sortingFn: (rowA, rowB, rowId) =>{
          let rowAMedian = rowA.original.academicWorkload.lectures + rowA.original.academicWorkload.literature + rowA.original.academicWorkload.studentJob;
          let rowBMedian = rowB.original.academicWorkload.lectures + rowB.original.academicWorkload.literature + rowB.original.academicWorkload.studentJob;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const lectures = row.original.academicWorkload.lectures;
          const literature = row.original.academicWorkload.literature;
          const studentJob = row.original.academicWorkload.studentJob;
          return (
            <ul style={{ padding: 0, width: "250px", justifyContent: "center", height: "60px", }}>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Forelæsninger: {lectures} timer</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Litteratur: {literature} timer</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Studiejob: {studentJob} timer</p>
            </ul>
          );
        }
      },
      {
        accessorKey: "degreeStructure.contents",
        header: "Uddannelsesstruktur",
        size: 180,
        sortingFn: (rowA, rowB, rowId) =>{
          let rowAMedian = rowA.original.degreeStructure.contents.teaching + rowA.original.degreeStructure.contents.exams + rowA.original.degreeStructure.contents.internship + rowA.original.degreeStructure.contents.internationalStay;
          let rowBMedian = rowB.original.degreeStructure.contents.teaching + rowB.original.degreeStructure.contents.exams + rowB.original.degreeStructure.contents.internship + rowB.original.degreeStructure.contents.internationalStay;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const teaching = row.original.degreeStructure.contents.teaching;
          const exams = row.original.degreeStructure.contents.exams;
          const internship = row.original.degreeStructure.contents.internship;
          const internationalStay = row.original.degreeStructure.contents.internationalStay;
          return (
            <ul style={{ padding: 0, width: "250px", justifyContent: "center", height: "80px", }}>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Undervisning: {teaching}%</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Eksamen {exams}%</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Praktik: {internship}%</p>
              <p className="" style={{ cursor: "default", margin: 0, fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>Udlandsophold: {internationalStay}%</p>
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
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "2em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{dropoutRate * 100}%</p>
          );
        }
      },
      {
        accessorKey: "jobData.salaries.newGraduate",
        header: "Løn som nyuddannet",
        size: 200,
        sortingFn: (rowA, rowB, rowId) =>{
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
        sortingFn: (rowA, rowB, rowId) =>{
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
        sortingFn: (rowA, rowB, rowId) =>{
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
        accessorKey: "jobData.workSchedule",
        header: "Arbejdstid (job)",
        size: 180,
        sortingFn: (rowA, rowB, rowId) =>{
          let rowAMedian = rowA.original.jobData.workSchedule.workingHours + rowA.original.jobData.workSchedule.flexibleHoursPercent + rowA.original.jobData.workSchedule.fixedHoursPercent;
          let rowBMedian = rowB.original.jobData.workSchedule.workingHours + rowB.original.jobData.workSchedule.flexibleHoursPercent + rowB.original.jobData.workSchedule.fixedHoursPercent;
          return rowAMedian > rowBMedian ? -1 : 1;
        },
        Cell: ({ row }: { row: MRT_Row<Education> }) => {
          const working_hours = row.original.jobData.workSchedule.workingHours;
          const flexible_hours = row.original.jobData.workSchedule.flexibleHoursPercent + row.original.jobData.workSchedule.selfSchedulePercent + row.original.jobData.workSchedule.variableSchedulePercent;
          const fixed_hours = row.original.jobData.workSchedule.fixedHoursPercent;
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
        accessorKey: "jobData.degreeRelevance",
        header: "Job relevans",
        size: 120,
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
        header: "Internationalt job",
        size: 140,
        Cell: ({ row }: { row: MRT_Row<Education> }) => {

          const national_jobs = row.original.jobData.nationalJobs;
          return (
            <p className="" style={{ cursor: "default", justifyContent: "center", display: "flex", scrollbarWidth: "none", marginLeft: "3em", fontSize: "1em", textDecoration: "none", fontWeight: "normal" }}>{Math.floor((1 - national_jobs) * 100)}%</p>
          );
        }
      }

    ],
    []
  );

  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  const DetailPanelContent = () => {
    return (
      <div style={{ padding: "1rem", height: "100%", width: "100%", overflowY: "scroll", scrollbarWidth: "thin" }}>
        <p>Detail Panel Content</p>
      </div>
    );
  };

  const table = useMaterialReactTable({
    columns,
    data, //10,000 rows
    enableExpandAll: false,
    renderDetailPanel: () => <DetailPanelContent />,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        row.toggleExpanded();
        // if expanded, change background color of row
        if (row.getIsExpanded()) {
          // change style of row

        }
      },
      sx: {
        cursor: 'pointer',
        backgroundColor: row.getIsExpanded() ? "#f0f0f0" : "white",
      },
    }),
    positionExpandColumn: "last",
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
    muiTableBodyCellProps: { sx: { padding: 0, paddingLeft: "1rem", height: "90px", scrollbarWidth: "none", overflow: "hidden" } },
    muiTableHeadCellProps: { sx: { padding: 0, paddingLeft: "1rem" } },
    rowVirtualizerInstanceRef, //optional
    rowVirtualizerOptions: { overscan: 2 }, //optionally customize the row virtualizer
    columnVirtualizerOptions: { overscan: 4 }, //optionally customize the column virtualizer

  });

  return <MaterialReactTable table={table} />;
};

export default MaterialReactDataTable;
