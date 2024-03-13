import { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
import DataTable, { TableColumn } from "react-data-table-component";

type DataRow = {
  id: number;
  name: string;
  løn: number;
  uddannelse: string;
  varighed: number;
  arbejdstid: string;
};
const Homepage = () => {
  const [count, setCount] = useState(0);

  const columns: TableColumn<DataRow>[] = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Navn", selector: (row) => row.name, sortable: true },
    { name: "Uddannelse", selector: (row) => row.uddannelse, sortable: true },
    { name: "Varighed", selector: (row) => row.varighed, sortable: true },
    { name: "Arbejdstid", selector: (row) => row.arbejdstid, sortable: true },
    { name: "Løn", selector: (row) => row.løn, sortable: true },
  ];

  const data: DataRow[] = [
    {
      id: 1,
      name: "Test",
      løn: 50202,
      uddannelse: "Datamatiker",
      varighed: 2,
      arbejdstid: "fuldtid",
    },
    {
      id: 2,
      name: "Test2",
      løn: 20000,
      uddannelse: "datalog",
      varighed: 3,
      arbejdstid: "fuldtid",
    },
    {
      id: 3,
      name: "Test3",
      løn: 30000,
      uddannelse: "Softwareudvikler",
      varighed: 4,
      arbejdstid: "fuldtid",
    },
    {
      id: 4,
      name: "Test4",
      løn: 40000,
      uddannelse: "Webudvikler",
      varighed: 2,
      arbejdstid: "fuldtid",
    },
    {
      id: 5,
      name: "Test5",
      løn: 50000,
      uddannelse: "Frontend-udvikler",
      varighed: 3,
      arbejdstid: "fuldtid",
    },
    {
      id: 6,
      name: "Test6",
      løn: 60000,
      uddannelse: "Backend-udvikler",
      varighed: 4,
      arbejdstid: "fuldtid",
    },
    {
      id: 7,
      name: "Test7",
      løn: 70000,
      uddannelse: "Fullstack-udvikler",
      varighed: 5,
      arbejdstid: "fuldtid",
    },
    {
      id: 8,
      name: "Test8",
      løn: 80000,
      uddannelse: "Systemudvikler",
      varighed: 3,
      arbejdstid: "fuldtid",
    },
    {
      id: 9,
      name: "Test9",
      løn: 90000,
      uddannelse: "App-udvikler",
      varighed: 2,
      arbejdstid: "fuldtid",
    },
    {
      id: 10,
      name: "Test10",
      løn: 100000,
      uddannelse: "Mobile-udvikler",
      varighed: 4,
      arbejdstid: "fuldtid",
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
        }}
      >
        <div style={{ margin: "3em", width: "30em" }}>
          <h1>UddannelsesPlatform</h1>
          <p>
            Velkommen til uddannelsesplatformen. Her kan du finde information om
            forskellige uddannelser og metoder. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Id nobis hic laudantium voluptate?
            Quia maxime provident doloremque eaque, voluptas ut error sed libero
            tempore, excepturi esse eligendi aut sunt blanditiis.
          </p>
          <button onClick={() => setCount((count) => count + 1)}>
            Du har trykket her {count} gange
          </button>
        </div>
        <Lottie
          animationData={animationData}
          style={{ width: "30em", minWidth: "360px" }}
        />
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <div style={{ border: "1px solid black" }}>
          <DataTable title={"Uddannelser"} columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default Homepage;
