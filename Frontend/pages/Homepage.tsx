import { useState, useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
import DataTable, { TableColumn } from "react-data-table-component";
import { VscArrowCircleRight } from "react-icons/vsc";

type DataRow = {
  løn: number;
  uddannelse: string;
  varighed: number;
  sprog: string;
  branche: string,
};

const Homepage = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const columns: TableColumn<DataRow>[] = [
    { name: "Uddannelse", selector: (row) => row.uddannelse, sortable: true, minWidth: "15em" },
    { name: "Varighed", selector: (row) => row.varighed, sortable: true },
    { name: "Løn", selector: (row) => row.løn, sortable: true },
    { name: "Sprog", selector: (row) => row.sprog, sortable: true },
    { name: "Branche", selector: (row) => row.branche, sortable: true }
  ];
  const data: DataRow[] = [
    {
      løn: 60000,
      uddannelse: "Softwareudvikler",
      varighed: 3,
      sprog: "Python",
      branche: "IT"
    },
    {
      løn: 55000,
      uddannelse: "Computer Science",
      varighed: 4,
      sprog: "JavaScript",
      branche: "IT"
    },
    {
      løn: 62000,
      uddannelse: "Datamatiker",
      varighed: 2,
      sprog: "C#",
      branche: "IT"
    },
    {
      løn: 58000,
      uddannelse: "Software Engineering",
      varighed: 3,
      sprog: "Java",
      branche: "IT"
    },
    {
      løn: 57000,
      uddannelse: "Information Technology",
      varighed: 5,
      sprog: "C++",
      branche: "IT"
    },
    {
      løn: 59000,
      uddannelse: "Computer Engineering",
      varighed: 4,
      sprog: "Python",
      branche: "IT"
    },
    {
      løn: 54000,
      uddannelse: "Datamatiker",
      varighed: 3,
      sprog: "JavaScript",
      branche: "IT"
    },
    {
      løn: 61000,
      uddannelse: "Softwareudvikler",
      varighed: 4,
      sprog: "C#",
      branche: "IT"
    },
    {
      løn: 60000,
      uddannelse: "Computer Science",
      varighed: 2,
      sprog: "Java",
      branche: "IT"
    },
    {
      løn: 56000,
      uddannelse: "Software Engineering",
      varighed: 3,
      sprog: "C++",
      branche: "IT"
    },
    {
      løn: 58000,
      uddannelse: "Information Technology",
      varighed: 5,
      sprog: "Python",
      branche: "IT"
    },
    {
      løn: 57000,
      uddannelse: "Computer Engineering",
      varighed: 4,
      sprog: "JavaScript",
      branche: "IT"
    },
    {
      løn: 59000,
      uddannelse: "Datamatiker",
      varighed: 3,
      sprog: "C#",
      branche: "IT"
    },
    {
      løn: 61000,
      uddannelse: "Softwareudvikler",
      varighed: 4,
      sprog: "Java",
      branche: "IT"
    },
    {
      løn: 60000,
      uddannelse: "Computer Science",
      varighed: 2,
      sprog: "C++",
      branche: "IT"
    },
    {
      løn: 56000,
      uddannelse: "Information Technology",
      varighed: 5,
      sprog: "Python",
      branche: "IT"
    },
    {
      løn: 59000,
      uddannelse: "Computer Engineering",
      varighed: 4,
      sprog: "JavaScript",
      branche: "IT"
    }
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          minWidth: "900px",
          marginBottom: "5em",
          gap: "5em",
          marginRight: "10%",
          alignItems: "start",
          height: "50%",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "25em",
            minWidth: "400px",
          }}
        >
          <h1>UddannelsesPlatform</h1>
          <p>
            Velkommen til uddannelsesplatformen. Her kan du finde information om
            forskellige uddannelser og metoder. Du kan også finde information om
            løn og arbejdstid. For at se mere omkring vores metoder, klik på
            metoder øverst. Hvis du vil se mere omkring uddannelser, Klik på
            knappen for at gå til uddannelser.
          </p>
          <button
            className="primary-button"
            style={{ width: "12em" }}
            onClick={() => {
              tableRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Gå til uddannelser
          </button>
        </div>
        <Lottie
          animationData={animationData}
          style={{ minWidth: "462px", height: "100%" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="crazy-shadow"
          style={{
            marginBottom: "5em",
          }}
        >
          <div ref={tableRef} id="table" />
          <h3 style={{ textAlign: "center" }}>Uddannelser</h3>
          <DataTable
            columns={columns}
            highlightOnHover
            pointerOnHover
            fixedHeader
            fixedHeaderScrollHeight="25em"
            data={data}
            responsive
            expandableRows
            expandOnRowClicked
            customStyles={{
              table: {
                style: {
                  width: "100%",
                },
              },
            }
            }
          />
        </div>
      </div>
    </>
  );
};

export default Homepage;
