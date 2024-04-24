import { useState, useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
import DataTable, { TableColumn } from "react-data-table-component";
import { VscArrowCircleRight } from "react-icons/vsc";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

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
  const matches = useMediaQuery("(min-width: 800px)");
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
          gap: "5em",
          minHeight: "80vh",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "35%",
            minWidth: "345px",
          }}
        >
          {matches ? (
            <h1 className="text-color-blue" style={{ fontSize: "xxx-large" }}>
              UddannelsesPlatform
            </h1>
          ) : (
            <>
              <h1
                className="text-color-blue"
                style={{ fontSize: "xxx-large", marginBottom: 0 }}
              >
                Uddannelses
              </h1>
              <h1
                className="text-color-blue"
                style={{ fontSize: "xxx-large", marginTop: -20 }}
              >
                Platform
              </h1>
            </>
          )}
          Velkommen til uddannelsesplatformen. Her kan du finde den idéelle
          uddannelse til dig, baseret på data fra offentlige myndigheder og
          statistikker, samt ved hjælp af rangeringsalgoritmer og
          visualiseringsværktøjer.
          <p></p>
          <div style={{ display: "flex", marginTop: "2em" }}>
            <CheckCircleIcon sx={{ marginRight: 1 }} color="primary" />{" "}
            <div>
              <b>Rangeringsalgoritme </b> - Ved hjælp af linear programmering
              modelleres og rangeres uddannelserne
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "1em" }}>
            <CheckCircleIcon sx={{ marginRight: 1 }} color="primary" />{" "}
            <div>
              <b> Visualisering</b> – Principal Component Analysis (PCA)
              anvendes til at visualisere data
            </div>
          </div>
          <div
            style={{ display: "flex", marginTop: "1em", marginBottom: "2em" }}
          >
            <CheckCircleIcon sx={{ marginRight: 1 }} color="primary" />{" "}
            <div>
              <b> Personlig anbefaling</b> – Få en personlig forklaring på
              rangeringen af uddannelserne baseret på dine præferencer baseret
              på AI-teknologi
            </div>
          </div>
          <p></p>
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
          style={{ minWidth: "400px", height: "500px", minHeight: "400px" }}
        />
      </div>

      <div style={{ height: "100%", width: "80%" }}>
        <h1 style={{ textAlign: "center" }} className="text-color-blue">
          Uddannelser
        </h1>
        <div ref={tableRef} id="table" />

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
    </>
  );
};

export default Homepage;
