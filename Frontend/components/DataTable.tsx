import React, { useEffect, useMemo, useRef, useState } from "react";
import { Uddannelse } from "../../src/types";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_SortingState,
  type MRT_RowVirtualizer,
} from "material-react-table";

const MaterialReactDataTable = () => {
  const columns: MRT_ColumnDef<Uddannelse>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Uddannelse", // Change to your language's translation for "Uddannelse"
        size: 100,
      },
      {
        accessorKey: "degree_type",
        header: "Gradtype", // Change to your language's translation for "degree_type"
        size: 150,
      },
      {
        accessorKey: "geography",
        header: "Geografi", // Change to your language's translation for "geography"
        size: 150,
      },
      {
        accessorKey: "institutions",
        header: "Uddannelsessteder",
        Cell: ({ row }: { row: any }) => {
          const institutions: string[] = row.original.institutions; // Access the institutions data from row.original
          return (
            <ul>
              {institutions.map((institution: string) => (
                <li key={institution}>{institution}</li>
              ))}
            </ul>
          );
        },
      },
      {
        accessorKey: "subjects",
        header: "Fag", // Change to your language's translation for "subjects"
        Cell: ({ row }: { row: Uddannelse }) => (
          <ul>
            {row.subjects?.map((subject: any) => (
              <li key={subject.fag}>
                {subject.fag}: {subject.score}
              </li>
            ))}
          </ul>
        ),
      },
      {
        accessorKey: "industries",
        header: "Brancher", // Change to your language's translation for "subjects"
        Cell: ({ row }: { row: Uddannelse }) => (
          <ul>
            {row.industries?.map((industries: any) => (
              <li key={industries.title}>
                {industries.title}: {industries.share}
              </li>
            ))}
          </ul>
        ),
      },
    ],
    []
  );

  const data: Uddannelse[] = [
    {
      title: "Computer Science",
      degree_type: "Bachelor",
      geography: "Denmark",
      institutions: ["Aarhus University", "Copenhagen University"], // Array of strings
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
        with_many_students: 20,
        with_few_students: 25,
        with_supervision: 30,
      },
      student_feedback: {
        social_environment: 4.5,
        academic_environment: 4.2,
        group_engagement: 4.3,
        loneliness: 2.1,
        stress: 3.8,
        teacher_evaluation: 4.7,
        satisfaction: 4.6,
      },
      academic_workload: {
        lectures: 10,
        literature: 15,
        student_job: 5,
      },
      degree_structure: {
        contents: {
          teaching: 40,
          exams: 30,
          internship: 20,
          international_stay: 10,
        },
        teaching_method: {
          lectures: "Traditional lectures",
          seminars: "Interactive seminars",
        },
      },
      dropout_rate: 5,
      job_data: {
        salary: {
          new_graduate: {
            lower_quartile: 30000,
            median: 40000,
            upper_quartile: 50000,
            projected_direction: "Positive",
          },
          experienced: {
            lower_quartile: 60000,
            median: 70000,
            upper_quartile: 80000,
            projected_direction: "Positive",
          },
        },
        unemployment: {
          new_graduate: 3,
          experienced: 2,
          projected_new_graduate: 2.5,
          projected_experienced: 1.5,
        },
        work_schedule: {
          fixed_hours: 60,
          flexible_hours: 20,
          self_schedule: 10,
          variable_schedule: 5,
          night_and_evening_shifts: 5,
        },
        hours: 40,
        job_importance: {
          salary: "High",
          work_life_balance: "High",
          job_security: "Medium",
        },
        job_skills: {
          programming: "Advanced",
          problem_solving: "Advanced",
          teamwork: "Intermediate",
        },
        degree_relevance: 80,
        degree_prepares_for_job: 90,
        national_jobs: 85,
      },
    },
  ];

  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  const table = useMaterialReactTable({
    columns,
    data, //10,000 rows
    defaultDisplayColumn: { enableResizing: true },
    enableBottomToolbar: false,
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enableGlobalFilterModes: true,
    enablePagination: false,
    enableColumnPinning: true,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    muiTableContainerProps: { sx: { maxHeight: "600px" } },
    onSortingChange: setSorting,
    rowVirtualizerInstanceRef, //optional
    rowVirtualizerOptions: { overscan: 5 }, //optionally customize the row virtualizer
    columnVirtualizerOptions: { overscan: 2 }, //optionally customize the column virtualizer
  });

  return <MaterialReactTable table={table} />;
};

export default MaterialReactDataTable;
