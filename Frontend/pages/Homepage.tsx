import { useState, useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
import DataTable, { TableColumn } from "react-data-table-component";
import { VscArrowCircleRight } from "react-icons/vsc";

type DataRow = {
  id: number;
  name: string;
  løn: number;
  uddannelse: string;
  varighed: number;
  arbejdstid: string;
  alder: number;
  erfaring: number;
  sprog: string;
};

const Homepage = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const columns: TableColumn<DataRow>[] = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Navn", selector: (row) => row.name, sortable: true },
    { name: "Uddannelse", selector: (row) => row.uddannelse, sortable: true },
    { name: "Varighed", selector: (row) => row.varighed, sortable: true },
    { name: "Arbejdstid", selector: (row) => row.arbejdstid, sortable: true },
    { name: "Løn", selector: (row) => row.løn, sortable: true },
    { name: "Alder", selector: (row) => row.alder, sortable: true },
    { name: "Erfaring", selector: (row) => row.erfaring, sortable: true },
    { name: "Sprog", selector: (row) => row.sprog, sortable: true },
  ];
  const data: DataRow[] = [
    {
      id: 2,
      name: "John Doe",
      løn: 60000,
      uddannelse: "Softwareudvikler",
      varighed: 3,
      arbejdstid: "fuldtid",
      alder: 28,
      erfaring: 5,
      sprog: "Python",
    },
    {
      id: 3,
      name: "Alice Jensen",
      løn: 55000,
      uddannelse: "Computer Science",
      varighed: 4,
      arbejdstid: "deltid",
      alder: 30,
      erfaring: 7,
      sprog: "JavaScript",
    },
    {
      id: 4,
      name: "Emma Nielsen",
      løn: 62000,
      uddannelse: "Datamatiker",
      varighed: 2,
      arbejdstid: "fuldtid",
      alder: 26,
      erfaring: 3,
      sprog: "C#",
    },
    {
      id: 5,
      name: "Mikkel Pedersen",
      løn: 58000,
      uddannelse: "Software Engineering",
      varighed: 3,
      arbejdstid: "fuldtid",
      alder: 27,
      erfaring: 4,
      sprog: "Java",
    },
    {
      id: 6,
      name: "Sarah Mikkelsen",
      løn: 57000,
      uddannelse: "Information Technology",
      varighed: 5,
      arbejdstid: "fuldtid",
      alder: 29,
      erfaring: 6,
      sprog: "C++",
    },
    {
      id: 7,
      name: "Andreas Hansen",
      løn: 59000,
      uddannelse: "Computer Engineering",
      varighed: 4,
      arbejdstid: "deltid",
      alder: 31,
      erfaring: 8,
      sprog: "Python",
    },
    {
      id: 8,
      name: "Louise Christensen",
      løn: 54000,
      uddannelse: "Datamatiker",
      varighed: 3,
      arbejdstid: "fuldtid",
      alder: 28,
      erfaring: 5,
      sprog: "JavaScript",
    },
    {
      id: 9,
      name: "Peter Larsen",
      løn: 61000,
      uddannelse: "Softwareudvikler",
      varighed: 4,
      arbejdstid: "fuldtid",
      alder: 30,
      erfaring: 7,
      sprog: "C#",
    },
    {
      id: 10,
      name: "Maria Olsen",
      løn: 60000,
      uddannelse: "Computer Science",
      varighed: 2,
      arbejdstid: "fuldtid",
      alder: 25,
      erfaring: 3,
      sprog: "Java",
    },
    {
      id: 11,
      name: "Nikolaj Rasmussen",
      løn: 56000,
      uddannelse: "Software Engineering",
      varighed: 3,
      arbejdstid: "fuldtid",
      alder: 27,
      erfaring: 4,
      sprog: "C++",
    },
    {
      id: 12,
      name: "Sofie Jørgensen",
      løn: 58000,
      uddannelse: "Information Technology",
      varighed: 5,
      arbejdstid: "fuldtid",
      alder: 29,
      erfaring: 6,
      sprog: "Python",
    },
    {
      id: 13,
      name: "Martin Madsen",
      løn: 57000,
      uddannelse: "Computer Engineering",
      varighed: 4,
      arbejdstid: "deltid",
      alder: 31,
      erfaring: 8,
      sprog: "JavaScript",
    },
    {
      id: 14,
      name: "Line Andersen",
      løn: 59000,
      uddannelse: "Datamatiker",
      varighed: 3,
      arbejdstid: "fuldtid",
      alder: 28,
      erfaring: 5,
      sprog: "C#",
    },
    {
      id: 15,
      name: "Anders Christensen",
      løn: 61000,
      uddannelse: "Softwareudvikler",
      varighed: 4,
      arbejdstid: "fuldtid",
      alder: 30,
      erfaring: 7,
      sprog: "Java",
    },
    {
      id: 16,
      name: "Camilla Nielsen",
      løn: 60000,
      uddannelse: "Computer Science",
      varighed: 2,
      arbejdstid: "fuldtid",
      alder: 25,
      erfaring: 3,
      sprog: "C++",
    },
    {
      id: 17,
      name: "Lars Pedersen",
      løn: 56000,
      uddannelse: "Information Technology",
      varighed: 5,
      arbejdstid: "fuldtid",
      alder: 29,
      erfaring: 6,
      sprog: "Python",
    },
    {
      id: 18,
      name: "Louise Hansen",
      løn: 59000,
      uddannelse: "Computer Engineering",
      varighed: 4,
      arbejdstid: "deltid",
      alder: 31,
      erfaring: 8,
      sprog: "JavaScript",
    },
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
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
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
            data={data}
            responsive
            expandableRows
            expandOnRowClicked
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              overflow: "scroll",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Homepage;
